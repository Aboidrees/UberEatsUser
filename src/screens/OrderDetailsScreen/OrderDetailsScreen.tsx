import {FlatList} from "react-native";
import {Divider} from "react-native-paper";
import {FC, useEffect, useState} from "react";
import {useRoute} from "@react-navigation/native";

import {BasketDishItem, OrderDetailsHeader, LoadingIndicator} from "../../components";
import {useOrderContext} from "../../context";
import {Order} from "../../API";


const OrderDetailsScreen: FC = () => {
  const {params} = useRoute<any>();
  const orderID = params?.id;


  const [order, setOrder] = useState<Order>(null);
  const {fetchOrder} = useOrderContext();


  useEffect(() => {
    orderID && fetchOrder(orderID).then(setOrder);
  }, [orderID]);

  if (!order) return <LoadingIndicator/>;

  return (
    <FlatList
      data={order.OrderDishes.items}
      ItemSeparatorComponent={Divider}
      ListHeaderComponent={() => <OrderDetailsHeader order={order}/>}
      renderItem={({item}) => <BasketDishItem basketDish={item}/>}
    />
  );
};
export default OrderDetailsScreen;