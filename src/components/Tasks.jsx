import { useState } from "react";
import { Box, Button, Input, VStack, HStack, Text, IconButton, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useTasks, useAddTask, useUpdateTask, useDeleteTask } from "../integrations/supabase/index.js";

const Tasks = () => {
  const { data: tasks, isLoading } = useTasks();
  const addTask = useAddTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState("");

  const handleAddTask = () => {
    addTask.mutate({ task_name: newTask });
    setNewTask("");
  };

  const handleUpdateTask = (task) => {
    updateTask.mutate({ ...task, task_name: editingTaskName });
    setEditingTask(null);
    setEditingTaskName("");
  };

  const handleDeleteTask = (id) => {
    deleteTask.mutate(id);
  };

  const inputBg = useColorModeValue("white", "gray.700");
  const buttonBg = useColorModeValue("teal.500", "teal.200");
  const buttonColor = useColorModeValue("white", "black");

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <Box w="full" p={4}>
      <VStack spacing={4} align="stretch">
        <HStack>
          <Input
            placeholder="New Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            bg={inputBg}
          />
          <Button
            onClick={handleAddTask}
            bg={buttonBg}
            color={buttonColor}
            _hover={{ bg: useColorModeValue("teal.600", "teal.300") }}
          >
            Add Task
          </Button>
        </HStack>
        {tasks.map((task) => (
          <HStack key={task.id} spacing={4} w="full">
            {editingTask === task.id ? (
              <>
                <Input
                  value={editingTaskName}
                  onChange={(e) => setEditingTaskName(e.target.value)}
                  bg={inputBg}
                />
                <Button
                  onClick={() => handleUpdateTask(task)}
                  bg={buttonBg}
                  color={buttonColor}
                  _hover={{ bg: useColorModeValue("teal.600", "teal.300") }}
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <Text flex="1">{task.task_name}</Text>
                <IconButton
                  icon={<FaEdit />}
                  onClick={() => {
                    setEditingTask(task.id);
                    setEditingTaskName(task.task_name);
                  }}
                  aria-label="Edit Task"
                />
                <IconButton
                  icon={<FaTrash />}
                  onClick={() => handleDeleteTask(task.id)}
                  aria-label="Delete Task"
                />
              </>
            )}
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default Tasks;