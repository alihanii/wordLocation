import CiteyItem from "./CiteyItem";
import styles from "./CityList.module.css";
import { useMyC } from "../context/MyContext";
import Spinner from "./Spinner";
function CityList() {
  const a = useMyC();
  if (a.isLoding) return <Spinner></Spinner>;
  return (
    <ul className={styles.cityList}>
      {a.cities.map((city) => (
        <CiteyItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
