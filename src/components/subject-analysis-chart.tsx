"use client"

import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export function SubjectAnalysisChart() {
  const chartData = {
    labels: ["Physics", "Chemistry", "Biology"],
    datasets: [
      {
        data: [80, 70, 75],
        backgroundColor: "black",
        borderRadius: 4,
        barThickness: 30,
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
            const percentages = ["35.6%", "31.1%", "33.3%"]
            const index = context.dataIndex
            return `${dataPoint} (${percentages[index]})`
          },
        },
      },
    },
  }

  return (
    <div className="h-[250px]">
      <Bar data={chartData} options={options} />
    </div>
  )
}

