"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { DefaultSession } from "next-auth";
import Web3 from "web3";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";

interface Repo {
  id: number;
  name: string;
  full_name: string;
}

interface Issue {
  id: number;
  title: string;
  number: number;
}

interface ExtendedSession extends DefaultSession {
  user: {
    address: string;
    username?: string;
  } & DefaultSession["user"];
}

export function CreateBountyForm() {
  const { data: session } = useSession();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    oneLiner: "",
    description: "",
    githubRepo: "",
    githubIssue: "",
    difficulty: "",
    rewardAmount: 0,
    paymentToken: "",
    isLive: false,
    walletAddress: "",
  });

  React.useEffect(() => {
    const fetchRepos = async () => {
      if (session?.user) {
        const user = session.user as unknown as ExtendedSession['user'];
        if (user.username) {
          try {
            const response = await fetch(
              `https://api.github.com/users/${user.username}/repos`
            );
            const data = await response.json();
            setRepos(data);
          } catch (error: unknown) {
            if (error instanceof Error) {
              console.error("Error fetching repositories:", error.message);
            } else {
              console.error("Unknown error fetching repositories");
            }
          }
        }
      }
    };

    fetchRepos();
  }, [session]);

  React.useEffect(() => {
    const fetchIssues = async () => {
      if (formData.githubRepo) {
        try {
          const response = await fetch(
            `https://api.github.com/repos/${formData.githubRepo}/issues`
          );
          const data = await response.json();
          setIssues(data);
        } catch (error) {
          console.error("Error fetching issues:", error);
        }
      }
    };

    fetchIssues();
  }, [formData.githubRepo]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
    selectName?: string
  ) => {
    if (typeof e === "string" && selectName) {
      setFormData((prevData) => ({
        ...prevData,
        [selectName]: e,
      }));
    } else if (typeof e === "object" && "target" in e) {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === "rewardAmount" ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      session &&
      session.user &&
      (session.user as ExtendedSession["user"]).address
    ) {
      try {
        const response = await fetch("/api/create-bounty", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            address: (session.user as ExtendedSession["user"]).address,
          }),
        });
        const walletAddress = `0x43A071fa2103F24Bbcd7aD3215b5Ed226484473c`;
        if (response.ok) {
          console.log("Bounty details saved successfully");
        } else {
          console.error("Failed to save bounty details");
        }

        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);

          try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const accounts = await web3.eth.getAccounts();
            const fromAddress = accounts[0];

            const amountInWei = web3.utils.toWei(
              formData.rewardAmount.toString(),
              "ether"
            );

            const tx = {
              from: fromAddress,
              to: walletAddress,
              value: amountInWei,
              gas: 21000,
            };

            const transactionHash = await web3.eth.sendTransaction(tx);
            console.log("Transaction successful with hash:", transactionHash);
            alert("Transaction successful!");

          } catch (error: unknown) {
            console.error("Transaction failed", error);
            if (error instanceof Error) {
              alert("Transaction failed: " + error.message);
            } else {
              alert("Transaction failed: Unknown error");
            }
          }
        } else {
          alert("Please install MetaMask to complete the transaction.");
        }
      } catch (error: unknown) {
        console.error("Error processing bounty or transaction:", error);
      }
    } else {
      console.error("User session not found");
    }
  };

  return (
    <div className="mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
        <div className="mx-auto w-full lg:w-1/2">
          <h1 className="text-3xl pb-8 lg:pb-20 lg:text-6xl font-semibold text-center mt-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
            Create a Bounty
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="w-full sm:w-1/2 space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="E.g. Fix image upload"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full sm:w-1/2 space-y-2">
                <Label htmlFor="one-liner">One-liner</Label>
                <Input
                  id="one-liner"
                  name="oneLiner"
                  placeholder="E.g. Fix image upload of xyz page"
                  value={formData.oneLiner}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Detailed Description of the Bounty"
                className="min-h-[100px]"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              
              <div className="w-full sm:w-1/3 space-y-2">
                <Label htmlFor="reward-amount">Reward (in ETH)</Label>
                <Input
                  id="reward-amount"
                  name="rewardAmount"
                  placeholder="E.g. 0.1"
                  value={formData.rewardAmount}
                  onChange={handleChange}
                  type="number"
                />
              </div>
              <div className="space-y-2 w-1/3">
              <Label htmlFor="githubRepo">GitHub Repository</Label>
              <Select
                onValueChange={(value) => handleChange(value, "githubRepo")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a repository" />
                </SelectTrigger>
                <SelectContent>
                  {repos.map((repo) => (
                    <SelectItem key={repo.id} value={repo.full_name}>
                      {repo.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 w-1/3">
              <Label htmlFor="githubIssue">GitHub Issue</Label>
              <Select
                onValueChange={(value) => handleChange(value, "githubIssue")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an issue" />
                </SelectTrigger>
                <SelectContent>
                  {issues.map((issue) => (
                    <SelectItem key={issue.id} value={issue.number.toString()}>
                      {issue.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            </div>
            <Button type="submit" className="w-full mt-8" size="lg">
              Create Bounty
            </Button>
          </form>
        </div>
        <div className="w-full lg:w-1/2">
          <DotLottieReact
            autoplay
            loop
            src="dev.lottie"
            style={{ height: "800px", width: "800px" }}
          />
        </div>
      </div>
    </div>
  );
}
export default CreateBountyForm;
