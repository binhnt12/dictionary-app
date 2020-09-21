import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../components/LoginAndRegister/LoginForm";
import SignUp from "../components/LoginAndRegister/SignUpForm";

export default function LoginAndRegisterScreen() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
