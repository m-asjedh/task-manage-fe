"use client";

import axios from "axios";
import { CheckCheck, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
  name: string;
  tasks: any[];
}

const fetchUsers = async () => {
  const data = await axios.get(
    `http://localhost:8080/api/v1/taskManager/users`
  );
  return data.data;
};

const deleteUser = async (userId: number) => {
  const data = await axios.delete(
    `http://localhost:8080/api/v1/taskManager/deleteUsers/${userId}`
  );
  return data;
};

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    async function getData() {
      await fetchUsers()
        .then((res) => setUsers(res))
        .finally(() => {
          setIsLoading(false);
        });
    }
    getData();
  }, []);

  const handleDeleteUser = async (userId: number) => {
    await deleteUser(userId);
    window.location.reload();
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl">Hello Admin,</h2>
      </div>
      <div className="mt-10" />
      <div className="flex flex-col gap-y-7">
        <div className="flex gap-6">
          <h3 className="w-[200px]">Name</h3>
          <h3 className="flex-1">Email</h3>
          <h3 className="w-[200px]">Number of tasks</h3>
          <h3 className="w-[200px]">Actions</h3>
        </div>
        {isLoading ? (
          <></>
        ) : users.length === 0 ? (
          <></>
        ) : (
          users.map((user) => (
            <div key={user.id} className="flex gap-6">
              <h3 className="w-[200px]">{user.name}</h3>
              <h3 className="flex-1">{user.email}</h3>
              <h3 className="w-[200px]">{user.tasks.length}</h3>
              <div className="w-[200px] flex gap-4">
                <button onClick={() => handleDeleteUser(user.id)}>
                  <Trash2 />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
