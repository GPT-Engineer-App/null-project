import { Container, Text, VStack, Input, Button, FormControl, FormLabel, Box, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "../integrations/supabase/index.js";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({
        title: "Login failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Login successful",
        description: "You have successfully logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Welcome to the Empty Project</Text>
        <Text>This is a blank canvas. Start building your project here.</Text>
        <Box width="100%" maxW="md" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
          <FormControl id="email" isRequired>
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
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={loading}
            onClick={handleLogin}
            width="full"
          >
            Login
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;