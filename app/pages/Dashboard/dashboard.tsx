import { useState } from "react";
import { Button } from "~/components/ui/button";
import { dashboardCards, type DashboardCardType } from "~/components/cards";
import { DashboardLayout } from "~/layouts/dashboardLayout";
import type { Route } from "./+types/dashboard";

export async function loader() {
  const data = { user: "Karryl", role: "Admin" };
  return data;
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const [activeCards, setActiveCards] = useState<DashboardCardType[]>([]);

  function addCard(type: DashboardCardType) {
    setActiveCards((prev) => [...prev, type]);
  }

  function removeCard(index: number) {
    // Remove card at specified index
    // TODO: Improve by using unique IDs for cards
    setActiveCards((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">
          Welcome back, {loaderData.user}!
        </h1>

        <div className="flex gap-2">
          <Button onClick={() => addCard("chart")}>Add Chart</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          {activeCards.map((type, idx) => {
            const CardComponent = dashboardCards[type].component;
            return (
              <CardComponent
                key={`${type}-${idx}`}
                onRemove={() => removeCard(idx)}
              />
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
