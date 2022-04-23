import { createContext, useContext, useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Order, OrderDish } from "../models";
import { useAuthContext } from "./AuthContext";
import { useBasketContext } from "./BasketContext";
import { useNavigation } from "@react-navigation/native";

const OrderContext = createContext();

export const OrderContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();
  const {
    restaurant: Restaurant,
    totalPrice: total,
    basket,
    basketDishes,
  } = useBasketContext();
  const [orders, setOrders] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    dbUser &&
      DataStore.query(Order, (o) => o.userID("eq", dbUser?.id)).then(setOrders);
  }, [dbUser]);

  const createOrder = async () => {
    // Create the order
    const newOrder = await DataStore.save(
      new Order({ userID: dbUser.id, Restaurant, total, status: "NEW" })
    );

    // add all basket to order
    await Promise.all(
      basketDishes.map(({ quantity, Dish }) =>
        DataStore.save(new OrderDish({ orderID: newOrder.id, quantity, Dish }))
      )
    );

    // delete basket
    await DataStore.delete(basket);

    setOrders([...orders, newOrder]);
    navigation.navigate("OrdersTab");
  };

  const getOrders = async (id) => {
    const order = await DataStore.query(Order, id);
    const orderDishes = await DataStore.query(OrderDish, (od) =>
      od.orderID("eq", id)
    );

    return { ...order, dishes: orderDishes };
  };

  return (
    <OrderContext.Provider value={{ createOrder, orders, getOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);
