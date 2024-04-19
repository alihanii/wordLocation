import { useNavigate } from "react-router-dom";
import { useLoginC } from "../context/Logincontext";
import { useEffect } from "react";

function CheckLogin({ children }) {
  const { isAuthenticated } = useLoginC();
  const navigate = useNavigate();
  useEffect(
    function () {
      !isAuthenticated && navigate("/");
    },
    [isAuthenticated, navigate]
  );
  return isAuthenticated ? children : null;
}

export default CheckLogin;
