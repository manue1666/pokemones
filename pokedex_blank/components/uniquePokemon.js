import { Alert, View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { request } from '../requests';
import { useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';

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

const UniquePokemon = () => {
    const [loading, setLoading] = useState(false);
    const { params } = useRoute();
    const { pokemon } = params;
    const navigation = useNavigation();
    const bgColor = typeColors[pokemon.Type1] || 'lightgray';

    const addFavorite = async (id) => {
        try {
            setLoading(true);
            await request.post("/pokemon_favorites/", { pokemon_id: id });
            Alert.alert("Éxito", "Pokémon añadido a favoritos");
        } catch (error) {
            Alert.alert("Error", "No se pudo guardar como favorito");
        } finally {
            setLoading(false);
        }
    };

    
    const stats = {
        HP: pokemon.HP,
        Attack: pokemon.Attack,
        Defense: pokemon.Defense,
        'Sp. Atk': pokemon.Sp?.[' Atk'] || 0,
        'Sp. Def': pokemon.Sp?.[' Def'] || 0,
        Speed: pokemon.Speed
    };

    return (
        <View style={[styles.background, { backgroundColor: bgColor }]}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {/* Header */}
                <View style={styles.head}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Text style={styles.arrow}>←</Text>
                    </Pressable>
                    <View style={styles.nameContainer}>
                        <Text style={[styles.name, { color: bgColor }]}>{pokemon.Name}</Text>
                        {pokemon.Form != " " && (
                            <Text style={[styles.name, { color: bgColor }]}> - {pokemon.Form}</Text>
                        )}
                    </View>
                    <Text style={styles.idPokemon}>#{pokemon.ID}</Text>
                </View>

                {/* Imagen del Pokémon */}
                <View style={styles.main}>
                    <View style={styles.imgPokemon}>
                        <Image source={{ uri: pokemon.img }} style={styles.image} />
                    </View>
                </View>

                {/* Footer con información */}
                <View style={styles.footer}>
                    {/* Tipos */}
                    <View style={styles.tags}>
                        <Text style={[styles.tag, { backgroundColor: typeColors[pokemon.Type1] || 'gray' }]}>
                            {pokemon.Type1}
                        </Text>
                        {pokemon.Type2 != " " && (
                            <Text style={[styles.tag, { backgroundColor: typeColors[pokemon.Type2] || 'gray' }]}>
                                {pokemon.Type2}
                            </Text>
                        )}
                    </View>

                    {/* Botón de favoritos */}
                    <Pressable 
                        style={styles.favoriteButton} 
                        onPress={() => addFavorite(pokemon._id.$oid)}
                        disabled={loading}
                    >
                        <Text style={styles.favoriteText}>
                            {loading ? "Guardando..." : "Añadir a favoritos"}
                        </Text>
                    </Pressable>

                    {/* Estadísticas */}
                    <View style={styles.stats}>
                        <Text style={styles.titleStats}>Estadísticas base</Text>
                        {Object.entries(stats).map(([stat, value]) => (
                            <View style={styles.row} key={stat}>
                                <Text style={styles.stat}>{stat}</Text>
                                <View style={styles.progressBar}>
                                    <View style={[styles.progressFill, { width: `${(value / 200) * 100}%` }]} />
                                </View>
                                <Text style={styles.statValue}>{value}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 20,
        alignItems: 'center',
    },
    arrow: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 30,
    },
    nameContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        flexDirection: 'row',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    idPokemon: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    main: {
        alignItems: 'center',
        marginVertical: 20,
    },
    imgPokemon: {
        borderRadius: 100,
        backgroundColor: 'white',
        padding: 5,
        borderWidth: 10,
        borderColor: 'white',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    footer: {
        padding: 30,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
        minHeight: '50%',
    },
    tags: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%',
        marginBottom: 20,
    },
    tag: {
        borderRadius: 10,
        padding: 10,
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    favoriteButton: {
        backgroundColor: '#cac9b1',
        borderRadius: 50,
        padding: 15,
        marginVertical: 10,
        width: 200,
        alignItems: 'center',
    },
    favoriteText: {
        fontWeight: 'bold',
    },
    stats: {
        width: '100%',
        marginTop: 20,
    },
    titleStats: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blueviolet',
        textAlign: 'center',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
        paddingHorizontal: 10,
    },
    stat: {
        width: 80,
        fontSize: 15,
        fontWeight: 'bold',
    },
    progressBar: {
        flex: 1,
        height: 10,
        backgroundColor: '#eee',
        borderRadius: 5,
        marginHorizontal: 10,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: 'blueviolet',
    },
    statValue: {
        width: 40,
        textAlign: 'right',
        fontWeight: 'bold',
    },
});

export default UniquePokemon;