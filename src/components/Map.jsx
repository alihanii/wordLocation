import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import stylesBTN from "./Button.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { memo, useEffect, useState } from "react";
import { useMyC } from "../context/MyContext";
import useFndMyLoc from "../hook/geoLocation";
import useGetLoc from "../hook/getLoc";
function Map() {
  const { cities } = useMyC();
  const [lng, lat] = useGetLoc();
  const [myPosation, setMyPosation] = useState([40, 30]);
  const { posation, findLoc, isLoding } = useFndMyLoc();
  useEffect(
    function () {
      if (lat && lng) setMyPosation([lat, lng]);
    },
    [lat, lng]
  );
  useEffect(
    function () {
      if (posation) setMyPosation([posation.lat, posation.lng]);
    },
    [posation]
  );
  return (
    <div className={styles.mapContainer}>
      <button
        onClick={() => findLoc()}
        className={`${stylesBTN.btn} ${stylesBTN.position}`}
      >
        {!isLoding ? "my location" : "is Loding..."}
      </button>
      <MapContainer
        className={styles.map}
        center={myPosation}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((City) => (
          <Marker
            position={[City.position.lat, City.position.lng]}
            key={City.id}
          >
            <Popup>
              <span>{City.emoji}</span>
              <span>{City.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChengMap myPosation={myPosation} />
        <DetectMap />
      </MapContainer>
    </div>
  );
}
function ChengMap({ myPosation }) {
  const map = useMap();
  const x = [myPosation[1], myPosation[0]];
  map.setView(x);
  return null;
}
const DetectMap = memo(function DetectMap() {
  const navigat = useNavigate();
  useMapEvent({
    click: (e) => {
      navigat(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng} `);
    },
  });
});

export default Map;
