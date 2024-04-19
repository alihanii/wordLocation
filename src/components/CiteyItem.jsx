import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useMyC } from "../context/MyContext";

function CiteyItem({ city }) {
  const { currentCity, deletData } = useMyC();
  function handlerDelete(e) {
    e.preventDefault();
    deletData(city.id);
  }
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          city.id === currentCity.id ? styles[`cityItem--active`] : ""
        }`}
        to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
      >
        <span className={styles.emoji}>{city.emoji}</span>
        <h3 className={styles.name}>{city.cityName}</h3>
        <time className={styles.date}>{formatDate(city.date)}</time>
        <button className={styles.deleteBtn} onClick={handlerDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CiteyItem;
