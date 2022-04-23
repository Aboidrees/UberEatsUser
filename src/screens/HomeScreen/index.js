import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { DataStore } from "aws-amplify";

import { RestaurantItem } from "../../components";
import { Restaurant } from "../../models"

export const HomeScreen = () => {

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => DataStore.query(Restaurant).then(setRestaurants), []);

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={restaurants}
        renderItem={({ item }) => <RestaurantItem restaurant={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
