import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Text } from "react-native-paper";
import DatePicker from "react-native-date-picker";
import firestore from "@react-native-firebase/firestore";
import { useMyContextProvider } from "../index";

const Appointment = ({ navigation, route }) => {
    const { service } = route.params || {};
    const [datetime, setDatetime] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [controller] = useMyContextProvider();
    const { userLogin } = controller;
    const APPOINTMENTs = firestore().collection("Appointments");

    const handleSubmit = () => {
        const serviceTitle = service.title || "Unknown Service";
        const serviceCreator = userLogin.name || "Admin";
        const price = service.price || 0;

        APPOINTMENTs.add({
            email: userLogin.email,
            serviceTitle,
            serviceCreator,
            price,
            datetime,
            state: "new"
        })
        .then(r => {
            APPOINTMENTs.doc(r.id).update({ id: r.id });
            navigation.navigate("Appointments");
        });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>Tên dịch vụ:</Text>
                <Text style={styles.value}>{service && service.title}</Text>
            </View>
            <View style={styles.separator} />

            <View style={styles.row}>
                <Text style={styles.label}>Người tạo:</Text>
                <Text style={styles.value}>{userLogin && userLogin.name}</Text>
            </View>
            <View style={styles.separator} />

            <View style={styles.row}>
                <Text style={styles.label}>Giá:</Text>
                <Text style={styles.value}>{service && formatPrice(service.price)} ₫</Text>
            </View>
            <View style={styles.separator} />

            {service && service.image !== "" && (
                <>
                    <View style={styles.imageContainer}>
                        <Text style={styles.label}>Hình ảnh:</Text>
                        <Image
                            source={{ uri: service && service.image }}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.separator} />
                </>
            )}

            <DatePicker
                modal
                open={open}
                date={datetime}
                onConfirm={(date) => {
                    setOpen(false);
                    setDatetime(date);
                }}
                onCancel={() => {
                    setOpen(false);
                }}
            />

            <TouchableOpacity
                onPress={() => setOpen(true)}
                style={styles.datePicker}
            >
                <Text style={styles.label}>Chọn ngày giờ:</Text>
                <Text style={styles.value}>{datetime.toDateString()}</Text>
            </TouchableOpacity>
            <View style={styles.separator} />

            <Button
                style={styles.button}
                textColor="white"
                buttonColor="#FF69B4"
                mode="contained"
                onPress={handleSubmit}
            >
                Đặt lịch
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 20,
    },
    imageContainer: {
        marginVertical: 10,
    },
    image: {
        height: 300,
        width: '100%',
    },
    datePicker: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    button: {
        margin: 10,
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginVertical: 10,
    },
});

export default Appointment;