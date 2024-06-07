import { Box, Text, VStack, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useMessages } from "../integrations/supabase/index.js";

const Messages = () => {
  const { data: messages, isLoading, error } = useMessages();

  if (isLoading) return <Spinner />;

  if (error) return (
    <Alert status="error">
      <AlertIcon />
      Error loading messages: {error.message}
    </Alert>
  );

  return (
    <Box>
      <Text fontSize="xl">Messages</Text>
      <VStack spacing={4} align="stretch">
        {messages.map((message) => (
          <Box key={message.id} p={4} borderWidth={1} borderRadius="md">
            <Text>{message.for}</Text>
            <Text>{message.created_at}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Messages;