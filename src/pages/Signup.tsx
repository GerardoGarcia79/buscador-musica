import {
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const { signUpNewUser } = UserAuth();
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await signUpNewUser(email, password);
      if (result.success) {
        navigate("/");
      } else {
        setError(result.error.message);
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
      <form onSubmit={(e) => handleSignUp(e)}>
        <Heading fontWeight="bold" pb={2}>
          Sign up today!
        </Heading>
        <Text>
          Already have an account?{" "}
          <Link to="/signin">
            <Text as="u" textUnderlineOffset={2} display="inline">
              Sign in!
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
            colorScheme="blue"
            disabled={isLoading}
            w="full"
          >
            Sign up
          </Button>
          {error && (
            <Text color="red.400" align="center" pt={4}>
              {error}
            </Text>
          )}
        </FormControl>
      </form>
    </Container>
  );
};

export default Signup;
