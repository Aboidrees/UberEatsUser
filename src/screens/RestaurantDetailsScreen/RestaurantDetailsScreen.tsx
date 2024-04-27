import {useEffect} from "react";
import {Divider} from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";
import {generateClient} from "aws-amplify/api";
import {Text, View, FlatList} from "react-native";
import {Pressable, StyleSheet} from "react-native";
import {useRoute, useNavigation} from "@react-navigation/native";


import {DishListItem, RestaurantHeader} from "../../components";
import {getRestaurant} from "../../graphql/queries";
import {useRestaurantContext} from "../../context";
import {LoadingIndicator} from "../../components";

const client = generateClient();

const RestaurantDetailsScreen = () => {

  const navigation = useNavigation<any>();
  const {params} = useRoute<any>();
  const restaurantId = params?.id;

  const {restaurant, setRestaurant, basket, basketDishes} = useRestaurantContext();

  useEffect(() => {
    restaurantId && client
      .graphql({query: getRestaurant, variables: {id: restaurantId}})
      .then(({data}) => setRestaurant(data.getRestaurant))
      .catch(console.log);
  }, [restaurantId]);


  if (!restaurant || restaurantId !== restaurant?.id) return <LoadingIndicator/>;

  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={() => <RestaurantHeader restaurant={restaurant}/>}
        data={restaurant.Dishes.items}
        renderItem={({item}) => <DishListItem dish={item}/>}
        ItemSeparatorComponent={() => <Divider/>}
        keyExtractor={(item) => item.name}
      />

      <Ionicons
        onPress={() => navigation.goBack()}
        name="arrow-back-circle"
        size={45}
        color="white"
        style={styles.iconContainer}
      />
      {!!basket && (
        <Pressable onPress={() => navigation.navigate("Basket")} style={styles.button}>
          <Text style={styles.buttonText}>
            Open Basket ({basketDishes.length})
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {flex: 1},
  iconContainer: {
    position: "absolute",
    top: 40,
    left: 10
  },
  image: {
    width: "100%",
    aspectRatio: 5 / 3
  },
  title: {
    fontSize: 35,
    fontWeight: "600",
    marginVertical: 10
  },
  menuTitle: {
    marginTop: 20,
    fontSize: 18,
    letterSpacing: 0.7
  },
  subtitle: {
    fontSize: 15,
    color: "#525252"
  },
  container: {
    margin: 10
  },
  button: {
    backgroundColor: "black",
    marginTop: "auto",
    padding: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18
  },
});


export default RestaurantDetailsScreen;

