import * as Location from "expo-location";
import {useState} from "react";


const useLocation = (initialLocation?:{latitude:number, longitude:number}) => {

  const [latitude, setLatitude] = useState<number>(initialLocation?.latitude || 0);
  const [longitude, setLongitude] = useState<number>(initialLocation?.longitude || 0);

  Location.requestForegroundPermissionsAsync().then(({status}) => {
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    Location.getCurrentPositionAsync({}).then((location) => {
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    });
  });

  return {latitude, longitude};
}

export default useLocation;