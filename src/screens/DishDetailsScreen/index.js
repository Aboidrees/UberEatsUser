import { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable, Image, ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { DataStore } from "aws-amplify";

import { Dish } from "../../models"
import { useBasketContext } from "../../context";
import { BlackButton } from "../../components";

const DEFAULT_IMAGE = "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg";


export const DishDetailsScreen = () => {
  const [dish, setDish] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params.id;

  const { addDishToBasket } = useBasketContext();

  const onMinus = () => (quantity > 1) && setQuantity(quantity - 1);
  const onPlus = () => setQuantity(quantity + 1);
  const getTotal = () => (dish.price * quantity).toFixed(2);

  useEffect(() => id && DataStore.query(Dish, id).then(setDish), [id]);

  const onAddToBasket = async () => {
    await addDishToBasket(dish, quantity);
    navigation.goBack();
  }

  if (!dish) return <ActivityIndicator size={"large"} color={"orange"} />

  return (
    <View style={styles.page}>
      <Image
        source={{
          uri: dish.image.startsWith("http") ? dish.image : DEFAULT_IMAGE,
        }}
        style={styles.image}
      />
      <Text style={styles.name}>{dish.name}</Text>
      <Text style={styles.description}>{dish.description}</Text>
      <View style={styles.separator} />
      <View style={styles.row}>
        <AntDesign name="minuscircleo" size={60} color={"black"} onPress={onMinus} />
        <Text style={styles.quantity}>{quantity}</Text>
        <AntDesign name="pluscircleo" size={60} color={"black"} onPress={onPlus} />
      </View>
      <Pressable onPress={onAddToBasket} style={styles.button}>
        <Text style={styles.buttonText}>Add {quantity} to basket &#8226; ${getTotal()}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  page: { flex: 1, width: "100%", padding: 10, },
  image: { width: "100%", aspectRatio: 5 / 3, marginBottom: 5, borderRadius: 2, },
  name: { fontSize: 30, fontWeight: "600", marginVertical: 10, },
  description: { color: "gray", },
  separator: { height: 1, backgroundColor: "lightgrey", marginVertical: 10, },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 50, },
  quantity: { fontSize: 25, marginHorizontal: 20, },
  button: { backgroundColor: "black", marginTop: "auto", padding: 20, alignItems: "center", },
  buttonText: { color: "white", fontWeight: "600", fontSize: 18, },
});