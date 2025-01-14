"use client";

import { useEffect, useState } from "react";
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
import { GlareCard } from "../../components/ui/glare-card";
import { Label } from "../../components/ui/label";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

interface Community {
  id: string;
  name: string;
  description: string;
  instagramHandle: string;
  linkedinHandle: string;
  twitterHandle: string;
  creatorAddress: string;
  followerCount: number;
  events: Event[];
}

interface Event {
  id: string;
  name: string;
  description: string;
}

type CommunityData = [
  bigint[],
  string[],
  string[],
  string[],
  string[],
  string[],
  string[],
  bigint[],
  bigint[][],
  string[][],
  string[][],
];

export default function CommunityDashboard() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const { data: communityData, refetch } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "getAllCommunities",
  });

  useEffect(() => {
    if (communityData) {
      const [
        ids,
        names,
        descriptions,
        instagramHandles,
        linkedinHandles,
        twitterHandles,
        creatorAddresses,
        followerCounts,
        eventIds,
        eventNames,
        eventDescriptions,
      ] = communityData as CommunityData;

      const formattedCommunities: Community[] = ids.map((id, index) => ({
        id: id.toString(),
        name: names[index],
        description: descriptions[index],
        instagramHandle: instagramHandles[index],
        linkedinHandle: linkedinHandles[index],
        twitterHandle: twitterHandles[index],
        creatorAddress: creatorAddresses[index],
        followerCount: Number(followerCounts[index]),
        events: eventIds[index].map((eventId, eventIndex) => ({
          id: eventId.toString(),
          name: eventNames[index][eventIndex],
          description: eventDescriptions[index][eventIndex],
        })),
      }));

      setCommunities(formattedCommunities);
    }
  }, [communityData]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Community Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map(community => (
          <CommunityCard key={community.id} community={community} />
        ))}
      </div>
    </div>
  );
}

function CommunityCard({ community }: { community: Community }) {
  return (
    <CardSpotlight className="h-96 w-full rounded-3xl">
      <div className="relative z-20 h-full flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">{community.name}</h2>
          <p className="text-neutral-200 mb-4">{community.description}</p>
          <p className="text-sm text-neutral-300">Followers: {community.followerCount}</p>
        </div>
        <div className="flex space-x-4 justify-center">
          <CommunityDetailsDialog community={community} />
          <EventsDialog community={community} />
        </div>
      </div>
    </CardSpotlight>
  );
}

function CommunityDetailsDialog({ community }: { community: Community }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("YourContract");

  const handleFollowClick = async () => {
    try {
      await writeYourContractAsync({
        functionName: "followCommunity",
        args: [BigInt(community.id)],
      });
      setIsFollowing(!isFollowing);
    } catch (e) {
      console.error("Error following/unfollowing community:", e);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Community Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{community.name}</DialogTitle>
          <DialogDescription>{community.description}</DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="instagram" className="text-right">
                Instagram
              </Label>
              <p id="instagram" className="col-span-3">
                @{community.instagramHandle}
              </p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="linkedin" className="text-right">
                LinkedIn
              </Label>
              <p id="linkedin" className="col-span-3">
                {community.linkedinHandle}
              </p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="twitter" className="text-right">
                Twitter
              </Label>
              <p id="twitter" className="col-span-3">
                @{community.twitterHandle}
              </p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="creator" className="text-right">
                Creator
              </Label>
              <p id="creator" className="col-span-3">
                {community.creatorAddress}
              </p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="followers" className="text-right">
                Followers
              </Label>
              <p id="followers" className="col-span-3">
                {community.followerCount}
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleFollowClick}>
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EventsDialog({ community }: { community: Community }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Community Events</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Events by {community.name}</DialogTitle>
          <DialogDescription>Upcoming and past events</DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto p-4">
          <div className="grid gap-4">
            {community.events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function EventCard({ event }: { event: Event }) {
  return (
    <GlareCard className="flex flex-col items-center justify-center p-4">
      <h3 className="text-white font-bold text-xl mb-2">{event.name}</h3>
      <p className="text-neutral-200 text-center">{event.description}</p>
    </GlareCard>
  );
}
