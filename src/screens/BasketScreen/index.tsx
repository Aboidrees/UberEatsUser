import {View, Text, StyleSheet, FlatList, Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {BasketDishItem} from "../../components";
import {useRestaurantContext, useOrderContext} from "../../context";

export const BasketScreen = () => {
  const {restaurant, basketDishes, totalPrice} = useRestaurantContext();
  const {createOrder} = useOrderContext();
  const navigation = useNavigation<any>();

  const onCreateOrder = async () => {
    createOrder().then(() => navigation.navigate("OrdersTab"))
  };

  return (
    <View style={styles.page}>
      <Text style={styles.name}>{restaurant?.name}</Text>

      <Text style={styles.label}>Your items</Text>

      <FlatList
        data={basketDishes}
        renderItem={({item}) => <BasketDishItem basketDish={item}/>}
      />

      <View style={styles.separator}/>

      <Pressable onPress={onCreateOrder} style={styles.button}>
        <Text style={styles.buttonText}>
          Create order &#8226; ${totalPrice.toFixed(2)}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {flex: 1, width: "100%", padding: 10},
  name: {fontSize: 24, fontWeight: "600", marginVertical: 10},
  description: {color: "gray"},
  label: {fontWeight: "bold", marginTop: 20, fontSize: 19},
  separator: {height: 1, backgroundColor: "lightgrey", marginVertical: 10},
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  quantity: {fontSize: 25, marginHorizontal: 20},
  button: {
    backgroundColor: "black",
    marginTop: "auto",
    padding: 20,
    alignItems: "center",
  },
  buttonText: {color: "white", fontWeight: "600", fontSize: 18},
  quantityContainer: {
    backgroundColor: "lightgrey",
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 10,
    borderRadius: 3,
  },
});
