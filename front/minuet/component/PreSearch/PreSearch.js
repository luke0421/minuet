import { GlobalColor } from "../../util/colors";

const { Text, View, Pressable } = require("react-native");

const PreSearch = ({ data, navigation }) => {

  //console.log(data)
  
  return (
    <>
      <View
        style={{
          paddingHorizontal: 20,
          backgroundColor: GlobalColor.colors.primary_black50,
          borderRadius: 50,
          paddingVertical: 3,
          borderWidth: 3,
          borderColor: "white",
        }}
      >
        <Pressable
          onPress={() =>
            navigation.navigate("NewsSearch", {
              text:data
            })
          }
        >
          <Text
            style={{
              fontFamily: "GmarketSansTTFBold",
              color: "white",
              fontSize: 17,
              textAlign: "center",
            }}
          >
            #{data}
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default PreSearch;
