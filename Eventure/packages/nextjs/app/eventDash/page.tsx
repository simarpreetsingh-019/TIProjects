"use client";

import { ReactNode, useState } from "react";
import { Button } from "../../components/ui/button";
import { CardSpotlight } from "../../components/ui/card-spotlight";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { formatEther, parseEther } from "viem";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

interface EventCardProps {
  eventId: string;
  eventName: string;
  description: string;
  communityName: string;
  startTime: string;
  endTime: string;
  location: string;
  capacity: number;
  availableSeats: number;
  ticketPrice: bigint;
  creatorAddress: string;
  bountyTitle: string;
  bountyDescription: string;
  bountyAmount: bigint;
}

interface EventDetailsDialogProps {
  eventName: string;
  communityName: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  creatorAddress: string;
  ticketPrice: bigint;
  capacity: number;
  availableSeats: number;
}

interface BountyDetailsDialogProps {
  eventId: string;
  eventName: string;
  bountyTitle: string;
  bountyDescription: string;
  bountyAmount: bigint;
}

export default function EventDashboard(): ReactNode {
  const { data: events } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "getAllEvents",
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Event Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events &&
          events[0].map((id: bigint, index: number) => (
            <EventCard
              key={id.toString()}
              eventId={id.toString()}
              eventName={events[1][index]}
              description={events[2][index]}
              communityName={`Community ${events[10][index]}`}
              startTime={new Date(Number(events[3][index]) * 1000).toLocaleString()}
              endTime={new Date(Number(events[4][index]) * 1000).toLocaleString()}
              location={events[5][index]}
              capacity={Number(events[6][index])}
              availableSeats={Number(events[7][index])}
              ticketPrice={events[8][index]}
              creatorAddress={events[9][index]}
              bountyTitle={events[11][index]}
              bountyDescription={events[12][index]}
              bountyAmount={events[13][index]}
            />
          ))}
      </div>
    </div>
  );
}

function EventCard({
  eventId,
  eventName,
  description,
  communityName,
  startTime,
  endTime,
  location,
  capacity,
  availableSeats,
  ticketPrice,
  creatorAddress,
  bountyTitle,
  bountyDescription,
  bountyAmount,
}: EventCardProps): ReactNode {
  return (
    <CardSpotlight className="h-96 w-full rounded-3xl">
      <div className="relative z-20 h-full flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">{eventName}</h2>
          <p className="text-neutral-200 mb-4">{description}</p>
          <p className="text-sm text-neutral-300">by {communityName}</p>
        </div>
        <div className="flex space-x-16 justify-center">
          <EventDetailsDialog
            eventName={eventName}
            communityName={communityName}
            description={description}
            startTime={startTime}
            endTime={endTime}
            location={location}
            creatorAddress={creatorAddress}
            ticketPrice={ticketPrice}
            capacity={capacity}
            availableSeats={availableSeats}
          />
          <BountyDetailsDialog
            eventId={eventId}
            eventName={eventName}
            bountyTitle={bountyTitle}
            bountyDescription={bountyDescription}
            bountyAmount={bountyAmount}
          />
        </div>
      </div>
    </CardSpotlight>
  );
}

function EventDetailsDialog({
  eventName,
  communityName,
  description,
  startTime,
  endTime,
  location,
  creatorAddress,
  ticketPrice,
  capacity,
  availableSeats,
}: EventDetailsDialogProps): ReactNode {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Event Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{eventName}</DialogTitle>
          <DialogDescription>by {communityName}</DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <p id="description" className="col-span-3">
                {description}
              </p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <p id="time" className="col-span-3">
                Start: {startTime}
                <br />
                End: {endTime}
              </p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <p id="location" className="col-span-3">
                {location}
              </p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="creator" className="text-right">
                Creator
              </Label>
              <p id="creator" className="col-span-3">
                {creatorAddress}
              </p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ticket" className="text-right">
                Ticket Price
              </Label>
              <p id="ticket" className="col-span-3">
                {formatEther(ticketPrice)} ETH ({ticketPrice.toString()} WEI)
              </p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="capacity" className="text-right">
                Capacity
              </Label>
              <p id="capacity" className="col-span-3">
                {capacity} attendees
              </p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="available" className="text-right">
                Available Seats
              </Label>
              <p id="available" className="col-span-3">
                {availableSeats}
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Buy Ticket</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function BountyDetailsDialog({
  eventId,
  eventName,
  bountyTitle,
  bountyDescription,
  bountyAmount,
}: BountyDetailsDialogProps): ReactNode {
  const [contribution, setContribution] = useState("");
  const { writeContractAsync: payBountyAsync } = useScaffoldWriteContract("YourContract");

  const handleContribute = async () => {
    if (!contribution) return;
    try {
      const contributionAmount = parseEther(contribution);
      if (contributionAmount > bountyAmount) {
        console.error("Contribution exceeds bounty amount");
        return;
      }
      await payBountyAsync({
        functionName: "payBounty",
        args: [BigInt(eventId)],
        value: contributionAmount,
      });
      console.log("Bounty paid successfully!");
      setContribution("");
    } catch (error) {
      console.error("Error paying bounty:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Bounty Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-4">
        <DialogHeader>
          <DialogTitle>Bounty for {eventName}</DialogTitle>
          <DialogDescription>View and contribute to event bounties</DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto p-4">
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bountyTitle" className="text-right">
                Bounty Title
              </Label>
              <p id="bountyTitle" className="col-span-3">
                {bountyTitle}
              </p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bountyDescription" className="text-right">
                Description
              </Label>
              <p id="bountyDescription" className="col-span-3">
                {bountyDescription}
              </p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="totalAmount" className="text-right">
                Total Amount
              </Label>
              <p id="totalAmount" className="col-span-3">
                {formatEther(bountyAmount)} ETH ({bountyAmount.toString()} WEI)
              </p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contribution" className="text-right">
                Contribute
              </Label>
              <Input
                id="contribution"
                placeholder="Amount in ETH"
                className="col-span-3"
                value={contribution}
                onChange={e => setContribution(e.target.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter className="p-4">
          <Button type="submit" onClick={handleContribute}>
            Fund Bounty
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
