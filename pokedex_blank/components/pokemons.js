import { Alert, Text, View, StyleSheet, FlatList, Image, Pressable } from 'react-native';
import { request } from '../requests';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Pokemons = ({ navigation }) => {
    const typeColors = {
        Fire: 'red',
        Flying: 'gray',
        Electric: 'gold',
        Water: 'dodgerblue',
        Grass: 'green',
        Ice: 'skyblue',
        Fighting: 'orange',
        Poison: 'purple',
        Ground: 'sienna',
        Rock: 'darkgray',
        Bug: 'limegreen',
        Ghost: 'indigo',
        Steel: 'lightgray',
        Fairy: 'pink',
        Dragon: 'darkblue',
        Psychic: 'hotpink',
        Normal: 'lightgray',
    };

    const [pokemons, setPokemons] = useState([]);
    // const { navigate } = useNavigation();

    const getData = async () => {
        try {
            const { data } = await request.get("/pokemon/get_pokemons/");
            setPokemons(data);
        } catch (error) {
            Alert.alert("Ocurrió un error al obtener los pokémones", "No se pudieron obtener los pokémones")
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const renderPokemon = ({ item }) => {
        const bgColor = typeColors[item.Type1] || 'lightgray';

        return (
            <Pressable onPress={() => navigation.navigate("UniquePokemon", { pokemon: item })}>
                <View style={styles.card}>
                    <View style={styles.infoPokemon}>
                        <Text style={styles.namePokemon}>{item.Name} {item.Form != " " ? item.Form : ""}</Text>
                        <Text style={styles.idPokemon}>{item.ID}</Text>
                        <View style={styles.tags}>
                            <Text style={[styles.typePokemon, { backgroundColor: typeColors[item.Type1] || 'gray' }]}>
                                {item.Type1}
                            </Text>
                            {item.Type2 != " " && (
                                <Text style={[styles.typePokemon, { backgroundColor: typeColors[item.Type2] || 'gray' }]}>
                                    {item.Type2}
                                </Text>
                            )}
                        </View>
                    </View>
                    <View style={[styles.imagePokemon, { backgroundColor: bgColor }]}>
                        <Image source={{ uri: item.img }} style={styles.image} />
                    </View>
                </View>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={pokemons}
                renderItem={renderPokemon}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listContent: {
        padding: 10,
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    infoPokemon: {
        width: '30%',
        backgroundColor: '#eee7e7',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        padding: 5,
    },
    namePokemon: {
        fontSize: 20,
        color: '#000',
        marginBottom: 5,
    },
    idPokemon: {
        fontSize: 20,
        color: '#000',
        marginBottom: 5,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    typePokemon: {
        margin: 2,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 15,
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
    imagePokemon: {
        width: '70%',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    image: {
        width: 150,
        height: 150,
    },
});

export default Pokemons;