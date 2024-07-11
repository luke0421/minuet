import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, SafeAreaView } from "react-native";
import { GlobalColor } from "../../util/colors";
import { useDispatch } from "react-redux";
import { setCreateUserEmail } from "../../store/createUserSlice";
import Header_Black from "../../util/Header_Black";
import { StatusBar } from "expo-status-bar";

const Email = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [isValidEmail, setIsValidEmail] = useState(false);
    const dispatch = useDispatch()

    // 이메일 유효성 검사 함수
    const validateEmail = (text) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        setIsValidEmail(regex.test(text));
        setEmail(text);
    }

    const createUserEmail = () => {
        dispatch(setCreateUserEmail(email))
        navigation.navigate('Password')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header_Black/>
            <View style={styles.upperContainer}>
                <Text style={styles.text}>
                    이메일을 입력해주세요
                </Text>
            </View>
            <View style={styles.middleContainer}>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="이메일" style={styles.inputText} value={email} onChangeText={(e) => validateEmail(e)} />
                </View>
            </View>
            <View style={styles.bottomContainer}>
                {email ?
                    <>
                        {isValidEmail ?
                            <Pressable style={styles.button} onPress={() => createUserEmail()}>
                                <View>
                                    <Text style={styles.whiteText} >
                                        확인
                                    </Text>
                                </View>
                            </Pressable>
                            :
                            <Text>
                                유효하지 않은 이메일 형식 입니다.
                            </Text>
                        }
                    </>
                    :
                    <></>
                }
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
        borderBottomWidth: 1,
        borderBottomColor: "#000", // 언더바의 색상을 지정합니다.
        width: "90%", // TextInput 컴포넌트의 너비를 조정합니다.
        marginTop: 20, // 위쪽 여백을 지정합니다.
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
    }
});

export default Email;
