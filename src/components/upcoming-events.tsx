import { Button } from "@/components/ui/button"

interface Event {
  id: number
  date: string
  title: string
  time: string
  duration: string
}

export function UpcomingEvents() {
  const events: Event[] = [
    {
      id: 1,
      date: "Feb 20, 2024",
      title: "Physic test",
      time: "10:00 AM",
      duration: "3hrs",
    },
    {
      id: 2,
      date: "Feb 20, 2024",
      title: "Physic test",
      time: "10:00 AM",
      duration: "3hrs",
    },
    {
      id: 3,
      date: "Feb 20, 2024",
      title: "Physic test",
      time: "10:00 AM",
      duration: "3hrs",
    },
  ]

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="flex justify-between items-center py-2">
          <div className="w-1/4">
            <div className="font-medium">{event.date}</div>
          </div>
          <div className="w-1/2">
            <div className="font-medium">{event.title}</div>
            <div className="text-gray-500 text-sm">
              {event.time}, {event.duration}
            </div>
          </div>
          <div className="w-1/4 flex justify-end">
            <Button className="bg-black text-white hover:bg-gray-800">Practice</Button>
          </div>
        </div>
      ))}
    </div>
  )
}

