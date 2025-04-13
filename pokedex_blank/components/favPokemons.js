import { View, Text, Image, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { request } from '../requests';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

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

const FavPokemons = () => {
    const [pokemons, setPokemons] = useState([]);
    const [refreshing, setRefreshing] = useState(false); // Estado para el refresh
    const navigation = useNavigation();

    const fetchPokemons = async () => {
        try {
            const { data } = await request.get("/pokemon_favorites/get_pokemons/");
            setPokemons(data);
        } catch (error) {
            Alert.alert("Error", "No se pudieron cargar los favoritos");
        } finally {
            setRefreshing(false); // Asegurarse de desactivar el refreshing
        }
    };

    // Función para manejar el refresh manual
    const handleRefresh = () => {
        setRefreshing(true); // Activa el indicador de carga
        fetchPokemons(); // Vuelve a cargar los datos
    };

    useEffect(() => {
        fetchPokemons(); // Carga inicial
    }, []);

    

    const renderPokemon = ({ item }) => {
        const pokemon = item.pokemon;
        const bgColor = typeColors[pokemon.Type1] || 'lightgray';

        return (
            <Pressable onPress={() => navigation.navigate("UniquePokemon", { 
                pokemon: {
                    ...pokemon,
                    
                    Sp: {
                        ' Atk': pokemon.stats['Sp. Atk'],
                        ' Def': pokemon.stats['Sp. Def']
                    },
                    
                    HP: pokemon.stats.HP,
                    Attack: pokemon.stats.Attack,
                    Defense: pokemon.stats.Defense,
                    Speed: pokemon.stats.Speed
                }
            })}>
                <View style={styles.card}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{pokemon.Name}</Text>
                        {pokemon.Form !== " " && (
                            <Text style={styles.form}>{pokemon.Form}</Text>
                        )}
                        <Text style={styles.id}>#{pokemon.ID}</Text>
                        <View style={styles.types}>
                            <Text style={[styles.type, { backgroundColor: typeColors[pokemon.Type1] }]}>
                                {pokemon.Type1}
                            </Text>
                            {pokemon.Type2 !== " " && (
                                <Text style={[styles.type, { backgroundColor: typeColors[pokemon.Type2] }]}>
                                    {pokemon.Type2}
                                </Text>
                            )}
                        </View>
                    </View>
                    <View style={[styles.imageContainer, { backgroundColor: bgColor }]}>
                        <Image source={{ uri: pokemon.img }} style={styles.image} />
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
                keyExtractor={item => item.pokemon._id}
                contentContainerStyle={styles.listContent}
                refreshing={refreshing} // Estado del refresh
                onRefresh={handleRefresh} // Función que se ejecuta al hacer pull
            />
        </View>
    );
};

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
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
    },
    infoContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    form: {
        fontSize: 16,
        color: '#555',
    },
    id: {
        fontSize: 16,
        color: '#666',
        marginVertical: 5,
    },
    types: {
        flexDirection: 'row',
    },
    type: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 10,
        marginRight: 5,
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    imageContainer: {
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
    },
});

export default FavPokemons;