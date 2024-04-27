import {useState} from "react";
import {Text, TextInput, StyleSheet, Animated} from "react-native";
import {TouchableOpacity, Alert, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {generateClient} from "aws-amplify/api";
import {Avatar} from "react-native-paper";

import {createUser, updateUser} from "../../graphql/mutations";
import useLocation from "../../hooks/useLocation";
import {useAuthContext} from "../../context";
import {User} from "../../API";
import ScrollView = Animated.ScrollView;

 const ProfileScreen = () => {
  const client = generateClient();

  const {userId, setDbUser, dbUser, authUser, signOut} = useAuthContext();

  const [name, setName] = useState(dbUser?.name || "");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState<string>(dbUser?.address || "");
  const {latitude, longitude} = useLocation({latitude: 0, longitude: 0});

  const onSave = async () => {
    try {
     const user =  dbUser ? await updatingUser(dbUser.id) : await creatingUser();
     setDbUser(user.data[dbUser ? "updateUser" : "createUser"] as User);
     Alert.alert("", "Saved");
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  const creatingUser = async () => {
    const sub = userId;

    return await client
      .graphql({
        query: createUser,
        variables: {input: {name, address, latitude, longitude, sub},},
      })
  };

  const updatingUser = async (dbUserId: string) => {
    const sub = userId;

    return await client
      .graphql({
        query: updateUser,
        variables: {
          input: {id: dbUserId, name, address, latitude, longitude, sub},
          condition: {sub: {eq: sub}},
        },
      })


    // update user info

    // const result = await Auth.updateUserAttributes(dbUser, {
    // phone_number: phoneNumber,
    // });

    // setDbUser(user);
  };


  const separator = <View style={{paddingVertical: 12}}/>;

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{gap: 12, padding: 24, paddingBottom: 50}}>
        <Avatar.Image
          style={{alignSelf: "center"}}
          size={180}
          source={require("../../../assets/avatar.png")}
        />
        {separator}

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Full name"
          style={styles.input}
        />
        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Phone Number"
          style={styles.input}
        />

        <TextInput
          value={address}
          onChangeText={setAddress}
          placeholder="Address"
          style={styles.input}
        />

        <TextInput
          value={latitude.toString()}
          placeholder="Latitude"
          style={styles.input}
          keyboardType="numeric"
        />

        <TextInput
          value={longitude.toString()}
          placeholder="Longitude"
          style={styles.input}
          keyboardType="numeric"
        />
        {separator}
        <TouchableOpacity style={[styles.saveButton, styles.button]} onPress={onSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={signOut} style={[styles.singOutButton, styles.button]}>
          <Text style={styles.signOutButtonText}>Sign out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
    borderColor: "lightgrey",
    borderWidth: 0.3,
  },
  button: {
    alignItems: "center",
    color: "white",
    padding: 16,
    borderRadius: 50,
  },
  saveButton: {
    backgroundColor: "orange",
  },
  singOutButton: {
    backgroundColor: "#FF7676",
  },
  buttonText: {
    fontSize: 17,
    color: "white",
  },
  signOutButtonText: {
    fontSize: 17,
    color: "white",
  },
});


export default ProfileScreen;