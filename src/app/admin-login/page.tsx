"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface LoginRequestBody {
  email: string;
  password: string;
}

const login = async ({ email, password }: LoginRequestBody) => {
  const data = await axios.post(
    "http://localhost:8080/api/v1/taskManager/adminLogin",
    {
      email,
      password,
    }
  );
  return data.status;
};

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    if (!(email && password)) return;
    try {
      const data = await login({ email, password });
      if (data === 200) {
        router.push("/admin-dashboard");
      }
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
          <h2 className="font-semibold text-xl">
            Login to your admin dashboard
          </h2>
        </div>
        <form
          className="flex flex-col items-center gap-y-6"
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
          <button
            type="submit"
            className="p-2 w-[100px] bg-sky-300 flex justify-center"
            disabled={isLoading}
          >
            {isLoading ? "Loading...." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
