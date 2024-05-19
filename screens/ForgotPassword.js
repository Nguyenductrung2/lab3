import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import firestore from "@react-native-firebase/firestore";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [disableGetPassword, setDisableGetPassword] = useState(true);

  const hasErrorEmail = () => !email.includes('@');

  const handleGetPassword = () => {
    firestore()
      .collection('USERS')
      .doc(email)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const userData = documentSnapshot.data();
          setPassword(userData.password);
          setError('');
        } else {
          setPassword('');
          setError('Email không tồn tại trong hệ thống.');
        }
      })
      .catch((error) => {
        console.error("Error fetching document: ", error);
        setPassword('');
        setError('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
      });
  };
  useEffect(() => {
    setDisableGetPassword(email.trim() === '' || !!error || hasErrorEmail());
  }, [email, error, hasErrorEmail]);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{
        fontSize: 24,
        fontWeight: "bold",
        alignSelf: "center",
        color: "pink",
        marginTop: 100,
        marginBottom: 50
      }}>
        Forgot Password
      </Text>
      <TextInput
        label={"Email"}
        value={email}
        onChangeText={setEmail}
      />
      <HelperText type='error' visible={hasErrorEmail()}>
        Địa chỉ email không hợp lệ
      </HelperText>
      {password ? (
        <View style={{flexDirection: "row"}}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Your Password: </Text>
          <Text style={{fontSize: 18}}>{password}</Text>
        </View>
      ) : null}
      <Button mode='contained' textColor='black' buttonColor='pink' onPress={handleGetPassword} disabled={disableGetPassword}>
        Get Password
      </Button>
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <Button onPress={() => navigation.navigate("Login")}>
          Back to Login
        </Button>
      </View>
    </View>
  );
};

export default ForgotPassword;
