'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GitHubLogoIcon, ExternalLinkIcon } from '@radix-ui/react-icons'
import { Skeleton } from "@/components/ui/skeleton"
import Menu from "@/components/header/menu";
import Footer from "@/components/header/Footer";

interface Bounty {
  _id: string
  title: string
  oneLiner: string
  description: string
  githubRepo: string
  githubIssue: string
  difficulty: string
  rewardAmount: number
  paymentToken: string
  isLive: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export default function BountiesList() {
  const [bounties, setBounties] = useState<Bounty[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBounties = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/bounties')
        const data = await response.json()
        setBounties(data)
      } catch (error) {
        console.error('Error fetching bounties:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBounties()
  }, [])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'hard':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
      <>
        <Menu/>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Open Bounties</h2>
        {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                  <Card key={index} className="w-full">
                    <CardHeader>
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                  </Card>
              ))}
            </div>
        ) : (
            <ScrollArea className="h-[800px]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bounties.map((bounty) => (
                    <Card key={bounty._id} className="w-full">
                      <CardHeader>
                        <CardTitle>{bounty.title}</CardTitle>
                        <CardDescription>{bounty.oneLiner}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{bounty.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="secondary" className={`${getDifficultyColor(bounty.difficulty)} text-white`}>
                            {bounty.difficulty}
                          </Badge>
                          <Badge variant="outline">{bounty.rewardAmount} {bounty.paymentToken}</Badge>
                          {bounty.isLive && <Badge variant="default">Live</Badge>}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <GitHubLogoIcon className="h-4 w-4" />
                          <a href={`https://www.github.com/${bounty.githubRepo}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            Repository
                          </a>
                          <ExternalLinkIcon className="h-4 w-4 ml-2" />
                          <a href={`https://www.github.com/${bounty.githubRepo}/issues/${bounty.githubIssue}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            Issue
                          </a>
                        </div>
                      </CardContent>
                      <CardFooter className="text-xs text-gray-500 dark:text-gray-400">
                        <div>Created: {formatDate(bounty.createdAt)}</div>
                        <div className="ml-auto">Updated: {formatDate(bounty.updatedAt)}</div>
                      </CardFooter>
                    </Card>
                ))}
              </div>
            </ScrollArea>
        )}
      </div>
        <Footer/>
        </>
  )
}