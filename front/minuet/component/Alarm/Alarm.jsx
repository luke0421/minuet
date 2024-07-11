import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import WheelPicker from "react-native-wheely";

const Alarm = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTimeType, setSelectedTimeType] = useState(0);
  const [selectedTimeHour, setSelectedTimeHour] = useState(0);
  const [selectedTimeMin, setSelectedTimeMin] = useState(0);

  const wheelType = ["AM", "PM"];
  const wheelHour = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const wheelMin = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleConfirmTime = () => {
    // 여기에서 선택된 시간을 처리하는 로직을 추가할 수 있습니다.
    handleCloseModal();
  };

  return (
    <View style={{ width: "100%", aspectRatio: 7 / 2 }}>
      <TouchableOpacity onPress={handleOpenModal}>
        <Text style={{ textAlign: "center", fontSize: 18 }}>시간 선택</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View style={{ backgroundColor: "white", padding: 20 }}>
            <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 20 }}>시간을 선택하세요</Text>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <WheelPicker
                selectedIndex={selectedTimeType}
                options={wheelType}
                onChange={(index) => setSelectedTimeType(index)}
                visibleRest={1}
                itemHeight={30}
                containerStyle={{ backgroundColor: "rgba(0,0,0,0.1)", height: "100%" }}
              />
              <WheelPicker
                selectedIndex={selectedTimeHour}
                options={wheelHour}
                onChange={(index) => setSelectedTimeHour(index)}
                visibleRest={1}
                itemHeight={30}
                containerStyle={{ backgroundColor: "rgba(0,0,0,0.1)", height: "100%" }}
              />
              <Text style={{ fontSize: 20 }}>시</Text>
              <WheelPicker
                selectedIndex={selectedTimeMin}
                options={wheelMin}
                onChange={(index) => setSelectedTimeMin(index)}
                visibleRest={1}
                itemHeight={30}
                containerStyle={{ backgroundColor: "rgba(0,0,0,0.1)", height: "100%" }}
              />
              <Text style={{ fontSize: 20 }}>분</Text>
            </View>
            <TouchableOpacity onPress={handleConfirmTime} style={{ marginTop: 20 }}>
              <Text style={{ textAlign: "center", fontSize: 18, color: "blue" }}>확인</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCloseModal} style={{ marginTop: 10 }}>
              <Text style={{ textAlign: "center", fontSize: 18, color: "red" }}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Alarm;
