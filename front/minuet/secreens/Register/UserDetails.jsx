import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, SafeAreaView, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { GlobalColor } from "../../util/colors";
import { useDispatch, useSelector } from "react-redux";
import { clearCreateUser, setCreateUserDetails } from "../../store/createUserSlice";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { log } from "../../component/Carosual/utils/log";

const UserDetails = ({ navigation }) => {

    const [name, setName] = useState('');
    const [gender, setGender] = useState(false);

    const [category, setCategory] = useState([false, false, false, false, false]);
    const categoryName = ["ECONOMIC", "SOCIAL", "LIFE", "WORLD", "SCIENCE"];

    const [birthdate, setBirthdate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const dispatch = useDispatch();

    const createUser = useSelector(state => state.createUser)

    const signUp = async (
        memberEmail,
        memberPassword,
      ) => {
        try {

          const categoryList = [];
          
          for(let i = 0; i < 5; i++){
            if(category[i] === true){
                categoryList.push(categoryName[i]);
            }
          }
          
          const res = await axios.post(
            "https://j10e205.p.ssafy.io/member/register",
            {
              'memberEmail' : memberEmail,
              'memberPassword' : memberPassword,
              'memberName' : name,
              'memberBirth' : birthdate.toISOString().split('T')[0],
              'memberGender' : gender,
              'categoryList' : categoryList,
            }
          );
          console.log(res);
          dispatch(clearCreateUser())
        } catch (err) {
          console.error(err);
        }
      };

    const createUserDetails = () => {
        dispatch(setCreateUserDetails({ name, gender, birthdate: birthdate.toISOString().split('T')[0] }));
        signUp(createUser.createUser.email, createUser.createUser.password)
        navigation.navigate('Start');
    }

    const onDateChange = (event, selectedDate) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false); // 안드로이드에서만 DatePicker를 닫도록 설정
        }
        if (selectedDate) {
            setBirthdate(selectedDate);
        }
    };


    const openDatePicker = () => {
        setShowDatePicker(true);
    };

    const addCategory = (idx) => {
        const newCate = [...category];
        newCate[idx] = !newCate[idx];
        setCategory(newCate);
        console.log(category);
    }
 
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.upperContainer}>
                <Text style={styles.text}>
                    회원 정보를 입력해주세요
                </Text>
            </View>
            <View style={styles.middleContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="이름"
                        style={styles.inputText}
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>성별</Text>
                    <View style={styles.genderContainer}>
                        <View style={styles.radioContainer}>
                            <Text style={styles.radioLabel}>남성</Text>
                            <Pressable
                                style={[styles.radioButton, { backgroundColor: gender === false ? '#ccc' : 'white' }]}
                                onPress={() => setGender(false)}
                            />
                        </View>
                        <View style={styles.radioContainer}>
                            <Text style={styles.radioLabel}>여성</Text>
                            <Pressable
                                style={[styles.radioButton, { backgroundColor: gender === true ? '#ccc' : 'white' }]}
                                onPress={() => setGender(true)}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>생년월일</Text>
                    <Pressable style={styles.datePickerButton} onPress={openDatePicker}>
                        <Text style={styles.datePickerText}>{birthdate.toISOString().split('T')[0]}</Text>
                    </Pressable>
                    {showDatePicker && (
                        <DateTimePicker
                            value={birthdate}
                            mode="date"
                            display="default"
                            onChange={onDateChange}
                        />
                    )}
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>선호하는 카테고리를 설정해주세요.</Text>
                    <View style={styles.genderContainer}>
                        <View style={styles.radioContainer}>
                            <Text style={styles.radioLabel}>경제</Text>
                            <Pressable
                                style={[styles.radioButton, { backgroundColor: category[0] === true ? '#ccc' : 'white' }]}
                                onPress={() => addCategory(0)}
                            />
                        </View>
                        <View style={styles.radioContainer}>
                            <Text style={styles.radioLabel}>사회</Text>
                            <Pressable
                                style={[styles.radioButton, { backgroundColor: category[1] === true ? '#ccc' : 'white' }]}
                                onPress={() => addCategory(1)}
                            />
                        </View>
                        <View style={styles.radioContainer}>
                            <Text style={styles.radioLabel}>생활</Text>
                            <Pressable
                                style={[styles.radioButton, { backgroundColor: category[2] === true ? '#ccc' : 'white' }]}
                                onPress={() => addCategory(2)}
                            />
                        </View>
                        <View style={styles.radioContainer}>
                            <Text style={styles.radioLabel}>세계</Text>
                            <Pressable
                                style={[styles.radioButton, { backgroundColor: category[3] === true ? '#ccc' : 'white' }]}
                                onPress={() => addCategory(3)}
                            />
                        </View>
                        <View style={styles.radioContainer}>
                            <Text style={styles.radioLabel}>과학</Text>
                            <Pressable
                                style={[styles.radioButton, { backgroundColor: category[4] === true ? '#ccc' : 'white' }]}
                                onPress={() => addCategory(4)}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <Pressable style={styles.button} onPress={createUserDetails}>
                    <Text style={styles.whiteText}>확인</Text>
                </Pressable>
            </View>
            <StatusBar style="light"/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
    },
    inputContainer: {
        marginVertical: 10,
    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 5,
    },
    inputText: {
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#000",
    },
    upperContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingLeft: 32,
        paddingBottom: 20,
    },
    middleContainer: {
        flex: 3,
        paddingHorizontal: 32,
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: GlobalColor.colors.primary_black,
        width: '80%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    whiteText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    genderContainer: {
        flexDirection: 'row',
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    radioLabel: {
        marginRight: 5,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
    },
    datePickerButton: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    datePickerText: {
        fontSize: 16,
        paddingVertical: 10,
    },
});

export default UserDetails;
