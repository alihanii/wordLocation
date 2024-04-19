import { useEffect, useState } from "react";

export default function useLocalStorage(key) {
  const [cities, setcities] = useState(function () {
    const res = localStorage.getItem(key);
    if (JSON.parse(res) === null) {
      return [];
    } else {
      return JSON.parse(res);
    }
  });
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(cities));
    },
    [cities, key]
  );
  return [cities, setcities];
}
