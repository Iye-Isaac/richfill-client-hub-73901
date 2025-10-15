import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar, Upload, Download, MessageSquare, CheckCircle2 } from "lucide-react";
import { useParams } from "react-router-dom";

const milestones = [
  { name: "Project Kickoff", date: "Nov 1, 2025", completed: true },
  { name: "Design Phase", date: "Nov 15, 2025", completed: true },
  { name: "Development Phase", date: "Dec 5, 2025", completed: false },
  { name: "Testing & QA", date: "Dec 18, 2025", completed: false },
  { name: "Launch", date: "Dec 20, 2025", completed: false },
];

const files = [
  { name: "Design Mockups.fig", date: "Nov 10, 2025", size: "24 MB" },
  { name: "Project Brief.pdf", date: "Nov 1, 2025", size: "2.3 MB" },
  { name: "Asset Pack.zip", date: "Nov 12, 2025", size: "156 MB" },
];

const ProjectDetail = () => {
  const { id } = useParams();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-foreground">E-commerce Website Redesign</h1>
              <span className="status-badge status-progress">In Progress</span>
            </div>
            <p className="text-muted-foreground">Complete overhaul of the online store with modern UI/UX</p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary-light">
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact Manager
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-card-foreground">65%</span>
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                </div>
                <Progress value={65} className="h-2" />
                <p className="text-sm text-muted-foreground">On track for completion</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">Deadline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-card-foreground">Dec 20</p>
                <p className="text-sm text-muted-foreground">5 days remaining</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base">Project Manager</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  <span className="font-semibold text-accent-foreground">SM</span>
                </div>
                <div>
                  <p className="font-medium text-card-foreground">Sarah Mitchell</p>
                  <p className="text-sm text-muted-foreground">sarah@richfill.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Project Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    milestone.completed ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {milestone.completed ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium ${milestone.completed ? "text-card-foreground" : "text-muted-foreground"}`}>
                      {milestone.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{milestone.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Project Files</CardTitle>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Upload File
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-card-foreground truncate">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{file.date} · {file.size}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProjectDetail;
