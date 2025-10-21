import { useState } from "react";
import { MoreVertical, PlusCircle, Trash2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

interface TodoCardProps {
  onRemove?: () => void;
}

export default function TodoCard({ onRemove }: TodoCardProps) {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      setNewTask("");
    }
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <Card className="relative col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>To-Do List</CardTitle>
          <CardDescription>Track your daily tasks</CardDescription>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-md hover:bg-muted">
              <MoreVertical className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onRemove}>
              <Trash2 className="mr-2 h-4 w-4" />
              Remove Card
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent>
        <div className="flex gap-2 mb-3">
          <Input
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <Button onClick={addTask} size="icon">
            <PlusCircle className="h-5 w-5" />
          </Button>
        </div>

        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-2 bg-muted rounded-md"
            >
              <span>{task}</span>
              <button
                onClick={() => removeTask(index)}
                className="text-muted-foreground hover:text-destructive transition"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
          {tasks.length === 0 && (
            <p className="text-sm text-muted-foreground italic">
              No tasks yet — add one above.
            </p>
          )}
        </ul>
      </CardContent>
    </Card>
  );
}
