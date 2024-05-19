import React, { useState, useEffect } from "react";
import { Image, View, FlatList, TouchableOpacity, Alert } from "react-native";
import { Text, TextInput } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import LinearGradient from 'react-native-linear-gradient';

const ServicesCustomer = ({ navigation }) => {
    const [initialServices, setInitialServices] = useState([]);
    const [services, setServices] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Services')
            .onSnapshot(querySnapshot => {
                const services = [];
                querySnapshot.forEach(documentSnapshot => {
                    services.push({
                        ...documentSnapshot.data(),
                        id: documentSnapshot.id,
                    });
                });
                setServices(services);
                setInitialServices(services);
            });

        return () => unsubscribe();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={{ margin: 10, borderRadius: 15, marginVertical: 5 }}>
            <LinearGradient
                colors={['#ff7e5f', '#feb47b']}
                style={{ padding: 15, borderRadius: 15 }}
            >
                <Menu>
                    <MenuTrigger>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }}>
                            <Text style={{fontSize: 18, fontWeight: "bold", color: "#fff"}}>{item.title}</Text>
                            <Text style={{fontSize: 18, fontWeight: "bold", color: "#fff"}}>{formatPrice(item.price)} ₫</Text>
                        </View>
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption onSelect={() => handleAppointment(item)}><Text>Appointment</Text></MenuOption>
                    </MenuOptions>
                </Menu>
            </LinearGradient>
        </TouchableOpacity>
    );

    const handleAppointment = (service) => {
        navigation.navigate("Appointment", { service });
    }

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
            <Image source={require("../assets/logolab3.png")}
                style={{
                    alignSelf: "center",
                    marginVertical: 50
                }}
            />
            <TextInput
                label={"Search by name"}
                value={name}
                onChangeText={(text) => {
                    setName(text);
                    const result = initialServices.filter(service => service.title.toLowerCase().includes(text.toLowerCase()));
                    setServices(result);
                }}
                style={{ marginHorizontal: 20, marginBottom: 20 }}
            />
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginBottom: 10
            }}>
                <Text style={{
                    fontSize: 25,
                    fontWeight: "bold",
                }}>
                    Danh sách dịch vụ
                </Text>
            </View>
            <FlatList
                data={services}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingHorizontal: 10 }}
            />
        </View>
    )
}

export default ServicesCustomer;
