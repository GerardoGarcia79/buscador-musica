import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { debounce } from "lodash";
import { useEffect, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useStore from "../store";

const SearchBar = () => {
  const ref = useRef<HTMLInputElement>(null);
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const navigate = useNavigate();

  const debouncedSetSearchQuery = useRef(
    debounce((value: string) => {
      setSearchQuery(value);
    }, 1000)
  ).current;

  useEffect(() => {
    return () => {
      debouncedSetSearchQuery.cancel();
    };
  }, [debouncedSetSearchQuery]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) {
          setSearchQuery(ref.current.value);
          navigate("/");
        }
      }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="Search..."
          variant="filled"
          onChange={(e) => {
            debouncedSetSearchQuery(e.target.value);
          }}
        />
      </InputGroup>
    </form>
  );
};

export default SearchBar;
