"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartEvent,
  type LegendElement,
  type LegendItem,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const legendHoverHandlers = {
  onHover: (
    event: ChartEvent,
    legendItem: LegendItem,
    legend: LegendElement<"doughnut">,
  ) => {
    const index = legendItem.index;
    if (index === undefined) return;
    const chart = legend.chart;

    chart.tooltip?.setActiveElements([{ datasetIndex: 0, index }], {
      x: event.x ?? 0,
      y: event.y ?? 0,
    });
    chart.update();
  },
  onLeave: (
    _event: ChartEvent,
    _legendItem: LegendItem,
    legend: LegendElement<"doughnut">,
  ) => {
    const chart = legend.chart;
    chart.tooltip?.setActiveElements([], { x: 0, y: 0 });
    chart.update();
  },
};

const GenderChart = () => {
  const data = {
    labels: ["Male", "Female", "Others", "Prefer not to say"],
    datasets: [
      {
        data: [112514752, 107026128, 17837688, 1758043],
        backgroundColor: [
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 99, 132, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(223, 45, 0, 0.8)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(223, 45, 0, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        ...legendHoverHandlers,
      },
    },
  };

  return (
    <div className="chart-container" style={{ height: "350px", width: "100%", position: "relative" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default GenderChart;
