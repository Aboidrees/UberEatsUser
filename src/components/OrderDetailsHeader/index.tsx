import {FC} from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native";
import prettyDate from "pretty-date";


import {Order} from "../../API";
import {DEFAULT_IMAGE} from "../../config/constants";


interface IOrderDetailsHeaderProps {
  order: Order;
}

export const OrderDetailsHeader: FC<IOrderDetailsHeaderProps> = ({order}) => {
  const time = prettyDate.format(new Date(order.createdAt));

  return (
    <View>
      <View style={styles.page}>
        <Image source={{uri: order?.Restaurant?.images[0] ?? DEFAULT_IMAGE}} style={styles.image}/>

        <View style={styles.container}>
          <Text style={styles.title}>{order.Restaurant.name}</Text>
          <View style={styles.statusBar}>
            <Text style={styles.subtitle}>{order.status} &#8226; {time}</Text>
            {/*  Cancel Button*/}
            <TouchableOpacity>
              <Text style={{color: "red", fontWeight: "bold"}}>Cancel Order</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.menuTitle}>Your orders Details</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {flex: 1,},
  iconContainer: {position: "absolute", top: 40, left: 10,},
  image: {width: "100%", aspectRatio: 5 / 3,},
  title: {fontSize: 35, fontWeight: "600", marginVertical: 10,},
  statusBar: {flexDirection: "row", alignItems: "center", justifyContent: "space-between",},
  menuTitle: {marginTop: 20, fontSize: 18, letterSpacing: 0.7,},
  subtitle: {fontSize: 15, color: "#525252",},
  container: {margin: 10,},
});
