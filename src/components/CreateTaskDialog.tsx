import axios from "axios";
import { Cross, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CreateTaskRequestBody {
  task: string;
  taskStatus: string;
  taskDate: string;
}

interface CreateTaskDialogProps {
  onTaskCreate: () => void;
}

const createUserTasks = async (id: number, payload: CreateTaskRequestBody) => {
  const data = await axios.post(
    `http://localhost:8080/api/v1/taskManager/create/${id}`,
    {
      ...payload,
    }
  );
  return data;
};

export default function CreateTaskDialog({
  onTaskCreate,
}: CreateTaskDialogProps) {
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("In complete");
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const userId = window.localStorage.getItem("userId");
    if (!(task && date && status)) {
      setIsLoading(false);
      return;
    }
    try {
      const data = await createUserTasks(Number(userId!), {
        taskDate: date,
        taskStatus: status,
        task,
      });
      if (data.status === 201) {
        onTaskCreate();
        window.location.reload();
      }
    } catch (err) {
      console.warn(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed flex top-0 left-0 items-center justify-center right-0 bottom-0">
      <div className="w-[500px] h-[450px] shadow-md border flex flex-col p-8 z-30 bg-white">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl">Add New Task</h2>
          <button onClick={() => onTaskCreate()}>
            <X size={30} />
          </button>
        </div>
        <form className="mt-7 flex flex-col gap-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <label htmlFor="task">Task</label>
            <input
              id="task"
              type="text"
              className="border"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              className="border"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              id="status"
              className="border h-[30px]"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option value="In complete">In complete</option>
              <option value="Complete">Complete</option>
            </select>
          </div>
          <button
            type="submit"
            className="p-2 w-[100px] bg-sky-300 flex justify-center"
            disabled={isLoading}
          >
            {isLoading ? "Loading...." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}
