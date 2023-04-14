### Core Props


| Property       | Types        | Defaults | Description                                                     |
| -------------- | ------------ | -------- | --------------------------------------------------------------- |
| `images`       | `array`      | `null`   | Array of strings, each of which represents a URL for an image   |
| `imagesStyles` | `ImageStyle` | `{}`     | Styles for images                                               |
| `children`     | `ReactNode`  | `null`   | Either pass images or children*                                 |
| `horizontal`   | `boolean`    | `true`   | Swiper direction for vertical swiper pass ` horizontal={false}` |
| `animations`   | `array`      | `[]`     | Can pass multiple animations  `scale` `fade`                    |

### Container Props

| Property         | Types       | Defaults       | Description                        |
| ---------------- | ----------- | -------------- | ---------------------------------- |
| `fullScreen`     | `boolean`   | `false`        | Takes full screen width and height |
| `height`         | `number`    | `screenHeight` | Height of container                |
| `width`          | `number`    | `screenWidth`  | Width of container                 |
| `containerStyle` | `ViewStyle` | `{}`           | Other styles for container         |


### Pagination Props

| Property         | Types                            | Defaults                       | Description                                                                     |
| ---------------- | -------------------------------- | ------------------------------ | ------------------------------------------------------------------------------- |
| `hideDot`        | `boolean`                        | `false`                        | Hides pagination                                                                |
| `dotType`        | `dot`  `border` `dashed`         | `dashed`                       | Pagination style                                                                |
| `dotColor`       | `string`                         | `lightgray`                    | Dot color                                                                       |
| `dotPosition`    | `left`  `right`  `top`  `bottom` | horizontal ? `bottom` : `left` | Postion of dot around container                                                 |
| `dotStyle`       | `ViewStyle`                      | `null`                         | Styles for dots                                                                 |
| `dotMargin`      | `number`                         | `20`                           | Distance from container depending on `dotPosition`                              |
| `dotSpacing`     | `number`                         | `8`                            | Gap between dots                                                                |
| `activeDotColor` | `string`                         | `black`                        | Active dot color                                                                |
| `dotBorderStyle` | `ViewStyle`                      | `{}`                           | Default  `borderWidth: 1` and `borderColor: "#1d1d1d"` for  `dotType: "border"` |
| `activeDashSize` | `number`                         | `32`                           | Length of dash for `dotType: "dashed"`                                          |
