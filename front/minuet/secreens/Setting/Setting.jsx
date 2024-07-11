import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import {
  Ionicons,
  Fontisto,
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Header_Black from "../../util/Header_Black";
import Header_White from "../../util/Header_White";
import SettingInfo from "./SettingInfo";
import MyScrap from "../../component/Setting/MyScrap";
import Connect from "../../component/Setting/Connect";
import Brief from "../../component/Setting/Brief";
import { GlobalColor } from "../../util/colors";
import axios from "axios";

const Setting = ({ navigation }) => {
  // 스크랩 관련
  // selectTag= 0: 브리핑, 1: 스크랩
  const isDark = useSelector((state) => state.darkmode.value);
  const [isSelectedTag, setIsSelectedTag] = useState(0);

  // const news_data = useSelector((state) => state.news);
  const user = useSelector((state) => state.userInfo);
  const memberId = user.value.memberId;
  const [news, setNews] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalScrap, setTotalScrap] = useState(null);
  const [totalBrief, setTotalBrief] = useState(null);
  // console.log(totalScrap);

  // 하위 컴포넌트에서 값 받아오기
  const onChangeTotalScrap = (newValue) => {
    setTotalScrap(newValue);
  };
  const onChangeTotalBrief = (newValue) => {
    setTotalBrief(newValue);
  };

  useEffect(() => {
    updateNum();
  }, []);

  const updateNum = async () => {
    setLoading(true);
    try {
      const res1 = await axios.get(
        `https://j10e205.p.ssafy.io/bookmark/list/${memberId}/0`
      );
      const res2 = await axios.get(
        `https://j10e205.p.ssafy.io/briefing/list/${memberId}`
      );
      setTotalScrap(res1.data.totalLength);
      setTotalBrief(res2.data.length);
      console.log("scrap", totalScrap);
      console.log("brief", totalBrief);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  // 브리핑 관련
  const [isConnected, setIsConnected] = useState(true);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? GlobalColor.colors.primary_black : "white",
        },
      ]}
    >
      {isDark ? <Header_White /> : <Header_Black />}
      <View style={styles.profile}>
        <View style={styles.profileTitle}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text
              style={[
                styles.textBold,
                {
                  color: isDark ? "white" : GlobalColor.colors.primary_black,
                },
              ]}
            >
              {user.value.name}
            </Text>
          </View>
          <View style={{ alignItems: "center", flex: 2 }}>
            <Text
              style={[
                styles.textMedium,
                { color: isDark ? "white" : GlobalColor.colors.primary_black },
              ]}
            >
              {loading ? (
                <ActivityIndicator
                  color={isDark ? "white" : GlobalColor.colors.primary_black}
                />
              ) : (
                totalScrap
              )}
            </Text>
            <Text
              style={[
                styles.textMedium,
                { color: isDark ? "white" : GlobalColor.colors.primary_black },
              ]}
            >
              스크랩
            </Text>
          </View>
          <View style={{ alignItems: "center", flex: 2 }}>
            <Text
              style={[
                styles.textMedium,
                { color: isDark ? "white" : GlobalColor.colors.primary_black },
              ]}
            >
              {loading ? (
                <ActivityIndicator
                  color={isDark ? "white" : GlobalColor.colors.primary_black}
                />
              ) : (
                totalBrief
              )}
            </Text>
            <Text
              style={[
                styles.textMedium,
                { color: isDark ? "white" : GlobalColor.colors.primary_black },
              ]}
            >
              알람
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("SettingInfo")}
            style={{ flex: 1 }}
          >
            <MaterialIcons
              name={"manage-accounts"}
              style={{
                fontSize: 44,
                color: isDark ? "white" : GlobalColor.colors.primary_black,
                textAlign: "center",
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          styles.tag,
          { borderColor: isDark ? "white" : GlobalColor.colors.primary_black },
        ]}
      >
        {/* tag = { 0: 스크랩, 1: 연결, 2: 알림 } */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={
            isSelectedTag === 0
              ? [
                  styles.selectedTag,
                  {
                    borderColor: isDark
                      ? "white"
                      : GlobalColor.colors.primary_blue50,
                  },
                ]
              : styles.noneTag
          }
          onPress={() => {
            setIsSelectedTag(0);
            setModalVisible(false);
          }}
        >
          <Entypo
            name={"news"}
            style={[
              styles.textBold,
              { color: isDark ? "white" : GlobalColor.colors.primary_black },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={
            isSelectedTag === 1
              ? [
                  styles.selectedTag,
                  {
                    borderColor: isDark
                      ? "white"
                      : GlobalColor.colors.primary_blue50,
                  },
                ]
              : styles.noneTag
          }
          onPress={() => {
            setIsSelectedTag(1);
            setModalVisible(false);
          }}
        >
          <MaterialCommunityIcons
            name={"transit-connection-variant"}
            style={[
              styles.textBold,
              { color: isDark ? "white" : GlobalColor.colors.primary_black },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={
            isSelectedTag === 2
              ? [
                  styles.selectedTag,
                  {
                    borderColor: isDark
                      ? "white"
                      : GlobalColor.colors.primary_blue50,
                  },
                ]
              : styles.noneTag
          }
          onPress={() => {
            setIsSelectedTag(2);
            setModalVisible(false);
          }}
        >
          <Ionicons
            name={"alarm-outline"}
            style={[
              styles.textBold,
              { color: isDark ? "white" : GlobalColor.colors.primary_black },
            ]}
          />
        </TouchableOpacity>
      </View>
      {/* <Animated.Veiw style={styles.selectedTag}/> */}
      <View style={styles.main}>
        {isSelectedTag === 0 ? (
          <MyScrap
            onChangeTotalScrap={onChangeTotalScrap}
            memberId={memberId}
          />
        ) : null}
        {isSelectedTag === 1 ? <Connect /> : null}
        {isSelectedTag === 2 ? (
          <Brief onChangeTotalBrief={onChangeTotalBrief} memberId={memberId} />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    // height:70,
  },
  profileTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },
  profileMain: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginHorizontal: 20,
  },
  textBold: {
    fontSize: 32,
    textAlign: "center",
    fontFamily: "GmarketSansTTFBold",
  },
  textMedium: {
    fontSize: 20,
    fontFamily: "GmarketSansTTFMedium",
  },
  text: {
    fontSize: 14,
    fontFamily: "GmarketSansTTFLight",
  },
  tag: {
    flex: 1,
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "white",
    borderStyle: "dashed",
  },
  selectedTag: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 10,
    borderColor: "white",
  },
  noneTag: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    padding: 10,
    flex: 7,
    alignItems: "center",
    marginBottom: 80,
  },
});

export default Setting;
