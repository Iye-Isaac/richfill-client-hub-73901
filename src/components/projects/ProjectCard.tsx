import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, ExternalLink } from "lucide-react";
import { format } from "date-fns";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string | null;
    status: string;
    created_at: string;
    updated_at: string;
    invoice_url: string | null;
    message: string | null;
  };
  onEdit: (project: any) => void;
  onDelete: (id: string) => void;
}

const statusColors = {
  active: "bg-success text-success-foreground",
  completed: "bg-primary text-primary-foreground",
  "on-hold": "bg-warning text-warning-foreground",
  cancelled: "bg-destructive text-destructive-foreground",
  draft: "bg-muted text-muted-foreground",
};

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{project.name}</CardTitle>
            <CardDescription className="line-clamp-2">
              {project.description || "No description provided"}
            </CardDescription>
          </div>
          <Badge className={statusColors[project.status as keyof typeof statusColors] || statusColors.draft}>
            {project.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {project.message && (
            <p className="text-sm text-muted-foreground border-l-2 border-accent pl-3 py-1">
              {project.message}
            </p>
          )}
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Created {format(new Date(project.created_at), "MMM d, yyyy")}</span>
            <span>Updated {format(new Date(project.updated_at), "MMM d, yyyy")}</span>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(project)}
              className="flex-1"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            {project.invoice_url && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(project.invoice_url!, "_blank")}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(project.id)}
              className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
