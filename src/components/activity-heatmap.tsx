"use client"

export function ActivityHeatmap() {
  // Generate random activity data (0-3 intensity)
  const generateActivityData = () => {
    const data = []
    for (let i = 0; i < 7; i++) {
      const weekData = []
      for (let j = 0; j < 7; j++) {
        weekData.push(Math.floor(Math.random() * 4))
      }
      data.push(weekData)
    }
    return data
  }

  const activityData = generateActivityData()

  // Map intensity to color
  const getColorForIntensity = (intensity: number) => {
    switch (intensity) {
      case 0:
        return "bg-gray-100"
      case 1:
        return "bg-gray-300"
      case 2:
        return "bg-gray-500"
      case 3:
        return "bg-black"
      default:
        return "bg-gray-100"
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="grid grid-cols-7 gap-1">
        {activityData.map((week, weekIndex) =>
          week.map((day, dayIndex) => (
            <div key={`${weekIndex}-${dayIndex}`} className={`${getColorForIntensity(day)} w-5 h-5 rounded-sm`} />
          )),
        )}
      </div>

      <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
          <span>No Activity</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-300 rounded-sm"></div>
          <span>Low Activity</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-500 rounded-sm"></div>
          <span>Medium Activity</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-black rounded-sm"></div>
          <span>High Activity</span>
        </div>
      </div>
    </div>
  )
}

