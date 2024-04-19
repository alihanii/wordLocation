import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useLocalStorage from "../hook/localStorage";
const Myc = createContext();

function MyContext({ children }) {
  const [cities, setCities] = useLocalStorage("cityName");
  const [isLoding, setIsLoding] = useState(false);
  const [currentCity, setCurrentCity] = useState([]);
  useEffect(
    function () {
      async function fetchData() {
        try {
          setIsLoding(true);
          const res = await fetch`http://localhost:9000/cities`;
          const data = await res.json();
          setCities(data);
        } catch {
          alert("error");
        } finally {
          setIsLoding(false);
        }
      }
      fetchData();
    },
    [setCities]
  );
  const fetchCity = useCallback(async function fetchCity({ id }) {
    try {
      setIsLoding(true);
      const res = await fetch(`http://localhost:9000/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("error");
    } finally {
      setIsLoding(false);
    }
  }, []);
  async function getNewCity(newCity) {
    try {
      setIsLoding(true);
      const res = await fetch(`http://localhost:9000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "content-type": "application/json" },
      });
      const data = await res.json();
      setCities([...cities, data]);
    } catch {
      alert("error");
    } finally {
      setIsLoding(false);
    }
  }
  async function deletData(id) {
    try {
      setIsLoding(true);
      await fetch(`http://localhost:9000/cities/${id}`, {
        method: "DELETE",
      });
      setCities(() => cities.filter((element) => element.id !== id));
    } catch {
      alert("error");
    } finally {
      setIsLoding(false);
    }
  }
  return (
    <Myc.Provider
      value={{
        cities: cities,
        isLoding: isLoding,
        currentCity: currentCity,
        fetchCity: fetchCity,
        getNewCity: getNewCity,
        deletData: deletData,
      }}
    >
      {children}
    </Myc.Provider>
  );
}
function useMyC() {
  const context = useContext(Myc);
  if (context === undefined) throw new Error("Myc was used outside MyContext");
  return context;
}
export { useMyC };

export default MyContext;
