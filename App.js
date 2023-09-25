import React, {useEffect, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import registerNNPushToken, {getNotificationInbox} from 'native-notify';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./screen/HomeScreen";
import DetailScreen from "./screen/DetailScreen";
const Stack = createStackNavigator();

export default function App() {
    // const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);
    //
    // registerNNPushToken(12042, '1eNbIBqPWQ1OYfzbtBW8pd');
    //
    // useEffect(() => {
    //     const getNotif = async () => {
    //         try {
    //             let notifications = await getNotificationInbox(12042, '1eNbIBqPWQ1OYfzbtBW8pd');
    //             console.log("notifications: ", notifications);
    //             setData(notifications);
    //         } catch (error) {
    //             console.error("Chyba při získávání notifikací: ", error); // Ošetření chyb
    //         } finally {
    //             setLoading(false); // Zastavíme načítání, ať už bylo úspěšné nebo ne
    //         }
    //     }
    //     getNotif();
    // }, []);

    return (
        // <View style={styles.container}>
        //     <Text style={styles.appTitle}>Open up App.js to start working on your app!</Text>
        //     <StatusBar style="auto"/>
        //     {loading ? (
        //             <Text style={styles.loadingText}>Načítám notifikace...</Text>
        //         ) :
        //         //     (
        //         //     <FlatList
        //         //         data={data}
        //         //         renderItem={({ item }) => (
        //         //             <View style={styles.notificationContainer}>
        //         //                 <Text style={styles.notificationTitle}>{item.title}</Text>
        //         //                 <Text style={styles.notificationMessage}>{item.message}</Text>
        //         //             </View>
        //         //         )}
        //         //         keyExtractor={(item) => item.message}
        //         //     />
        //         // )
        //         data.map((item) => {
        //             return <View style={styles.notificationContainer} key={item.date}>
        //                 <Text style={styles.notificationTitle}>{item.title}</Text>
        //                 <Text style={styles.notificationMessage}>{item.message}</Text>
        //             </View>
        //         })
        //
        //     }
        //     <Text style={styles.centeredText}>Ahooj</Text>
        // </View>

        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Detail" component={DetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


