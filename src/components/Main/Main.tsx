import { Route, Routes } from "react-router-dom";

import Home from "../../pages/Home/Home";

const Main: React.FC = () => {
  return (
    <main className="main" data-testid="main">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
  );
};

export default Main;
