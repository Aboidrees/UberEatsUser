import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Amplify } from "aws-amplify";
import RootNavigator from "./src/navigation";
import { AuthContextProvider, BasketContextProvider } from "./src/context/";
import { OrderContextProvider } from "./src/context/OrderContext";
import { withAuthenticator } from "@aws-amplify/ui-react-native";

import AmplifyConfig from "./src/amplifyconfiguration.json";

Amplify.configure(AmplifyConfig);

const App = () => (
  <NavigationContainer>
    <AuthContextProvider>
      <BasketContextProvider>
        <OrderContextProvider>
          <RootNavigator />
        </OrderContextProvider>
      </BasketContextProvider>
    </AuthContextProvider>
    <StatusBar style="dark" />
  </NavigationContainer>
);

export default withAuthenticator(App);
