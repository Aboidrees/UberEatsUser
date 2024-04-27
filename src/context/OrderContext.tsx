import {createContext, useContext, useState, useEffect} from "react";
import {useNavigation} from "@react-navigation/native";
import {generateClient} from "aws-amplify/api";

import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import * as subscriptions from '../graphql/subscriptions';

import {BasketDish, Order, OrderStatus} from "../API";
import {useRestaurantContext} from "./RestaurantContext";
import {useAuthContext} from "./AuthContext";


interface IOrderContext {
  createOrder: () => Promise<void>;
  orders: Order[];
  fetchOrder: (id: string) => Promise<any>;
}

const OrderContext = createContext<IOrderContext>({} as IOrderContext);
const client = generateClient();

export const OrderContextProvider = ({children}) => {
    const {dbUser} = useAuthContext();

    const {basket, basketDishes,} = useRestaurantContext();
    const {restaurant: Restaurant, totalPrice: total} = useRestaurantContext();

    const [orders, setOrders] = useState<Order[]>([]);

    // const navigation = useNavigation<any>();

    useEffect(() => {
      if (!dbUser) return;
      const newOrderListener = client.graphql({query: subscriptions.onCreateOrder})
        .subscribe({
          next: ({data}) => {
            console.log('New Order:', data.onCreateOrder)
            setOrders([...orders, data.onCreateOrder as Order])
          },
          error: (error) => console.log('Error:', error)
        })
      return () => newOrderListener.unsubscribe();
    }, [dbUser]);

    const createOrder = async () => {
      const userID = dbUser.id;
      const orderRestaurantId = Restaurant.id;

      const {data: createOrderResult} = await client.graphql({
        query: mutations.createOrder,
        variables: {input: {userID, orderRestaurantId, total, status: OrderStatus.NEW}},
      });


      // add all basket to order
      await Promise.all(
        basketDishes.map(async ({quantity, Dish: dish}: BasketDish) => {
          const orderDishDishId = dish.id;
          const orderID = createOrderResult.createOrder.id;
          const {data} = await client
            .graphql({
              query: mutations.createOrderDish,
              variables: {input: {orderID, quantity, orderDishDishId}},
            });
          return data.createOrderDish;
        })
      );

      // delete basket
      // await client.graphql({query: mutations.deleteBasket, variables: {input: {id: basket.id}}});

      // setOrders([...orders, createOrderResult.createOrder]);
      // navigation.navigate("OrdersTab");
    };

    const fetchOrder = async (id: string) => {
      const {data: fetchingOrderResult} = await client.graphql({query: queries.getOrder, variables: {id: id}});
      // const orderDishes = await DataStore.query(OrderDish, (od) =>
      //   od.orderID("eq", id)
      // );

      return fetchingOrderResult.getOrder
    };

    return (
      <OrderContext.Provider value={{createOrder, orders, fetchOrder}}>
        {children}
      </OrderContext.Provider>
    );
  }
;

export const useOrderContext = () => useContext(OrderContext);
