import { Button, HStack, Image, Text } from "@chakra-ui/react";
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
      <Image src={logo} boxSize="60px" />
      <HStack>
        <Text fontSize="sm">{session.user.email}</Text>
        <Button size="xs" colorScheme="blue" onClick={(e) => handleSignOut(e)}>
          Sign out
        </Button>
        <ColorModeSwitch />
      </HStack>
      {error && <p className="text-red-600 pt-2">{error}</p>}
    </HStack>
  );
};

export default HeaderSection;
