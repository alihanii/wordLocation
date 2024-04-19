import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { useLoginC } from "../context/Logincontext";
function PageNav() {
  const { isAuthenticated, logout } = useLoginC();
  function handlerLogout() {
    logout();
  }
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/Product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/Pricing">Pricing</NavLink>
        </li>
        <li>
          {isAuthenticated ? (
            <NavLink onClick={handlerLogout} className={styles.ctaLink}>
              logout
            </NavLink>
          ) : (
            <NavLink to="/login" className={styles.ctaLink}>
              login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
