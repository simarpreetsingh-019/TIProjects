"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the login process
    console.log("Login submitted with name:", name);
  };

  const handleConnectWallet = () => {
    // Here you would typically handle wallet connection
    console.log("Connecting wallet...");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Login to Smart Farming dApp
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <Button
            type="button"
            onClick={handleConnectWallet}
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            Connect Wallet
          </Button>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="mt-4 text-center">
          <p>
            New user?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign up for a new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
