"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";

interface RegisterRequestBody {
  email: string;
  password: string;
  name: string;
}

const register = async ({ email, password, name }: RegisterRequestBody) => {
  const data = await axios.post(
    "http://localhost:8080/api/v1/taskManager/signup",
    {
      email,
      password,
      name,
    }
  );

  return data.status;
};

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!(email && password && name)) return;
    try {
      await register({ email, password, name });
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col">
        <div className="flex mb-6">
          <h2 className="font-semibold text-xl">Create Account</h2>
        </div>
        <form
          className="flex flex-col gap-y-6 items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="border"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="border"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 font-medium">{error}</p>}
          <button type="submit" className="p-2 w-[100px] bg-sky-300">
            {isLoading ? "Loading..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}
