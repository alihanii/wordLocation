import { useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useLoginC } from "../context/Logincontext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, isAuthenticated } = useLoginC();
  const navigate = useNavigate();
  function handlerLogin(e) {
    e.preventDefault();
    login(email, password);
  }
  useEffect(
    function () {
      isAuthenticated && navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );
  // if (isAuthenticated) <></>;
  return (
    <main className={styles.login}>
      <PageNav />

      <form onSubmit={handlerLogin} className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button className="cta">Login</button>
        </div>
      </form>
    </main>
  );
}
