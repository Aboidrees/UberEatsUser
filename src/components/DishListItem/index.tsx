import {FC} from "react";
import {useNavigation} from "@react-navigation/native";
import {View, Text, StyleSheet, Image, Pressable} from "react-native";

import {DEFAULT_IMAGE} from "../../config/constants";
import {Dish} from "../../API";


interface DishListItemProps {
  dish: Dish;
}

export const DishListItem: FC<DishListItemProps> = ({dish}) => {
    const navigation = useNavigation<any>();
    return (
      <Pressable onPress={() => navigation.navigate("Dish", {dish: dish})} style={styles.container}>
        <Image
          source={{
            uri: dish?.images[0]?.startsWith("http") ? dish?.images[0] : DEFAULT_IMAGE
          }}
          style={styles.image}
        />
        <View style={{flex: 1}}>
          <Text style={styles.name}>{dish.name}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {dish.description}
          </Text>
          <Text style={styles.price}>$ {dish.price.toFixed(1)}</Text>
        </View>
      </Pressable>
    );
  }
;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: "row",
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  description: {
    color: "gray",
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
  },
  image: {
    height: 75,
    aspectRatio: 1,
    borderRadius: 12,
  },
});
