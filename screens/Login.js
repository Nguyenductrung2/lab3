import React, { useEffect, useState } from 'react';
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useMyContextProvider, login } from '../index';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [controller, dispatch] = useMyContextProvider();
  const { userLogin } = controller;
  const [showPassword, setShowPassword] = useState(false);
  const [disableLogin, setDisableLogin] = useState(true);

  const hasErrorEmail = () => !email.includes("@");
  const hasErrorPassword = () => password.length < 6;

  useEffect(() => {
    setDisableLogin(email.trim() === '' || password.trim() === '' || hasErrorEmail() || hasErrorPassword());
  }, [email, password]);

  const handleLogin = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const userDoc = await firestore().collection('USERS').doc(email).get();
      if (userDoc.exists) {
        const userRole = userDoc.data().role;
        navigation.navigate('Appointments', { userRole });
      } else {
        console.log("User does not exist");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userLogin != null) {
      if (userLogin.role === "admin")
        navigation.navigate("Admin");
      else if (userLogin.role === "customer")
        navigation.navigate("Customer");
    }
  }, [userLogin]);

  const handerLogin = () => {
    login(dispatch, email, password);
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logolab3.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Đăng nhập</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        error={hasErrorEmail()}
      />
      <TextInput
        label="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        style={styles.input}
        error={hasErrorPassword()}
      />
      <Button
        compact
        onPress={() => setShowPassword(!showPassword)}
      >
        {showPassword ? "Hide" : "Show"} Password
      </Button>
      
      <Button
        mode="contained"
        onPress={handerLogin}
        disabled={disableLogin}
        style={styles.button}
      >
        Đăng nhập
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("Register")}
        style={styles.button}
      >
        Chưa có tài khoản? Tạo tài khoản
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff", 
  },
  logo: {
    width: 300,
    height: 70,
    marginBottom: 20,
  },
  title: {
    fontSize: 35,
    paddingBottom: 10,
    color: "#cccccc", 
  },
  input: {
    width: 300,
    marginBottom: 20,
    backgroundColor: "#ffffff", 
  },
  button: {
    width: 300,
    marginBottom: 10,
    backgroundColor: "#ff7e5f", 
  },
});

export default Login;
