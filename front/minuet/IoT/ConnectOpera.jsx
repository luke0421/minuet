import { getDatabase, onValue, ref, set, remove } from "firebase/database"
import { useEffect, useState } from "react";
import { TextInput, View, Button, Modal, StyleSheet, Text, Pressable } from "react-native";
import { getUserInfo } from "../asyncstorage/AsyncStorage";


const ConnectOpera = () => {
    const [showModal, setShowModal] = useState(false)
    const [showDisconnectModal, setShowDisconnectModal] = useState(false)
    const [serialNum, setSerialNum] = useState('')
    const [isConnected, setIsConnected] = useState(false)
    const db = getDatabase();
    const memberId = getUserInfo('memberId');

    useEffect(() => {
        const userRef = ref(db, 'user')
        try {
            onValue(userRef, (snapshot) => {
                console.log(snapshot.val())
                if (snapshot.val()) {
                    setIsConnected(true)
                }
            })
        }
        catch (err) {
            setIsConnected(false)
        }
    }, [])


    const handleConnectOpera = async () => {
        try {
            const serialRef = ref(db, 'serial_number')
            onValue(serialRef, (snapshot) => {
                const realSerialNum = snapshot.val()
                if (realSerialNum === serialNum) {
                    const userRef = ref(db, 'user')
                    set(userRef, {
                        memberId: memberId['_j']
                    })
                    setSerialNum('')
                }
                else {
                    setShowModal(true)
                }
            })
        }
        catch (err) {
            console.log(err)
            setShowModal(true)
        }
    }

    const disconnect = () => {
        const userRef = ref(db, 'user') // user 폴더의 참조
        remove(userRef); // user 폴더의 데이터 삭제
        setShowDisconnectModal(true)
        setIsConnected(false)
    }

    return (
        <View>
            <TextInput
                style={{ textAlign: "center" }}
                placeholder="연결할 기기의 시리얼 넘버를 입력하세요"
                value={serialNum}
                onChangeText={(text) => setSerialNum(text)}
            />
            <Button
                title="Connect"
                onPress={() => handleConnectOpera()}
            />
            <Button
                title="Disconnect"
                onPress={() => disconnect()}
            />
            <View>
                {isConnected &&
                    <Text>
                        기기와 연결되어 있습니다.
                    </Text>
                }
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
        </View>
    )
}

const styles = StyleSheet.create({
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

export default ConnectOpera
