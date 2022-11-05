import { Link } from "react-router-dom";

import styles from "./Nav.module.scss";

import InputSearchBox from "../Input/InputSearchBox";

const Nav: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.header__logo}>
        <img
          src="/assets/images/commons/samyroad-logo-black.svg"
          alt="samyroad logo"
          width={100}
          height={100}
        />
      </Link>
      <InputSearchBox />
    </nav>
  );
};

export default Nav;
