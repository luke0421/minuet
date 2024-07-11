import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { Fontisto } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GlobalColor } from "../../util/colors";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import WeatherSkeleton from "../Skeleton/WeatherSkeleton";
import { Skeleton } from "moti/skeleton";
import { useDispatch, useSelector } from "react-redux";
import { setuserposition } from "../../store/userpositionSlice";
const SCREEN_WIDTH = Dimensions.get("window").width;
const API_KEY = "4a9ae5b499253790fbe145a039b9600b";
const icons = {
  Clear: require("../../assets/Clear.png"),
  Clouds:require("../../assets/Clouds.png"),
  Rain: require("../../assets/Rain.png"),
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Drizzle: "day-rain",
  Thunderstorm: "lightning",
};

const backs = {
  Clear: "red",
  Clouds: GlobalColor.colors.primary_yellow,
  Rain: GlobalColor.colors.primary_blue,
  Atmosphere: "red",
  Snow: "green",
  Drizzle: "purple",
  Thunderstorm: "yellow",
};

export default function Weather() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.darkmode.value);
  useEffect(() => {
    const getWeather = async () => {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        setOk(false);
      }
      const {
        coords: { longitude, latitude },
      } = await Location.getCurrentPositionAsync({ accuracy: 6 });
      const location = await Location.reverseGeocodeAsync(
        { latitude, longitude },
        { useGoogleMaps: false }
      );
      // console.log(location[0]);
      if (location[0].city == null) {
        setCity(location[0].region);

      } else {
        setCity(location[0].city);
      }
      dispatch(setuserposition(location[0].region))
      const { list } = await (
        await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        )
      ).json();
      const filteredList = list.filter(({ dt_txt }) =>
        dt_txt.endsWith("00:00:00")
      );
      setDays(filteredList);
    };

    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        {days.length === 0 ? (
          <Skeleton
            show
            height={30}
            width={100}
            colorMode={isDark ? "dark" : "light"}
          />
        ) : (
          <Text
            style={[
              styles.cityName,
              { color: isDark ? "white" : GlobalColor.colors.primary_black },
            ]}
          >
            {city}
          </Text>
        )}
      </View>

      {days.length === 0 ? (
        <WeatherSkeleton />
      ) : (
        <AutoScrollScrollView days={days} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 20, },
  city: {
    flex: 0.5,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "flex-end",
    fontFamily: "GmarketSansTTFLight",
    marginHorizontal: 50,

  },
  cityName: {
    fontSize: 24,
    fontWeight: 700,
    fontFamily: "GmarketSansTTFLight",
  },
  weather: { color: "white" },
  day: {
    width: SCREEN_WIDTH,

    alignItems: "flex-start",
    paddingHorizontal: 50,
    justifyContent: "center",
    color: "white",

  },
  temp: {
    fontWeight: "900",
    fontSize: 30,
    fontFamily: "GmarketSansTTFLight",
 
  },
  descriptions: {
    fontSize: 25,
    fontWeight: "300",
    fontFamily: "GmarketSansTTFLight",

  },
  tiny: {
    fontFamily: "GmarketSansTTFLight",
    fontSize: 24,
    fontWeight: 600,
  },
});
const AutoScrollScrollView = ({ days }) => {
  const scrollViewRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = days.length;
  const isDark = useSelector((state) => state.darkmode.value);
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
      scrollViewRef.current.scrollTo({
        animated: true,
        x: currentPage * SCREEN_WIDTH, // Assuming SCREEN_WIDTH is defined elsewhere
        y: 0,
      });
    }, 3000); // Change 3000 to the desired interval in milliseconds

    return () => clearInterval(scrollInterval);
  }, [currentPage, totalPages]);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}

    >
      {days.map((day, index) => (
        <Animated.View
          entering={FadeInDown.duration(500).delay(400)}
          exiting={FadeOutDown}
          key={index}
          style={[styles.day, {}]}
        >
          <Text style={[styles.tiny, { color: isDark ? "white" : "black" }]}>
            {formatDate(day.dt_txt)}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
              width: "100%",
            }}
          >
            <View style={{ flexDirection: "row", gap:10,justifyContent: "center", alignItems: "center" }}>
              <Text style={[styles.temp,{color :isDark ? "white" :"black"}]}>{day.main.temp.toFixed(1)}℃</Text>
              <Text style={[styles.descriptions,{color : isDark? "white" :"black"}]}>{day.weather[0].main}</Text>
            </View>
            {/* <Fontisto
              name={icons[day.weather[0].main]}
              size={60}
              color={backs[day.weather[0].main]}
            /> */}
            <Image source={icons[day.weather[0].main]} state={{width:50 ,height:50}} />
          </View>

          {/* <View
            style={{
              width: SCREEN_WIDTH - 100,
              marginTop: 20,
            }}
          ></View> */}
        </Animated.View>
      ))}
    </ScrollView>
  );
};
