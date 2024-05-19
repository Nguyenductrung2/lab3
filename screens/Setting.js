import {View} from "react-native"
import {Button} from "react-native-paper"
import { logout, useMyContextProvider } from "../index"
import { useEffect } from "react"

const Setting = ({navigation}) => {
    const [controller, dispatch] = useMyContextProvider();
    const {userLogin} = controller
    useEffect(()=>{
        if(userLogin==null)
            navigation.navigate("Login")
    }, [userLogin])

    const handleLogout = () => {
        logout(dispatch);
    };
    
    return(
        <View style={{ padding:40, flex:1, justifyContent:"center"}}>
            <Button
                buttonColor="#feb47b"
                textColor="black"
                mode="contained"
                onPress={handleLogout}
            >
                Logout
            </Button>
        </View>
    )
}

export default Setting