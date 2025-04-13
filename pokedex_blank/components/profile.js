import { Alert, Button, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { request } from '../requests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { useEffect } from 'react';


const Profile = ({ navigation }) => {
    const [userData, setUserData] = useState({ name: '', email: '' })

    useEffect(() => {
        const jalarDatos = async () => {
            try {
                
                const res = await request.get("/users/get")
                const { name, email } = res.data
                // console.log(name)
                // console.log(email)
                setUserData({ name, email })
            } catch (error) {
                console.error(error)
                Alert.alert("Hubo un error", "Credenciales inválidas")
            }
        };
        jalarDatos()

    }, []);




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
                <Text style={styles.title}>Datos</Text>{/* //title */}

                <Text style={styles.label}>Nombre:</Text>{/* //label */}
                <Text style={styles.datos}>{userData.name}</Text>

                <Text style={styles.label}>Correo:</Text>{/* //label */}
                <Text style={styles.datos}>{userData.email}</Text>


                <Pressable style={styles.send} onPress={() => navigation.navigate('EditUser')}>
                    <Text style={styles.textButton}>Change</Text>
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
        margin: 15,
        marginLeft: 50
    },
    datos: {
        fontSize: 20,
        fontWeight: "bold",
        margin: 10,
        color: "gray"
    },
    label: {
        fontSize: 20,
        fontWeight: "bold",
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

});

export default Profile