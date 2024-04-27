import {useState} from "react";
import {useRoute, useNavigation} from "@react-navigation/native";
import {View, Text, StyleSheet, Pressable, Image,} from "react-native";
import {AntDesign} from "@expo/vector-icons";


import {useRestaurantContext} from "../../context";
import {DEFAULT_IMAGE} from "../../config/constants";
import {LoadingIndicator} from "../../components";
import {Dish} from "../../API";

export const DishDetailsScreen = () => {
  const route = useRoute<any>();
  const [dish] = useState<Dish>(() => route.params.dish as Dish);
  const navigation = useNavigation();

  const [quantity, setQuantity] = useState(1);

  const {addDishToBasket} = useRestaurantContext();

  const onMinus = () => quantity > 1 && setQuantity(quantity - 1);
  const onPlus = () => setQuantity(quantity + 1);
  const getTotal = () => (dish.price * quantity).toFixed(2);

  const onAddToBasket = async () => {
    addDishToBasket(dish, quantity).then(navigation.goBack);
  };

  if (!dish) return <LoadingIndicator/>;

  return (
    <View style={styles.page}>
      <Image
        source={{uri: dish?.images[0]?.startsWith("http") ?? DEFAULT_IMAGE}}
        style={styles.image}
      />
      <Text style={styles.name}>{dish.name}</Text>
      <Text style={styles.description}>{dish.description}</Text>
      <View style={styles.separator}/>
      <View style={styles.row}>
        <AntDesign name="minuscircleo" size={60} color={"black"} onPress={onMinus}/>
        <Text style={styles.quantity}>{quantity}</Text>
        <AntDesign name="pluscircleo" size={60} color={"black"} onPress={onPlus}/>
      </View>
      <Pressable onPress={onAddToBasket} style={styles.button}>
        <Text style={styles.buttonText}>
          Add {quantity} to basket &#8226; ${getTotal()}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {flex: 1, width: "100%", padding: 10},
  image: {
    width: "100%",
    aspectRatio: 5 / 3,
    marginBottom: 5,
    borderRadius: 2,
  },
  name: {fontSize: 30, fontWeight: "600", marginVertical: 10},
  description: {color: "gray", fontSize: 16, writingDirection: "ltr", textAlign: "justify"},
  separator: {height: 1, backgroundColor: "lightgrey", marginVertical: 10},
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  quantity: {fontSize: 25, marginHorizontal: 20},
  button: {
    backgroundColor: "black",
    marginTop: "auto",
    padding: 20,
    alignItems: "center",
  },
  buttonText: {color: "white", fontWeight: "600", fontSize: 18},
});


export default DishDetailsScreen;