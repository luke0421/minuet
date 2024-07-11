import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WheelPicker from "react-native-wheely";

const TimePicker = ({ onSelect }) => {
  const [selectedHour, setSelectedHour] = useState(0); // 시간을 0부터 시작하도록 변경
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState('AM');

  const hours = Array.from({ length: 12 }, (_, i) => ({label: `${i+1}`, value: i})); // 1부터 12까지의 시간을 나타내는 배열
  const minutes = Array.from({ length: 60 }, (_, i) => ({label: `${i}`, value: i})); // 0부터 59까지의 분을 나타내는 배열
  const periods = [{label: 'AM', value: 'AM'}, {label: 'PM', value: 'PM'}]; // AM, PM을 나타내는 배열

  const handleHourChange = (hour) => {
    setSelectedHour(hour);
    onSelect(selectedPeriod, hour+1, selectedMinute); // 시간을 1부터 시작하도록 변경
  };

  const handleMinuteChange = (minute) => {
    setSelectedMinute(minute);
    onSelect(selectedPeriod, selectedHour+1, minute);
  };

  const handlePeriodChange = (period) => {
    const selected = period === 'AM' ? 'AM' : 'PM'; // 선택된 기간을 설정
    setSelectedPeriod(selected);
    onSelect(selected, selectedHour+1, selectedMinute);
  };

  return (
    <View style={styles.container}>
      <WheelPicker
        style={styles.picker}
        selectedItem={periods.findIndex(period => period.value === selectedPeriod)}
        data={periods}
        onItemSelected={(index) => handlePeriodChange(periods[index].value)}
      />

      <WheelPicker
        style={styles.picker}
        selectedItem={selectedHour}
        data={hours}
        onItemSelected={(index) => handleHourChange(index)}
      />

      <WheelPicker
        style={styles.picker}
        selectedItem={selectedMinute}
        data={minutes}
        onItemSelected={(index) => handleMinuteChange(index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  picker: {
    width: 100,
    height: 150, // WheelPicker의 높이를 설정
  },
});

export default TimePicker;
