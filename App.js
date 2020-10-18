import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from "./src/reducers";
// import Background from "./src/components/Background";
import Loading from "./src/components/Loading";
import ImgLoading from "./src/images/Spin-1s-200px.gif";

import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import DarkThemeProvider from "./src/utils/DarkThemeProvider";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <Loading
            image={ImgLoading}
            backgroundColor="rgba(0,0,0,0.5)"
            width={100}
            height={100}
          />
        }
        persistor={persistor}
      >
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
      </PersistGate>
    </Provider>
  );
}
