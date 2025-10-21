import ChartCard from "./chartCard";
import StopwatchCard from "./stopwatchCard";

export const dashboardCards = {
  chart: {
    component: ChartCard,
    label: "Line Chart",
    description: "Displays traffic trends over time",
    span: "col-span-1 md:col-span-2", // will stretch to 2 columns on md+ screens
  },
  stopwatch: {
    component: StopwatchCard,
    label: "Stopwatch",
    description: "Simple stopwatch for tracking time",
    span: "col-span-1 md:col-span-2",
  },
};

export type DashboardCardType = keyof typeof dashboardCards;
