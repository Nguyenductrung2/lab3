import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomerDetails = ({ route }) => {
  const { customer } = route.params;
  const navigation = useNavigation();

  const handleEdit = () => {
    navigation.navigate('EditCustomer', { customer });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="black" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{customer.name}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{customer.email}</Text>
        <Text style={styles.label}>Password:</Text>
        <Text style={styles.value}>{customer.password}</Text>
        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.value}>{customer.phoneNumber}</Text>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{customer.address}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    fontSize: 18,
    marginLeft: 5,
    color: '#6200EE',
  },
  detailsContainer: {
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 18,
    marginVertical: 5,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
    width: '40%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CustomerDetails;
