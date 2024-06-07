import { Box, Flex, Text, Button, useColorMode, useColorModeValue, VStack, HStack, IconButton } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";

const AdminPage = () => {
  const { logout } = useSupabaseAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const bg = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("black", "white");

  return (
    <Box bg={bg} color={color} minH="100vh">
      <Flex justify="space-between" align="center" p={4} borderBottomWidth={1}>
        <Text fontSize="2xl" fontWeight="bold">Admin Dashboard</Text>
        <HStack spacing={4}>
          <IconButton
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
            aria-label="Toggle dark mode"
          />
          <Button onClick={logout}>Logout</Button>
        </HStack>
      </Flex>
      <Flex direction="column" align="center" justify="center" p={10}>
        <Text fontSize="3xl" mb={6}>Welcome to the Admin Dashboard</Text>
        <Button onClick={() => navigate("/dashboard")}>Go to User Dashboard</Button>
      </Flex>
    </Box>
  );
};

export default AdminPage;