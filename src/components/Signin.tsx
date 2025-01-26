import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { Button, Heading, Input, Text, FormControl } from "@chakra-ui/react";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signInUser } = UserAuth();
  const navigate = useNavigate();

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
    <div>
      <form onSubmit={(e) => handleSignIn(e)} className="max-w-md m-auto pt-24">
        <Heading className="font-bold pb-2">Sign in</Heading>
        <Text>
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="underline underline-offset-2 inline">
              Sign up!
            </span>
          </Link>
        </Text>
        <FormControl>
          <Input
            id="email-input"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            p={3}
            mt={4}
            type="email"
          />
          <Input
            id="password-input"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            p={3}
            mt={4}
            type="password"
          />

          <Button
            type="submit"
            disabled={isLoading}
            colorScheme="blue"
            w="full"
            mt={4}
          >
            Sign in
          </Button>
        </FormControl>
        {error && <p className="text-red-600 text-center pt-4">{error}</p>}
      </form>
    </div>
  );
};

export default Signin;
