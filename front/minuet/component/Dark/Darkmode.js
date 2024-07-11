import { Button, Text, View, TouchableOpacity } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { setdarkmode } from "../../store/darkmodeSlice";
import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

export default Darkmode = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.darkmode);
  const [darkmode, setDarkmode] = useState("");

  useEffect(() => {
    setDarkmode(isDark.value);
  }, [isDark]);
  // console.log(darkmode);
  // isDark를 사용하여 렌더링 로직 작성
  return (
    <View>
      {darkmode ? (
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => dispatch(setdarkmode())}
        >
          <FontAwesome name={"moon-o"} size={30} color={"white"} />
          <FontAwesome name={"toggle-on"} size={30} color={"white"} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => dispatch(setdarkmode())}
        >
          <FontAwesome name={"sun-o"} size={30} />
          <FontAwesome name={"toggle-off"} size={30} />
        </TouchableOpacity>
      )}
      {/* <Text>{darkmode ? "다크 모드입니다." : "라이트 모드입니다."}</Text> */}
      {/* <Button onPress={() => dispatch(setdarkmode())} title="change" /> */}
    </View>
  );
};
