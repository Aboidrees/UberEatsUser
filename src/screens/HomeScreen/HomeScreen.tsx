import {useEffect, useState} from "react";
import {FlatList, View} from "react-native";
import {generateClient} from "aws-amplify/api";
import {RestaurantItem} from "../../components";
import {listRestaurants} from "../../graphql/queries";

const client = generateClient();

const HomeScreen = () => {
  const [restaurants, setRestaurants] = useState([]);

  const loadRestaurants = async () =>
    client
      .graphql({query: listRestaurants})
      .then(({data}) => setRestaurants(data.listRestaurants.items))
      .catch(console.log);

  useEffect(() => {
    (async () => loadRestaurants())();
  }, []);

  return (
    <View style={{padding: 10}}>
      <FlatList
        onRefresh={loadRestaurants}
        refreshing={false}
        keyExtractor={(item) => item.id}
        data={restaurants}
        renderItem={({item}) => <RestaurantItem restaurant={item}/>}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};


export default HomeScreen;