import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import WheelPicker from "react-native-wheely";
import { GlobalColor } from "../../util/colors";
import axios from "axios";
import { useSelector } from "react-redux";

const Brief = ({ onChangeTotalBrief, memberId }) => {
  const isDark = useSelector((state) => state.darkmode.value);
  const [briefs, setBriefs] = useState([]);
  const [totalLength, setTotalLength] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedBrief, setSelectedBrief] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [briefTimeType, setBriefTimeType] = useState(0);
  const [briefTimeHour, setBriefTimeHour] = useState(0);
  const [briefTimeMin10, setBriefTimeMin10] = useState(0);
  const [briefTimeMin01, setBriefTimeMin01] = useState(0);
  const [briefCategory, setBriefCategory] = useState("SCIENCE");
  // const categories = ["경제", "사회", "생활/문화", "세계", "IT/과학"];
  const categories = {
    ECONOMIC: "경제",
    SOCIAL: "사회",
    LIFE: "생활/문화",
    WORLD: "세계",
    SCIENCE: "IT/과학",
  };
  const wheelType = ["오전", "오후"];
  const wheelHour = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const wheelMin10 = [0, 1, 2, 3, 4, 5];
  const wheelMin01 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  // 브리핑 처음 불러오기
  useEffect(() => {
    updateBrief();
  }, []);

  // 화면 refresh

  useEffect(() => {
    if (totalLength === 0) {
      onChangeTotalBrief("0");
    } else if (totalLength === null) {
      onChangeTotalBrief(null);
    } else {
      onChangeTotalBrief(totalLength.toString());
    }
  }, [totalLength]);

  const updateBrief = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://j10e205.p.ssafy.io/briefing/list/${memberId}`
      );
      // console.log(res.data);
      setBriefs(res.data);
      setTotalLength(res.data.length);
      setLoading(false);
      handleReset();
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenModal = (brief = null, index = null) => {
    setSelectedBrief(brief);
    setSelectedIndex(index);
    if (brief) {
      setBriefCategory(brief.category);
      const timeString = brief.time;
      const [hour, minute] = timeString.split(":");
      if (hour >= 12) {
        setBriefTimeType(1);
        setBriefTimeHour(hour - 12);
      } else {
        setBriefTimeType(0);
        setBriefTimeHour(hour);
      }
      setBriefTimeMin10(Math.floor(minute / 10));
      setBriefTimeMin01(minute % 10);
    } else {
      handleReset();
    }
  };

  const handleReset = () => {
    setSelectedBrief(null);
    setSelectedIndex(null);
    setBriefTimeType(0);
    setBriefTimeHour(0);
    setBriefTimeMin10(0);
    setBriefTimeMin01(0);
    setBriefCategory("SCIENCE");
  };

  const handleCreateBrief = async () => {
    const newBrief = {
      category: briefCategory,
      time:
        briefTimeType * 12 + briefTimeHour < 10
          ? `0${briefTimeHour}:${briefTimeMin10}${briefTimeMin01}:00`
          : `${
              briefTimeType * 12 + briefTimeHour
            }:${briefTimeMin10}${briefTimeMin01}:00`,
      memberId: memberId,
      state: true,
    };
    try {
      const res = await axios.post(
        `https://j10e205.p.ssafy.io/briefing`,
        newBrief
      );
    } catch (err) {
      console.error(err);
    }
    updateBrief();
    handleReset();
  };

  const handleModifyBrief = async (brief, index) => {
    const newBrief = {
      category: briefCategory,
      time:
        briefTimeType * 12 + briefTimeHour < 10
          ? `0${briefTimeHour}:${briefTimeMin10}${briefTimeMin01}:00`
          : `${
              briefTimeType * 12 + briefTimeHour
            }:${briefTimeMin10}${briefTimeMin01}:00`,
      briefingId: brief.id,
    };
    try {
      const res = await axios.put(
        `https://j10e205.p.ssafy.io/briefing`,
        newBrief
      );
    } catch (err) {
      console.error(err);
    }
    updateBrief();
    handleReset();
  };

  const handleDeleteBrief = async (brief, index) => {
    try {
      const res = await axios.delete(
        `https://j10e205.p.ssafy.io/briefing/${brief.id}`
      );
      const updatedBriefs = briefs.filter((item, idx) => idx !== index);
      setBriefs(updatedBriefs);
      setTotalLength(totalLength - 1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBriefOnOff = async (brief) => {
    try {
      const res = await axios.put(`https://j10e205.p.ssafy.io/briefing/onoff`, {
        briefingId: brief.id,
      });
    } catch (err) {
      console.error(err);
    }
    updateBrief();
  };

  const categoryColor = (categoryName) => {
    switch (categoryName) {
      case "ECONOMIC":
        return GlobalColor.colors.primary_red100;
      case "SOCIAL":
        return GlobalColor.colors.primary_yellow;
      case "LIFE":
        return GlobalColor.colors.primary_green;
      case "WORLD":
        return GlobalColor.colors.primary_blue;
      case "SCIENCE":
        return GlobalColor.colors.primary_purple;
      default:
        return GlobalColor.colors.primary_black;
    }
  };

  return (
    <>
      <View
        style={[
          styles.briefingInfo,
          !isDark && { shadowColor: "black", elevation: 5 },
        ]}
      >
        <View style={styles.briefingInfoTime}>
          <Text></Text>
          <View style={{ flexDirection: "row" }}>
            <WheelPicker
              selectedIndex={briefTimeType}
              options={wheelType}
              onChange={(index) => setBriefTimeType(index)}
              visibleRest={1}
              // itemHeight={30}
              itemTextStyle={styles.textMedium}
              containerStyle={{
                backgroundColor: "rgba(0,0,0,0.1)",
                height: "100%",
              }}
            />
            <WheelPicker
              selectedIndex={briefTimeHour}
              options={wheelHour}
              onChange={(index) => setBriefTimeHour(index)}
              visibleRest={1}
              // itemHeight={30}
              itemTextStyle={styles.textMedium}
              containerStyle={{
                backgroundColor: "rgba(0,0,0,0.1)",
                height: "100%",
              }}
            />
          </View>
          <Text style={styles.briefingInfoTimeText}>:</Text>
          <View style={{ flexDirection: "row" }}>
            <WheelPicker
              selectedIndex={briefTimeMin10}
              options={wheelMin10}
              onChange={(index) => setBriefTimeMin10(index)}
              visibleRest={1}
              // itemHeight={30}
              itemTextStyle={styles.textMedium}
              containerStyle={{
                backgroundColor: "rgba(0,0,0,0.1)",
                height: "100%",
              }}
            />
            <WheelPicker
              selectedIndex={briefTimeMin01}
              options={wheelMin01}
              onChange={(index) => setBriefTimeMin01(index)}
              visibleRest={1}
              // itemHeight={30}
              itemTextStyle={styles.textMedium}
              containerStyle={{
                backgroundColor: "rgba(0,0,0,0.1)",
                height: "100%",
              }}
            />
          </View>
          <Text></Text>
        </View>
        <View style={styles.briefingInfoCategory}>
          {Object.keys(categories).map((categoryKey) => (
            <TouchableOpacity
              style={[
                styles.briefingInfoCategoryButton,
                {
                  backgroundColor:
                    briefCategory === categoryKey ? "#f4b942" : null,
                },
              ]}
              onPress={() => setBriefCategory(categoryKey)}
            >
              <Text
                style={
                  categoryKey == briefCategory
                    ? [styles.textBold, { fontSize: 20 }]
                    : styles.textMedium
                }
              >
                {categories[categoryKey]}
              </Text>
            </TouchableOpacity>
          ))}
          <View
            style={[
              styles.briefingInfoCategoryButton,
              { backgroundColor: "#2c6e49" },
            ]}
          >
            {selectedBrief ? (
              <TouchableOpacity
                onPress={() => handleModifyBrief(selectedBrief, selectedIndex)}
              >
                <Text
                  style={{
                    fontFamily: "GmarketSansTTFBold",
                    color: "white",
                    fontSize: 20,
                  }}
                >
                  수정
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleCreateBrief}>
                <Text
                  style={{
                    fontFamily: "GmarketSansTTFBold",
                    color: "white",
                    fontSize: 20,
                  }}
                >
                  추가
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView horizontal>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleOpenModal()}
            style={[
              styles.briefingContent,
              // { borderWidth: !selectedBrief ? 3 : 0.5 },
              { elevation: 10, backgroundColor: "white" },
              isDark
                ? {
                    // borderColor: "yellow",
                    // backgroundColor: "gray",
                    borderWidth: !selectedBrief ? 3 : 0,
                  }
                : { borderWidth: !selectedBrief ? 3 : 0.5 },
            ]}
          >
            {/* <Text style={styles.textBold}>추가</Text> */}
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "tomato",
              }}
            >
              <Entypo name={"plus"} size={50} />
            </View>
          </TouchableOpacity>
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <>
              {briefs.length === 0 ? (
                <View
                  style={[
                    styles.briefingContent,
                    isDark
                      ? { backgroundColor: "gray" }
                      : { borderWidth: 0.5, borderStyle: "dashed" },
                  ]}
                >
                  <Text style={[styles.textMedium, {}]}>
                    브리핑할 알람이 없어요...
                  </Text>
                </View>
              ) : (
                <>
                  {briefs.map((brief, index) => (
                    <Animated.View
                      key={brief.id}
                      style={[
                        styles.briefingContent,
                        // { borderWidth: selectedBrief === brief ? 3 : 0.5 },
                        isDark
                          ? {
                              borderColor: "white",
                              backgroundColor: "gray",
                              borderWidth: selectedBrief === brief ? 3 : 0,
                            }
                          : {
                              borderColor: (() => {
                                const { category } = brief;
                                return categoryColor(category);
                              })(),
                              borderWidth: selectedBrief === brief ? 3 : 0.5,
                            },
                      ]}
                      // exiting={FadeOutUp}
                    >
                      <TouchableOpacity
                        onPress={() => handleOpenModal(brief)}
                        onLongPress={() => handleDeleteBrief(brief, index)}
                      >
                        <Text style={[styles.textMedium, { fontSize: 14 }]}>
                          {brief.time.split(":")[0] <= 11 ? "오전" : "오후"}
                        </Text>
                        <Text style={[styles.textMedium, {}]}>
                          {brief.time.split(":")[0] <= 12
                            ? brief.time.split(":")[0]
                            : brief.time.split(":")[0] - 12 < 10
                            ? `0${brief.time.split(":")[0] - 12}`
                            : brief.time.split(":")[0] - 12}
                          :{brief.time.split(":")[1]}분
                        </Text>
                        <Text style={[styles.textMedium, {}]}>
                          {(() => {
                            switch (brief.category) {
                              case "ECONOMIC":
                                return "경제";
                              case "SOCIAL":
                                return "사회";
                              case "LIFE":
                                return "생활/문화";
                              case "WORLD":
                                return "세계";
                              case "SCIENCE":
                                return "IT/과학";
                              default:
                                return "기타";
                            }
                          })()}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleBriefOnOff(brief)}>
                        {brief.state ? (
                          <FontAwesome name={"toggle-on"} size={30} />
                        ) : (
                          <FontAwesome name={"toggle-off"} size={30} />
                        )}
                      </TouchableOpacity>
                    </Animated.View>
                  ))}
                </>
              )}
            </>
          )}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textBold: {
    // color: "white",
    fontSize: 32,
    textAlign: "center",
    fontFamily: "GmarketSansTTFBold",
  },
  textMedium: {
    // color: "white",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "GmarketSansTTFMedium",
  },
  text: {
    // color: "white",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "GmarketSansTTFLight",
  },
  briefingInfo: {
    flex: 3,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    // padding: 5,
    borderRadius: 10,
    marginVertical: 30,
  },
  briefingContent: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 5,
    padding: 10,
  },
  briefingContentCard: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    height: "60%",
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 3,
    borderRadius: 10,
  },
  modalBrief: {
    backgroundColor: "white",
    margin: 10,
  },
  briefingInfoTime: {
    flexDirection: "row",
    // flexWrap: "wrap",
    width: "90%",
    aspectRatio: 3 / 1,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: 10,
  },
  briefingInfoTimeText: {
    // height: "100%",
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "GmarketSansTTFBold",
    fontSize: 18,
  },
  briefingInfoCategory: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "90%",
    aspectRatio: 2 / 1,
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: 10,
  },
  briefingInfoCategoryButton: {
    width: "33.33333%",
    aspectRatio: 4 / 3,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 0.5,
    borderRadius: 2.5,
  },
  modalButton: {
    flexDirection: "row",
    width: "100%",
  },
  modalButtonClose: {
    flex: 1,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
    borderWidth: 0.5,
  },
});

export default Brief;
