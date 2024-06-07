import { useEffect } from "react";
import { Container, Text, VStack, Box, useColorMode, IconButton, HStack } from "@chakra-ui/react";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useSupabaseAuth } from '../integrations/supabase/auth.jsx';
import { supabase } from "../integrations/supabase/index.js";
import { useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

const SignUp = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (session) {
      navigate('/dashboard');
    }
  }, [session, navigate]);

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
        <Text fontSize="2xl">Sign Up</Text>
        <Box width="100%" maxW="md" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="default"
          />
        </Box>
      </VStack>
    </Container>
  );
};

export default SignUp;