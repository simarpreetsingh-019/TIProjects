"use client";

import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import { Address, formatEther } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

// Custom List component in shadcn style
const List = ({ children, className, ...props }: React.HTMLAttributes<HTMLUListElement>) => {
  return (
    <ul className={`space-y-1 ${className}`} {...props}>
      {children}
    </ul>
  );
};

const ListItem = ({ children, className, ...props }: React.HTMLAttributes<HTMLLIElement>) => {
  return (
    <li className={`text-sm ${className}`} {...props}>
      {children}
    </li>
  );
};

export default function Profile() {
  const { address } = useAccount();

  const { data: userActivity, refetch } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "getUserActivity",
    args: [address as Address],
  });

  useEffect(() => {
    refetch();
  }, [address, refetch]);

  if (!userActivity) {
    return <div>Loading...</div>;
  }

  const [
    fundedEvents,
    joinedCommunities,
    createdEvents,
    fundedAmounts,
    fundedEventNames,
    joinedCommunityNames,
    createdEventNames,
  ] = userActivity;

  // Demo data for ticket owned (as requested, not edited)
  const ticketOwned = [
    { event: "Summer Music Festival", time: "2024-07-15 14:00", location: "Central Park, NY" },
    { event: "Tech Conference 2024", time: "2024-09-20 09:00", location: "Convention Center, SF" },
    { event: "Art Exhibition", time: "2024-11-05 11:00", location: "Modern Art Museum, LA" },
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="walletAddress">Wallet Address</Label>
          <Input id="walletAddress" defaultValue={address} disabled />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fundedEvents">Funded Events</Label>
          <Table>
            <TableHeader>
              <TableCell>Event</TableCell>
              <TableCell>Amount Funded</TableCell>
            </TableHeader>
            <TableBody>
              {fundedEvents.map((_event: bigint, index: number) => (
                <TableRow key={index}>
                  <TableCell>{fundedEventNames[index]}</TableCell>
                  <TableCell>{formatEther(fundedAmounts[index])} ETH</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="space-y-2">
          <Label htmlFor="joinedCommunity">Joined Community</Label>
          <List>
            {joinedCommunityNames.map((community: string, index: number) => (
              <ListItem key={index}>{community}</ListItem>
            ))}
          </List>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ticketOwned">Ticket Owned</Label>
          <div className="space-y-4">
            {ticketOwned.map((ticket, index) => (
              <Card key={index} className="p-4">
                <CardContent className="space-y-2 p-0">
                  <div className="font-semibold">{ticket.event}</div>
                  <div className="text-sm text-gray-600">Time: {ticket.time}</div>
                  <div className="text-sm text-gray-600">Location: {ticket.location}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="userCreatedEvents">User Created Events</Label>
          <List>
            {createdEventNames.map((event: string, index: number) => (
              <ListItem key={index}>{event}</ListItem>
            ))}
          </List>
        </div>
      </CardContent>
    </Card>
  );
}
