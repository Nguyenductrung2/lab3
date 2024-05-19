import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import { useMyContextProvider } from "../index";

const Appointments = ({ route }) => {
    const [appointments, setAppointments] = useState([]);
    const navigation = useNavigation();
    const [controller] = useMyContextProvider();
    const { userLogin } = controller;

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Appointments')
            .onSnapshot(querySnapshot => {
                const appointmentsData = [];
                querySnapshot.forEach(documentSnapshot => {
                    appointmentsData.push({
                        ...documentSnapshot.data(),
                        id: documentSnapshot.id,
                    });
                });
                setAppointments(appointmentsData);
            });

        return () => unsubscribe();
    }, []);


    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    const renderItem = ({ item }) => (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>Tên dịch vụ:</Text>
                <Text style={styles.value}>{item.serviceTitle}</Text>
            </View>
            <View style={styles.separator} />

            <View style={styles.row}>
                <Text style={styles.label}>Người tạo:</Text>
                <Text style={styles.value}>{item.serviceCreator}</Text>
            </View>
            <View style={styles.separator} />

            <View style={styles.row}>
                <Text style={styles.label}>Giá:</Text>
                <Text style={styles.value}>{formatPrice(item.price)} ₫</Text>
            </View>
            <View style={styles.separator} />

            <View style={styles.row}>
                <Text style={styles.label}>Ngày giờ:</Text>
                <Text style={styles.value}>{new Date(item.datetime.seconds * 1000).toLocaleString()}</Text>
            </View>
            <View style={styles.separator} />

        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.header}>Appointments</Text>
            <FlatList
                data={appointments}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 15,
        fontSize: 25,
        fontWeight: "bold",
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    container: {
        margin: 10,
        padding: 15,
        borderRadius: 15,
        backgroundColor: '#e0e0e0'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    value: {
        fontSize: 16,
    },
    separator: {
        height: 1,
        backgroundColor: '#cccccc',
        marginVertical: 5
    }
});

export default Appointments;
