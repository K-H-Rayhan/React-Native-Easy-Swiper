import * as React from 'react';
import { Pressable, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Swiper from "react-native-easy-swiper"

const images = [
  "https://www.beatsbydre.com/content/dam/beats/web/product/headphones/solo3-wireless/pdp/product-carousel/black/pc-solo3-black-thrqtr-left.jpg",
  "https://www.beatsbydre.com/content/dam/beats/web/product/headphones/solo3-wireless/pdp/product-carousel/black/pc-solo3-black-thrqtr-right.jpg",
  "https://www.beatsbydre.com/content/dam/beats/web/product/headphones/solo3-wireless/pdp/product-carousel/black/pc-solo3-black-folded.jpg",
  "https://www.beatsbydre.com/content/dam/beats/web/product/headphones/solo3-wireless/pdp/product-carousel/black/pc-solo3-black-bottom.jpg",
];

const spacing = 15

export default function App() {
  const [selectedColor, setSelectedColor] = React.useState(ColorNames[0]);
  return (
    <SafeAreaView style={{
      flex: 1,
    }}>
      <StatusBar barStyle="dark-content" />
      <Swiper
        horizontal={false}
        height={350}
        images={images}
        dotStyle={{
          width: 4,
          height: 8
        }}
        dotSpacing={5}
        imagesStyles={
          {
            resizeMode: "contain"
          }
        }
        dotColor='#CCCCCC'
        activeDashSize={25}
        animations={[
          // "fade",
          "scale"
        ]}
        dotPosition='right'
      />
      <View style={{
        padding: 20,
        position: "relative",
      }}>
        <View style={{
          backgroundColor: "#1d1d1d",
          position: "absolute",
          top: -15,
          left: 20,
          paddingHorizontal: 20,
          paddingVertical: 7,
          borderRadius: 30,
        }}>
          <Text style={{
            color: "#fff",
            fontSize: 13,
          }}>In Stock</Text>
        </View>
        <View style={{
          flexDirection: "row",
          marginTop: spacing,
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <View style={{
            justifyContent: "center",
          }}>
            <Text style={{
              fontSize: 24,
              fontWeight: "900",
            }}>
              Beats Solo Wireless
            </Text>
            <Text style={{
              fontSize: 12,
              fontWeight: "500",
            }}>
              True Wireless On-Ear Headphones
            </Text>
          </View>
          <TouchableOpacity style={{
            backgroundColor: "#e0e0e0",
            width: 40,
            height: 40,
            borderRadius: 40,
            justifyContent: "center",
            alignItems: "center",
          }}>
            <AntDesign name="hearto" size={16} color="#6f6f6f" />
          </TouchableOpacity>
        </View>
        {/* Price */}
        <Text style={{
          fontSize: 12,
          fontWeight: "500",
          textDecorationLine: "line-through",
          color: "#ccc",
          marginTop: 5,
        }}>
          $349.95
        </Text>
        <Text style={{
          fontSize: 17,
          fontWeight: "700",
        }}>
          $299.95
        </Text>
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: spacing,
        }}>
          <Text style={{
            fontSize: 13,
          }}>Color: </Text>
          <Text style={{
            fontWeight: "700",
            fontSize: 13,
          }}>{selectedColor?.name}</Text>
        </View>
        <View style={{
          flexDirection: "row",
          marginTop: spacing,
        }}>
          {
            ColorNames?.map(e => (
              <Pressable key={e.name} onPress={() => setSelectedColor(e)} style={{
                width: 38,
                height: 38,
                borderRadius: 38,
                // backgroundColor: selectedDate == date ? Colors.primary : "white",
                shadowOffset: { width: 0, height: 0 },
                shadowColor: e.color,
                shadowOpacity: selectedColor?.name == e.name ? 1 : 0,
                shadowRadius: 2,
                elevation: 5,
                backgroundColor: "white",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
              }}>
                <View style={{
                  width: 35,
                  height: 35,
                  borderRadius: 35,
                  backgroundColor: e.color,
                }} />
              </Pressable>
            ))
          }
        </View>
        <TouchableOpacity>
          <View style={{
            backgroundColor: "#161616",
            paddingVertical: 15,
            paddingHorizontal: 20,
            borderRadius: 30,
            marginTop: spacing,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Text style={{
              color: "#fff",
              fontSize: 13,
              textAlign: "center"
            }}>ADD TO CART
            </Text>
            <AntDesign name="apple1" size={13}
              style={{
                marginLeft: 5,
              }}
              color="#fff" />
          </View>
        </TouchableOpacity>
        <Text style={{
          fontSize: 16,
          fontWeight: "700",
          marginTop: spacing,
        }}>
          Description
        </Text>
        <Text style={{
          fontSize: 13,
          fontWeight: "400",
          marginTop: spacing - 10,
        }}>
          Beats Solo Wireless headphones deliver a premium listening experience with Pure Adaptive Noise Canceling (Pure ANC) to actively block external noise, and real-time audio calibration to preserve clarity, range, and emotion.Three soft silicone eartip options make it easy to find the right size.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const ColorNames = [
  {
    name: "Matte Black",
    color: "#232325"
  },
  {
    name: "Rose Gold",
    color: "#CB9995"
  },

  {
    name: "Citrus Red",
    color: "#CE2617"
  },
]
