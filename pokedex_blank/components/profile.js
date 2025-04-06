import { Button, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';



const Profile = ({navigation}) => {
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
                <Text style={styles.datos}>Nuncio</Text>

                <Text style={styles.label}>Correo:</Text>{/* //label */}
                <Text style={styles.datos}>utm23090708@utma.edu.mx</Text>


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
        marginLeft:100
    },
    datos:{
        fontSize:20,
        fontWeight:"bold",
        margin:10,
        color:"gray"
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