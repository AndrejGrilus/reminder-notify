import AsyncStorage from "@react-native-async-storage/async-storage";

async function saveData(key, value) {
    try {
        await AsyncStorage.setItem(key, value)
        console.log("Ulozenie uspesne")
        console.log(value)
    } catch (error) {
        console.error('Chyba pri ukladaní údajov:', error);
    }
}

async function getData(key) {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (error) {
        console.error('Chyba pri načítaní údajov:', error);
    }
}

const storageFunctions = {
    saveData,
    getData
};

export default storageFunctions