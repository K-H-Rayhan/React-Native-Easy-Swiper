import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Swiper from 'react-native-easy-swiper';

const images = [
  'https://www.beatsbydre.com/content/dam/beats/web/product/headphones/solo3-wireless/pdp/product-carousel/black/pc-solo3-black-thrqtr-left.jpg',
  'https://www.beatsbydre.com/content/dam/beats/web/product/headphones/solo3-wireless/pdp/product-carousel/black/pc-solo3-black-thrqtr-right.jpg',
  'https://www.beatsbydre.com/content/dam/beats/web/product/headphones/solo3-wireless/pdp/product-carousel/black/pc-solo3-black-folded.jpg',
  'https://www.beatsbydre.com/content/dam/beats/web/product/headphones/solo3-wireless/pdp/product-carousel/black/pc-solo3-black-bottom.jpg',
];

export default function App() {
  return (
    <View style={styles.container}>
      <Swiper
        horizontal={false}
        height={350}
        images={images}
        imagesStyles={{
          resizeMode: "contain"
        }}
        dotBorderStyle={{
          borderColor: "#000",
        }}
        dotType='border'
        dotColor='#000'
        activeDashSize={25}
        dotMargin={10}
        animations={[
          "fade",
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
