import { DataStore } from "aws-amplify";
import { createContext, useState, useEffect, useContext } from "react";
import { Basket, BasketDish } from "../models";
import { useAuthContext } from "./AuthContext";



const BasketContext = createContext();
export const BasketContextProvider = ({ children }) => {

  const { dbUser } = useAuthContext();

  const [basketDishes, setBasketDishes] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [basket, setBasket] = useState(null);

  const totalPrice = basketDishes.reduce(
    (sum, basketDish) => sum + basketDish.quantity * basketDish.Dish.price,
    restaurant?.deliveryFee
  );

  useEffect(() => {
    basket && DataStore.query(
      BasketDish, bd => bd.basketID("eq", basket.id)
    ).then(setBasketDishes);
  }, [basket]);

  useEffect(() => {
    restaurant && DataStore.query(Basket, b =>
      b.restaurantID("eq", restaurant.id).userID("eq", dbUser.id)
    ).then(baskets => setBasket(baskets[0]));
  }, [dbUser, restaurant]);

  const addDishToBasket = async (dish, quantity) => {
    //get the existing basket or create a new one
    let theBasket = basket || await createNewBasket();

    //create a BasketDish item and save to DataStore
    const newBasketDish = await DataStore.save(
      new BasketDish({ quantity, Dish: dish, basketID: theBasket.id })
    );

    setBasketDishes([...basketDishes, newBasketDish]);
  };

  const createNewBasket = async () => {
    if (!restaurant.id) return;
    const newBasket = await DataStore.save(
      new Basket({ userID: dbUser.id, restaurantID: restaurant?.id })
    );
    setBasket(newBasket);
    return newBasket;
  }

  return (
    <BasketContext.Provider
      value={{
        restaurant,
        setRestaurant,
        basket,
        basketDishes,
        addDishToBasket,
        totalPrice
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasketContext = () => useContext(BasketContext);