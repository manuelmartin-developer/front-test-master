import { FiSearch } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";

import styles from "./InputSearchBox.module.scss";

import { useDebounce } from "../../hooks/useDebounce";
import { UserSearchContext } from "../../contexts/UserSearchContext";
import { CursorVariantContext } from "../../contexts/CursorVariantContext";

const InputSearchBox: React.FC = () => {
  // Component states
  const [searchTerm, setSearchTerm] = useState<string>("");

  // App context
  const { setUserSearch } = useContext(UserSearchContext);
  const { setCursorVariant } = useContext(CursorVariantContext);

  // Custom hooks
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  // Methods
  const onHandleSearch = async (inputValue: string) => {
    if (inputValue.trim() === "") {
      setUserSearch(undefined);
      return;
    }
    setSearchTerm(inputValue);
  };

  const onEnterInput = () => {
    setCursorVariant("input");
  };

  const onEnterLeave = () => {
    setCursorVariant("default");
  };

  //   Lifecycle methods
  useEffect(() => {
    setUserSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.search_box}>
      <FiSearch className={styles.search_box__icon} />
      <input
        className={styles.search_box__input}
        type="text"
        placeholder="You're looking for something?"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onHandleSearch(event.target.value);
        }}
        onMouseEnter={onEnterInput}
        onMouseLeave={onEnterLeave}
      />
    </div>
  );
};

export default InputSearchBox;
