import { useState } from "react";
import { Box, Button, Input, VStack, HStack, Text, IconButton, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useUserFiles, useAddUserFile, useUpdateUserFile, useDeleteUserFile } from "../integrations/supabase/index.js";

const Files = () => {
  const { data: files, isLoading, error } = useUserFiles();
  const addUserFile = useAddUserFile();
  const updateUserFile = useUpdateUserFile();
  const deleteUserFile = useDeleteUserFile();

  const [newFile, setNewFile] = useState("");
  const [newFileDescription, setNewFileDescription] = useState("");
  const [editingFile, setEditingFile] = useState(null);
  const [editingFileName, setEditingFileName] = useState("");
  const [editingFileDescription, setEditingFileDescription] = useState("");

  // Handle adding a new file
  const handleAddFile = () => {
    addUserFile.mutate(
      { file_name: newFile, description: newFileDescription },
      {
        onSuccess: () => {
          console.log("File added successfully");
          setNewFile("");
          setNewFileDescription("");
        },
        onError: (err) => {
          console.error("Error adding file:", err);
        },
      }
    );
  };

  // Handle updating an existing file
  const handleUpdateFile = (file) => {
    updateUserFile.mutate(
      { ...file, file_name: editingFileName, description: editingFileDescription },
      {
        onSuccess: () => {
          console.log("File updated successfully");
          setEditingFile(null);
          setEditingFileName("");
          setEditingFileDescription("");
        },
        onError: (err) => {
          console.error("Error updating file:", err);
        },
      }
    );
  };

  // Handle deleting a file
  const handleDeleteFile = (id) => {
    deleteUserFile.mutate(id, {
      onSuccess: () => {
        console.log("File deleted successfully");
      },
      onError: (err) => {
        console.error("Error deleting file:", err);
      },
    });
  };

  if (isLoading) return <Spinner />;

  if (error) return (
    <Alert status="error">
      <AlertIcon />
      Error loading files: {error.message}
    </Alert>
  );

  return (
    <Box>
      <VStack spacing={4}>
        <HStack>
          <Input
            placeholder="New File"
            value={newFile}
            onChange={(e) => setNewFile(e.target.value)}
          />
          <Input
            placeholder="Description"
            value={newFileDescription}
            onChange={(e) => setNewFileDescription(e.target.value)}
          />
          <Button onClick={handleAddFile}>Add File</Button>
        </HStack>
        {files.map((file) => (
          <HStack key={file.id} spacing={4}>
            {editingFile === file.id ? (
              <>
                <Input
                  value={editingFileName}
                  onChange={(e) => setEditingFileName(e.target.value)}
                />
                <Input
                  value={editingFileDescription}
                  onChange={(e) => setEditingFileDescription(e.target.value)}
                />
                <Button onClick={() => handleUpdateFile(file)}>Save</Button>
              </>
            ) : (
              <>
                <Text>{file.file_name}</Text>
                <Text>{file.description}</Text>
                <IconButton
                  icon={<FaEdit />}
                  onClick={() => {
                    setEditingFile(file.id);
                    setEditingFileName(file.file_name);
                    setEditingFileDescription(file.description);
                  }}
                />
                <IconButton
                  icon={<FaTrash />}
                  onClick={() => handleDeleteFile(file.id)}
                />
              </>
            )}
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default Files;