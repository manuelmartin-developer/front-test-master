import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputSearchBox from "./InputSearchBox";
import { UserSearchContext } from "../../contexts/UserSearchContext";
import { CursorVariantContext } from "../../contexts/CursorVariantContext";

describe("Input search box Tests", () => {
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
          <InputSearchBox />
        </UserSearchContext.Provider>
      </CursorVariantContext.Provider>
    );
  });

  test("Input search box renders", () => {
    const inputElement = screen.getByTestId("input-search-box");
    expect(inputElement).toBeInTheDocument();
  });

  test("Input search box onChange", () => {
    const inputElement = screen.getByTestId("input-search-box");
    fireEvent.change(inputElement, { target: { value: "test" } });
    expect(inputElement).toHaveValue("test");
  });

  test("User types in input search box", async () => {
    const user = userEvent.setup();
    const inputElement = screen.getByTestId("input-search-box");
    await user.click(inputElement);
    await user.type(inputElement, "test");
    expect(inputElement).toHaveValue("test");
  });
});
