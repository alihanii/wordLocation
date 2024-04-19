// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import stylesBtn from "./Button.module.css";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import useGetLoc from "../hook/getLoc";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMyC } from "../context/MyContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Formm() {
  const url = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  const [cityName, setCityName] = useState("");
  const [isLoding, setIsLoding] = useState(null);
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useGetLoc();
  const [emoji, setEmoji] = useState("");
  const navigat = useNavigate();
  const { getNewCity } = useMyC();

  useEffect(
    function () {
      async function fetchCity() {
        try {
          setIsLoding(true);
          const res = await fetch(`${url}?latitude=${lat}&longitude=${lng}`);
          const data = await res.json();
          setCityName(data.city);
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch {
          alert("error");
        } finally {
          setIsLoding(false);
        }
      }
      fetchCity();
    },
    [lat, lng]
  );
  function handlerAddNewCity(e) {
    e.preventDefault();
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };
    console.log(newCity.position);
    getNewCity(newCity);
  }

  if (isLoding) return <Spinner></Spinner>;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="data"
          selected={date}
          onChange={(date) => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <button
          onClick={(e) => handlerAddNewCity(e)}
          className={`${stylesBtn.btn} ${stylesBtn.primary}`}
        >
          Add
        </button>
        <button
          className={`${stylesBtn.btn} ${stylesBtn.back}`}
          onClick={(e) => {
            e.preventDefault();
            navigat(-1);
          }}
        >
          &larr; Back
        </button>
      </div>
    </form>
  );
}

export default Formm;
