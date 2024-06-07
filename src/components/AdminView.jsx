import { useState } from "react";
import { Box, Text, Input, Button, VStack, HStack } from "@chakra-ui/react";
import { useAddMessage } from "../integrations/supabase/index.js";

const AdminView = () => {
  const [newMessage, setNewMessage] = useState("");
  const addMessage = useAddMessage();

  const handleAddMessage = () => {
    addMessage.mutate(
      { for: newMessage },
      {
        onSuccess: () => {
          console.log("Message added successfully");
          setNewMessage("");
        },
        onError: (err) => {
          console.error("Error adding message:", err);
        },
      }
    );
  };

  return (
    <Box>
      <Text fontSize="xl">Welcome to the Admin View</Text>
      <VStack spacing={4} align="stretch">
        <HStack>
          <Input
            placeholder="New Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button onClick={handleAddMessage}>Add Message</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default AdminView;