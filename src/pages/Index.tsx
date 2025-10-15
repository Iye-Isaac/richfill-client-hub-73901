import { Button } from "@/components/ui/button";
import { ArrowRight, FolderKanban } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 px-4">
      <div className="text-center space-y-8 max-w-3xl">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-4">
          <FolderKanban className="w-10 h-10 text-primary" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Project Management Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Organize, track, and manage all your projects in one powerful platform. 
            Stay on top of deadlines, collaborate with your team, and bring your ideas to life.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button 
            size="lg" 
            onClick={() => navigate("/projects")}
            className="group"
          >
            View Projects
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate("/projects")}
          >
            Get Started
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          <div className="p-6 rounded-xl bg-card border hover:border-primary/50 transition-colors">
            <h3 className="font-semibold text-lg mb-2">Track Progress</h3>
            <p className="text-sm text-muted-foreground">
              Monitor project status and milestones with intuitive visual indicators
            </p>
          </div>
          <div className="p-6 rounded-xl bg-card border hover:border-primary/50 transition-colors">
            <h3 className="font-semibold text-lg mb-2">Stay Organized</h3>
            <p className="text-sm text-muted-foreground">
              Keep all project details, notes, and documents in one centralized location
            </p>
          </div>
          <div className="p-6 rounded-xl bg-card border hover:border-primary/50 transition-colors">
            <h3 className="font-semibold text-lg mb-2">Manage Efficiently</h3>
            <p className="text-sm text-muted-foreground">
              Create, update, and archive projects with a streamlined workflow
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
