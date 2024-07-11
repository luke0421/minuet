import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import Header_Black from "../../util/Header_Black";
import Header_White from "../../util/Header_White";
import Darkmode from "../../component/Dark/Darkmode";
import { useDispatch, useSelector } from "react-redux";
import { clearUserInfos, getUserInfo } from "../../asyncstorage/AsyncStorage";
import { clearUserInfo, setUserInfo } from "../../store/userInfoSlice";
import { GlobalColor } from "../../util/colors";
import axios from "axios";

const SettingInfo = ({ navigation }) => {
  const [name, setName] = useState("");
  const [nameChange, setNameChange] = useState("");
  const [category, setCategory] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const user = useSelector((state) => state.userInfo);
  const isDark = useSelector((state) => state.darkmode.value);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user.value);
    setName(user.value.name);
    setNameChange(user.value.name);
    user.value.categoryList
      ? setCategory(user.value.categoryList)
      : setCategory(user.value.categoryNames);
  }, [user]);

  useEffect(() => {
    console.log(nameChange);
    console.log(category);
  }, [category]);

  const handleLogout = () => {
    clearUserInfos();
    dispatch(clearUserInfo());
    navigation.navigate("Start");
  };

  const handleCancle = () => {
    navigation.goBack();
  };

  const handleConfirm = async () => {
    const newMember = {
      name: nameChange,
      categoryNames: category,
      email: user.value.email,
      gender: user.value.gender,
      birth: user.value.birth,
      memberId: user.value.memberId,
    };
    console.log(newMember);
    try {
      const res = await axios.put(
        `https://j10e205.p.ssafy.io/member/modify`,
        newMember
      );
      dispatch(setUserInfo(newMember));
    } catch (err) {
      console.error(err);
    }
    handleCancle();
  };

  const handleCategoryClick = (categoryName) => {
    if (category.includes(categoryName)) {
      // 이미 선택된 카테고리인 경우, 해당 카테고리를 배열에서 제거
      setCategory(category.filter((cat) => cat !== categoryName));
    } else {
      // 선택되지 않은 카테고리인 경우, 최대 선택 수를 확인하고 추가
      if (category.length < 3) {
        setCategory([...category, categoryName]);
      } else {
        // 최대 선택 수에 도달한 경우, 가장 먼저 선택된 카테고리를 제거하고 새로운 카테고리를 추가
        const newCategory = [...category.slice(1), categoryName];
        setCategory(newCategory);
      }
    }
  };

  return (
    <View style={styles.container}>
      {isDark ? <Header_White /> : <Header_Black />}
      <View
        style={[
          styles.info,
          isDark && { backgroundColor: GlobalColor.colors.primary_black },
        ]}
      >
        <View style={styles.infoTitle}>
          <View>
            <Text style={[styles.textBold, isDark && { color: "white" }]}>
              프로필 편집
            </Text>
          </View>
          <TouchableOpacity style={styles.logout} onLongPress={handleLogout}>
            <Text style={[styles.textBold,{color: isDark ? "white":GlobalColor.colors.primary_black50}]}>로그아웃</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoBody}>
          <View style={styles.section}>
            <Text style={[styles.textBold, isDark && { color: "white" }]}>
              이름 *
            </Text>
            <View>
              <TextInput
                placeholder="최대 8글자"
                maxLength={8}
                style={[
                  styles.text,
                  name !== nameChange &&
                    (isDark ? { color: "white" } : { color: "black" }),
                ]}
                value={nameChange}
                onChangeText={setNameChange}
              />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={[styles.textBold, isDark && { color: "white" }]}>
              이메일
            </Text>
            <Text style={[styles.text, { color: "gray" }]}>
              {user.value.email}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={[styles.textBold, isDark && { color: "white" }]}>
              생일
            </Text>
            <Text style={[styles.text, { color: "gray" }]}>
              {user.value.birth}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={[styles.textBold, isDark && { color: "white" }]}>
              성별
            </Text>
            <View style={{ flexDirection: "row" }}>
              {user.value.gender ? (
                <Text style={[styles.text, { color: "gray" }]}>Male</Text>
              ) : (
                <Text style={[styles.text, { color: "gray" }]}>Female</Text>
              )}
            </View>
          </View>
          <View style={styles.section}>
            <Text style={[styles.textBold, isDark && { color: "white" }]}>
              선호 카테고리 *
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.buttonCategory}
                onPress={() => handleCategoryClick("ECONOMIC")}
              >
                <Text
                  style={[
                    styles.text,
                    category.includes("ECONOMIC") &&
                      (isDark ? { color: "white" } : { color: "black" }),
                  ]}
                >
                  경제
                </Text>
              </TouchableOpacity>
              <Text style={styles.text}> | </Text>
              <TouchableOpacity
                style={styles.buttonCategory}
                onPress={() => handleCategoryClick("SOCIAL")}
              >
                <Text
                  style={[
                    styles.text,
                    category.includes("SOCIAL") &&
                      (isDark ? { color: "white" } : { color: "black" }),
                  ]}
                >
                  사회
                </Text>
              </TouchableOpacity>
              <Text style={styles.text}> | </Text>
              <TouchableOpacity
                style={styles.buttonCategory}
                onPress={() => handleCategoryClick("WORLD")}
              >
                <Text
                  style={[
                    styles.text,
                    category.includes("WORLD") &&
                      (isDark ? { color: "white" } : { color: "black" }),
                  ]}
                >
                  세계
                </Text>
              </TouchableOpacity>
              <Text style={styles.text}> | </Text>
              <TouchableOpacity
                style={styles.buttonCategory}
                onPress={() => handleCategoryClick("LIFE")}
              >
                <Text
                  style={[
                    styles.text,
                    category.includes("LIFE") &&
                      (isDark ? { color: "white" } : { color: "black" }),
                  ]}
                >
                  생활/문화
                </Text>
              </TouchableOpacity>
              <Text style={styles.text}> | </Text>
              <TouchableOpacity
                style={styles.buttonCategory}
                onPress={() => handleCategoryClick("SCIENCE")}
              >
                <Text
                  style={[
                    styles.text,
                    category.includes("SCIENCE") &&
                      (isDark ? { color: "white" } : { color: "black" }),
                  ]}
                >
                  IT/과학
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.section, {minHeight: 55}]}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={[styles.textBold, isDark && { color: "white" }]}>
                다크모드 *
              </Text>
              <Darkmode />
            </View>
          </View>
        </View>
        <View style={styles.infoTitle}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity activeOpacity={0.7}
              style={[
                styles.button,
                { backgroundColor:"white" ,elevation:10},
              ]}
              onPress={handleCancle}
            >
              <Text style={[styles.textBold,{color:GlobalColor.colors.Pick_color}]}>Cancle</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}
              style={[
                styles.button,
                { backgroundColor:  "white" ,elevation:10},
              ]}
              onPress={handleConfirm}
            >
              <Text style={[styles.textBold, {color : GlobalColor.colors.primary_blue}]}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text></Text>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={styles.modal}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalMain}>
            <TouchableOpacity
              style={{ width: 100, height: 100, backgroundColor: "tomato" }}
              // onPress={() => setModalVisible(false)}
            >
              <Text>close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  info: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoTitle: {
    width: "90%",
    minHeight: 75,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoBody: {
    width: "90%",
    gap:10,
  },
  section: {
    minHeight: 75,
    justifyContent: "flex-end",
    borderBottomWidth: 3,
    gap:7,
  },
  text: {
    fontSize: 20,
    color: "gray",
    fontFamily: "GmarketSansTTFMedium",
  },
  textBold: {
    fontSize: 20,
    fontFamily: "GmarketSansTTFBold",
  },
  buttonGender: {
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 0.5,
    marginHorizontal: 1,
  },
  buttonCategory: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSelected: {
    color: "gray",
  },
  button: {
    width: "45%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 10,
    marginHorizontal: 10,
  },
  logout: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
    borderRadius: 20,
    padding: 10,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalMain: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export default SettingInfo;
