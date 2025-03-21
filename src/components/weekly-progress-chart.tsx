"use client"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export function WeeklyProgressChart() {
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Progress",
        data: [10, 30, 50, 80],
        borderColor: "black",
        backgroundColor: "black",
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: "black",
        pointBorderColor: "white",
        pointBorderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const dataPoint = context.parsed.y
            const percentages = ["5.9%", "17.6%", "29.4%", "47.1%"]
            const index = context.dataIndex
            return `${dataPoint} (${percentages[index]})`
          },
        },
      },
    },
  }

  return (
    <div className="h-[250px]">
      <Line data={chartData} options={options} />
    </div>
  )
}

