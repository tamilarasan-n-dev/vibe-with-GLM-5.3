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
import { useChartTheme } from "./chart-theme";

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

const ContinentChart = () => {
  const t = useChartTheme();
  const data = {
    labels: [
      "Oceania",
      "Antarctica",
      "Asia",
      "South America",
      "North America",
      "Europe",
      "Africa",
    ],
    datasets: [
      {
        data: [
          5063650, 3500, 42602750, 26189600, 76068150, 47540200, 10777350,
        ],
        backgroundColor: t.palette(7),
        borderColor: t.surface,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "62%",
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: { color: t.ink2, font: t.font, boxWidth: 10, boxHeight: 10, useBorderRadius: true, borderRadius: 2 },
        ...legendHoverHandlers,
      },
      tooltip: { backgroundColor: t.ink, titleColor: t.surface, bodyColor: t.surface, titleFont: t.font, bodyFont: t.font, padding: 10, cornerRadius: 8 },
    },
  };

  return (
    <div className="chart-container" style={{ height: "350px", width: "100%", position: "relative" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default ContinentChart;
