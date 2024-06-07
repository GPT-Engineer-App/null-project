import { Box, Flex, Text, Button, useColorMode, useColorModeValue, VStack, HStack, IconButton } from "@chakra-ui/react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { FaSun, FaMoon, FaTasks, FaFileAlt, FaEnvelope, FaUserShield } from "react-icons/fa";
import Tasks from "../components/Tasks.jsx";
import Files from "../components/Files.jsx";
import Messages from "../components/Messages.jsx";
import AdminView from "../components/AdminView.jsx";

const Dashboard = () => {
  const { session, logout } = useSupabaseAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const bg = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("black", "white");

  const isAdmin = session?.user?.id === "770a23b0-734c-4bb8-bce5-28574bf0c229";

  return (
    <Box bg={bg} color={color} minH="100vh">
      <Flex justify="space-between" align="center" p={4} borderBottomWidth={1}>
        <Text fontSize="2xl" fontWeight="bold">Dashboard</Text>
        <HStack spacing={4}>
          <IconButton
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
            aria-label="Toggle dark mode"
          />
          <Button onClick={logout}>Logout</Button>
        </HStack>
      </Flex>
      <Flex>
        <VStack
          as="nav"
          spacing={4}
          align="stretch"
          p={4}
          borderRightWidth={1}
          minW="200px"
        >
          <Button leftIcon={<FaTasks />} onClick={() => navigate("/dashboard/tasks")}>
            Tasks
          </Button>
          <Button leftIcon={<FaFileAlt />} onClick={() => navigate("/dashboard/files")}>
            Files
          </Button>
          <Button leftIcon={<FaEnvelope />} onClick={() => navigate("/dashboard/messages")}>
            Messages
          </Button>
          {isAdmin && (
            <Button leftIcon={<FaUserShield />} onClick={() => navigate("/dashboard/admin-view")}>
              Admin View
            </Button>
          )}
        </VStack>
        <Box flex="1" p={4}>
          <Routes>
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/files" element={<Files />} />
            <Route path="/messages" element={<Messages />} />
            {isAdmin && <Route path="/admin-view" element={<AdminView />} />}
          </Routes>
        </Box>
      </Flex>
    </Box>
  );
};

export default Dashboard;