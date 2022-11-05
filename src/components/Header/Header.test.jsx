import { render, screen } from "@testing-library/react";
import { UserSearchContext } from "../../contexts/UserSearchContext";
import { CursorVariantContext } from "../../contexts/CursorVariantContext";
import Header from "./Header";
import { BrowserRouter as Router } from "react-router-dom";

describe("Header Tests", () => {
  beforeEach(() => {
    render(
      <CursorVariantContext.Provider
        value={{ cursorVariant: "default", setCursorVariant: jest.fn() }}
      >
        <UserSearchContext.Provider
          value={{
            userSearch: "test",
            setUserSearch: jest.fn(),
          }}
        >
          <Router>
            <Header />
          </Router>
        </UserSearchContext.Provider>
      </CursorVariantContext.Provider>
    );
  });

  test("Header renders", () => {
    const headerElement = screen.getByTestId("header");
    expect(headerElement).toBeInTheDocument();
  });

  test("Header renders nav", () => {
    const navElement = screen.getByTestId("nav");
    expect(navElement).toBeInTheDocument();
  });
});
