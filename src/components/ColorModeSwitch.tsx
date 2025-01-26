import { HStack, Switch, useColorMode } from "@chakra-ui/react";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack>
      {colorMode === "dark" && <FaMoon size={20} />}
      {colorMode === "light" && <IoSunny size={20} />}
      <Switch isChecked={colorMode === "dark"} onChange={toggleColorMode} />
    </HStack>
  );
};

export default ColorModeSwitch;
