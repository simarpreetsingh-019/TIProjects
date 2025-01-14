"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export default function CreateCommunityForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    instaHandle: "",
    linkedinHandle: "",
    twitterHandle: "",
  });

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("YourContract");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    setFormData(prevData => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await writeYourContractAsync({
        functionName: "registerCommunity",
        args: [
          formData.name,
          formData.description,
          formData.instaHandle,
          formData.linkedinHandle,
          formData.twitterHandle,
        ],
      });
      console.log("Community registered successfully!");
    } catch (e) {
      console.error("Error registering community:", e);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create New Community</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Community Name</Label>
            <Input
              id="name"
              placeholder="Enter community name"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter community description"
              required
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instaHandle">Instagram Handle</Label>
            <Input
              id="instaHandle"
              placeholder="Enter Instagram handle"
              required
              value={formData.instaHandle}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedinHandle">LinkedIn Handle</Label>
            <Input
              id="linkedinHandle"
              placeholder="Enter LinkedIn handle"
              required
              value={formData.linkedinHandle}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitterHandle">Twitter Handle</Label>
            <Input
              id="twitterHandle"
              placeholder="Enter Twitter handle"
              required
              value={formData.twitterHandle}
              onChange={handleInputChange}
            />
          </div>

          <Button type="submit" className="w-full">
            Create Community
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
