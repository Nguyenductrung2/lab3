import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { createAccount } from '../index';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Register = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role] = useState('');  
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [disableCreate, setDisableCreate] = useState(true);

  const hasErrorFullName = () => fullName.trim() === "";
  const hasErrorEmail = () => !email.includes('@');
  const hasErrorPassword = () => password.length < 6;
  const hasErrorPasswordConfirm = () => confirmPassword !== password;

  useEffect(() => {
    setDisableCreate(
      hasErrorFullName() ||
      hasErrorEmail() ||
      hasErrorPassword() ||
      hasErrorPasswordConfirm() ||
      phone.trim() === '' ||
      address.trim() === ''
    );
  }, [fullName, email, password, confirmPassword, phone, address]);

  const handleRegister = async () => {
    try {
      await createAccount(email, password, fullName, phone, address, role);
      Alert.alert(
        "Đăng ký thành công",
        "Bạn đã đăng ký thành công. Vui lòng đăng nhập.",
        [{ text: "OK", onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
      Alert.alert("Lỗi", "Đã có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại.");
    }
  };

  return (
    <View style={{ marginHorizontal: 20, marginTop: 50 }}>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Image 
          source={require('../assets/logolab3.png')}
          style={{ width: 300, height: 70, marginBottom: 10 }}
          resizeMode="contain"
        />
      </View>
      <TextInput
        label="Họ và tên"
        value={fullName}
        onChangeText={setFullName}
        mode="outlined"
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={{ marginBottom: 10 }}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          label="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          mode="outlined"
          style={{ marginBottom: 10, flex: 1 }}
          right={
            <TextInput.Icon 
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          label="Xác nhận mật khẩu"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          mode="outlined"
          style={{ marginBottom: 20, flex: 1 }}
          right={
            <TextInput.Icon 
              icon={showConfirmPassword ? "eye-off" : "eye"}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          }
        />
      </View>
      <TextInput
        label="Số điện thoại"
        value={phone}
        onChangeText={setPhone}
        mode="outlined"
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Địa chỉ"
        value={address}
        onChangeText={setAddress}
        mode="outlined"
        style={{ marginBottom: 20 }}
      />
      <Button
        mode="contained"
        onPress={handleRegister}
        disabled={disableCreate}
        style={{ marginBottom: 10, backgroundColor: "#ff7e5f" }}
      >
        Đăng ký
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{ textAlign: 'center', color: '#0000FF' }}>
          Đã có tài khoản? Đăng nhập
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Register;
