import { useSearchParams } from "react-router-dom";

function useGetLoc() {
  const [serachParams] = useSearchParams();
  const lat = serachParams.get("lat");
  const lng = serachParams.get("lng");
  return [lat, lng];
}

export default useGetLoc;
