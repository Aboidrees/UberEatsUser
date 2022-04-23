import { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Text, View, FlatList, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DataStore } from "aws-amplify";

import { DishListItem, RestaurantHeader, BlackButton } from "../../components";
import { useBasketContext } from "../../context";
import { Restaurant, Dish } from "../../models"


export const RestaurantDetailsScreen = () => {
  const navigation = useNavigation();
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);

  const { params } = useRoute();

  const id = params?.id;

  const { setRestaurant: setBasketRestaurant, basket, basketDishes } = useBasketContext()

  useEffect(() => {
    id && DataStore.query(Restaurant, id).then(setRestaurant);
    id && DataStore.query(Dish, (dish) => dish.restaurantID("eq", id)).then(setDishes);
  }, [id]);

  useEffect(() => setBasketRestaurant(restaurant), [restaurant]);

  if (!restaurant) return <ActivityIndicator size="large" color={"orange"} />

  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={() => <RestaurantHeader restaurant={restaurant} />}
        data={dishes}
        renderItem={({ item }) => <DishListItem dish={item} />}
        keyExtractor={(item) => item.name}
      />
      <Ionicons
        onPress={() => navigation.goBack()}
        name="arrow-back-circle"
        size={45}
        color="white"
        style={styles.iconContainer}
      />
      {basket && (
        <Pressable onPress={() => navigation.navigate("Basket")} style={styles.button}>
          <Text style={styles.buttonText}>Open Basket ({basketDishes.length})</Text>
        </Pressable>
      )}
    </View >
  );
};


const styles = StyleSheet.create({
  page: { flex: 1, },
  iconContainer: { position: "absolute", top: 40, left: 10, },
  image: { width: "100%", aspectRatio: 5 / 3, },
  title: { fontSize: 35, fontWeight: "600", marginVertical: 10, },
  menuTitle: { marginTop: 20, fontSize: 18, letterSpacing: 0.7, },
  subtitle: { fontSize: 15, color: "#525252", },
  container: { margin: 10, },
  button: { backgroundColor: "black", marginTop: "auto", padding: 20, alignItems: "center", },
  buttonText: { color: "white", fontWeight: "600", fontSize: 18, },

});