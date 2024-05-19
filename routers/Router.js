import {createStackNavigator} from "@react-navigation/stack"
import Login from "../screens/Login"
import Register from "../screens/Register"
import Admin from "../screens/Admin"
import Customer from "../screens/Customer"
import ForgotPassword from "../screens/ForgotPassword"
import Customers from "../screens/Customers"
import CustomerDetails from "../screens/CustomerDetails"
import EditCustomer from "../screens/EditCustomer"
import EditProfile from "../screens/EditProfile"
import ProfileCustomer from "../screens/ProfileCustomer"

const Stack = createStackNavigator()

const Router = () =>{
    return(
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Admin" component={Admin}/>
            <Stack.Screen name="Customer" component={Customer}/>
            <Stack.Screen name="Register" component={Register}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
        <Stack.Screen 
          name="Customers" 
          component={Customers} 
          options={{ title: 'Customers' }} 
        />
        <Stack.Screen 
          name="CustomerDetails" 
          component={CustomerDetails} 
          options={{ 
            title: 'Customer Details',
            headerBackTitleVisible: false,
            headerBackTitle: 'Back',
          }} 
        />
        <Stack.Screen 
          name="EditCustomer" 
          component={EditCustomer} 
          options={{ 
            title: 'Edit Customer',
            headerBackTitleVisible: false,
          }} 
        />
        <Stack.Screen name="ProfileCustomer" component={ProfileCustomer} />
        <Stack.Screen 
          name="EditProfile" 
          component={EditProfile} 
          options={{ headerTitle: 'Edit Profile' }}
        />
        </Stack.Navigator>
    )
}

export default Router;