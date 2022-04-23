import { View, Text, Image, StyleSheet } from "react-native";

export const OrderDetailsHeader = ({ order }) => {
  return (
    <View>
      <View style={styles.page}>
        <Image source={{ uri: order.Restaurant.image }} style={styles.image} />

        <View style={styles.container}>
          <Text style={styles.title}>{order.Restaurant.name}</Text>
          <Text style={styles.subtitle}>{order.status} &#8226; 2 days ago</Text>

          <Text style={styles.menuTitle}>Your orders</Text>
        </View>
      </View>
    </View>
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
});
