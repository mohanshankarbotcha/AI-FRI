"use client";

import { useEffect, useState } from "react";
import {
  fetchKnowledgeGraph,
  reindexKnowledge,
  searchKnowledge,
  KnowledgeGraphData,
  KnowledgeNode,
} from "@/lib/api";

export default function KnowledgeInspector() {
  const [graphData, setGraphData] = useState<KnowledgeGraphData | null>(null);
  const [loading, setLoading] = useState(true);
  const [reindexing, setReindexing] = useState(false);
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"nodes" | "links" | "unresolved">("nodes");
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchKnowledgeGraph();
      setGraphData(data);
      if (data.nodes.length > 0 && !selectedNode) {
        setSelectedNode(data.nodes[0]);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load knowledge graph data.");
    } finally {
      setLoading(false);
    }
  };

  const handleReindex = async () => {
    setReindexing(true);
    try {
      await reindexKnowledge();
      await loadData();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to reindex knowledge.");
    } finally {
      setReindexing(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      loadData();
      return;
    }
    setLoading(true);
    try {
      const res = await searchKnowledge(searchQuery);
      if (graphData) {
        setGraphData({
          ...graphData,
          nodes: res.results,
        });
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Search failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Stat Metric Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
        <div className="card">
          <div className="card-title">Indexed Documents</div>
          <div style={{ fontSize: "1.875rem", fontWeight: 700, color: "var(--accent-cyan)", fontFamily: "var(--font-mono)" }}>
            {graphData?.stats.documents_indexed ?? 0}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Graph Relationships</div>
          <div style={{ fontSize: "1.875rem", fontWeight: 700, color: "var(--accent-green)", fontFamily: "var(--font-mono)" }}>
            {graphData?.stats.relationships ?? 0}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Unresolved Links</div>
          <div style={{ fontSize: "1.875rem", fontWeight: 700, color: "var(--accent-amber)", fontFamily: "var(--font-mono)" }}>
            {graphData?.stats.unresolved_links ?? 0}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Categories</div>
          <div style={{ fontSize: "1.875rem", fontWeight: 700, color: "var(--text-main)", fontFamily: "var(--font-mono)" }}>
            {graphData?.stats.categories_count ?? 0}
          </div>
        </div>
      </div>

      {/* Main Inspector Panel */}
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span className="badge badge-amber" style={{ marginRight: "0.5rem" }}>
              DEV INSPECTOR
            </span>
            <span style={{ fontSize: "0.875rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              Knowledge Index Debugger
            </span>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button className="btn" onClick={loadData} disabled={loading}>
              Reload
            </button>
            <button className="btn" onClick={handleReindex} disabled={reindexing}>
              {reindexing ? "Indexing..." : "Rebuild Index"}
            </button>
          </div>
        </div>

        {error && (
          <div style={{ color: "#EF4444", padding: "0.75rem", background: "rgba(239,68,68,0.1)", borderRadius: "6px", marginBottom: "1rem", fontSize: "0.875rem" }}>
            {error}
          </div>
        )}

        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
          <input
            type="text"
            placeholder="Filter nodes by title, tag, or content snippet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              background: "var(--bg-dark)",
              border: "1px solid var(--border-color)",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              color: "var(--text-main)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.875rem",
            }}
          />
          <button type="submit" className="btn">
            Search
          </button>
        </form>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "1rem", borderBottom: "1px solid var(--border-color)", marginBottom: "1rem" }}>
          <button
            onClick={() => setActiveTab("nodes")}
            style={{
              background: "none",
              border: "none",
              borderBottom: activeTab === "nodes" ? "2px solid var(--accent-cyan)" : "2px solid transparent",
              color: activeTab === "nodes" ? "var(--accent-cyan)" : "var(--text-muted)",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: "0.875rem",
            }}
          >
            Nodes ({graphData?.nodes.length ?? 0})
          </button>

          <button
            onClick={() => setActiveTab("links")}
            style={{
              background: "none",
              border: "none",
              borderBottom: activeTab === "links" ? "2px solid var(--accent-cyan)" : "2px solid transparent",
              color: activeTab === "links" ? "var(--accent-cyan)" : "var(--text-muted)",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: "0.875rem",
            }}
          >
            Relationships ({graphData?.links.length ?? 0})
          </button>

          <button
            onClick={() => setActiveTab("unresolved")}
            style={{
              background: "none",
              border: "none",
              borderBottom: activeTab === "unresolved" ? "2px solid var(--accent-cyan)" : "2px solid transparent",
              color: activeTab === "unresolved" ? "var(--accent-cyan)" : "var(--text-muted)",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: "0.875rem",
            }}
          >
            Unresolved Links ({graphData?.unresolved_references.length ?? 0})
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === "nodes" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {/* Left: Node List */}
            <div style={{ maxHeight: "400px", overflowY: "auto", border: "1px solid var(--border-color)", borderRadius: "6px" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Tags</th>
                  </tr>
                </thead>
                <tbody>
                  {graphData?.nodes.map((node) => (
                    <tr
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      style={{
                        cursor: "pointer",
                        background: selectedNode?.id === node.id ? "var(--bg-card-hover)" : undefined,
                      }}
                    >
                      <td style={{ fontWeight: 500 }}>{node.title}</td>
                      <td>
                        <span className="badge badge-cyan">{node.category}</span>
                      </td>
                      <td style={{ color: "var(--text-dim)", fontSize: "0.75rem" }}>
                        {node.tags.join(", ")}
                      </td>
                    </tr>
                  ))}
                  {(!graphData?.nodes || graphData.nodes.length === 0) && (
                    <tr>
                      <td colSpan={3} style={{ textAlign: "center", color: "var(--text-dim)", padding: "2rem" }}>
                        No knowledge nodes found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Right: Selected Node Details */}
            <div style={{ background: "var(--bg-dark)", border: "1px solid var(--border-color)", borderRadius: "6px", padding: "1.25rem" }}>
              {selectedNode ? (
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--accent-cyan)", fontFamily: "var(--font-mono)" }}>
                    NODE ID: {selectedNode.id}
                  </div>
                  <h3 style={{ fontSize: "1.25rem", margin: "0.5rem 0" }}>{selectedNode.title}</h3>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginBottom: "1rem" }}>
                    Path: {selectedNode.path}
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: "0.25rem" }}>
                      PREVIEW SNIPPET
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "var(--text-main)", background: "var(--bg-card)", padding: "0.75rem", borderRadius: "4px", border: "1px solid var(--border-color)" }}>
                      {selectedNode.snippet}
                    </div>
                  </div>

                  {selectedNode.tags.length > 0 && (
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      {selectedNode.tags.map((tag) => (
                        <span key={tag} className="badge badge-green">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ color: "var(--text-dim)", textAlign: "center", paddingTop: "4rem" }}>
                  Select a node from the left table to inspect details.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "links" && (
          <div style={{ maxHeight: "400px", overflowY: "auto", border: "1px solid var(--border-color)", borderRadius: "6px" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Source Node ID</th>
                  <th>Target Node ID</th>
                  <th>Relationship Type</th>
                </tr>
              </thead>
              <tbody>
                {graphData?.links.map((link, idx) => (
                  <tr key={idx}>
                    <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--accent-cyan)" }}>
                      {link.source}
                    </td>
                    <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--accent-green)" }}>
                      {link.target}
                    </td>
                    <td>
                      <span className="badge badge-cyan">{link.type}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "unresolved" && (
          <div style={{ maxHeight: "400px", overflowY: "auto", border: "1px solid var(--border-color)", borderRadius: "6px" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Source File</th>
                  <th>Target Title</th>
                  <th>Reference Type</th>
                </tr>
              </thead>
              <tbody>
                {graphData?.unresolved_references.map((unres, idx) => (
                  <tr key={idx}>
                    <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem" }}>
                      {unres.source_path}
                    </td>
                    <td style={{ fontWeight: 600, color: "var(--accent-amber)" }}>
                      [[{unres.target_title}]]
                    </td>
                    <td>
                      <span className="badge badge-amber">{unres.type}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
