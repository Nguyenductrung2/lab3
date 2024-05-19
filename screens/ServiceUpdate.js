import React, { useState } from "react";
import { View, Image } from 'react-native'
import { Text, TextInput, Button } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import storage from "@react-native-firebase/storage";
import ImagePicker from "react-native-image-crop-picker";

const ServiceUpdate = ({ route, navigation }) => {
    const { service } = route.params;
    const [title, setTitle] = useState(service.title);
    const [price, setPrice] = useState(service.price);
    const [imagePath, setImagePath] = useState(service.image);

    const handleUpdateService = async () => {
        try {
            await firestore()
                .collection('Services')
                .doc(service.id)
                .update({
                    title: title,
                    price: price
                });
            if (imagePath !== service.image) {
                const refImage = storage().ref(`/services/${service.id}.png`);
                await refImage.putFile(imagePath);
                const imageLink = await refImage.getDownloadURL();
                await firestore()
                    .collection('Services')
                    .doc(service.id)
                    .update({
                        image: imageLink
                    });
            }

            navigation.goBack();
        } catch (error) {
            console.error("Lỗi khi cập nhật dịch vụ:", error);
        }
    }

    const handleUploadImage = () => {
        ImagePicker.openPicker({
            mediaType: "photo",
            width: 400,
            height: 300
        })
        .then(image =>
            setImagePath(image.path)
        )
        .catch(e => console.log(e.message))
    }

    return (
        <View style={{ padding: 10 }}>
            {(imagePath !== "" &&
                <Image source={{ uri: imagePath }}
                    style={{ height: 300 }}
                />
            )}
            <Button style={{ margin: 20 }} buttonColor="pink" textColor="black" mode="contained" onPress={handleUploadImage}>Thay đổi hình ảnh</Button>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Tên dịch vụ *</Text>
            <TextInput
                style={{ marginBottom: 10, borderWidth: 1, borderColor: '#ccc', padding: 5 }}
                value={title}
                onChangeText={setTitle}
                placeholder="Nhập tên dịch vụ"
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Giá *</Text>
            <TextInput
                style={{ marginBottom: 10, borderWidth: 1, borderColor: '#ccc', padding: 5 }}
                value={price}
                onChangeText={setPrice}
                placeholder="0"
                keyboardType="numeric"
            />
            <Button buttonColor="pink" textColor="black" mode="contained" onPress={handleUpdateService}>Cập nhật</Button>
        </View>
    );
}

export default ServiceUpdate;
