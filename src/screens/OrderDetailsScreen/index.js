import { useEffect, useState } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useOrderContext } from "../../context";

import { BasketDishItem, OrderDetailsHeader } from "../../components";


export const OrderDetailsScreen = () => {
  const [order, setOrder] = useState(null);
  const { getOrders } = useOrderContext();
  const { params } = useRoute();
  const id = params?.id;

  useEffect(() => {
    id && getOrders(id).then(setOrder);
  }, [id]);

  if (!order) return <ActivityIndicator size={"large"} color="orange" />;

  return (
    <FlatList
      ListHeaderComponent={() => <OrderDetailsHeader order={order} />}
      data={order.dishes}
      renderItem={({ item }) => <BasketDishItem basketDish={item} />}
    />
  );
};