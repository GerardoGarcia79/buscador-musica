import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { Button, Heading, Input, Text, FormControl } from "@chakra-ui/react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUpNewUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await signUpNewUser(email, password);
      if (result.success) {
        navigate("/home");
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
    <div>
      <form onSubmit={(e) => handleSignUp(e)} className="max-w-md m-auto pt-24">
        <Heading className="font-bold pb-2">Sign up today!</Heading>
        <Text>
          Already have an account?{" "}
          <Link to="/signin">
            <Text className="underline underline-offset-2 inline">
              Sign in!
            </Text>
          </Link>
        </Text>
        <div className="flex flex-col py-4">
          <FormControl>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              p={3}
              mt={4}
              type="email"
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              p={3}
              mt={4}
              type="password"
            />
            <Button
              type="submit"
              colorScheme="blue"
              disabled={isLoading}
              mt={4}
              w="full"
            >
              Sign up
            </Button>
            {error && <p className="text-red-600 text-center pt-4">{error}</p>}
          </FormControl>
        </div>
      </form>
    </div>
  );
};

export default Signup;
