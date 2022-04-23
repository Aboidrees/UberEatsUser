import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Auth, DataStore } from "aws-amplify";

import { useAuthContext } from "../../context";
import { User } from "../../models";

export const ProfileScreen = () => {
  const { sub, setDbUser, dbUser } = useAuthContext();

  const [latitude, setLatitude] = useState(dbUser?.latitude + "" || "0");
  const [longitude, setLongitude] = useState(dbUser?.longitude + "" || "0");
  const [name, setName] = useState(dbUser?.name || "");
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

    setDbUser(user);
  };

  return (
    <SafeAreaView>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
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
        <Text style={styles.buttonText}>Sign out</Text>
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
    padding: 15,
    borderRadius: 5,
  },
  button: {
    alignItems: "center",
    color: "white",
    padding: 12,
    margin: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: "orange",
  },
  singOutButton: {
    backgroundColor: "lightgrey",
  },
  buttonText: {
    fontSize: 17,
    color: "white",
  },
});
