// SBTextItem 컴포넌트 코드
import React from "react";
import { StyleProp, ViewStyle, Text } from "react-native";
import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import { GlobalColor } from "../../util/colors";

interface Props {
  title?: string;
  style?: StyleProp<ViewStyle>;
  index?: number;
  colors?: string; // colors 속성을 추가
}

export const SBTextItem: React.FC<Props> = ({
  title,
  colors,
  style,
  index,
}) => {
  const formatString = (string) => {
    if (string.length > 24) {
      return string.slice(0, 24) + "...";
    } else {
      return string;
    }
  };
  const getColor = (tab) => {
    // 원하는 조건에 따라 동적으로 색상을 반환하는 함수
    if (tab === GlobalColor.colors.primary_red100)
      return GlobalColor.colors.primary_red50;
    if (tab === GlobalColor.colors.primary_yellow)
      return GlobalColor.colors.primary_yellow50;
    if (tab === GlobalColor.colors.primary_green)
      return GlobalColor.colors.primary_green50;
    if (tab === GlobalColor.colors.primary_blue)
      return GlobalColor.colors.primary_blue50;
    if (tab === GlobalColor.colors.primary_purple)
      return GlobalColor.colors.primary_purple50;
    return GlobalColor.colors.primary_gray; // 기본값은 투명으로 설정
  };
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: getColor(colors),
          borderColor: colors,
          position: "relative",
        },
        style,
      ]}
    >
      {typeof index === "number" && (
        <>
          <Text
            style={[
              {
                fontSize: 20,
                opacity: 1,
                lineHeight: 20,
                fontFamily: "GmarketSansTTFMedium",
              },
              {
                color:
                  colors === GlobalColor.colors.primary_yellow
                    ? "black"
                    : "white",
              },
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal:20,
    height: 40,
    lineHeight: 20,
  },
});
