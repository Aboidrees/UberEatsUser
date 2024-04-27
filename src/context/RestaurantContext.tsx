import {createContext, useState, useEffect, useContext} from "react";
import {generateClient} from "aws-amplify/api";


import {Restaurant, Basket, BasketDish, Dish} from "../API";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import {useAuthContext} from "./AuthContext";

const client = generateClient();

interface IRestaurantContext {
  restaurant: any;
  setRestaurant: (restaurant: any) => void;
  basket: Basket;
  basketDishes: BasketDish[];
  addDishToBasket: (dish: any, quantity: number) => Promise<void>;
  totalPrice: number;

}

// load and cache restaurant
// load and cache basket and dishes

const RestaurantContext = createContext<IRestaurantContext>({} as IRestaurantContext);
export const BasketContextProvider = ({children}) => {
  const {dbUser} = useAuthContext();

  const [restaurant, setRestaurant] = useState<Restaurant>(null);
  const [basket, setBasket] = useState<Basket | null>(null);
  const [basketDishes, setBasketDishes] = useState<BasketDish[]>([]);

  const totalPrice = basketDishes.reduce(
    (sum, basketDish) => sum + basketDish.quantity * basketDish.Dish.price,
    restaurant?.deliveryFee
  );


  // loading restaurant basket
  useEffect(() => {
    if (!restaurant || dbUser) return;

    client
      .graphql({
        query: queries.listBaskets,
        variables: {filter: {restaurantID: {eq: restaurant.id}, userID: {eq: dbUser.sub}}, limit: 1},
      })
      .then(({data}) => setBasket(data.listBaskets.items[0] as Basket))
      .catch(console.log);
  }, [dbUser, restaurant]);


  // loading the basket dishes
  useEffect(() => {
    basket && client
      .graphql({query: queries.listBasketDishes, variables: {filter: {basketID: {eq: basket.id}}}})
      .then(({data}) => setBasketDishes(data.listBasketDishes.items))
      .catch(console.log);
  }, [basket]);


  const addDishToBasket = async (dish: Dish, quantity: number) => {

    //get the existing basket or create a new one
    let currentBasket = basket || (await createNewBasket());

    const basketID = currentBasket.id;
    const basketDishDishId = dish.id;

    //create a BasketDish item and save to DataStore
    client
      .graphql({
        query: mutations.createBasketDish,
        variables: {input: {quantity, basketDishDishId, basketID}},
      })
      .then(({data}) => {
        setBasketDishes([...basketDishes, data.createBasketDish]);
      });
  }

  const createNewBasket = async () => {

    if (!restaurant) return;

    const restaurantID = restaurant.id;
    const userID = dbUser.sub;
    const {data} = await client.graphql({
      query: mutations.createBasket,
      variables: {input: {restaurantID, userID}}
    });
    setBasket(data.createBasket);
    return data.createBasket;
  }


  return (
    <RestaurantContext.Provider
      value={{
        restaurant,
        setRestaurant,
        basket,
        basketDishes,
        addDishToBasket,
        totalPrice,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

export const useRestaurantContext = () => useContext(RestaurantContext);
