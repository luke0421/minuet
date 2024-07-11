import { useSelector } from "react-redux";
import { GlobalColor } from "../../util/colors";

const { Text, View, Pressable } = require("react-native");

const Tag = ({ data, navigation }) => {
  const isDark = useSelector((state) => state.darkmode.value);
  return (
    <>
      <View
        style={{
          paddingHorizontal: 20,

          backgroundColor: isDark ? GlobalColor.colors.primary_black50 : "white",
          borderRadius: 50,
          paddingVertical: 3,
          borderWidth: isDark? 3:0 ,
          elevation:5,
          borderColor: isDark? "white" : GlobalColor.colors.primary_black,
        }}
      >
        <Pressable
          onPress={() =>
            navigation.navigate("NewsSearch", {
              text:data.word
            })
          }
        >
          <Text
            style={{
              fontFamily: "GmarketSansTTFBold",
              color: isDark? "white" :GlobalColor.colors.primary_black,
              fontSize: 17,
              textAlign: "center",
            }}
          >
            #{data.word}
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default Tag;
