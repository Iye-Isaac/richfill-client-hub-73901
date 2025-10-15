import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  status: "pending" | "progress" | "completed";
  progress: number;
  deadline: string;
  description: string;
  onClick?: () => void;
}

const statusLabels = {
  pending: "Pending",
  progress: "In Progress",
  completed: "Completed",
};

export const ProjectCard = ({
  title,
  status,
  progress,
  deadline,
  description,
  onClick,
}: ProjectCardProps) => {
  return (
    <Card
      className="card-hover cursor-pointer border-border bg-card"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-card-foreground truncate">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
          </div>
          <span className={cn("status-badge", `status-${status}`)}>
            {statusLabels[status]}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-card-foreground">Progress</span>
            <span className="text-sm font-semibold text-primary">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{deadline}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>5 days left</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
