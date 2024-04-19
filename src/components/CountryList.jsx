import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import { useMyC } from "../context/MyContext";
// import MyContext from "./MyContext";
function CountryList() {
  const a = useMyC();
  console.log(a);
  const isLoding = a.isLoding;
  const cities = a.cities;
  if (isLoding) return <Spinner />;
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((elm) => (
        <CountryItem country={elm} key={elm.country} />
      ))}
    </ul>
  );
}

export default CountryList;
