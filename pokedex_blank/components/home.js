import { Text, View } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Profile from "./profile"
import Pokemons from "./pokemons"
import FavPokemons from "./favPokemons"

const Tab = createBottomTabNavigator()

const Home = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Perfil"
                component={Profile}
                options={{ headerShown: false }} />

            <Tab.Screen
                name="Pokemons"
                component={Pokemons}
                options={{ headerShown: false }} />

            <Tab.Screen
                name="FavPokemons"
                component={FavPokemons}
                options={{ headerShown: false }} />

        </Tab.Navigator>
    )
}

export default Home