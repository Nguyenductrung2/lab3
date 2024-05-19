import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Text } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('USERS')
            .where('role', '==', 'customer')
            .onSnapshot(querySnapshot => {
                const customersData = [];
                querySnapshot.forEach(documentSnapshot => {
                    customersData.push({
                        ...documentSnapshot.data(),
                        id: documentSnapshot.id,
                    });
                });
                setCustomers(customersData);
            });

        return () => unsubscribe();
    }, []);

    const handleDelete = (id) => {
        Alert.alert(
            'Delete Customer',
            'Are you sure you want to delete this customer?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'OK',
                    onPress: () => {
                        firestore()
                            .collection('USERS')
                            .doc(id)
                            .delete()
                            .then(() => {
                                Alert.alert('Success', 'Customer deleted successfully');
                            })
                            .catch(error => {
                                Alert.alert('Error', error.message);
                            });
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Email: {item.email}</Text>
            <View style={styles.buttonGroup}>
                <TouchableOpacity
                    style={styles.viewButton}
                    onPress={() => navigation.navigate('CustomerDetails', { customer: item })}
                >
                    <Text style={styles.buttonText}>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item.id)}
                >
                    <Icon name="trash" size={20} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Customers</Text>
            <FlatList
                data={customers}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    itemContainer: {
        margin: 10,
        padding: 20,
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    itemText: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 10,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    viewButton: {
        backgroundColor: '#ff7e5f',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: '#D32F2F',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    header: {
        padding: 20,
        fontSize: 26,
        fontWeight: "bold",
        color: '#6200EE',
        backgroundColor: '#E3F2FD',
        textAlign: 'center',
    },
});

export default Customers;
