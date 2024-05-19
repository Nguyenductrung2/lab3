import React, { useState, useLayoutEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { HeaderBackButton } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

const EditProfile = ({ route, navigation }) => {
  const { customer } = route.params;
  const [name, setName] = useState(customer.name);
  const [email, setEmail] = useState(customer.email);
  const [password, setPassword] = useState(''); // Mật khẩu hiện tại
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(customer.phoneNumber);
  const [address, setAddress] = useState(customer.address);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);

  const handleSave = async () => {
    try {
      // Xác thực người dùng với mật khẩu hiện tại trước khi cập nhật
      const user = auth().currentUser;
      const credential = auth.EmailAuthProvider.credential(user.email, password);
      await user.reauthenticateWithCredential(credential);

      // Cập nhật mật khẩu mới nếu người dùng đã nhập mật khẩu mới
      if (newPassword !== '') {
        if (newPassword !== confirmPassword) {
          Alert.alert('Error', 'New password and confirm password do not match');
          return;
        }
        await user.updatePassword(newPassword);
      }

      // Cập nhật thông tin người dùng khác (tên, số điện thoại, địa chỉ) trong Firestore
      const updates = {
        name,
        phoneNumber,
        address,
      };
      await firestore()
        .collection('USERS')
        .doc(customer.id)
        .update(updates);

      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password (Optional)"
        secureTextEntry={true}
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password (Optional)"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default EditProfile;
