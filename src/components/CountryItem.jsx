import styles from "./CountryItem.module.css";

function CountryItem(a) {
  return (
    <li className={styles.countryItem}>
      <span>{a.country.emoji}</span>
      <span>{a.country.country}</span>
    </li>
  );
}

export default CountryItem;
