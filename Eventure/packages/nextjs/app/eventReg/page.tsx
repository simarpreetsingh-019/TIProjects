"use client";

import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";
import { Textarea } from "../../components/ui/textarea";
import { cn } from "../../lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export default function CreateEventForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    location: "",
    capacity: "",
    ticketPrice: "",
    creatorCommunityName: "",
    bountyTitle: "",
    bountyDescription: "",
    bountyAmount: "",
  });

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("YourContract");

  const { data: communitiesData } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "getAllCommunities",
  });

  const [communities, setCommunities] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (communitiesData) {
      const [ids, names] = communitiesData as unknown as [readonly bigint[], readonly string[]];
      const formattedCommunities = ids.map((id, index) => ({
        id: id.toString(),
        name: names[index],
      }));
      setCommunities(formattedCommunities);
    }
  }, [communitiesData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    setFormData(prevData => ({ ...prevData, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prevData => ({ ...prevData, creatorCommunityName: value }));
  };

  const handleDateChange = (id: "startDate" | "endDate") => (date: Date | undefined) => {
    setFormData(prevData => ({ ...prevData, [id]: date }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.startDate || !formData.endDate) {
      console.error("Start date or end date is not set");
      return;
    }
    try {
      await writeYourContractAsync({
        functionName: "registerEvent",
        args: [
          formData.name,
          formData.description,
          format(formData.startDate, "dd-MM-yyyy"),
          format(formData.endDate, "dd-MM-yyyy"),
          formData.location,
          BigInt(formData.capacity),
          BigInt(formData.ticketPrice),
          formData.creatorCommunityName,
          formData.bountyTitle,
          formData.bountyDescription,
          BigInt(formData.bountyAmount),
        ],
      });
      console.log("Event registered successfully!");
    } catch (e) {
      console.error("Error registering event:", e);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create New Event</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Event Name</Label>
            <Input
              id="name"
              placeholder="Enter event name"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter event description"
              required
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.startDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate ? format(formData.startDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={handleDateChange("startDate")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.endDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.endDate ? format(formData.endDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={handleDateChange("endDate")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Enter event location"
              required
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="community">Community</Label>
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a community" />
              </SelectTrigger>
              <SelectContent>
                {communities.map(community => (
                  <SelectItem key={community.id} value={community.name}>
                    {community.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ticketPrice">Ticket Price</Label>
              <Input
                id="ticketPrice"
                type="number"
                placeholder="Enter ticket price"
                required
                value={formData.ticketPrice}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Accommodation Capacity</Label>
              <Input
                id="capacity"
                type="number"
                placeholder="Enter capacity"
                required
                value={formData.capacity}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Bounty Details</h3>
            <div className="space-y-2">
              <Label htmlFor="bountyTitle">Bounty Title</Label>
              <Input
                id="bountyTitle"
                placeholder="Enter bounty title"
                required
                value={formData.bountyTitle}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bountyDescription">Bounty Description</Label>
              <Textarea
                id="bountyDescription"
                placeholder="Enter bounty description"
                required
                value={formData.bountyDescription}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bountyAmount">Bounty Amount</Label>
              <Input
                id="bountyAmount"
                type="number"
                placeholder="Enter bounty amount"
                required
                value={formData.bountyAmount}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Create Event
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
