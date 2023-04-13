import * as React from 'react';
import type { ViewStyle } from 'react-native';
import { View, Dimensions, Animated } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

type Props = {
  children?: React.ReactNode,
  horizontal?: boolean,
  fullScreen?: boolean,
  height?: number,
  width?: number,
  containerStyle?: ViewStyle
  hideDot?: boolean,
  dotStyle?: ViewStyle,
  dotPosition?: "left" | "right" | "top" | "bottom",
  dotColor?: string,
  dotBorderColor?: string,
  dotMargin?: number,
  activeDotColor?: string,
  dotBorderStyle?: ViewStyle,
  images?: string,
  dotSpacing?: number,
  dotType?: "dot" | "border",
}

const Swiper = (
  {
    children,
    horizontal,
    fullScreen,
    height,
    width,
    containerStyle,
    hideDot,
    dotStyle,
    dotMargin,
    activeDotColor,
    dotBorderStyle,
    dotSpacing,
    dotPosition,
    dotType

  }: Props) => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const scrollPos = React.useRef(new Animated.Value(0)).current
  const ITEM_WIDTH = fullScreen ? screenWidth : width && width > screenWidth ? screenWidth : width;
  const ITEM_HEIGHT = fullScreen ? screenHeight : height && height > screenHeight ? screenHeight : height;
  const axis = horizontal ? "x" : "y"
  const dataLength = React.Children.count(children)
  const DOTSIZE = dotStyle && Number(dotStyle.width) || 8;
  const DOT_SPACING = Number(dotSpacing) || 8
  const DOT_INDICATOR_SIZE = DOTSIZE + DOT_SPACING
  const DOTPOSITION = dotPosition ? dotPosition : horizontal ? "bottom" : "left"

  const dotBorderPostion = (DOTPOSITION == "left" || DOTPOSITION == "right") ? {
    [
      "translateY"
    ]: Animated.divide(scrollPos, horizontal ? (ITEM_WIDTH ?? screenWidth) : (ITEM_HEIGHT ?? screenHeight)).interpolate({
      inputRange: [0, 1],
      outputRange: [0, DOT_INDICATOR_SIZE]
    }),
  } : {
    [
      "translateX"
    ]: Animated.divide(scrollPos, horizontal ? (ITEM_WIDTH ?? screenWidth) : (ITEM_HEIGHT ?? screenHeight)).interpolate({
      inputRange: [0, 1],
      outputRange: [0, DOT_INDICATOR_SIZE]
    }),
  }


  return <View>
    <View style={
      {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        overflow: "hidden",
        ...containerStyle
      }
    }>
      <Animated.FlatList
        data={React.Children.map(children, (child) => child)}
        bounces={false}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        snapToInterval={horizontal ? ITEM_WIDTH : ITEM_HEIGHT}
        decelerationRate="fast"
        onScroll={({ nativeEvent: { contentOffset: { [axis]: pos }, contentSize: {
          [horizontal ? "height" : "width"]: size
        } } }) => {
          if (activeDotColor && dotType == 'dot') {
            let value = pos / size
            const floored = Math.round(value)
            setActiveIndex(floored)
          }
          scrollPos.setValue(pos);
        }
        }
        keyExtractor={(_, key) => key.toString()}
        renderItem={({ item }) => <View style={{
          width: ITEM_WIDTH,
          height: ITEM_HEIGHT,
        }}>{item}</View>}
      />
      {!hideDot && <View style={{
        position: "absolute",
        [DOTPOSITION == "left" || DOTPOSITION == "right" ? "top" : "left"]: ((DOTPOSITION == "left" || DOTPOSITION == "right" ? (ITEM_HEIGHT ?? screenHeight) : (ITEM_WIDTH ?? screenWidth)) - ((dataLength * DOTSIZE) + (dataLength - 1) * DOT_SPACING)) / 2,
        [DOTPOSITION]: dotMargin,
        display: "flex",
        flexDirection: DOTPOSITION == "left" || DOTPOSITION == "right" ? "column" : "row",
      }}>
        {
          React.Children.map(children, (_, index) => {
            return <View key={index} style={{
              width: DOTSIZE,
              height: DOTSIZE,
              borderRadius: DOTSIZE,
              backgroundColor: dotType == "dot" && activeIndex === index ? activeDotColor : "#333",
              [
                DOTPOSITION == "left" || DOTPOSITION == "right" ? "marginBottom" : "marginRight"
              ]: DOT_SPACING,
              ...dotStyle
            }} />
          })
        }
        {dotType == "border" && <Animated.View style={
          [{
            width: DOT_INDICATOR_SIZE,
            height: DOT_INDICATOR_SIZE,
            borderRadius: DOT_INDICATOR_SIZE,
            borderWidth: 1,
            borderColor: "#333",
            position: "absolute",
            top: -DOT_SPACING / 2,
            left: -DOT_SPACING / 2,
            ...dotBorderStyle
          },
          {
            transform: [
              dotBorderPostion
            ],
          }
          ]
        } />}
      </View>}
    </View>
  </View>
}

export default Swiper

Swiper.defaultProps = {
  fullScreen: false,
  height: screenHeight,
  width: screenWidth,
  dotStyle: {},
  dotPosition: null,
  dotBorderStyle: {},
  children: null,
  hideDot: false,
  horizontal: true,
  containerStyle: {},
  dotMargin: 20,
  activeDotColor: "gray",
  dotType: "border",
}


