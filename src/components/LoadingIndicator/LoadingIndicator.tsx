import React, {FC} from "react";
import {Text, View, ActivityIndicator} from "react-native";


interface ILoadingIndicatorProps {
  text?: string | null;

}

const LoadingIndicator: FC<ILoadingIndicatorProps> = ({text}) => {
  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <ActivityIndicator size={"large"} color="#3FC060"/>
      <Text style={{color: "#3FC060", marginTop: 10, marginStart: 20}}>
        {text || "Loading ..."}
      </Text>
    </View>
  );
};

export default LoadingIndicator;