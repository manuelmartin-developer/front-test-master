import { Props } from "../../helpers/interfaces";
import Cursor from "../Cursor/Cursor";
import Header from "../Header/Header";

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <Cursor />
      {children}
    </>
  );
};

export default Layout;
