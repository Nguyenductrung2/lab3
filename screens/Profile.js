import React from "react";
import { Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { useMyContextProvider } from "../index";

const Profile = () =>{
    const [controller, dispatch] = useMyContextProvider();
    const { userLogin } = controller;

    return(
        <View style={{ flex: 1 }}>
            <Text style={styles.header}>Profile Screens</Text>
            {userLogin !== null && (
                <View style={styles.row}>
                    <Text style={styles.label}>Email: </Text>
                    <Text style={styles.value}>{userLogin.email}</Text>
                </View>
            )}
            {userLogin !== null && (
                <View style={styles.row}>
                    <Text style={styles.label}>Password: </Text>
                    <Text style={styles.value}>{userLogin.password}</Text>
                </View>
            )}
            {userLogin !== null && (
                <View style={styles.row}>
                    <Text style={styles.label}>Full Name: </Text>
                    <Text style={styles.value}>{userLogin.fullName}</Text>
                </View>
            )}
            {userLogin !== null && (
                <View style={styles.row}>
                    <Text style={styles.label}>Address: </Text>
                    <Text style={styles.value}>{userLogin.address}</Text>
                </View>
            )}
            {userLogin !== null && (
                <View style={styles.row}>
                    <Text style={styles.label}>Phone: </Text>
                    <Text style={styles.value}>{userLogin.phone}</Text>
                </View>
            )}
            {userLogin !== null && (
                <View style={styles.row}>
                    <Text style={styles.label}>Role: </Text>
                    <Text style={styles.value}>{userLogin.role}</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 15,
        fontSize: 25,
        fontWeight: "bold",
    },
    row: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 20,
    },
});

export default Profile;
