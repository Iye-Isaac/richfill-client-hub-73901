import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function ProjectManager() {
    const [projects, setProjects] = useState< any[] >([]);
    const [message, setMessage] = useState("");
    const [invoiceUrl, setInvoiceUrl] = useState("");
    const [projectName, setProjectName] = useState("");
    const [loading, setLoading] = useState(false);

    // 🔹 Fetch all projects
    async function fetchProjects() {
        const { data, error } = await supabase.from("projects").select("*");
        if (error) console.error(error);
        else setProjects(data || []);
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    // 🔹 Add new or edit existing project
    async function saveProject() {
        if (!projectName.trim()) {
            alert("❌ Please enter a project name");
            return;
        }

        setLoading(true);
        const { error } = await supabase
            .from("projects")
            .insert([{ name: projectName, message, invoice_url: invoiceUrl }]);
        setLoading(false);

        if (error) alert("❌ Error saving project: " + error.message);
        else {
            alert("✅ Project saved successfully!");
            setProjectName("");
            setMessage("");
            setInvoiceUrl("");
            fetchProjects();
        }
    }

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">📁 Project Manager</h1>

            <input
                className="border p-2 w-full mb-2"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
            />
            <textarea
                className="border p-2 w-full mb-2"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <input
                className="border p-2 w-full mb-2"
                placeholder="Invoice URL"
                value={invoiceUrl}
                onChange={(e) => setInvoiceUrl(e.target.value)}
            />

            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={saveProject}
                disabled={loading}
            >
                {loading ? "Saving..." : "Save Project"}
            </button>

            <hr className="my-4" />

            <h2 className="text-xl font-semibold mb-2">Existing Projects</h2>
            {projects.length === 0 && <p>No projects yet.</p>}
            {projects.map((p) => (
                <div key={p.id} className="border p-2 mb-2 rounded">
                    <h3 className="font-bold">{p.name}</h3>
                    <p>🗒 {p.message}</p>
                    <a href={p.invoice_url} target="_blank" rel="noreferrer" className="text-blue-500">
                        View Invoice
                    </a>
                </div>
            ))}
        </div>
    );
}
