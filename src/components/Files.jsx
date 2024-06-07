import { useState } from "react";
import { Box, Button, Input, VStack, HStack, Text, IconButton } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useUserFiles, useAddUserFile, useUpdateUserFile, useDeleteUserFile } from "../integrations/supabase/index.js";

const Files = () => {
  const { data: files, isLoading } = useUserFiles();
  const addUserFile = useAddUserFile();
  const updateUserFile = useUpdateUserFile();
  const deleteUserFile = useDeleteUserFile();

  const [newFile, setNewFile] = useState("");
  const [editingFile, setEditingFile] = useState(null);
  const [editingFileName, setEditingFileName] = useState("");

  const handleAddFile = () => {
    addUserFile.mutate({ file_name: newFile });
    setNewFile("");
  };

  const handleUpdateFile = (file) => {
    updateUserFile.mutate({ ...file, file_name: editingFileName });
    setEditingFile(null);
    setEditingFileName("");
  };

  const handleDeleteFile = (id) => {
    deleteUserFile.mutate(id);
  };

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <Box>
      <VStack spacing={4}>
        <HStack>
          <Input
            placeholder="New File"
            value={newFile}
            onChange={(e) => setNewFile(e.target.value)}
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
                <Button onClick={() => handleUpdateFile(file)}>Save</Button>
              </>
            ) : (
              <>
                <Text>{file.file_name}</Text>
                <IconButton
                  icon={<FaEdit />}
                  onClick={() => {
                    setEditingFile(file.id);
                    setEditingFileName(file.file_name);
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