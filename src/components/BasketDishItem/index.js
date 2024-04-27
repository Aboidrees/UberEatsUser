import {View, Text, StyleSheet, Image} from "react-native";
import {DEFAULT_IMAGE} from "../../config/constants";

export const BasketDishItem = ({basketDish}) => {
  return (
    <View style={styles.row}>
      <View style={styles.quantityContainer}>
        <Text>{basketDish.quantity}</Text>
      </View>
      <Text>X</Text>
      <Image source={{uri: basketDish.Dish.images[0] ?? DEFAULT_IMAGE}} style={styles.image}/>
      <Text style={{fontWeight: "600", flex: 1}} numberOfLines={2}>{basketDish.Dish.name}</Text>
      <Text style={{marginLeft: "auto"}}>${basketDish.Dish.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  
  quantityContainer: {
    backgroundColor: "lightgrey",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },
});
