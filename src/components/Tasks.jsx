import { useState } from "react";
import { Box, Button, Input, VStack, HStack, Text, IconButton } from "@chakra-ui/react";
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

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <Box>
      <VStack spacing={4}>
        <HStack>
          <Input
            placeholder="New Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button onClick={handleAddTask}>Add Task</Button>
        </HStack>
        {tasks.map((task) => (
          <HStack key={task.id} spacing={4}>
            {editingTask === task.id ? (
              <>
                <Input
                  value={editingTaskName}
                  onChange={(e) => setEditingTaskName(e.target.value)}
                />
                <Button onClick={() => handleUpdateTask(task)}>Save</Button>
              </>
            ) : (
              <>
                <Text>{task.task_name}</Text>
                <IconButton
                  icon={<FaEdit />}
                  onClick={() => {
                    setEditingTask(task.id);
                    setEditingTaskName(task.task_name);
                  }}
                />
                <IconButton
                  icon={<FaTrash />}
                  onClick={() => handleDeleteTask(task.id)}
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