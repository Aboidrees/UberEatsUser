import {Amplify} from "aws-amplify";
import {StatusBar} from "expo-status-bar";
import {NavigationContainer} from "@react-navigation/native";
import {withAuthenticator} from "@aws-amplify/ui-react-native";

import {AuthContextProvider, BasketContextProvider, OrderContextProvider} from "./src/context/";
import RootNavigator from "./src/navigation";
import AmplifyConfig from "./src/amplifyconfiguration.json";

Amplify.configure(AmplifyConfig);

const App = () => (
  <NavigationContainer>
    <AuthContextProvider>
      <BasketContextProvider>
        <OrderContextProvider>
          <RootNavigator/>
        </OrderContextProvider>
      </BasketContextProvider>
    </AuthContextProvider>
    <StatusBar style="dark"/>
  </NavigationContainer>
);

export default withAuthenticator(App);
