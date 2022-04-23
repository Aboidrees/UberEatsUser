import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
const prettyDate = require("pretty-date");

export const OrderListItem = ({ order }) => {
  const navigation = useNavigation();

  const time = prettyDate.format(new Date(order.createdAt));

  return (
    <Pressable
      onPress={() => navigation.navigate("Order Details", { id: order.id })}
      style={styles.container}
    >
      <Image source={{ uri: order.Restaurant.image }} style={styles.image} />

      <View>
        <Text style={styles.title}>{order.Restaurant.name}</Text>

        <Text style={{ marginVertical: 5 }}>3 items &#8226; $38.45</Text>
        <Text>
          {time} &#8226; {order.status}{" "}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", margin: 10, alignItems: "center" },
  image: { width: 75, height: 75, marginRight: 5 },
  title: { fontWeight: "600", fontSize: 16 },
});
