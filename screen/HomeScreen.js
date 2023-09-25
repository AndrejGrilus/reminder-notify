import {useNavigation} from '@react-navigation/native';
import {Button, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import registerNNPushToken, {getNotificationInbox} from "native-notify";
import {StatusBar} from "expo-status-bar";
import * as Notifications from "expo-notifications";
import * as Permissions from 'expo-permissions';


const HomeScreen = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    registerNNPushToken(12042, '1eNbIBqPWQ1OYfzbtBW8pd');

    useEffect(() => {
        const getNotif = async () => {
            try {
                let notifications = await getNotificationInbox(12042, '1eNbIBqPWQ1OYfzbtBW8pd');
                console.log("notifications: ", notifications);
                setData(notifications);
            } catch (error) {
                console.error("Chyba při získávání notifikací: ", error); // Ošetření chyb
            } finally {
                setLoading(false); // Zastavíme načítání, ať už bylo úspěšné nebo ne
            }
        }
        getNotif();
    }, []);

    const triggerNotifications = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "You ve got mail!",
                body: "Here is the notification body",
                sound: 'default', // Nastavení zvuku na výchozí hodnotu
                data: {data: "goes here"},
            },
            trigger: {seconds: 2},
        });
    }

    const getNotificationPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        return status === 'granted';
    }



    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        }),
    })

    return (
        <View style={styles.container}>
            <Text style={styles.appTitle}>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto"/>
            {loading ? (
                    <Text style={styles.loadingText}>Načítám notifikace...</Text>
                ) :
                //     (
                //     <FlatList
                //         data={data}
                //         renderItem={({ item }) => (
                //             <View style={styles.notificationContainer}>
                //                 <Text style={styles.notificationTitle}>{item.title}</Text>
                //                 <Text style={styles.notificationMessage}>{item.message}</Text>
                //             </View>
                //         )}
                //         keyExtractor={(item) => item.message}
                //     />
                // )
                data.map((item) => {
                    return <View style={styles.notificationContainer} key={item.date}>
                        <Text style={styles.notificationTitle}>{item.title}</Text>
                        <Text style={styles.notificationMessage}>{item.message}</Text>
                    </View>
                })

            }
            <Text style={styles.centeredText}>Ahooj</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Detail')}
            />

            <Button onPress={triggerNotifications} title="Trigger Local Notifications" color="#841584"
                    accessibilityLabel="Trigger Local Notifications"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'blue',
    },
    appTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center', // Centrování textu horizontálně

    },
    loadingText: {
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center', // Centrování textu horizontálně
    },
    notificationContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
    notificationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    notificationMessage: {
        fontSize: 16,
    },
    centeredText: {
        textAlign: 'center', // Centrování textu horizontálně
    },
});

export default HomeScreen