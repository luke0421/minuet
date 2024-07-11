import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, SafeAreaView, Modal } from "react-native";
import { GlobalColor } from "../../util/colors";
import axios from "axios";
import { getUserInfo, setUserInfos } from "../../asyncstorage/AsyncStorage";
import { StatusBar } from "expo-status-bar";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../store/userInfoSlice";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()

    
    useEffect(() => {
        getUserInfo('email').then(email => {
          if (email) {
            navigation.replace('Tab')
          }
        })
      }, []);    

    // 이메일 유효성 검사 함수
    const validateEmail = (text) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(regex.test(text));
        setEmail(text);
    };
    
    // 비밀번호 유효성 검사 함수
    const validatePassword = (text) => {
        // 비밀번호는 최소 6자 이상이고, 특수 문자를 포함해야 합니다.
        const regex = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
        setIsValidPassword(regex.test(text));
        setPassword(text);
    };

    const logIn = async () => {
        try {
            const res = await axios.post(
                "https://j10e205.p.ssafy.io/member/login",
                {
                    "memberEmail": email,
                    "memberPassword": password,
                }
            );
            // 로그인 성공시 작업
            dispatch(setUserInfo(res.data))
            setUserInfos('birth', res.data.birth)
            setUserInfos('email', res.data.email)
            setUserInfos('password', password)
            if (res.data.gender) {
                setUserInfos('gender', 'female')
            }
            else {
                setUserInfos('gender', 'male')
            }
            setUserInfos('name', res.data.name)
            setUserInfos('memberId', res.data.memberId.toString())
            
            navigation.replace('Tab')
        } catch (err) {
            console.error(err);
            // 로그인 실패시 모달 열기
            setShowModal(true);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.upperContainer}>
                <Text style={styles.text}>
                    로그인 해주세요
                </Text>
            </View>
            <View style={styles.middleContainer}>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="이메일" style={styles.inputText} value={email} onChangeText={(e) => validateEmail(e)} />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="패스워드" style={styles.inputText} value={password} onChangeText={(e) => validatePassword(e)} secureTextEntry={true} />
                </View>
            </View>
            <View style={styles.bottomContainer}>
                {email && password ?
                    <>
                        {isValidEmail && isValidPassword ?
                            <Pressable style={styles.button} onPress={() => logIn()}>
                                <View>
                                    <Text style={styles.whiteText} >
                                        확인
                                    </Text>
                                </View>
                            </Pressable>
                            :
                            <Text>
                                이메일 혹은 비밀번호가 유효하지 않습니다.
                            </Text>
                        }
                    </>
                    :
                    <></>
                }
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>로그인에 실패했습니다. 다시 시도해주세요.</Text>
                        <Pressable onPress={() => setShowModal(false)}>
                            <Text style={styles.closeButton}>닫기</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <StatusBar style="light" />
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
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        width: "90%",
        marginTop: 20,
    },
    inputText: {
        fontSize: 16,
    },
    upperContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingLeft: 32
    },
    middleContainer: {
        flex: 1,
        paddingLeft: 32,
        alignContent: 'center',
        justifyContent: 'center'
    },
    bottomContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    button: {
        backgroundColor: GlobalColor.colors.primary_black,
        width: '80%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    whiteText: {
        color: 'white',
        width: '100%',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButton: {
        marginTop: 20,
        color: 'blue',
    }
});

export default Login;