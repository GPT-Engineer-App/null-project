import { useState } from "react";
import { Container, Text, VStack, Input, Button, FormControl, FormLabel, Box, useToast } from "@chakra-ui/react";
import { supabase } from "../integrations/supabase/index.js";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      toast({
        title: "Sign up failed",
        description: "Passwords do not match",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password }, { data: { full_name: fullName } });
    if (error) {
      toast({
        title: "Sign up failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Sign up successful",
        description: "You have successfully signed up.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    }
    setLoading(false);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Sign Up</Text>
        <Box width="100%" maxW="md" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
          <FormControl id="fullName" isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
            />
          </FormControl>
          <FormControl id="email" isRequired mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </FormControl>
          <FormControl id="password" isRequired mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </FormControl>
          <FormControl id="confirmPassword" isRequired mt={4}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={loading}
            onClick={handleSignUp}
            width="full"
          >
            Sign Up
          </Button>
          <Button
            mt={4}
            variant="link"
            onClick={() => navigate("/")}
            width="full"
          >
            Already have an account? Log in
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default SignUp;