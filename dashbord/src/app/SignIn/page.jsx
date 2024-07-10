"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 
import Link from 'next/link';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post(`http:localhost:4000/admin/LogAdm/${email}`, { email, password });
      // console.log(response.data);

      router.push('/BestSells');
    } catch (error) {
      console.error('Error signing in', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative  w-full max-w-[90rem] flex-col rounded-xl bg-gray-100">
    <form className="bg-white p-8 rounded shadow-md justify-center relative  w-full max-w-[40rem] h-full max-h-[30rem]  flex-col" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6 text-center"> Sign In</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Sign In
      </button>
      <p className="mt-4 text-center">
        Don't have an account? <Link href="/admin/signup" className="text-blue-500 hover:underline">Sign Up</Link>
      </p>
    </form>
  </div>
  
  );
}
