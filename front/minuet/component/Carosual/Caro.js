import * as React from "react";
import { Dimensions, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SBImageItem } from "./SBImageItem";

function Caro({ data }) {
  const width = Dimensions.get("window").width;
  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop={true}
        width={width}
        height={width / 1.3}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={1000}
        renderItem={({ index, item }) => (
          <SBImageItem
            index={index}
            title={item.title}
            img_url={item.img_url}
          />
        )}
      />
    </View>
  );
}

export default Caro;
