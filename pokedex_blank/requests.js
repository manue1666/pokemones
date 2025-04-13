import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


export const request = axios.create({
    baseURL:"https://mlt3d0rr-5000.usw3.devtunnels.ms"
})

//Esto se va a ejecutar ANTES de hacer la petición
request.interceptors.request.use( async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

//Esto se va a ejecutar INMEDIATAMENTE DESPUES de recibir una respuesta
request.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            await AsyncStorage.removeItem("token");
            navigate("Login")
        }
        return Promise.reject(error);
    }
);