import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import useStore from "../store";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const ref = useRef<HTMLInputElement>(null);
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const navigate = useNavigate();

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
        />
      </InputGroup>
    </form>
  );
};

export default SearchBar;
