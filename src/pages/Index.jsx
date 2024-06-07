import { Container, Text, VStack, Input, Button, FormControl, FormLabel, Box, useToast, useColorMode, IconButton, HStack } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useState } from "react";
import { supabase } from "../integrations/supabase/index.js";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const { colorMode, toggleColorMode } = useColorMode();

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
      <HStack spacing={4} position="absolute" top={4} right={4}>
        <IconButton
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
          aria-label="Toggle dark mode"
        />
      </HStack>
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
          <Button
            mt={4}
            variant="link"
            onClick={() => navigate("/signup")}
            width="full"
          >
            Don't have an account? Sign up
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;