import { Dimensions, Text, View } from "react-native";
import { Skeleton } from "moti/skeleton";
import { GlobalColor } from "../../util/colors";
import { useSelector } from "react-redux";
const { width } = Dimensions.get("window");
const NewsSkeleton = () => {
  const isDark = useSelector((state) => state.darkmode.value);
  return (
    <>
      <View
        style={[
          {
            paddingVertical: 10,
            gap: 10,
            borderBottomWidth: 2,
            marginVertical: 10,
            borderBottomColor: GlobalColor.colors.primary_gray,
            alignItems: "center",
          },
        ]}
      >
        <View
          style={[
            {
              flexDirection: "row",
              // height: 150,
              gap: 10,
              alignItems: "center",
            },
          ]}
        >
          <Skeleton
            show
            height={80}
            width={80}
            colorMode={isDark ? "dark" : "light"}
          />
          <View style={{ gap: 7 }}>
            <Skeleton
              show
              width={width - 130}
              height={40}
              colorMode={isDark ? "dark" : "light"}
            />
            <Skeleton
              show
              height={20}
              width={width - 210}
              colorMode={isDark ? "dark" : "light"}
            />
          </View>
        </View>
        <View style={{ padding: 10, margin: 20 , flexDirection:"row" ,gap:10}}>
          <Skeleton
            show
            height={40}
            width={(width - 100) / 3}
            colorMode={isDark ? "dark" : "light"}
          />
          <Skeleton
            show
            height={40}
            width={(width - 100) / 3}
            colorMode={isDark ? "dark" : "light"}
          />
          <Skeleton
            show
            height={40}
            width={(width - 100) / 3}
            colorMode={isDark ? "dark" : "light"}
          />
        </View>
      </View>
    </>
  );
};
export default NewsSkeleton;
