import ChartCard from "./chartCard";

export const dashboardCards = {
  chart: {
    component: ChartCard,
    label: "Line Chart",
    description: "Displays traffic trends over time",
    span: "col-span-1 md:col-span-2", // will stretch to 2 columns on md+ screens
  },
};

export type DashboardCardType = keyof typeof dashboardCards;
