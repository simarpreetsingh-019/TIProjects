'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import BountyDialog from './ui/BountyDialog';
interface Bounty {
  id: number
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  status: "Live" | "Completed"
  repo: string
  issue: number
  reward: number
}


interface Repo {
  id: number
  name: string
  description: string | null
  full_name: string
}

interface ExtendedSession extends Session {
  user: {
    address: string
    username?: string
  }
}

interface BountiesListProps {
  onBountyClick: (bounty: Bounty) => void;
}
const BountiesList: React.FC<BountiesListProps> = ({ onBountyClick }) => {
  const { data: session, status } = useSession()
  const [bounties, setBounties] = useState<Bounty[]>([])
  const [selectedBounty, setSelectedBounty] = useState<Bounty | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      if (status === 'authenticated' && (session?.user as ExtendedSession['user'])?.username) {
        try {
          const response = await fetch(`https://api.github.com/users/${(session.user as ExtendedSession['user']).username}/repos`)
          const repos: Repo[] = await response.json()

          const updatedBounties = repos.map((repo, index) => ({
            id: index + 1,
            title: repo.name,
            description: repo.description || 'No description available',
            difficulty: 'Medium' as const,
            status: 'Live' as const,
            repo: repo.full_name,
            issue: 1,
            reward: 5
          }))

          setBounties(updatedBounties)
        } catch (error) {
          console.error('Error fetching repositories:', error)
        }
      }
    }

    fetchRepos()
  }, [status, session])

  const handleBountyClick = (bounty: Bounty) => {
    setSelectedBounty(bounty);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedBounty(null);
    setIsDialogOpen(false);
  };

  return (
    <div className={`p-20`}>
      <h2>Bounty List</h2>
      {bounties.length === 0 ? (
        <p>No bounties available.</p>
      ) : (
        <div>
          {bounties.map((bounty) => (
            <div
              key={bounty.id}
              className="flex items-center justify-between p-4 border-b cursor-pointer"
              onClick={() => handleBountyClick(bounty)}
            >
              <div>
                <h3 className="text-lg font-semibold">{bounty.title}</h3>
                <p className="text-sm text-gray-500">{bounty.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    bounty.difficulty === "Easy" ? "bg-green-100 text-green-800" :
                      bounty.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                  }`}>
                    {bounty.difficulty}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    bounty.status === "Live" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}>
                    {bounty.status}
                  </span>
                  <span className="text-xs flex items-center">
                    Repo: {bounty.repo}
                  </span>
                  <span className="text-xs">Issue: {bounty.issue}</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                  {bounty.reward}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <BountyDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        bounty={selectedBounty}
      />
    </div>
  )
}

export default BountiesList;

