"use client";

import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Pulse {
  id: number;
  name: string;
  price: number;
  image: string;
}

const pulses: Pulse[] = [
  {
    id: 1,
    name: "Rice",
    price: 0.001,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Wheat",
    price: 0.0008,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Onion",
    price: 0.0005,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Brinjal",
    price: 0.0006,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Rajma",
    price: 0.0012,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 6,
    name: "Bengal Gram",
    price: 0.0009,
    image: "/placeholder.svg?height=100&width=100",
  },
];

export default function DemoPage() {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string>("");
  const [balance, setBalance] = useState<string>("0");
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const initWeb3 = async () => {
      if (
        typeof window !== "undefined" &&
        typeof window.ethereum !== "undefined"
      ) {
        try {
          // Request account access
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          // Get the current account
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);

          // Get the account balance
          const balanceWei = await web3Instance.eth.getBalance(accounts[0]);
          const balanceEth = web3Instance.utils.fromWei(balanceWei, "ether");
          setBalance(balanceEth);

          // Listen for account changes
          window.ethereum.on("accountsChanged", (accounts: string[]) => {
            setAccount(accounts[0]);
            updateBalance(web3Instance, accounts[0]);
          });
        } catch (error) {
          setError(
            "Failed to connect to the Ethereum network. Please make sure you have MetaMask installed and connected."
          );
        }
      } else {
        setError("Please install MetaMask to use this dApp");
      }
    };

    initWeb3();
  }, []);

  const updateBalance = async (web3Instance: Web3, account: string) => {
    const balanceWei = await web3Instance.eth.getBalance(account);
    const balanceEth = web3Instance.utils.fromWei(balanceWei, "ether");
    setBalance(balanceEth);
  };

  const addToCart = (pulse: Pulse) => {
    setCart((prevCart) => ({
      ...prevCart,
      [pulse.id]: (prevCart[pulse.id] || 0) + 1,
    }));
  };

  const removeFromCart = (pulse: Pulse) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[pulse.id] > 1) {
        newCart[pulse.id]--;
      } else {
        delete newCart[pulse.id];
      }
      return newCart;
    });
  };

  const getTotalCost = () => {
    return Object.entries(cart).reduce((total, [id, quantity]) => {
      const pulse = pulses.find((p) => p.id === parseInt(id));
      return total + (pulse ? pulse.price * quantity : 0);
    }, 0);
  };

  const handlePurchase = async () => {
    if (!web3) {
      setError("Web3 is not initialized");
      return;
    }

    const totalCost = getTotalCost();
    const totalCostWei = web3.utils.toWei(totalCost.toString(), "ether");

    try {
      await web3.eth.sendTransaction({
        from: account,
        to: "0x1234567890123456789012345678901234567890", // Replace with the actual recipient address
        value: totalCostWei,
      });

      setCart({});
      updateBalance(web3, account);
      alert("Purchase successful! Transaction recorded on the blockchain.");
    } catch (error) {
      setError(
        "Transaction failed. Please make sure you have enough ETH and try again."
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Smart Farming dApp Demo</h1>
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Ethereum Account</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Address: {account}</p>
          <p>Balance: {parseFloat(balance).toFixed(4)} ETH</p>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {pulses.map((pulse) => (
          <Card key={pulse.id}>
            <CardHeader>
              <CardTitle>{pulse.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={pulse.image}
                alt={pulse.name}
                className="w-full h-32 object-cover mb-2"
              />
              <p>Price: {pulse.price} ETH</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                onClick={() => removeFromCart(pulse)}
                disabled={!cart[pulse.id]}
              >
                -
              </Button>
              <span>{cart[pulse.id] || 0}</span>
              <Button onClick={() => addToCart(pulse)}>+</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Cart</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.entries(cart).map(([id, quantity]) => {
            const pulse = pulses.find((p) => p.id === parseInt(id));
            return pulse ? (
              <div key={id} className="flex justify-between mb-2">
                <span>{pulse.name}</span>
                <span>
                  {quantity} x {pulse.price} ETH ={" "}
                  {(quantity * pulse.price).toFixed(4)} ETH
                </span>
              </div>
            ) : null;
          })}
          <div className="font-bold mt-4">
            Total: {getTotalCost().toFixed(4)} ETH
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handlePurchase}
            disabled={getTotalCost() === 0 || !web3}
          >
            Purchase
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
