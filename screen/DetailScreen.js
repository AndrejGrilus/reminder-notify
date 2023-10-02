import {Button, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useRoute} from '@react-navigation/native';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import storage from "../utils/storage"
import Calendar from "../components/Calendar";
import RNDateTimePicker from "@react-native-community/datetimepicker";



const DetailScreen = () => {
    // const route = useRoute()
    const [formDataArray, setFormDataArray] = useState([{
        name: "",
        email: ""
    }])

    const [formData,setFormData] = useState({
        name: "",
        email: ""
    })
    const [date, setDate] = new useState(new Date("2021-12-31"))
    const [open, setOpen] = useState(false)

    const [shouldShowPicker,setShouldShowPicker] = useState(false)


    useEffect(() => {
        const reloadData = () =>{
            storage.getData("data").then(data=>{
                setFormDataArray(JSON.parse(data))
            }).catch(err => console.log(err))
        }
        reloadData()
    }, []);

    const handeNameChange = (text) => {
        const newObject = {...formData,name:text}
        setFormData(newObject)
    }

    const handleEmailChange = (text) => {
        const newObject = {...formData,email:text}
        setFormData(newObject)
    }

    const handleSubmit = async () => {
        const newArray = [...formDataArray, formData]
        setFormDataArray(newArray)
        storage.saveData("data", JSON.stringify(newArray)).catch(err=> console.log(err))

         setFormData({name: "",
            email: ""})
    }

    const handleReset = () =>{
        const newArray = []
        setFormDataArray(newArray)

        storage.saveData("data", JSON.stringify(newArray)).catch(err=>console.log(err))
    }

    const handleDateChange = (event, selectedDate) => {
        if (selectedDate !== undefined) {
            setDate(selectedDate);
            console.log(selectedDate)
        }
        setShouldShowPicker(!shouldShowPicker)
    };




    return (
        <View>
            <View>
                {/*<Text>{route.name}</Text>*/}
                <Text>Meno:</Text>
                <TextInput
                    placeholder={"Zadajte meno"}
                    value={formData.name}
                    onChangeText={handeNameChange}
                >
                </TextInput>
                <Text>Email:</Text>
                <TextInput
                    placeholder={"Zadaj mail"}
                    value={formData.email}
                    onChangeText={handleEmailChange}
                ></TextInput>
                <Button title="Odoslať" onPress={handleSubmit}/>
            </View>
            <View>
                <Button title={"Vymaž"} onPress={handleReset}></Button>
                <Text>Ahooj</Text>
            </View>


            {shouldShowPicker?<RNDateTimePicker
                value={new Date()} // Predvolený dátum
                mode="date" // Zabezpečí, aby sa zobrazil dátumový výber
                display="spinner" // Použiť spinner pre výber dátumu, ak je k dispozícii
                onChange={(event, date)=>handleDateChange(event,date)}
            />:<Button onPress={()=>setShouldShowPicker(!shouldShowPicker)} title={date.toISOString()}/>}
            <ScrollView>
                {formDataArray.map((info,index)=>{
                    return <View>
                        <Text>{info.name}</Text>
                        <Text>{info.email}</Text>
                    </View>
                })}
            </ScrollView>


        </View>

    )

}

export default DetailScreen