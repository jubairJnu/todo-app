"use client";
import config from "@/config";
import axios from "axios";
import { use, useEffect, useState } from "react";

type TTodo = {
  id: string;
  title: string;
  description?: string | null;
  status: "PENDING" | "IN_PROGRESS" | "DONE";
  createdAt: string;
  updatedAt: string;
};

const HomePage = () => {
  // const token = process.env.API_TOKEN;

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");

  async function loadTodos() {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`${config.api_url}/todos`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN ?? ""}`, // optional
        },
        params: { status: statusFilter || undefined },
      });

      setTodos(res.data);
    } catch (e: any) {
      setError(e?.message ?? "Request failed");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    loadTodos();
  }, [statusFilter]);

  const handleUpodateStatus = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      await axios.patch(
        `${config.api_url}/todos/${id}`,
        { status: "DONE" },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN ?? ""}`, // optional
          },
        }
      );

      loadTodos();
    } catch (e: any) {
      setError(e?.message ?? "Request failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      await axios.delete(`${config.api_url}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN ?? ""}`, // optional
        },
      });

      loadTodos();
    } catch (e: any) {
      setError(e?.message ?? "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 h-full min-h-screen w-full max-w-7xl ">
      <h1 className="text-2xl font-bold text-fuchsia-700 text-center my-5">
        Todo List
      </h1>
      {loading && <p>Loading...</p>}

      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="mt-4 w-full ">
        <div className="flex justify-end">
          {/* filter */}
          <label htmlFor="statusFilter" className="mr-2 font-medium">
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="">All</option>
            <option value="PENDING">PENDING</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
        </div>
        <table className="w-full border-collapse mt-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {todos?.length === 0 ? (
              <tr>
                <td colSpan={4} className="border px-4 py-2 text-center">
                  <p className="text-red-500">No todos found.</p>
                </td>
              </tr>
            ) : (
              todos?.map((todo: TTodo, index: number) => (
                <tr key={todo.id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{todo.title}</td>
                  <td className="border px-4 py-2">{todo.status}</td>
                  <td className="border px-4 py-2 flex items-center justify-center gap-5">
                    <button
                      disabled={todo.status === "DONE"}
                      onClick={() => handleUpodateStatus(todo.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      {todo?.status === "DONE" ? "Done" : "Mark as Done"}
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="border border-red-500  px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
