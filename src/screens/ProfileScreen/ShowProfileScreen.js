import {
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    View,
  } from "react-native";
  import { Avatar } from "react-native-paper";
  import React, { useState, useEffect } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { Auth, DataStore } from "aws-amplify";
  import * as Location from "expo-location";
  
  import { useAuthContext } from "../../context";
  import { User } from "../../models";
  
  export const ShowProfileScreen = () => {
    const { sub, setDbUser, dbUser, authUser } = useAuthContext();
    console.log("🚀 ~ file: index.js:19 ~ ProfileScreen ~ authUser:", authUser);
  
    const [latitude, setLatitude] = useState(dbUser?.latitude || "0");
    const [longitude, setLongitude] = useState(dbUser?.longitude || "0");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [name, setName] = useState(dbUser?.name || "");
    const [lastName, setLastName] = useState(dbUser?.name || "");
    const [address, setAddress] = useState(dbUser?.address || "");
  
    const onSave = async () => {
      try {
        dbUser ? await updateUser() : await createUser();
        Alert.alert("", "Saved");
      } catch (e) {
        Alert.alert("Error", e.message);
      }
    };
  
    const createUser = async () => {
      try {
        const user = await DataStore.save(
          new User({
            name,
            address,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            sub,
          })
        );
        setDbUser(user);
      } catch (e) {
        Alert.alert("Error", e.message);
      }
    };
  
    const updateUser = async () => {
      const user = await DataStore.save(
        User.copyOf(dbUser, (updated) => {
          updated.name = name;
          updated.address = address;
          updated.latitude = parseFloat(latitude);
          updated.longitude = parseFloat(longitude);
        })
      );
  
      const result = await Auth.updateUserAttributes(dbUser, {
        phone_number: phoneNumber,
      });
  
      setDbUser(user);
    };
  
    useEffect(() => {
      if (latitude === "0" || longitude === "0") {
        Location.requestForegroundPermissionsAsync().then(({ status }) => {
          if (status !== "granted") {
            console.log("Permission to access location was denied");
            return;
          }
  
          Location.getCurrentPositionAsync({}).then((location) => {
            console.log(location);
            setLatitude(location.latitude);
            setLongitude(location.longitude);
          });
        });
      }
    }, []);
  
    return (
      <SafeAreaView style={{ padding: 30 }}>
        <Avatar.Image
          style={{ alignSelf: "center" }}
          size={130}
          source={require("../../../assets/avatar.png")}
        />
  
        <View style={{ paddingVertical: 30 }} />
        <View style={{ flexDirection: "row", width: "100%" }}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Name"
            style={[styles.input, { flex: 1 }]}
          />
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last Name"
            style={[styles.input, { flex: 1 }]}
          />
        </View>
  
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
          value={latitude}
          onChangeText={setLatitude}
          placeholder="Latitude"
          style={styles.input}
          keyboardType="numeric"
        />
  
        <TextInput
          value={longitude}
          onChangeText={setLongitude}
          placeholder="Longitude"
          style={styles.input}
          keyboardType="numeric"
        />
  
        <TouchableOpacity
          style={[styles.saveButton, styles.button]}
          onPress={onSave}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          onPress={() => Auth.signOut()}
          style={[styles.singOutButton, styles.button]}
        >
          <Text style={styles.signOutButtonText}>Sign out</Text>
        </TouchableOpacity>
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
      margin: 10,
      backgroundColor: "white",
      paddingVertical: 5,
      paddingHorizontal: 15,
      borderRadius: 50,
      borderColor: "lightgrey",
      borderWidth: 0.3,
    },
    button: {
      alignItems: "center",
      color: "white",
      padding: 10,
      margin: 10,
      borderRadius: 50,
    },
    saveButton: {
      backgroundColor: "orange",
    },
    singOutButton: {
      backgroundColor: "transparent",
      color: "orange",
    },
    buttonText: {
      fontSize: 17,
      color: "white",
    },
    signOutButtonText: {
      fontSize: 17,
      color: "orange",
    },
  });
  
  // const x = {
  //   Session: null,
  //   attributes: {
  //     email: "m.alshf3ee@gmail.com",
  //     email_verified: false,
  //     phone_number: "+97474480314",
  //     phone_number_verified: false,
  //     sub: "925d41a1-5d2b-40b0-a458-b0fb5afd11fa",
  //   },
  //   authenticationFlowType: "USER_SRP_AUTH",
  //   deviceKey: undefined,
  //   preferredMFA: "NOMFA",
  //   username: "925d41a1-5d2b-40b0-a458-b0fb5afd11fa",
  // };
  