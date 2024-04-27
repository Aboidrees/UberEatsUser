import {View, FlatList} from "react-native";

import {OrderListItem} from "../../components";
import {listOrders} from "../../graphql/queries";
import {useEffect, useState} from "react";
import {Order} from "../../API";
import {generateClient} from "aws-amplify/api";
import {useAuthContext} from "../../context";

const client = generateClient();
const OrdersScreen = () => {

  const {dbUser} = useAuthContext();
  const [orders, setOrders] = useState<Order[]>([]);

  const loadOrders = async () =>
    client
      .graphql({query: listOrders, variables: {filter: {userID: {eq: dbUser.id}}}})
      .then(({data}) => setOrders(data.listOrders.items))
      .catch(console.log);

  useEffect(() => {
    (async () => loadOrders())();
  }, [dbUser]);

  return (
    <View style={{flex: 1, width: "100%"}}>
      <FlatList
        onRefresh={loadOrders}
        refreshing={false}
        keyExtractor={(item) => item.id}
        data={orders}
        renderItem={({item}) => <OrderListItem order={item}/>}
      />
    </View>
  );
};

export default OrdersScreen;