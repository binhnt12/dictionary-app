import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./src/reducers";

import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import DarkThemeProvider from "./src/utils/DarkThemeProvider";

export default function App() {
  const Stack = createStackNavigator();

  const store = createStore(rootReducer, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      <DarkThemeProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="root"
              component={BottomTabNavigator}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </DarkThemeProvider>
    </Provider>
  );
}
