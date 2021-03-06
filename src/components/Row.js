import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScreenInfo} from '../lib/ScreenInfo';
import {View, DeviceEventEmitter, InteractionManager} from 'react-native';
import {isHidden, isExcludedByAspectRatio, getSize, getOffset} from '../lib/helpers';

export default class Row extends React.Component {
  constructor(props, context) {
      super (props, context)
      this.state = {}
  }

  hide = () => {
    this.setState({height: 0})
  }

  show = () => {
    this.setState({height: undefined}) // yield to size prop
  }

  callback = (e) => {
      const event = {
        screenInfo: ScreenInfo(), 
        rowInfo: e.nativeEvent.layout
      }

      if (this.props.layoutEvent) {
        DeviceEventEmitter.emit(this.props.layoutEvent, event)
      } else {
        //this.setState({layoutEvent: event})
      }
  }

  cloneElements = () => {
    const rtl = this.props.rtl 

    return React.Children.map((rtl ? React.Children.toArray(this.props.children).reverse() : this.props.children), (element) => {
      if (!element) return null
      if (element.type && (element.type.name === 'Row')) {
          throw new Error("Row may not contain other Rows as children. Child rows must be wrapped in a Column.")
      } else if (element.type.name === 'Column') {
        if (isHidden(this.screenInfo.mediaSize, element.props) || 
            isExcludedByAspectRatio(element.props, this.screenInfo.aspectRatio)) {
          return null;
        } else {
          return React.cloneElement(element, {rtl})
        }
      } else {
        return element
      }
    })
  }

  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  }

  static propTypes = {
    rtl: PropTypes.bool,
    noWrap: PropTypes.bool,
    hAlign: PropTypes.oneOf(['space', 'distribute', 'center', 'left', 'right']),
    vAlign: PropTypes.oneOf(['stretch', 'middle', 'right', 'left']),
    fullHeight: PropTypes.bool,
    alignLines: PropTypes.string,
    layoutEvent: PropTypes.string
  }

  render() {

    const {
      rtl,
      fullHeight,
      noWrap,
      hAlign,
      vAlign,
      alignLines,
      layoutEvent,
      ...rest
    } = this.props

    this.screenInfo = ScreenInfo()

    this.wrapState = noWrap ? 'nowrap' : 'wrap'
    this.height =  (this.props.style && this.props.style.height !== undefined) ? this.props.style.height : fullHeight ? '100%' : undefined
    this.flex =  this.props.style && this.props.style.flex !== undefined ? this.props.style.flex : 0

    if (rtl && !hAlign) {
      this.hAlign = 'flex-end'
    } else {
      switch (hAlign) {
        case 'space': 
          this.hAlign = 'space-between' 
          break;
        case 'distribute':
          this.hAlign = 'space-around'  
          break;
        case 'center': 
          this.hAlign = 'center' 
          break; 
        case 'right': 
          this.hAlign = 'flex-end' 
          break;
        case 'left': 
          this.hAlign = 'flex-start'
          break;
        default:
          this.hAlign = 'flex-start'
      }
    }

    switch (vAlign) {
      case 'stretch': 
        this.vAlign = 'stretch' 
        break;
      case 'middle':
        this.vAlign = 'center' 
        break; 
      case 'bottom': 
        this.vAlign = 'flex-end' 
        break;
      case 'baseline':
        this.vAlign = 'baseline'
        break; 
      case 'top':
        this.vAlign = 'flex-start'
      default: 
        this.vAlign = 'flex-start'
    }

    switch (alignLines) {
      case 'top': 
        this.alignLines = 'flex-start' 
        break;
      case 'bottom':
        this.alignLines = 'flex-end' 
        break; 
      case 'middle': 
        this.alignLines = 'center'  
        break;
      case 'space': 
        this.alignLines = 'space-between' 
        break;  
      case 'distribute': 
        this.alignLines = 'space-around'
        break;  
      case 'stretch': 
        this.alignLines = 'stretch'
        break;
      default: 
        this.alignLines = 'flex-start' 
    }
    
    try {
        return (
            <View {...rest}
              onLayout={(e) => {
                  e.persist()
                  InteractionManager.runAfterInteractions(() => {
                    requestAnimationFrame(() => {
                      this.callback(e)
                    })
                  })
                }
              }
              ref={component => this._root = component} 
              style={[this.props.style,
                { 
                  flex: this.flex,
                  flexDirection: 'row',
                  height: this.height !== undefined ? this.height : 
                          (this.props.size !== undefined || 
                          this.props.sizePoints !== undefined ||
                          this.props[this.screenInfo.mediaSize + 'Size'] !== undefined ||
                          this.props[this.screenInfo.mediaSize + 'SizePoints'] !== undefined) ?
                             getSize(this.screenInfo.mediaSize, this.props) : undefined,
                  alignContent: this.alignLines, 
                  flexWrap: this.wrapState,
                  alignItems: this.vAlign,
                  justifyContent: this.hAlign,
                  position: 'relative'
                }]}
              >
                {this.cloneElements()}
            </View>
        )
    } catch (e) {
      if (__DEV__) { 
        console.error(e)
      }
      return null
    }
  }
}