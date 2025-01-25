import { Button, Flex, HStack, Image, Text } from "@chakra-ui/react";
import logo from "../../assets/last-fm-logo.svg";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
    <Flex justifyContent="space-between">
      <Image background="red" src={logo} boxSize="60px" />
      <HStack>
        <Text>Logged with email: {session.user.email}</Text>
        <Button size="xs" colorScheme="blue" onClick={(e) => handleSignOut(e)}>
          Sign out
        </Button>
      </HStack>
      {error && <p className="text-red-600 pt-2">{error}</p>}
    </Flex>
  );
};

export default HeaderSection;
