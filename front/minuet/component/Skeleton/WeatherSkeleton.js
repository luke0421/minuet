import { Skeleton } from "moti/skeleton";
import { Dimensions, View } from "react-native";
import { GlobalColor } from "../../util/colors";
import { useSelector } from "react-redux";
const { width } = Dimensions.get("window");
const WeatherSkeleton = () => {
  const isDark = useSelector((state) => state.darkmode.value);
  return (
    <>
      <View
        style={[
          {
            flexDirection: "row",
            height: 100,
            paddingVertical: 10,
            gap: 10,
            borderBottomWidth: 2,
            marginVertical: 10,
            borderBottomColor: GlobalColor.colors.primary_gray,
            alignItems: "center",
            justifyContent:"center",
          },
        ]}
      >
        <View style={{ gap: 7 }}>
          <Skeleton show width={width - 120} height={40} colorMode={isDark ? "dark" :"light"} />
          <Skeleton show height={20} width={width - 200} colorMode={isDark ? "dark" :"light"} />
        </View>
      </View>
    </>
  );
};

export default WeatherSkeleton;
