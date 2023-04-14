# React Native Easy Swiper 🚀

React Native Easy Swiper - is a versatile library that simplifies the implementation of swipeable views in React Native. With minimal setup, you can easily create swipeable images and components.

## Table of Contents
- [Installation](#installation)
- [Demo](#demo)
- [Core Features](#core-features)
- [Basic Usage](#basic-usage)
- [Advance Usage](#advance-usage)
- [Api Documentation](#api-documentation)

## Installation
To install, you can use [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/):
```sh
npm install react-native-easy-swiper
```
or
```sh
yarn add react-native-easy-swiper
```
## Demo

![React Native Easy Swiper Demo 1](https://user-images.githubusercontent.com/83538046/231977240-982a82db-e48c-4b3f-b450-3ba9339ddbce.gif)&nbsp;&nbsp;&nbsp;&nbsp;
![React Native Easy Swiper Demo 2](https://user-images.githubusercontent.com/83538046/231977324-c5410461-282a-469b-99c3-59174a09fe6e.gif)&nbsp;&nbsp;&nbsp;&nbsp;
![React Native Easy Swiper Demo 3](https://user-images.githubusercontent.com/83538046/231977338-432f9ef8-0cec-4efa-ac98-a821e93b45d3.gif)
<br />
**Try on snack**
- [Demo 1](https://snack.expo.dev/@rayhan122/react-native-easy-swiper-demo-1)
- [Demo 2](https://snack.expo.dev/@rayhan122/react-native-easy-swiper-demo-2)
- [Demo 3](https://snack.expo.dev/@rayhan122/react-native-easy-swiper-demo-3)

## Core Features
- **Direction -** Supports horizontal and vertical swiping direction
- **Animations -** Supports fade and scale animation 
- **Pagination -** Provides three types of animated pagination styles with lots of customization

## Basic Usage

```js
import * as React from 'react';
import Swiper from "react-native-easy-swiper"

const images = [
  "https://www.beatsbydre.com/content/dam/beats/web/product/headphones/solo3-wireless/pdp/product-carousel/black/pc-solo3-black-thrqtr-left.jpg",
  "https://www.beatsbydre.com/content/dam/beats/web/product/headphones/solo3-wireless/pdp/product-carousel/black/pc-solo3-black-thrqtr-right.jpg",
  "https://www.beatsbydre.com/content/dam/beats/web/product/headphones/solo3-wireless/pdp/product-carousel/black/pc-solo3-black-folded.jpg",
];

export default function App() {
  return <Swiper images={images} />
}
```
## Advance Usage

```js
import * as React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-easy-swiper';

const images = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
  'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
];

export default function App() {
  return (
    <View style={styles.container}>
      <Swiper
        height={400}
        dotBorderStyle={{
          borderColor: 'white',
        }}
        dotColor='white'
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={
              {
                width: "100%",
                height: "100%",
                resizeMode: "cover"
              }} />
        ))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
```

## Api Documentation

### Core Props


| Property                   | Types                                  |Defaults| Description                                                                                        |
| ------------------------   | ---------------------------------------|--------| -------------------------------------------------------------------------------------------------- |
| `images`                   |`array`                                 | `null` | Array of strings, each of which represents a URL for an image                          |
| `imagesStyles`             | `ImageStyle`                           | `{}`   | Styles for images | 
| `children`                 | `ReactNode`                            | `null` | Either pass images or array of components        |
| `horizontal`               | `boolean`                              |`true`  |Swiper direction pass ` horizontal={false}` for vertical swiper             |
| `animations`               | `scale` `fade`                    |`[]`  | Can pass multiple animations           |

### Container Props

| Property                   | Types                                  |Defaults| Description                                                                                        |
| ------------------------   | ---------------------------------------|--------| -------------------------------------------------------------------------------------------------- |
| `fullScreen`                   |`boolean`                         | `false` | Takes full screen width and height                         |
| `height`                      | `number`                           | `screenHeight`   | Height of container | 
| `width`                   | `number`                            | `screenWidth` |  Width of container       |
| `containerStyle`               | `ViewStyle`                              |`{}`  | Other styles for container          |


### Pagination Props

| Property                   | Types                                  |Defaults| Description                                                                                        |
| ------------------------   | ---------------------------------------|--------| -------------------------------------------------------------------------------------------------- |
| `hideDot`                  |`boolean`                             | `false` |Hides pagination                      |
| `dotType`                  | `dot`  `border` `dashed`               | `dashed`   |Pagination style | 
| `dotColor`               | `string`      |`lightgray`  | Dot color             |
| `dotPosition`               | `left`  `right`  `top`  `bottom`      |horizontal ? `bottom` : `left`  | Postion of dot around container       |
| `dotStyle`                 | `ViewStyle`                            | `null` | Styles for dots         |
| `dotMargin`               | `number`                                |`20`                             | Distance from container depending on `dotPosition`               |
| `dotSpacing`               | `number`      |  `8`| Gap between dots             |
| `activeDotColor`               | `string`                         |`black`                            |  Active dot color         |
| `dotBorderStyle`               | `ViewStyle`      |`{}`               | Default  `borderWidth: 1` and `borderColor: "#1d1d1d"` for  `dotType: "border"`  | 
| `activeDashSize`               | `number`      |`32`               | Length of dash  | 



## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
