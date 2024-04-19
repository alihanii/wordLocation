//import { useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "./City.module.css";
import stylesBTN from "./Button.module.css";
import { useMyC } from "../context/MyContext";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  // TEMP DATA
  // const currentCity = {
  //   cityName: "Lisbon",
  //   emoji: "🇵🇹",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };
  //const id = useParams();
  const { fetchCity, currentCity, isLoding } = useMyC();
  const id = useParams();
  const { cityName, emoji, date, notes } = currentCity;
  const navigate = useNavigate();
  useEffect(
    function () {
      fetchCity(id);
    },
    [id, fetchCity]
  );
  if (isLoding) return <Spinner />;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      {/* <div>
        <ButtonBack />
      </div> */}
      <button
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
        className={`${stylesBTN.btn} ${stylesBTN.back}`}
      >
        back
      </button>
    </div>
  );
}

export default City;
