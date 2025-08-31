"use client"

import { useState } from "react"
import { TimelineItem } from "./timeline-item"
import { AddRecordModal } from "./add-record-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

// Mock data for timeline records
const mockRecords = [
  {
    id: "1",
    title: "Project Kickoff Meeting",
    description: "Initial meeting with the development team to discuss project requirements and timeline.",
    content:
      "Discussed the main features, technical stack, and delivery milestones. Team is excited about the new challenges.",
    category: "Work",
    tags: ["meeting", "project", "planning"],
    recordDate: new Date("2024-01-15T10:00:00"),
    createdAt: new Date("2024-01-15T10:30:00"),
  },
  {
    id: "2",
    title: "Completed First Sprint",
    description: "Successfully delivered all user stories planned for Sprint 1.",
    content: "All features were implemented and tested. The team velocity is looking good for the next sprint.",
    category: "Work",
    tags: ["sprint", "development", "milestone"],
    recordDate: new Date("2024-01-12T17:00:00"),
    createdAt: new Date("2024-01-12T17:15:00"),
  },
  {
    id: "3",
    title: "Team Building Event",
    description: "Annual company retreat with team building activities.",
    content: "Great day with the team. Improved communication and collaboration through various activities.",
    category: "Personal",
    tags: ["team", "event", "social"],
    recordDate: new Date("2024-01-10T09:00:00"),
    createdAt: new Date("2024-01-10T18:00:00"),
  },
  {
    id: "4",
    title: "Code Review Session",
    description: "Weekly code review with senior developers.",
    content:
      "Learned about best practices for React components and state management. Got valuable feedback on my recent work.",
    category: "Learning",
    tags: ["code-review", "learning", "development"],
    recordDate: new Date("2024-01-08T14:00:00"),
    createdAt: new Date("2024-01-08T16:00:00"),
  },
]

export function TimelineView() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [records] = useState(mockRecords)

  const groupedRecords = records.reduce(
    (groups, record) => {
      const date = record.recordDate.toDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(record)
      return groups
    },
    {} as Record<string, typeof records>,
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Record
        </Button>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

        <div className="space-y-8">
          {Object.entries(groupedRecords)
            .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
            .map(([date, dayRecords]) => (
              <div key={date} className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                    <div className="h-2 w-2 rounded-full bg-primary-foreground"></div>
                  </div>
                  <h3 className="text-lg font-medium text-foreground">
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </h3>
                </div>

                <div className="ml-16 space-y-4">
                  {dayRecords
                    .sort((a, b) => b.recordDate.getTime() - a.recordDate.getTime())
                    .map((record) => (
                      <TimelineItem key={record.id} record={record} />
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>

      <AddRecordModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  )
}
