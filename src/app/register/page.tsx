'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react"; // Adjust the import path as needed

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const saveUser = api.userReg.saveUser.useMutation();


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await saveUser.mutateAsync({ email, password });
      if (!result.success) {
        setError(result.message);
        setLoading(false);
      } else {
        router.push("/login");
      }
    } catch (err: any) {
      setError(err.message || "Registration failed");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={e => setEmail(e.target.value)}
        className="border px-3 py-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={e => setPassword(e.target.value)}
        className="border px-3 py-2 rounded"
      />
      {error && <div className="text-red-500">{error}</div>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Sign Up</button>
      {loading && <div className="text-gray-500">Signing up...</div>}
    </form>
  );
}