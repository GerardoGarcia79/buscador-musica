import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import {
  Button,
  Heading,
  Input,
  Text,
  FormControl,
  InputRightElement,
  InputGroup,
  Container,
} from "@chakra-ui/react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signInUser } = UserAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await signInUser(email, password);
      if (result?.success) {
        navigate("/");
      } else {
        setError(result?.error.message);
      }
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Container
      h="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
    >
      <form onSubmit={(e) => handleSignIn(e)}>
        <Heading fontWeight="bold" pb={2}>
          Sign in
        </Heading>
        <Text>
          Don't have an account?{" "}
          <Link to="/signup">
            <Text as="u" textUnderlineOffset={2} display="inline">
              Sign up!
            </Text>
          </Link>
        </Text>
        <FormControl>
          <Input
            id="email-input"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            mt={4}
            type="email"
          />
          <InputGroup size="md" my={5}>
            <Input
              id="password-input"
              onChange={(e) => setPassword(e.target.value)}
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="3.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button
            type="submit"
            disabled={isLoading}
            colorScheme="blue"
            w="full"
          >
            Sign in
          </Button>
        </FormControl>
        {error && (
          <Text color="red.400" textAlign="center" pt={4}>
            {error}
          </Text>
        )}
      </form>
    </Container>
  );
};

export default Signin;
