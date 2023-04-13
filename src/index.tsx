import * as React from 'react';
import type { ViewStyle } from 'react-native';
import { ImageStyle } from 'react-native';
import { View, Dimensions, Animated, Image } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

type Props = {
  images?: any[],
  imagesStyles?: ImageStyle,
  children?: React.ReactNode,
  horizontal?: boolean,
  fullScreen?: boolean,
  height?: number,
  width?: number,
  containerStyle?: ViewStyle
  hideDot?: boolean,
  dotType?: "dot" | "border",
  dotStyle?: ViewStyle,
  dotPosition?: "left" | "right" | "top" | "bottom",
  dotMargin?: number,
  activeDotColor?: string,
  dotBorderStyle?: ViewStyle,
  dotSpacing?: number,
}

const Swiper = (
  {
    images,
    imagesStyles,
    children,
    horizontal,
    fullScreen,
    height,
    width,
    containerStyle,
    hideDot,
    dotType,
    dotStyle,
    dotPosition,
    dotMargin,
    activeDotColor,
    dotBorderStyle,
    dotSpacing,
  }: Props) => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const contents: any = images ? images : React.Children.map(children, (child) => child)
  const scrollPos = React.useRef(new Animated.Value(0)).current
  const ITEM_WIDTH = fullScreen ? screenWidth : width && width > screenWidth ? screenWidth : width;
  const ITEM_HEIGHT = fullScreen ? screenHeight : height && height > screenHeight ? screenHeight : height;
  const axis = horizontal ? "x" : "y"
  const dataLength = images ? images.length : React.Children.count(children)
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
      {/* Main Slider */}
      <Animated.FlatList
        data={contents}
        bounces={false}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        snapToInterval={horizontal ? ITEM_WIDTH : ITEM_HEIGHT}
        decelerationRate="fast"
        onScroll={({ nativeEvent: { contentOffset: { [axis]: pos }, contentSize: {
          [horizontal ? "width" : "height"]: size
        } } }) => {
          if (activeDotColor && dotType == 'dot') {
            let value = pos / (size / contents.length)
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
        }}>

          {images ? <Image source={{ uri: item }} style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            ...imagesStyles
          }} /> : item}

        </View>}
      />
      {/* Main Slider Ends */}

      {/* Dot Cutomization */}
      {!hideDot && <View style={{
        position: "absolute",
        [DOTPOSITION == "left" || DOTPOSITION == "right" ? "top" : "left"]: ((DOTPOSITION == "left" || DOTPOSITION == "right" ? (ITEM_HEIGHT ?? screenHeight) : (ITEM_WIDTH ?? screenWidth)) - ((dataLength * DOTSIZE) + (dataLength - 1) * DOT_SPACING)) / 2,
        [DOTPOSITION]: dotMargin,
        display: "flex",
        flexDirection: DOTPOSITION == "left" || DOTPOSITION == "right" ? "column" : "row",
      }}>
        {
          contents?.map((_: string | React.ReactNode, index: number) => {
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
          }]
        } />}
      </View>}
      {/* Dot Cutomization Ends */}
    </View>
  </View>
}

export default Swiper

Swiper.defaultProps = {
  images: null,
  imagesStyles: {},
  children: null,
  horizontal: true,
  fullScreen: false,
  height: screenHeight,
  width: screenWidth,
  containerStyle: {},
  hideDot: false,
  dotType: "border",
  dotStyle: {},
  dotPosition: null,
  dotMargin: 20,
  activeDotColor: "gray",
  dotBorderStyle: {},
  dotSpacing: 8,
}


