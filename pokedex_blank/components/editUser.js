import { Alert, Button, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { request } from '../requests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { useEffect } from 'react';

const EditUser = ({ navigation }) => {

    const [data, setData] = useState({});

    const onChange = (target, value) => {
        const newData = data;
        newData[target] = value;
        setData(newData)
    }

    const submit = async () => {
        try {
            const token = await AsyncStorage.getItem("token")
            if (!token) {
                Alert.alert("Error", "No se encontró token de autenticación");
                return;
            }
            const res = await request.put("/users/update", data);
            console.log(res.data)
            navigation.navigate("Home")
            Alert.alert("Exito", "el usuario se edito con exito")
        } catch (error) {
            Alert.alert("hubo un error", "credenciales invalidas")
        }
    }

    return (
        <View style={styles.container}>
            {/* //container image */}
            <View>
                <Image
                    source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/2052px-Pok%C3%A9_Ball_icon.svg.png" }}
                    style={{ width: 150, height: 150 }}
                />
            </View>

            {/* //container form */}
            <View>
                <Text style={styles.title}>Editar Datos</Text>{/* //title */}

                <Text style={styles.label}>Nombre:</Text>{/* //label */}
                <TextInput
                    style={styles.input}
                    placeholder="Ingresa nuevo username"
                    onChangeText={(text) => onChange("name", text)}
                />

                <Text style={styles.label}>Correo:</Text>{/* //label */}
                <TextInput
                    style={styles.input}
                    placeholder="Ingresa nuevo correo"
                    onChangeText={(text) => onChange("email", text)}
                />


                <Pressable style={styles.send} onPress={submit}>
                    <Text style={styles.textButton}>Send</Text>
                </Pressable>


            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        margin: 15
    },
    label: {
        fontSize: 20,
        fontWeight: "bold",
    },
    input: {
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "gray",
        fontSize: 20,
        paddingHorizontal: 10,
        marginVertical: 15,
        backgroundColor: "white",
    },
    send: {
        backgroundColor: "red",
        borderRadius: 10,
        marginTop: 15,
        alignItems: "center",
        paddingVertical: 10,

    },
    textButton: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    containerFooter: {
        marginTop: 20,
        alignItems: "center",
    },
    footerText: {
        fontSize: 20,
        margin: 5,
    },
});

export default EditUser