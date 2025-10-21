import { MoreVertical, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Stopwatch from "../stopwatch";

interface StopwatchCardProps {
  onRemove?: () => void; 
  onResize?: () => void;
}

export default function StopwatchCard({ onRemove, onResize }: StopwatchCardProps) {
  return (
    <Card className="relative">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Stopwatch</CardTitle>
          <CardDescription>Standard | Pomodoro | Custom </CardDescription>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-md hover:bg-muted">
              <MoreVertical className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onRemove}>Remove Card</DropdownMenuItem>
          </DropdownMenuContent>

        </DropdownMenu>
      </CardHeader>

      <CardContent>
        <Stopwatch />
      </CardContent>

      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            Footer
          </div>
        </div>
      </CardFooter> */}
    </Card>
  );
}
