import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Project {
    id: string;
    name: string;
    description?: string | null;
    status: string;
    message?: string | null;
    invoice_url?: string | null;
    created_at: string;
    updated_at: string;
}

export default function ProjectManager() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [message, setMessage] = useState("");
    const [invoiceUrl, setInvoiceUrl] = useState("");
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [loading, setLoading] = useState(false);

    // 🔹 Fetch all projects
    async function fetchProjects() {
        const { data, error } = await supabase.from("projects").select("*");
        if (error) {
            console.error(error);
        } else {
            setProjects(data || []);
        }
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    // 🔹 Add new project
    async function saveProject() {
        if (!projectName.trim()) {
            alert("❌ Please enter a project name");
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.from("projects").insert([{
                name: projectName,
                description: projectDescription,
                status: 'active',
                message,
                invoice_url: invoiceUrl
            }]);

            if (error) {
                alert("❌ Error saving project: " + error.message);
            } else {
                alert("✅ Project saved successfully!");
                setProjectName("");
                setProjectDescription("");
                setMessage("");
                setInvoiceUrl("");
                fetchProjects();
            }
        } catch (err) {
            console.error("Error:", err);
            alert("❌ Error saving project");
        } finally {
            setLoading(false);
        }
    }

    // 🔹 Delete project
    async function deleteProject(id: string) {
        if (!window.confirm("Are you sure you want to delete this project?")) return;
        
        try {
            const { error } = await supabase.from("projects").delete().eq("id", id);
            if (error) {
                alert("❌ Error deleting project");
            } else {
                alert("✅ Project deleted successfully!");
                fetchProjects();
            }
        } catch (err) {
            console.error("Error:", err);
            alert("❌ Error deleting project");
        }
    }

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">📁 Project Manager</h1>

            <input
                className="border p-2 w-full mb-2 rounded"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
            />
            <textarea
                className="border p-2 w-full mb-2 rounded"
                placeholder="Project Description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
            />
            <textarea
                className="border p-2 w-full mb-2 rounded"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <input
                className="border p-2 w-full mb-2 rounded"
                placeholder="Invoice URL"
                value={invoiceUrl}
                onChange={(e) => setInvoiceUrl(e.target.value)}
            />

            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                onClick={saveProject}
                disabled={loading}
            >
                {loading ? "Saving..." : "Save Project"}
            </button>

            <hr className="my-4" />

            <h2 className="text-xl font-semibold mb-2">Existing Projects</h2>
            {projects.length === 0 && <p className="text-gray-500">No projects yet.</p>}
            {projects.map((p) => (
                <div key={p.id} className="border p-4 mb-2 rounded shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">{p.name}</h3>
                        <button
                            onClick={() => deleteProject(p.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                        >
                            Delete
                        </button>
                    </div>
                    {p.description && <p className="text-gray-600 mb-2">📝 {p.description}</p>}
                    {p.message && <p className="text-gray-700 mb-2">🗒 {p.message}</p>}
                    <p className="text-sm text-gray-500 mb-2">Status: <span className="font-semibold">{p.status}</span></p>
                    {p.invoice_url && (
                        <a 
                            href={p.invoice_url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-blue-500 hover:underline text-sm"
                        >
                            📄 View Invoice
                        </a>
                    )}
                </div>
            ))}
        </div>
    );
}
