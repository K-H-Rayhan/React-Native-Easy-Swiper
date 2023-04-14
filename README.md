# React Native Easy Swiper 🚀

React Native Easy Swiper - is a versatile library that simplifies the implementation of swipeable views in React Native. With minimal setup, you can easily create swipeable images and components.

## Table of Contents
- [Installation](https://github.com/K-H-Rayhan/react-native-easy-swiper/blob/master/README.md#installation)
- [Demo](https://github.com/K-H-Rayhan/react-native-easy-swiper/blob/master/README.md#demo)
- [Core Features](https://github.com/K-H-Rayhan/react-native-easy-swiper/blob/master/README.md#core-features)
- [Basic Usage](https://github.com/K-H-Rayhan/react-native-easy-swiper/blob/master/README.md#basic-usage)
- [Advance Usage](https://github.com/K-H-Rayhan/react-native-easy-swiper/blob/master/README.md#advance-usage)
- [Basic Usage](https://github.com/K-H-Rayhan/react-native-easy-swiper/blob/master/README.md#basic-usage)

## Installation
To install, you can use [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/):
```sh
npm install react-native-easy-swiper
```
**or**
```sh
yarn add react-native-easy-swiper
```
## Demo

![react-native-easy-swiper](https://user-images.githubusercontent.com/83538046/231887647-699bf1ee-a3c8-4321-ba4a-6de8caacadbb.gif)
![react-native-easy-swiper](https://user-images.githubusercontent.com/83538046/231887647-699bf1ee-a3c8-4321-ba4a-6de8caacadbb.gif)
![react-native-easy-swiper](https://user-images.githubusercontent.com/83538046/231887647-699bf1ee-a3c8-4321-ba4a-6de8caacadbb.gif)
<br />
- [Demo 1](https://snack.expo.dev/@rayhan122/react-native-easy-swiper-demo-1)
- [Demo 2](https://github.com/K-H-Rayhan/react-native-easy-swiper/blob/master/README.md#demo)
- [Demo 3](https://github.com/K-H-Rayhan/react-native-easy-swiper/blob/master/README.md#core-features)


## Basic Usage

```js
import * as React from 'react';
import Swiper from 'react-native-easy-swiper';

const images = [
  'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1431&q=80',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
  'https://images.unsplash.com/photo-1626947346165-4c2288dadc2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
];

export default function App() {
  return (
    <Swiper
      height={300}
      images={images}
      dotStyle={{
        width: 4,
        height: 12
      }}
    />
  );
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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
