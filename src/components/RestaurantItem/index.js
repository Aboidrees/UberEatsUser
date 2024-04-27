import {StyleSheet, Text, View, Image, Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {DEFAULT_IMAGE} from "../../config/constants";

export const RestaurantItem = ({restaurant}) => {
  const navigation = useNavigation();
  
  const onPress = () =>
    navigation.navigate("Restaurant", {id: restaurant.id});
  
  return (
    <Pressable onPress={onPress} style={styles.restaurantContainer}>
      <Image
        source={{
          uri: restaurant.images[0].startsWith("http") ? restaurant.images[0] : DEFAULT_IMAGE,
        }}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>{restaurant.name}</Text>
          <Text style={styles.subtitle}>
            ${restaurant.deliveryFee.toFixed(1)} &#8226;{" "}
            {restaurant.minDeliveryTime} - {restaurant.maxDeliveryTime} minutes
          </Text>
        </View>
        
        <View style={styles.rating}>
          <Text>{restaurant.rating.toFixed(1)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  restaurantContainer: {
    width: "100%",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 5 / 3,
    marginBottom: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 5,
  },
  subtitle: {
    color: "grey",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: "auto",
    backgroundColor: "lightgray",
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
