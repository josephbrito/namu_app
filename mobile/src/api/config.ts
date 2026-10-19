import { Platform } from 'react-native';

// Caso o celular seja físico, troque pelo IPV4 do seu computador na rede
const HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

export const API_URL = `http://${HOST}:3000`;