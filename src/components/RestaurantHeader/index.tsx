import {View, Text, Image, StyleSheet} from "react-native";
import {Restaurant} from "../../API";
import {FC} from "react";
import {imageUrlCheck} from "../../urils";

const DEFAULT_IMAGE =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg";

interface IRestaurantHeaderProps {
  restaurant: Restaurant

}

export const RestaurantHeader: FC<IRestaurantHeaderProps> = ({restaurant}) => {
  return (
    <View style={styles.page}>
      <Image
        source={{
          uri: restaurant?.images[0]?.startsWith("http") ? restaurant?.images[0] : DEFAULT_IMAGE
        }}
        style={styles.image}
      />

      <View style={styles.details}>
        <Text style={styles.title}>{restaurant.name}</Text>
        <Text style={styles.subtitle}>
          ${restaurant.deliveryFee.toFixed(1)} &#8226;{" "}
          {restaurant.minDeliveryTime} - {restaurant.maxDeliveryTime} minutes
        </Text>

        <Text style={styles.menuTitle}>Menu</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {flex: 1},
  image: {width: "100%", aspectRatio: 5 / 3},
  title: {fontSize: 35, fontWeight: "600", marginVertical: 10},
  menuTitle: {marginTop: 20, fontSize: 18, letterSpacing: 0.7},
  subtitle: {fontSize: 15, color: "#525252"},
  details: {margin: 10},
});
