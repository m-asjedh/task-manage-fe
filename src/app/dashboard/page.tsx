"use client";

import axios from "axios";
import { CheckCheck, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import CreateTaskDialog from "../../components/CreateTaskDialog";

interface Task {
  taskId: number;
  taskStatus: string;
  taskDate: string;
  task: string;
}

const fetchUserTasks = async (id: number) => {
  const data = await axios.get(
    `http://localhost:8080/api/v1/taskManager/tasks/${id}`
  );
  return data.data;
};

const deleteUserTask = async (userId: number, taskId: number) => {
  const data = await axios.delete(
    `http://localhost:8080/api/v1/taskManager/tasks/${userId}/${taskId}`
  );
  return data;
};
const completeUserTask = async (
  userId: number,
  taskId: number,
  task: string
) => {
  const data = await axios.put(
    `http://localhost:8080/api/v1/taskManager/tasks/${userId}/${taskId}`,
    {
      task: task,
      taskStatus: "Complete",
    }
  );
  return data;
};

export default function Page() {
  const [data, setData] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddNewTaskOpen, setIsAddNewTaskOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const userId = window.localStorage.getItem("userId");
    async function getData() {
      await fetchUserTasks(Number(userId!))
        .then((res) => setData(res))
        .finally(() => {
          setIsLoading(false);
        });
    }
    getData();
  }, []);

  const handleDeleteTask = async (taskId: number) => {
    const userId = window.localStorage.getItem("userId");
    await deleteUserTask(Number(userId!), taskId);
    window.location.reload();
  };
  const handlecomplteTask = async (taskId: number, task: string) => {
    const userId = window.localStorage.getItem("userId");
    await completeUserTask(Number(userId!), taskId, task);
    window.location.reload();
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl">Hello,</h2>
        <button
          className="p-4 bg-sky-300"
          onClick={() => setIsAddNewTaskOpen(true)}
        >
          Add a new task
        </button>
      </div>
      <div className="mt-10" />
      <div className="flex flex-col gap-y-7">
        <div className="flex gap-6">
          <h3 className="w-[200px]">Date</h3>
          <h3 className="flex-1">Task</h3>
          <h3 className="w-[200px]">Status</h3>
          <h3 className="w-[200px]">Actions</h3>
        </div>
        {isLoading ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : data.length === 0 ? (
          <div>
            <p>No tasks found.</p>
          </div>
        ) : (
          data.map((item) => (
            <div key={item.taskId} className="flex gap-6">
              <h3 className="w-[200px]">{item.taskDate}</h3>
              <h3 className="flex-1">{item.task}</h3>
              <h3 className="w-[200px]">{item.taskStatus}</h3>
              <div className="w-[200px] flex gap-4">
                <button onClick={() => handleDeleteTask(item.taskId)}>
                  <Trash2 />
                </button>
                {item.taskStatus === "In complete" && (
                  <button
                    onClick={() => handlecomplteTask(item.taskId, item.task)}
                  >
                    <CheckCheck />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {isAddNewTaskOpen && (
        <CreateTaskDialog onTaskCreate={() => setIsAddNewTaskOpen(false)} />
      )}
    </div>
  );
}
