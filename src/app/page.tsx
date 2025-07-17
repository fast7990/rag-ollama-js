"use client";

import { useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation'

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(''); // 重置错误消息
    try {
      const response = await fetch('/api/login', {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(response.statusText || '登录失败，请检查用户名和密码');
      }
      await response.json();
      sessionStorage.setItem('userId', username);
      router.push('/home');
    } catch (error) {
      console.error('登录错误:', error);
      setError(error instanceof Error ? error.message : '发生未知错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 overflow-hidden"  style={{ height: "92vh" }}>
      {loading && <div className="loader"><i className="fas fa-spinner fa-spin"></i></div>}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl mb-6 text-blue-600 text-center">登录</h2>
        <div className="mb-6">
          <label className="block mb-2 text-lg font-semibold text-gray-700">用户名</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-lg font-semibold text-gray-700">Password</label>
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && (
          <div className="mb-4 text-red-500 text-sm font-medium animate-pulse">{error}</div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:bg-gray-400"
        >
          Login
        </button>
        <p className="mt-4 text-center text-gray-600">
          没有账号？
          <Link 
            type="button" 
            className="text-blue-600 underline hover:text-blue-800 transition duration-200"
            href="/signup"
          >
            注册账号
          </Link>
        </p>
      </form>
    </div>
  );
}

