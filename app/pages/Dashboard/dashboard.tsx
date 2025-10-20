import { useState } from "react";
import { Button } from "~/components/ui/button";
import { DashboardLayout } from "~/layouts/dashboardLayout";
import ChartCard from "~/components/cards/chartCard";
import type { Route } from "./+types/dashboard";

export async function loader() {
  const data = { user: "Karryl", role: "Admin" };
  return data;
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const [showChart, setShowChart] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">
            Welcome back, {loaderData.user}!
          </h1>
          <Button onClick={() => setShowChart((prev) => !prev)}>
            {showChart ? "Hide Chart" : "Show Chart"}
          </Button>
        </div>

        {/* Conditionally render the chart */}
        {showChart && <ChartCard title="Traffic Overview" />}
      </div>
    </DashboardLayout>
  );
}
