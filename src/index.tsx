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
  dotType?: "dot" | "border" | "dashed",
  dotStyle?: ViewStyle,
  dotPosition?: "left" | "right" | "top" | "bottom",
  dotMargin?: number,
  activeDotColor?: string,
  dotBorderStyle?: ViewStyle,
  dotSpacing?: number,
  dotColor?: string,
  activeDashSize?: number,
  animations?: ("fade" | "scale")[],
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
    dotColor,
    activeDashSize,
    animations,
  }: Props) => {
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

  const getInputRange = (index: number) => {
    const heightOrWidth = horizontal ? ITEM_WIDTH ?? screenWidth : ITEM_HEIGHT ?? screenHeight
    return [
      heightOrWidth * (index - 1),
      heightOrWidth * index,
      heightOrWidth * (index + 1),
    ]
  }


  return <View>
    <View style={
      {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
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
        onScroll={({ nativeEvent: { contentOffset: { [axis]: pos },
        } }) => {
          scrollPos.setValue(pos);
        }
        }
        keyExtractor={(_, key) => key.toString()}
        renderItem={({ item, index }) => {
          const inputRange = getInputRange(index)
          let opacity = null
          let scale = null
          if (animations?.includes("fade")) {
            opacity = scrollPos.interpolate({
              inputRange: inputRange,
              outputRange: [0, 1, 0],
            });
          }
          if (animations?.includes("scale")) {
            scale = scrollPos.interpolate({
              inputRange: inputRange,
              outputRange: [0, 1, 0],
            });
          }

          return <Animated.View style={{
            width: ITEM_WIDTH,
            height: ITEM_HEIGHT,
            ...(opacity ? { opacity } : {}),
            ...(scale ? { transform: [{ scale }] } : {}),
          }}
          >

            {images ? <Image source={{ uri: item }} style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
              ...imagesStyles
            }} /> : item}

          </Animated.View>
        }}
      />
      {/* Main Slider Ends */}

      {/* Dot Cutomization */}
      {!hideDot && <View style={{
        position: "absolute",
        [DOTPOSITION == "left" || DOTPOSITION == "right" ? "top" : "left"]: ((DOTPOSITION == "left" || DOTPOSITION == "right" ? (ITEM_HEIGHT ?? screenHeight) : (ITEM_WIDTH ?? screenWidth)) - (((dataLength * DOTSIZE) + (dataLength - 1) * DOT_SPACING) + (dotType == "dashed" ? activeDashSize ?? 32 : 0))) / 2,
        [DOTPOSITION]: dotMargin,
        display: "flex",
        flexDirection: DOTPOSITION == "left" || DOTPOSITION == "right" ? "column" : "row",
      }}>
        {
          contents?.map((_: string | React.ReactNode, index: number) => {
            const heightOrWidthSize = dotType == "dashed" ? (dotStyle?.height ? Number(dotStyle.height) : DOTSIZE) : DOTSIZE
            const inputRange = getInputRange(index)

            const size = scrollPos.interpolate({
              inputRange: inputRange,
              outputRange: [heightOrWidthSize, activeDashSize ?? 32, heightOrWidthSize],
              extrapolate: "clamp",
            });

            const color = scrollPos.interpolate({
              inputRange: inputRange,
              outputRange: [dotColor ?? "#1d1d1d", activeDotColor ?? "lightgray", dotColor ?? "#1d1d1d"],
              extrapolate: "clamp",
            });

            return <Animated.View key={index} style={{
              borderRadius: DOTSIZE,
              [
                DOTPOSITION == "left" || DOTPOSITION == "right" ? "marginBottom" : "marginRight"
              ]: DOT_SPACING,
              ...dotStyle,
              height: (DOTPOSITION == "left" || DOTPOSITION == "right") && dotType == "dashed" ? size : DOTSIZE,
              width: (DOTPOSITION == "top" || DOTPOSITION == "bottom") && dotType == "dashed" ? size : DOTSIZE,
              backgroundColor: color,
            }} />
          })
        }
        {dotType == "border" && <Animated.View style={
          [{
            width: DOT_INDICATOR_SIZE,
            height: DOT_INDICATOR_SIZE,
            borderRadius: DOT_INDICATOR_SIZE,
            borderWidth: 1,
            borderColor: "#1d1d1d",
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
  </View >
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
  dotType: "dashed",
  dotStyle: {},
  dotPosition: null,
  dotMargin: 20,
  activeDotColor: "black",
  dotBorderStyle: {},
  dotSpacing: 8,
  dotColor: "lightgray",
  activeDashSize: 32,
  animations: []
}


