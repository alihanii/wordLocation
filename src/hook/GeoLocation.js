import { useState } from "react";

export default function useFndMyLoc() {
  const [posation, setPosation] = useState(null);
  const [isLoding, setIsLoding] = useState(null);
  const [error, setError] = useState(null);
  function findLoc() {
    setIsLoding(true);
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    function successCallback(pos) {
      const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      setPosation(loc);
      console.log(loc);
      setIsLoding(false);
    }
    function errorCallback(error) {
      setError(error);
      setIsLoding(false);
      console.log(error.message);
    }
  }
  return { posation, isLoding, error, findLoc };
}
