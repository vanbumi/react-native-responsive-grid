
## _When I first made a grid I happened to be thinking of the innocence of trees and then this grid came into my mind and I thought it represented innocence, and I still do, and so I painted it and then I was satisfied. I thought, this is my vision._ --[Agnes Martin](https://www.guggenheim.org/arts-curriculum/topic/grids)

[![NPM](https://nodei.co/npm/react-native-responsive-grid.png?compact=false)](https://npmjs.org/package/react-native-responsive-grid)

# Responsive and Adaptive Layout for React Native 

### Install

In your project folder, `yarn add react-native-responsive-grid`

*requires React Native 0.43.x or newer 

## Background

Before React Native v0.42 we didn't have a performant, declarative way of specifying percentage-based dimensions. Then came React Native v0.42 which gave us that ability. Since then several open source contributors have made responsive grids that take advantage of this new capability. This "grid" takes one of the simplest and most well-thought-out ones, namely, `react-native-flexbox-grid` (by @rundmt), and modifies it heavily to produce a simple yet powerful layout model that we can use to implement responsive and adaptive behavior in our apps. 

## A Unified Theory of Layout

This grid eschews Flexbox-based sizing in favor of percentage-based sizing while at the same time relying on Flexbox for alignment. It delivers the predictability of the percentage-based model with the more sophisticated alignment capasbility of the Flexbox model.

_The grid construct is extended beyond its archetypal form as a Rectilinear 2D Grid and generalized as two cross-nestable, orthogonal components, namely, Row and Column, that can be combined in an alternating pattern to build a tree of Views of any shape and depth. That is to say, a Row View (Row for short) may contain one or more Column Views (Column for short), each of which may contain one or more Rows, which in turn may contain one or more Columns, and so on. Both Rows and Columns can be styled using predictable, percentage-based width, height, padding and margins. Rows can be aligned vertically (along main axis) and horizontally (along cross axis) inside Columns, and Columns can be aligned horizontally (along main axis) and vertically (along cross axis) inside Rows. [Additionally, the multiple lines created by wrapped Row content may be aligned vertically relative to the parent Column.] And with this, we can build the entire UI component tree (or an individual component's subtree) using a consistent, repeatable and recursive pattern, one that has predictable and dynamic --not only static-- responsiveness and the ability to trigger specific adaptive behavior built into it._ 

_The tree nodes are represented by Rows and their children are represented by Columns. Tree leaves are Columns that have no Row as a child._

### A grid or a tree?

With this grid, we don't lose any aspect of the normal rectilinear 2D grid. We just gain a generalized and consistent way of building responsive UI component trees. A normal rectilinear 2D grid is a tree where the rows are the children and the columns within each are the grand children. But a UI is constructed as a tree of arbitrary shape which corresponds to the UI's visual composition, so a normal rectilinear 2D grid is the simplest tree structure but for a layout farmework, which is what the responsive grid is, we want the ability to build UI View trees of any shape and complexity with predictable responsive behavior. That is what this grid gives us. It's a granular, responsive layout system, not just a design/formatting tool. We could certainly constructa high level rectilinear 2D grid with it, but that is just a specific use case. 

(for more details see [Design Principles](https://github.com/idibidiart/react-native-responsive-grid/blob/master/DesignPrinciples.md))

## React Native Examples

You may use this grid to build responsive 2D layouts that maintain their relative proportions, change their basic structure in a predictable way and dynamically decide what content to display, based on screen size, aspect ratio, and orientation.  

## [Example 1: Reponsive Tiles for Universal Apps](https://www.youtube.com/watch?v=x785Qib0ySg)
[![>> universal tiles demo <<](https://img.youtube.com/vi/x785Qib0ySg/0.jpg)](https://www.youtube.com/watch?v=x785Qib0ySg)

## [Example 2: selecting image with right aspect ratio](https://www.youtube.com/watch?v=Nghqc5QFln8)
[![>> aspectRatio demo <<](https://img.youtube.com/vi/Nghqc5QFln8/0.jpg)](https://www.youtube.com/watch?v=Nghqc5QFln8)

## [Example 3: responsive break points (Row Wrapping)](https://www.youtube.com/watch?v=GZ1uxWEVAuQ) 
[![>> responsive break points demo <<](https://img.youtube.com/vi/GZ1uxWEVAuQ/0.jpg)](https://www.youtube.com/watch?v=GZ1uxWEVAuQ)

## [Example 4: layout change info](https://www.youtube.com/watch?v=99J3c_Zn6QU) 
[![>> layoutEvent demo <<](https://img.youtube.com/vi/99J3c_Zn6QU/0.jpg)](https://www.youtube.com/watch?v=99J3c_Zn6QU)

## [Example 5: FlatList + Row & Column Wrapping](https://www.youtube.com/watch?v=qLqxat3wX_8)
[![>> FlatList Demo <<](https://img.youtube.com/vi/qLqxat3wX_8/0.jpg)](https://www.youtube.com/watch?v=qLqxat3wX_8)

The demos in the videos above show some of the possibilities, but this grid is capable of more complex responsive and adaptive behavior.

### Example 1

This examples showcases the grid's 'adaptive' behavior. The problem it solves is summarized below:

How to make a tiled screen layout that is highly usable and looks consistent across all screen sizes and aspect ratios, and how to do that using this grid (react-native-responsive-grid.) This involves the following:

1. How to size tiles such that they change size relative to the size of the screen *as well as* retain their shape (width/height aspect ratio)

2. How do we hide/show tiles on demand and fill the void left by hidden tiles using Flexbox wrapping behavior 

The goal is how to do the above in an elegant and declarative way that allows the average user to work without all the tedious implementation details of doing it in row Flexbox and JS. 

[Explanation and Source Code for Example 1](https://github.com/idibidiart/react-native-responsive-grid/blob/master/UniversalTiles.md)

### Example 2

In the first demo, the grid picks the image with the **closest aspect ratio** to the device aspect ratio, dynamically, taking into account the current device orientation. The images themselves must be sized and cropped by the designer so that they match the common device aspect ratios (see below) while also showing the part of the image that the designer intends to show for each aspect ratio. Since there could be many aspect ratios that correspond to different devices we should have multiple such images (and, optionally, their rotated versions.)

The following table maps some common device aspect ratios to the ratio of width/height of devices known to this developer, for both landscape and portrait device orientations. The physical device aspect ratio does not change with device rotation (i.e. a device with 16:9 aspect ratio does not become one with a 9:16 aspect ratio when it's rotated, although it does mathematically), but since the width and height get flipped when changing orientation from portrait to lanscape and vice versa, we need to have two images per each physical device aspect ratio, one for portrait mode and the other for landscape. However, if our app only supports portrait or landscape mode then we only need to have the one corresponding to that orientation. 

| Aspect Ratio | Width | Height | Width/Height Ratio (landscape) | Devices 
| :---: | :---: | :---: | :---: | :---: | 
| '16:9' | 568 | 320 | 1.77 | iPhone 5
| '16:9' | 667 | 375 | 1.77 | iPhone 6 & 7
| '16:9' | 736 | 414 | 1.77 | iPhone 6 Plus & 7 Plus
| '16:10' | ? | ? | 1.6 | ?
| '3:2' | 480 | 320 | 1.5 | iPhone 4
| '4:3' | 1024 | 768 |  1.33 | iPad Mini, iPad Air and small iPad Pro
| '4:3' | 1366 | 1024 | 1.33 | Large iPad Pro
| '1:1' | 1 | ? | ? | ?

| Aspect Ratio | Width | Height | Width/Height Ratio (portrait) | Devices
| :---: | :---: | :---: | :---: | :---: | 
| '16:9' | 320 | 568 | 0.56 | iPhone 5
| '16:9' | 375 | 667 | 0.56 | iPhone 6 & 7
| '16:9' | 414 | 736 | 0.56 | iPhone 6 Plus & 7 Plus
| '16:10' | ? | ? | 0.625| ? 
| '3:2' | 320 | 480 | 0.66 | iPhone 4
| '4:3' | 768 | 1024 | 0.75 | iPad Mini, iPad Air and small iPad Pro
| '4:3' | 1024 | 1366 | 0.75 | Large iPad Pro
| '1:1' | 1 | ? | ? | ?

```jsx
<Row>
  <Col fullWidth aspectRatio={{ratio: '3:2', orientation: "portrait"}}>
      <Image source={require('./assets/homepage hero-3-2-portrait.jpg')} style={styles.homeImage}></Image>
  </Col>
</Row>
<Row>
  <Col fullWidth aspectRatio={{ratio: '3:2', orientation: "landscape"}}>
      <Image source={require('./assets/homepage hero-3-2-landscape.jpg')} style={styles.homeImage}></Image>
  </Col>
</Row>
<Row>
  <Col fullWidth aspectRatio={{ratio: '16:9', orientation: "portrait"}}>
      <Image source={require('./assets/homepage hero-16-9-portrait.jpg')} style={styles.homeImage}></Image>
  </Col>
</Row>
<Row>
  <Col fullWidth aspectRatio={{ratio: '16:9', orientation: "landscape"}}
      <Image source={require('./assets/homepage hero-16-9-landscape.jpg')} style={styles.homeImage}></Image>
  </Col>
</Row>
```

### Example 3

In the second demo, the grid folds columns in rows based on the screen-device-depebdent `size` prop on the column (which can be percentage based, e.g. smSize, or point based, e.g. smSizePoints. This means that different break points can be supplied for the different screen sizes in both absolute and relative terms. This example demonstrates how to get Row content (e.g. child Columns) to wrap at certain break points (which can be supplied per screen width)

The following are the preset screen widths at which break points maybe specified:

- sm: <= 480px 
- md: > 480 and < 1024
- lg: >= 1024 and < 1366
- xl: >= 1366 

```jsx
  <Row  style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
      <Col size={80} offset={6}>
        <Row>
          <Col size={50} smSize={100}>      
            <Text style={{fontSize: 15, color: '#BD1206', fontWeight:'bold'}}>March 9, 2017</Text>
            <Row>
              <Col size={5}>
                <FontAwesome name='cutlery' size={17} color='gray'/>
              </Col>
              <Col size={60} offset={2.5}>
                <Text style={{fontSize: 12, color: 'gray', lineHeight: 20}}>TAKEOUT ORDER</Text>
              </Col>
            </Row>
          </Col>
          <Col size={50} smSize={100}>
            <Text style={{fontSize: 16, color: '#0a0a0a'}}>Double Cheese Burger</Text>                                                                          
          </Col>
        </Row>
      </Col>
      <Col size={14} offset={-6} hAlign='right'>
            <MaterialIcons name="keyboard-arrow-right" size={28} color="#BD1206" style={{left: 5}} />
      </Col>
  </Row>
```

### Example 4

If 'layoutEvent' is supplied as a prop on a Row with a Row-specific name the Row will emit that named event upon receiving React Native's onLayout event to signal to the higher order component (which must subscribe to that event) to re-render its tree. If no layoutEvent is specified the row will re-render its own subtree. This is useful when we wish to react to layout change on per-row basis, and where we need the row's layout info (height, width, etc) to determine the new dimensions of components within it or around it. The example below shows how we may listen and react to such specific layout events in components.

```jsx
import React, { Component} from 'react'
import {
  View,
  Text,
  DeviceEventEmitter
} from 'react-native'

import { Row, Column as Col} from 'react-native-responsive-grid'

export default class Home extends React.Component {
    constructor (props) {
      super(props)
      this.sub = null
    }

    static route = {
        navigationBar: {
          title: 'Home',
          renderTitle: "Layout Event Demo",
          backgroundColor: "#fff"
        }
    }

    componentWillMount() {
      this.sub = DeviceEventEmitter.addListener("someEventKey", (e) => {
        this.setState({someEventKey: e})
      })
    }

    componentWillUnmount() {
      this.sub.remove()
    }

    contentReady = () => {
      if (this.state && this.state.someEventKey) {
        return (
            <Col fullWidth hAlign='center'>
              <Row>
                <Text style={{fontSize: 20}}>screen width: {this.state.someEventKey.screenInfo.width}</Text>
              </Row>
              <Row>
                <Text style={{fontSize: 20}}>screen height: {this.state.someEventKey.screenInfo.height}</Text>
              </Row>
              <Row>
                <Text style={{fontSize: 20}}>orientation: {this.state.someEventKey.screenInfo.aspectRatio.currentOrientation}</Text>
              </Row>
              <Row>
                <Text style={{fontSize: 20}}>aspect ratio: {this.state.someEventKey.screenInfo.aspectRatio.currentNearestRatio}</Text>
              </Row>
              <Row>
                <Text style={{fontSize: 20}}>element width: {this.state.someEventKey.rowInfo.width}</Text>
              </Row>
              <Row>
                <Text style={{fontSize: 20}}>element height: {this.state.someEventKey.rowInfo.height}</Text>
              </Row>
              <Row>
                <Text style={{fontSize: 20}}>element x: {this.state.someEventKey.rowInfo.x}</Text>
              </Row>
              <Row>
                <Text style={{fontSize: 20}}>element y: {this.state.someEventKey.rowInfo.y}</Text>
              </Row>
            </Col>
        )
      } else {
        return null
      }
    }

    render() {
      return (
        <Row fullHeight vAlign='middle' hAlign='center' style={{backgroundColor: 'orange'}}>
          <Col fullWidth size={50} style={{backgroundColor: 'pink', padding: '0%'}}>
            <Row layoutEvent="someEventKey"  style={{backgroundColor: 'yellow'}}> 
              {this.contentReady()}
            </Row>
          </Col>
        </Row>
      )
    }
}
``` 

### Example 5

FlatList is a virtualized replacement for React Native's old ListView component. Using FlatList as a container is supported by this grid. This example also demonstrate wrapping Column content based on screen size. See ('size' prop under the [Props](https://github.com/idibidiart/react-native-responsive-grid#props) section.) It also demonstrates who to wrap Row content (e.g. child columns) based on screen size (also see [Example 2](https://github.com/idibidiart/react-native-responsive-grid#example-2) for more details)

```jsx
import React, { Component } from 'react';
import {
  FlatList,
  Text,
  ScrollView
} from 'react-native';

import { Row, Column as Col} from 'react-native-responsive-grid'
import { MaterialIcons } from '@expo/vector-icons';
import faker from 'faker';

let j = 0
const randomUsers = (count = 10) => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      key: faker.random.uuid(),
      date: faker.date.weekday(),
      name: faker.name.firstName(),
      job: faker.name.jobTitle(),
      index: j++
    })
  }
  return arr
}

export default class Home extends Component {
  state = {
    refreshing: false,
    data: randomUsers(10),
  };

  onEndReached = () => {
    const data = [
        ...this.state.data,
        ...randomUsers(10),
      ]

    this.setState(state => ({
      data
    }));
  };

  onRefresh = () => {
    this.setState({
      data: randomUsers(10),
    });
  }

  render() {
    return (
      <FlatList
        data={this.state.data}
        initialNumToRender={10}
        onEndReachedThreshold={1}
        onEndReached={this.onEndReached}
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
        renderItem={
          ({ item }) => {
            return (
              <Row key={item.key} style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
                <Col size={80} offset={6} >
                  <Row>
                    <Col size={60} smSize={100}>
                      <Text style={{fontSize: 15, color: '#BD1206', fontWeight:'bold'}}>{String(item.date)}</Text>
                      <Row>
                        <Col size={10}>
                          <MaterialIcons name='person' size={17} color='gray'/>
                        </Col>
                        <Col smSize={60} size={87.5} offset={2.5}>
                          <Text style={{fontSize: 12, color: 'gray', lineHeight: 20}}>{item.job}</Text>
                        </Col>
                      </Row>
                    </Col>
                    <Col size={40} smSize={100}>
                      <Text style={{fontSize: 16, color: '#0a0a0a'}}>{item.name}</Text>
                    </Col> 
                  </Row>    
                </Col>
                <Col size={8} offset={-6} hAlign='right'>
                      <Text>{item.index}</Text>
                </Col>
              </Row>
            )
          }
      }
    />)
  }
}
```

## Methods

Row and Column have `.hide()` and `.show()` instance methods. The instance reference you get from a ref callback will have these methods. See Example #1 for usage.

## Props

All props are case sensitive.

`aspectRatio` (see [Example 1](https://github.com/idibidiart/react-native-responsive-grid#example-1))

`layoutEvent` (see [Examples 4](https://github.com/idibidiart/react-native-responsive-grid#example-4))

`size` may be supplied as prop to Column (width) or Row (height). This number defines the width of the column or height of a row as a percentage of its parent view's computed or explicit width or height, respectively.  

`smSize`, `mdSize`, `lgSize` and `xlSize` are device-dependent size values that are applied to columns. In addition to their utility in deciding the size of content based on screen size, they may are also used for defining column wrapping behavior based on screen size. For example, column content will wrap if column size is made smaller at smaller screen sizes.

`sizePoints` may be supplied as prop to Column (width) or Row (height). This number defines the width of the column or height of a row as an asolute value in points.

`smSizePoints`, `mdSizePoints`, `lgSizePoints`, and `xlSizePoints` are like their percentage-based equivalents but use absolute value. 

`offset` may be applied to Column. This number defines the marginLeft (or marginRight in csase of RTL mode) for the column as a percentage of its parent view's computed or explicitly set width. Offset values can also be negative. Default is 0. 

`smOffset`, `mdOffset`, `lgOffset` and `xlOffset` are device-dependent offset values that are applied to columns.

`offsetPoints`, `mdOffsetPoints`, `lgOffsetPoints`, and `xlOffsetPoints` are like their percentage-based equivalents but use absolute value in points (Number) instead of relative value in percent (String.) 

_Using offset values in RTL mode moves things from right to left. Using them in normal LTR mode moves things from left to right. It's pretty normal to expect that. If you're working in both directions, this makes offsets more useful than using marginLeft or marginRight directly._

_Specifying an offset value in normal LTR mode means marginLeft (if specified in style prop) will be overwritten by offset value. However, marginRight (if specified in style prop) will not be overwritten by the offset value. Specifying offset value in RTL mode means marginRight (if specified in style prop) will be overwritten by offset value. However, marginLeft (if specified in style prop) will not be overwritten by offset value._

`smHidden`, `mdHidden`, `lgHidden` and `xlHidden` - may be applied to Column. This tells the grid to hide certain columns based on the current width of the screen.  

`vAlign` may be supplied as prop to Column to vertically align the elements and/or rows within it. Possible values are: `middle`, `top`, `bottom`, `space` and `distribute`. Default is top.

`vAlign` may also be supplied as prop to Row to align the columns within it in the vertical direction. Possible values are: `top`, `middle`, `bottom`, `baseline` and `stretch`. Default is top.

`hAlign` may be supplied as prop to Row to align the columns within it in the horizontal direction. Possible values are: `center`, `left`, `right`, `space` and `distribute`. Default is left.

`hAlign` may also be supplied as prop to Column to align its rows and/or elements within it in the horizontal direction. Possible values are: `center`, `left`, `right`, and `stretch`. Default is left.

`rtl` may be supplied as prop to Row to both reverse the order of columns (or elements) inside a row as well as to set hAlign to 'right.' This is useful for right-to-left layouts. 

`fullHeight` may be supplied as prop to Row as a convenience to enable vAlign to work on child Column(s) -- fullWidth on Row is not desired since it would interfere with Column's offset prop. 

`fullWidth` may be supplied as prop to Column as a convenience to enable hAlign to work on child Row(s) -- fullHeight on Column is not desired since it would interfere with Row's size prop. 

_Note, if row (or column) is a child of ScrollView you need to set the height (or width) explicitly, and if you wish to set it explicitly relative to container see Example # 1 which uses layoutEvent to get container size at runtime._

`alignLines` may be supplied as prop to Row to vertically align the wrapped lines within the Row (not to be confused with the items that are inside each line.) Possible values are: top, middle, bottom, space, distribute, stretch. (See section on Aligning Wrapped Lines within Rows)

`noWrap` may be supplied as prop to Row prevent child elements from wrapping. 

The screen-size-specific _size_, _offset_ and _hidden_ props refer to the effective screen width, which changes with orientation. 

The following are the screen width thresholds for these props:

- sm: <= 480px 
- md: > 480 and < 1024
- lg: >= 1024 and < 1366
- xl: >= 1366 

### Nesting

If you're nesting a column inside a row which is inside another column that is inside another row as below:

```jsx
<Row>
    <Col size={50}>
      <Row>
        <Col size={50}>
          <Text>
            This column is 25% of the outer view's width (or 25% of the screen width if
            the top level Row has no parent)
          </Text>
        </Col>
      </Row>
    </Col>
</Row>

```

The nested column's size will be the column size value (size, sm, md, lg, xl) as a percentage of the width of the preceding column in the hierarchy . 

This nested percentages model applies to offsets, too. 

### RTL Support

This is intended for right-to-left (RTL) layouts and apps that have their text in any of the following languages: 

- Arabic
- Aramaic
- Azeri
- Dhivehi/Maldivian
- Hebrew
- Kurdish (Sorani)
- Persian/Farsi
- Urdu

Notice the reversed order of the Text relative to the physical order in the markup. Also notice that columns are justified as flex-end within the row and their content is rightAligned (except for the second column which is explicitly leftAligned to mimic the rightAligned behavior in normal ltr layout)

<img src="https://s18.postimg.org/gr89vaghl/Screen_Shot_2017-04-07_at_6.47.22_PM.png" width=480>

### Normal LTR Markup 

```jsx
<Row style={{paddingTop: '11%', paddingBottom: '4%', backgroundColor: '#f3f3f3', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
    <Col size={60} offset={6} >
      <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
      PREVIOUS ORDERS
      </Text>
    </Col>
    <Col size={30} hAlign='right'>
      <Text style={{ fontSize: 16, color: '#BD1206'}}>
        SEE ALL
      </Text>
    </Col>
</Row>
```

### RTL Markup

Notice the offset values work in RTL direction now. The addition of .7 offset is to mimic the fact that the left margin in the LTR layout is smaller than the right margin in that layout, whereas it's the opposite in the RTL direction. So the .7 offset is used in RTL layout instead of the 1 offset, so alignment is identical. 

```jsx
<Row rtl style={{paddingTop: '11%', paddingBottom: '4%', backgroundColor: '#f3f3f3', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
    <Col size={60} offset={4} >
      <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
      PREVIOUS ORDERS
      </Text>
    </Col>
    <Col size={30} hAlign='left'>
      <Text style={{ fontSize: 16, color: '#BD1206'}}>
        SEE ALL
      </Text>
    </Col>
</Row>
```

### Utils

You may import ScreenInfo from grid and invoke inside of render() of your component to get current screen diemsnions and orientation. 

### Predictable, Dynamic Layout Behavior

Being able to readt to layout changes, including changes due to device rotation (for apps that allow it), is a key aspect of responsive design. This grid is designed to enable dynamic response to layout changes (see the demos at the start of this Readme) 

Columns and Rows have `position: 'relative'` enforced by design to keep them within the layout flow. Each can be moved about within their parent Row and Column, respectively, using top and bottom margins and/or offsets. Columns can be made to overlap horizontally within the row using a negative offset in LTR or RTL directions (see RTL support.) Rows can be made to overlap vertically within a column using a negative top and bottom margins. The intent is to allow the free positioning of rows and columns without taking them out of the layout flow. This is required to have a predictable response to layout change.

Elements, including Column elements, must be wapped in a Row in order for the grid to react to layout changes in those elements, including their mounting, un-mounting and re-mounting. You can decide where the re-rendering happens in the component subtree by placing the `layoutEvent` prop at the desired Row node (see layoutEvent demo markup in Introduction.)

## More Examples

```jsx
import {Column as Col, Row} from 'react-native-responsive-grid';

<Row>
    <Col smSize={50} mdSize={33.333} lgSize={25}>
        <Text>First Column</Text>
    </Col>
</Row>
```

In the example abovw, on a phone in portrait mode, the Column would take up 50% of the row's computed width. On a phone in landscape nmode or a normal tablet the Column would take up 33.333% of the row's width. On a big tablet the Column would take up 25% of the row's width.

```jsx
import {Column as Col, Row} from 'react-native-responsive-grid';

<Row style={{height: 20}}>
  <Col smOffset={0} mdOffset={10} lgOffset={20} xlOffset={40}>
    <Text>test</Text>
  </Col>
</Row>
```

In the example above, the text "test" will move further to the right with larger screen sizes.

```jsx
import {Column as Col, Row} from 'react-native-responsive-grid';

<Row>
    <Col smHidden>
        <Text>Column displayed when width is <= 480</Text>
    </Col>
    <Col mdHidden lgHidden xlHidden>
        <Text>Column displayed when width is > 480</Text>
    </Col>
</Row>
```

In the example above, the column and all of it's children will be hidden on small screens like phones, but it will appear on bigger screens like tablets. The size-prefixed 'hidden' props may be applied to columns. Hidden props are all booleans. They default to false.

## More Examples

- [Responsive Layout](https://github.com/idibidiart/react-native-responsive-grid/blob/master/EvenMoreExamples.md#responsive-layout)
- [Custom Components](https://github.com/idibidiart/react-native-responsive-grid/blob/master/EvenMoreExamples.md#custom-components)
- [Wrapped Alignment](https://github.com/idibidiart/react-native-responsive-grid/blob/master/EvenMoreExamples.md#wrapped-alignment)

