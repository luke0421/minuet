import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalColor } from "./colors";
import Animated, { FadeIn, FadeInDown, FadeOut, FadeOutDown } from "react-native-reanimated";

const Header_Black = ({animatedStyles,imgStyle}) => {
  const AnimatedImage = Animated.createAnimatedComponent(Image);
  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.headerbox,animatedStyles]}>
        <AnimatedImage
          source={require("../assets/Logo_white.png")}
          style={[styles.headerImage,imgStyle]}
          resizeMode="contain" // 또는 "cover"를 사용할 수 있습니다.
        />
      </Animated.View >
    </SafeAreaView>
  );
};

export default Header_Black;

const styles = StyleSheet.create({
  safeArea: { flex: 0, backgroundColor: GlobalColor.colors.primary_black },
  headerbox: { height: 80, justifyContent: "center", alignItems: "center" },
  headerImage: { height: 40, resizeMode: "contain" }, // 또는 "cover"
});
