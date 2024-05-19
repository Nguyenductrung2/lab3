import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import RouterService from "../routers/RouterService";
import Transaction from "./Transaction";
import Setting from "./Setting";
import Customers from "./Customers";
import Appointments from "./Appointments";
import Profile from "./Profile";
import { Image } from "react-native";

const Tab = createMaterialBottomTabNavigator();

const Admin = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="RouterService"
        component={RouterService}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/home.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={Appointments}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/appointment.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Customers"
        component={Customers}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/customer.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/account.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/setting.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Admin;
