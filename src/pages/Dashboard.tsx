import { DashboardLayout } from "@/components/DashboardLayout";
import { ProjectCard } from "@/components/ProjectCard";
import { StatCard } from "@/components/StatCard";
import { FolderKanban, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const activeProjects = projects.filter((p) => p.status === "active");
  const completedProjects = projects.filter((p) => p.status === "completed");

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, John 👋</h1>
          <p className="text-muted-foreground mt-2">Here's what's happening with your projects.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Projects"
            value={projects.length}
            icon={FolderKanban}
          />
          <StatCard
            title="Completed"
            value={completedProjects.length}
            icon={CheckCircle2}
          />
          <StatCard
            title="Active"
            value={activeProjects.length}
            icon={Clock}
          />
          <StatCard
            title="Success Rate"
            value={projects.length > 0 ? `${Math.round((completedProjects.length / projects.length) * 100)}%` : "0%"}
            icon={TrendingUp}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-foreground">Recent Projects</h2>
            <button 
              onClick={() => navigate("/project-manager")}
              className="text-sm font-medium text-primary hover:text-primary-light transition-colors"
            >
              Manage projects →
            </button>
          </div>
          {loading ? (
            <p className="text-muted-foreground">Loading projects...</p>
          ) : projects.length === 0 ? (
            <p className="text-muted-foreground">No projects yet. Create your first project!</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {projects.slice(0, 4).map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.name}
                  status={project.status as "progress" | "completed" | "pending"}
                  progress={project.status === "completed" ? 100 : project.status === "active" ? 50 : 10}
                  deadline="Ongoing"
                  description={project.description || "No description"}
                  onClick={() => navigate(`/project/${project.id}`)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="bg-gradient-primary rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-primary-foreground mb-2">
            Need help with your project?
          </h3>
          <p className="text-primary-foreground/90 mb-4">
            Our team is here to assist you every step of the way.
          </p>
          <p className="text-primary-foreground/90 mb-6 font-semibold">
            📞 09099996659
          </p>
          <button className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent-muted transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
