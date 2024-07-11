import React from "react";
import { type StyleProp, type ViewStyle, type ViewProps, type ImageSourcePropType, TouchableOpacity } from "react-native";
import { LongPressGestureHandler } from "react-native-gesture-handler";
import type { AnimateProps } from "react-native-reanimated";
import Animated from "react-native-reanimated";

import Constants from "expo-constants";

import { SBImageItem } from "./SBImageItem";
import { SBTextItem } from "./SBTextItem";

interface Props extends AnimateProps<ViewProps> {
  img_url?: string
  title?: string
  style?: StyleProp<ViewStyle>
  index?: number
  pretty?: boolean
  showIndex?: boolean
  img?: ImageSourcePropType
  handleNewsCardClick?: (index: number) => void;
}

export const SBItem: React.FC<Props> = (props) => {
  const { handleNewsCardClick, style, showIndex = true, img_url, title, index, pretty, img, testID, ...animatedViewProps } = props;
  const enablePretty = Constants?.expoConfig?.extra?.enablePretty || false;
  const [isPretty, setIsPretty] = React.useState(pretty || enablePretty);
  // console.log(index)
  return (
    <LongPressGestureHandler
      onActivated={() => {
        setIsPretty(!isPretty);
      }}
    >
      <TouchableOpacity style={{flex:1}} onPress={()=>handleNewsCardClick(index)} activeOpacity={0.5}>
        <Animated.View testID={testID} style={{ flex: 1 }} {...animatedViewProps}>
          <SBImageItem style={style} title={title} index={index} showIndex={typeof index === "number" && showIndex} img_url={img_url} />
        </Animated.View>
      </TouchableOpacity>
    </LongPressGestureHandler>
  );
};