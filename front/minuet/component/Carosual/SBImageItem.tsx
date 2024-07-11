import React from "react";
import type { StyleProp, ViewStyle, ImageSourcePropType } from "react-native";
import { StyleSheet, View, ActivityIndicator, Text, Image } from "react-native";
import Animated from "react-native-reanimated";
// import { Image } from "expo-image";
import { useSelector } from "react-redux";

interface Props {
  style?: StyleProp<ViewStyle>;
  index?: number;
  showIndex?: boolean;
  img?: ImageSourcePropType;
  title?: String;
  img_url?: String;
}

export const SBImageItem: React.FC<Props> = ({
  style,
  index: _index,
  showIndex = true,
  img_url,
  title,
}) => {
  const index = _index ?? 0;
  const isDark = useSelector((state) => state.darkmode.value);
  
  return (
    <View style={[styles.container]}>
      {img_url != null ? (
        <Animated.Image
          sharedTransitionTag={`${img_url}`}
          cachePolicy={"memory-disk"}
          key={index}
          style={styles.image}
          source={{ uri: img_url }}
        />
      ) : (
        <Animated.Image
          cachePolicy={"memory-disk"}
          key={index}
          style={styles.image}
          source={require("../../assets/news_img.jpg")}
        />
      )}

      <Text
        style={{

          color: isDark ? "white" :"black",
          fontSize: 20,
          fontWeight: "bold",
          // backgroundColor: "tra",
          
          width: "100%",
          paddingHorizontal: 20,
          height: 25,
          fontFamily: "GmarketSansTTFLight",
        }}
      >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    position:"relative",
    elevation:10,
  },
  image: {
    width: "100%",
    resizeMode: "cover",
    height: "100%",
    borderRadius:20,
  },
});
