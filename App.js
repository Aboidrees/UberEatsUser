import { withAuthenticator } from "aws-amplify-react-native/dist/Auth";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Amplify } from "aws-amplify";
import RootNavigator from "./src/navigation";
import config from "./src/aws-exports";
import { AuthContextProvider, BasketContextProvider } from "./src/context/";
import { OrderContextProvider } from "./src/context/OrderContext";

Amplify.configure({
  ...config,
  Analytics: { disabled: true },
});

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
