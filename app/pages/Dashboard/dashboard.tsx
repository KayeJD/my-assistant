import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { dashboardCards, type DashboardCardType } from "~/components/cards";
import { DashboardLayout } from "~/layouts/dashboardLayout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";


import type { Route } from "./+types/dashboard";

export async function loader() {
  const data = { user: "Karryl", role: "Admin" };
  return data;
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const [activeCards, setActiveCards] = useState<
    { id: number; type: DashboardCardType; size?: "1x" | "2x" }[]
  >([
    { id: Date.now(), type: "stopwatch", size: "2x" },
    { id: Date.now() + 2, type: "todo" , size: "2x"},
  ]);


  const addCard = (type: DashboardCardType) => {
    setActiveCards((prev) => {
      if (type === "stopwatch") {
        const hasStopwatch = prev.some((card) => card.type === "stopwatch");
        if (hasStopwatch) return prev;

        return [{ id: Date.now(), type, size: "2x" }, ...prev];
      }

      return [...prev, { id: Date.now(), type, size: "1x" }];
    });
  };

  function removeCard(index: number) {
    setActiveCards((prev) => prev.filter((_, i) => i !== index));
  }

  const toggleCardSize = (id: number) => {
    setActiveCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, size: card.size === "2x" ? "1x" : "2x" } : card
      )
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">
            Welcome back, {loaderData.user}!
          </h1>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> Add Card
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => addCard("chart")}>
                📈 Chart Card
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => addCard("stopwatch")}>
                ⏱ Stopwatch Card
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => addCard("todo")}>
                📝 To-Do List Card
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div
          className="
            grid gap-6 pt-4
            grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6
          "
        >
          {activeCards.map((card) => {
            const CardComponent = dashboardCards[card.type].component;
            return (
              <div
                key={card.id}
                className={card.size === "2x" ? "col-span-2" : "col-span-1"}
              >
                <CardComponent
                  onRemove={() =>
                    setActiveCards(activeCards.filter((c) => c.id !== card.id))
                  }
                  onResize={() => toggleCardSize(card.id)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
