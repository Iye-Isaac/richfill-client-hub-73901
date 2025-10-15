import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/layout/Navigation";
import { FolderKanban, FileText, MessageSquare, TrendingUp, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const Dashboard = () => {
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: invoices, isLoading: invoicesLoading } = useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("invoices")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const stats = [
    {
      title: "Total Projects",
      value: projects?.length || 0,
      icon: FolderKanban,
      description: `${projects?.filter(p => p.status === "active").length || 0} active`,
      color: "text-primary",
    },
    {
      title: "Invoices",
      value: invoices?.length || 0,
      icon: FileText,
      description: `${invoices?.filter(i => i.status === "draft").length || 0} drafts`,
      color: "text-accent",
    },
    {
      title: "Messages",
      value: messages?.length || 0,
      icon: MessageSquare,
      description: "Total conversations",
      color: "text-success",
    },
    {
      title: "Revenue",
      value: `$${invoices?.reduce((sum, inv) => sum + (Number(inv.amount) || 0), 0).toLocaleString()}`,
      icon: TrendingUp,
      description: "Total invoiced",
      color: "text-warning",
    },
  ];

  const isLoading = projectsLoading || invoicesLoading || messagesLoading;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto py-8 px-4">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Overview of your projects, invoices, and messages
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </CardTitle>
                        <Icon className={`h-4 w-4 ${stat.color}`} />
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {stat.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {projects?.slice(0, 5).map((project: any) => (
                        <div
                          key={project.id}
                          className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex-1">
                            <p className="font-medium">{project.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(project.created_at), "MMM d, yyyy")}
                            </p>
                          </div>
                          <Badge variant="outline">{project.status}</Badge>
                        </div>
                      ))}
                      {!projects?.length && (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No projects yet
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Invoices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {invoices?.slice(0, 5).map((invoice: any) => (
                        <div
                          key={invoice.id}
                          className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex-1">
                            <p className="font-medium">{invoice.invoice_number || "Draft"}</p>
                            <p className="text-xs text-muted-foreground">
                              {invoice.due_date
                                ? `Due ${format(new Date(invoice.due_date), "MMM d, yyyy")}`
                                : "No due date"}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              ${Number(invoice.amount || 0).toLocaleString()}
                            </p>
                            <Badge variant="outline" className="text-xs">
                              {invoice.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      {!invoices?.length && (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No invoices yet
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
