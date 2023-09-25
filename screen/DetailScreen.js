import {Button, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useRoute} from '@react-navigation/native';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import storage from "../utils/storage"


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
    const [date, setDate] = useState('09-10-2020');
    const [open, setOpen] = useState(false)


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
            {/*<Calendar*/}
            {/*    enableSwipeMonths={true}*/}
            {/*    onDayPress={(day) => {*/}
            {/*        console.log('selected day', day);*/}
            {/*    }}*/}
            {/*    renderArrow={(direction) => (*/}
            {/*        <View>*/}
            {/*            {direction === 'left' ? (*/}
            {/*                <Text>{'<'}</Text> // Šipka doleva*/}
            {/*            ) : (*/}
            {/*                <Text>{'>'}</Text> // Šipka doprava*/}
            {/*            )}*/}
            {/*        </View>*/}
            {/*    )}*/}
            {/*/>*/}

            {/*<DatePicker*/}
            {/*    date={date} // Initial date from state*/}
            {/*    mode="date" // The enum of date, datetime and time*/}
            {/*    modal*/}
            {/*    open={open}*/}
            {/*    placeholder="select date"*/}
            {/*    format="DD-MM-YYYY"*/}
            {/*    minDate="01-01-2016"*/}
            {/*    maxDate="01-01-2019"*/}
            {/*    confirmBtnText="Confirm"*/}
            {/*    cancelBtnText="Cancel"*/}
            {/*    customStyles={{*/}
            {/*        dateIcon: {*/}
            {/*            //display: 'none',*/}
            {/*            position: 'absolute',*/}
            {/*            left: 0,*/}
            {/*            top: 4,*/}
            {/*            marginLeft: 0,*/}
            {/*        },*/}
            {/*        dateInput: {*/}
            {/*            marginLeft: 36,*/}
            {/*        },*/}
            {/*    }}*/}
            {/*    onDateChange={(date) => {*/}
            {/*        setDate(date);*/}
            {/*    }}*/}
            {/*/>*/}

            {/*<Button title="Open" onPress={() => setOpen(true)} />*/}
            {/*<DatePicker*/}
            {/*    modal*/}
            {/*    open={open}*/}
            {/*    date={date}*/}
            {/*    onConfirm={(date) => {*/}
            {/*        setOpen(false)*/}
            {/*        setDate(date)*/}
            {/*    }}*/}
            {/*    onCancel={() => {*/}
            {/*        setOpen(false)*/}
            {/*    }}*/}
            {/*/>*/}


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