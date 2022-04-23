import { View, FlatList } from "react-native";

import { OrderListItem } from "../../components";
import { useOrderContext } from "../../context";

export const OrdersScreen = () => {

  const { orders } = useOrderContext();

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <FlatList data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </View>
  );
};