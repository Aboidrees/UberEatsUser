// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatus = {
  "NEW": "NEW",
  "COOKING": "COOKING",
  "READY_FOR_PICKUP": "READY_FOR_PICKUP",
  "PICKED_UP": "PICKED_UP",
  "COMPLETED": "COMPLETED",
  "ACCEPTED": "ACCEPTED",
  "DECLINED_BY_RESTAURANT": "DECLINED_BY_RESTAURANT"
};

const TransportationModes = {
  "DRIVING": "DRIVING",
  "BICYCLING": "BICYCLING"
};

const { OrderDish, BasketDish, Basket, Order, Courier, User, Dish, Restaurant } = initSchema(schema);

export {
  OrderDish,
  BasketDish,
  Basket,
  Order,
  Courier,
  User,
  Dish,
  Restaurant,
  OrderStatus,
  TransportationModes
};