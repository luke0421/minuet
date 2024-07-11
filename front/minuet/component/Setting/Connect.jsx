import { getDatabase, onValue, ref, set, remove } from "firebase/database";
import { useEffect, useState } from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../asyncstorage/AsyncStorage";
import { GlobalColor } from "../../util/colors";

const ConnectOpera = () => {
  const isDark = useSelector((state) => state.darkmode.value);
  const [showModal, setShowModal] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [serialNum, setSerialNum] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const db = getDatabase();
  const memberId = getUserInfo("memberId");
  const userInfo = useSelector(state => state.userInfo)

  useEffect(() => {
    const userRef = ref(db, "user");
    try {
      onValue(userRef, (snapshot) => {
        console.log(snapshot.val().memberId, userInfo.value.memberId.toString());
        if (snapshot.val() && snapshot.val().memberId === userInfo.value.memberId.toString()) {
          setIsConnected(true);
        }
      });
    } catch (err) {
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    if (isConnected) {
      const serialRef = ref(db, "serial_number");
      try {
        onValue(serialRef, (snapshot) => {
          console.log(snapshot.val());
          setSerialNum(snapshot.val());
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      setSerialNum("");
    }
  }, [isConnected]);

  const handleConnectOpera = async () => {
    try {
      const serialRef = ref(db, "serial_number");
      onValue(serialRef, (snapshot) => {
        const realSerialNum = snapshot.val();
        if (realSerialNum === serialNum) {
          const userRef = ref(db, "user");
          set(userRef, {
            memberId: memberId["_j"],
          });
          setSerialNum("");
        } else {
          setShowModal(true);
        }
      });
    } catch (err) {
      console.log(err);
      setShowModal(true);
    }
  };

  const disconnect = () => {
    const userRef = ref(db, "user"); // user 폴더의 참조
    remove(userRef); // user 폴더의 데이터 삭제
    setShowDisconnectModal(true);
    setIsConnected(false);
  };

  return (
    <>
      <View style={styles.title}>
        <Text
          style={[
            styles.textBold,
            { color: isDark ? "white" : GlobalColor.colors.primary_black },
          ]}
        >
          Opera Connect
        </Text>
      </View>
      <View
        style={[
          styles.container,
          isDark
            ? isConnected
              ? { shadowColor: "yellow", elevation: 10 }
              : { shadowColor: null, elevation: 5 }
            : isConnected
            ? { shadowColor: "blue", elevation: 5 }
            : { shadowColor: "black", elevation: 5 },
        ]}
      >
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 9 }}
        >
          {isConnected ? (
            <Image
              style={styles.operaImg}
              source={require("../../assets/opera_on.png")}
            />
          ) : (
            <Image
              style={styles.operaImg}
              source={require("../../assets/opera_off.png")}
            />
          )}
        </View>
        {isConnected ? (
          <View
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          >
            <Text style={styles.text}>기기와 연결되어 있습니다.</Text>
            <Text style={styles.text}>연결된 기기: {serialNum}</Text>
          </View>
        ) : (
          <TextInput
            style={[
              styles.text,
              { textDecorationLine: "underline", textAlign: "center", flex: 1 },
            ]}
            placeholder="연결할 기기의 시리얼 넘버를 입력하세요"
            value={serialNum}
            onChangeText={(text) => setSerialNum(text)}
          />
        )}
        <View style={styles.buttons}>
          {isConnected ? (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: GlobalColor.colors.Pick_color ,elevation : 10}]}
              onPress={disconnect}
            >
              <Text style={[styles.textMedium,{color:"white"}]}>Disconnect</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#2c6e49" }]}
              onPress={handleConnectOpera}
            >
              <Text style={[styles.textMedium,{color:"white"}]}>Connect</Text>
            </TouchableOpacity>
          )}
          {/* <Text style={styles.textMedium}>|</Text> */}
        </View>
      </View>

      <Modal // 연결 실패 모달
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>연결에 실패했습니다. 다시 시도해주세요.</Text>
            <Pressable onPress={() => setShowModal(false)}>
              <Text style={styles.closeButton}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal // 연결이 끊어졌을때 모달
        animationType="slide"
        transparent={true}
        visible={showDisconnectModal}
        onRequestClose={() => setShowDisconnectModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>기기와 연결이 끊어졌습니다.</Text>
            <Pressable onPress={() => setShowDisconnectModal(false)}>
              <Text style={styles.closeButton}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    flex: 1,
    // backgroundColor: "teal",
    justifyContent: "center",
  },
  container: {
    flex: 4,
    width: "80%",
    backgroundColor: "white",
    borderRadius: 15,
    marginBottom: 20,
  },
  operaImg: {
    width: "80%",
    resizeMode: "contain",
  },
  buttons: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "50%",
    aspectRatio: 4 / 1,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButton: {
    marginTop: 20,
    color: "blue",
  },
  textBold: {
    fontSize: 32,
    textAlign: "center",
    fontFamily: "GmarketSansTTFBold",
  },
  textMedium: {
    // color: "white",
    fontSize: 20,
    fontFamily: "GmarketSansTTFMedium",
  },
  text: {
    // color: "white",
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "GmarketSansTTFLight",
  },
});

export default ConnectOpera;
