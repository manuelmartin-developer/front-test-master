import { useContext } from "react";

import styles from "./Header.module.scss";

import { CursorVariantContext } from "../../contexts/CursorVariantContext";
import Nav from "../Nav/Nav";

const Header: React.FC = () => {
  // App contexts
  const { setCursorVariant } = useContext(CursorVariantContext);

  // Methods
  const onExitApp = () => {
    setCursorVariant("hidden");
  };

  const onEnterApp = () => {
    setCursorVariant("default");
  };
  return (
    <header
      className={styles.header}
      onMouseEnter={onEnterApp}
      onMouseLeave={onExitApp}
      data-testid="header"
    >
      <Nav />
    </header>
  );
};

export default Header;
