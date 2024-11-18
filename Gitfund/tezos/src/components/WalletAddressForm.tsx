import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const WalletAddressForm: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [currentWalletAddress, setCurrentWalletAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchUserWallet = async () => {
      if (session?.user?.address) {
        try {
          const response = await fetch(
            `http://localhost:3001/api/user/${session.user.address}`
          );
          if (response.ok) {
            const userData = await response.json();
            if (userData.walletAddress) {
              setCurrentWalletAddress(userData.walletAddress);
            }
          } else {
            console.error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserWallet();
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (session?.user?.address) {
      try {
        const response = await fetch(
          "http://localhost:3001/api/update-wallet",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              address: session.user.address,
              walletAddress,
            }),
          }
        );

        if (response.ok) {
          console.log("Wallet address updated successfully");
          setCurrentWalletAddress(walletAddress);
          setWalletAddress("");
          setIsEditing(false);
        } else {
          console.error("Failed to update wallet address");
        }
      } catch (error) {
        console.error("Error updating wallet address:", error);
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-zinc-900 text-white">
      <CardHeader>
        <CardTitle className="text-2xl">User Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {session?.user && (
          <>
            {session.user.image && (
              <img
                src={session.user.image}
                alt={`${
                  session.user.name || session.user.address
                }'s profile picture`}
                className="w-16 h-16 rounded-full"
              />
            )}
            <div>
              <p className="text-sm text-zinc-400">Name</p>
              <p>{session.user.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Address</p>
              <p>{session.user.address}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Current Wallet Address</p>
              <p>{currentWalletAddress || "N/A"}</p>
            </div>
          </>
        )}
        {isEditing && (
          <div className="space-y-2">
            <p className="text-sm text-zinc-400">Edit Wallet Address</p>
            <Input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="Enter your new wallet address"
              required
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {isEditing ? (
          <>
            <Button onClick={handleSubmit} variant="default">
              Update Wallet Address
            </Button>
            <Button onClick={() => setIsEditing(false)} variant="outline">
              Cancel
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            Edit Wallet Address
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default WalletAddressForm;
