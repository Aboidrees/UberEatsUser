import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Foundation, FontAwesome5, MaterialIcons} from "@expo/vector-icons";

import {BasketScreen, OrdersScreen, OrderDetailsScreen,} from "../screens";
import {RestaurantDetailsScreen, DishDetailsScreen} from "../screens";
import {ProfileScreen, HomeScreen,} from "../screens";
import {useAuthContext} from "../context";
import {LoadingIndicator} from "../components";


const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const {dbUser, isLoading} = useAuthContext();
  
  if (isLoading) return <LoadingIndicator text={"Starting..."}/>;
  
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {dbUser ? (
        <Stack.Screen name="HomeTabs" component={HomeTabs}/>
      ) : (
        <Stack.Screen name="Profile" component={ProfileScreen}/>
      )}
    </Stack.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator barStyle={{backgroundColor: "white"}}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <Foundation name="home" size={24} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrderStackNavigator}
        options={{
          title: "Orders",
          tabBarIcon: ({color}) => (
            <MaterialIcons name="list-alt" size={24} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="user-alt" size={24} color={color}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Restaurants" component={HomeScreen}/>
      <HomeStack.Screen
        name="Restaurant"
        component={RestaurantDetailsScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen name="Dish" component={DishDetailsScreen}/>
      <HomeStack.Screen name="Basket" component={BasketScreen}/>
    </HomeStack.Navigator>
  );
};

const OrdersStack = createNativeStackNavigator();

const OrderStackNavigator = () => {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen name="Orders" component={OrdersScreen}/>
      <OrdersStack.Screen name="Order Details" component={OrderDetailsScreen}/>
    </OrdersStack.Navigator>
  );
};

export default RootNavigator;
