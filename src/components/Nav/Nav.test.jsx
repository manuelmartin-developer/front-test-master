import { render, screen } from "@testing-library/react";
import { UserSearchContext } from "../../contexts/UserSearchContext";
import userEvent from "@testing-library/user-event";

import { CursorVariantContext } from "../../contexts/CursorVariantContext";
import Nav from "./Nav";
import { BrowserRouter as Router } from "react-router-dom";

describe("Nav Tests", () => {
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
            <Nav />
          </Router>
        </UserSearchContext.Provider>
      </CursorVariantContext.Provider>
    );
  });

  test("Nav renders", () => {
    const navElement = screen.getByTestId("nav");
    expect(navElement).toBeInTheDocument();
  });

  test("Nav renders logo", () => {
    const logoElement = screen.getByTestId("logo");
    expect(logoElement).toBeInTheDocument();
  });

  test("Nav renders input search box", () => {
    const inputElement = screen.getByTestId("input-search-box");
    expect(inputElement).toBeInTheDocument();
  });

  test("User types in input search box", async () => {
    const user = userEvent.setup();
    const inputElement = screen.getByTestId("input-search-box");
    await user.click(inputElement);
    await user.type(inputElement, "test");
    expect(inputElement).toHaveValue("test");
  });

  test("User clicks on logo and is redirected to home page", async () => {
    const user = userEvent.setup();
    const logoElement = screen.getByTestId("logo");
    await user.click(logoElement);
    expect(window.location.pathname).toBe("/");
  });
});
