import { StyleSheet, Text, View, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeValue } from '../store/testSlice';
import { getUserInfo } from '../asyncstorage/AsyncStorage';
import { useEffect } from 'react';

const Home = ({ navigation }) => {
    
    const dispatch = useDispatch()
    const testValue = useSelector(state => state.test)
    const createUserInfo = useSelector(state => state.createUser)
    console.log(createUserInfo)

    const getUserInfos = async () => {
        const email = await getUserInfo('email');
        console.log('email', email);
        const password = await getUserInfo('password');
        console.log('password', password);
        const birth = await getUserInfo('birth');
        console.log('birth', birth);
        const name = await getUserInfo('name');
        console.log('name', name);
        const gender = await getUserInfo('gender');
        console.log('gender', gender);
      };
      useEffect(() => {
        getUserInfos();
        getUserInfo('email').then(email => {
            console.log('check', email)
        })
      }, []);
    return (
        <View>
            <Text>
                Home, {testValue.value? 'ture' : 'false'}
            </Text>
            <Button 
                title='Go to Test'
                onPress={() => navigation.navigate('Test')}
            />
            <Button
                title='Value Change'
                onPress={() => dispatch(changeValue())}
            />
        </View>
    )
}

export default Home