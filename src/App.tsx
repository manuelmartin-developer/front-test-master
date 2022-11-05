import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "../src/styles/global.scss";

import Layout from "./components/Layout/Layout";
import Main from "./components/Main/Main";
import { UserSearchContext } from "./contexts/UserSearchContext";
import { CursorVariantContext } from "./contexts/CursorVariantContext";
import { CursorTextContext } from "./contexts/CursorTextContext";

const App = () => {
  // App states
  const [userSearch, setUserSearch] = useState<string | undefined>();
  const [cursorVariant, setCursorVariant] = useState<string>("default");
  const [cursorText, setCursorText] = useState<string>("");

  return (
    <CursorVariantContext.Provider value={{ cursorVariant, setCursorVariant }}>
      <CursorTextContext.Provider value={{ cursorText, setCursorText }}>
        <UserSearchContext.Provider value={{ userSearch, setUserSearch }}>
          <Router>
            <Layout>
              <Main />
            </Layout>
          </Router>
        </UserSearchContext.Provider>
      </CursorTextContext.Provider>
    </CursorVariantContext.Provider>
  );
};

export default App;
