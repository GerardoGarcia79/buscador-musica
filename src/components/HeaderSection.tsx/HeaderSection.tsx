import { Button, Flex, HStack, Image, Text } from "@chakra-ui/react";
import logo from "../../assets/lastfm-logo.svg";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ColorModeSwitch from "../ColorModeSwitch";

const HeaderSection = () => {
  const [error, setError] = useState("");
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await signOut();
      navigate("/signin");
      setError("error");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("An error occurred, try again please.");
    }
  };
  return (
    <HStack justifyContent="space-between">
      <Image src={logo} boxSize="50px" />
      <Flex
        flexDirection={{
          base: "column",
          md: "row",
        }}
      >
        <HStack
          justifyContent="flex-end"
          mb={{
            base: "1",
            md: "0",
          }}
        >
          <Text
            fontSize="sm"
            display={{
              base: "none",
              md: "inline",
            }}
          >
            {session.user.email}
          </Text>
          <Button
            mr={1}
            size="xs"
            colorScheme="blue"
            onClick={(e) => handleSignOut(e)}
          >
            Sign out
          </Button>
        </HStack>
        <ColorModeSwitch />
      </Flex>
      {error && <p className="text-red-600 pt-2">{error}</p>}
    </HStack>
  );
};

export default HeaderSection;
