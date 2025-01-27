import {
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <Flex justifyContent="center" height="100vh" width="100vw">
      <Center>
        <Container>
          <Heading>Oops</Heading>
          <Text my={2}>
            {isRouteErrorResponse(error)
              ? "This page does not exist."
              : "An unexpected error occurred."}
          </Text>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </Container>
      </Center>
    </Flex>
  );
};

export default ErrorPage;
