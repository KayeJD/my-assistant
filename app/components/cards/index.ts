import ChartCard from "./chartCard";

export const dashboardCards = {
  chart: {
    component: ChartCard,
    label: "Line Chart",
    description: "Displays traffic trends over time",
  },
};

export type DashboardCardType = keyof typeof dashboardCards;
