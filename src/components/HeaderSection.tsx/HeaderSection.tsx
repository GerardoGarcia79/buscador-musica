import { Button, Flex, HStack, Image, Text } from "@chakra-ui/react";
import logo from "../../assets/lastfm-logo.svg";
import { UserAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ColorModeSwitch from "../ColorModeSwitch";
import SearchBar from "../SearchBar";

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
    <HStack>
      <Link to="/">
        <Image src={logo} boxSize="60px" />
      </Link>
      <SearchBar />
      <Flex
        flexDirection={{
          base: "column",
          md: "row",
        }}
      >
        <HStack
          justifyContent="flex-end"
          mb={{
            base: "2",
            md: "0",
          }}
        >
          <Button
            size="xs"
            colorScheme="blue"
            onClick={(e) => handleSignOut(e)}
          >
            Sign out
          </Button>
          <Text
            fontSize="sm"
            display={{
              base: "none",
              md: "inline",
            }}
            mx={2}
          >
            {session.user.email}
          </Text>
        </HStack>
        <ColorModeSwitch />
      </Flex>
      {error && (
        <Text color="red.400" pt={2}>
          {error}
        </Text>
      )}
    </HStack>
  );
};

export default HeaderSection;
