"use client";

import { useEffect, useState } from "react";
import { fetchHealth, HealthResponse } from "@/lib/api";

export default function StatusPanel() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchHealth();
      setHealth(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to connect to backend engine.");
      setHealth(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card">
      <div className="card-title">
        <span className={`status-dot ${health ? "online" : "offline"}`}></span>
        System Health & Status
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
            ENGINE STATUS
          </div>
          <div style={{ fontSize: "1.125rem", fontWeight: 600, marginTop: "0.25rem" }}>
            {loading ? (
              <span style={{ color: "var(--accent-amber)" }}>CONNECTING...</span>
            ) : health ? (
              <span style={{ color: "var(--accent-green)" }}>ONLINE / OPERATIONAL</span>
            ) : (
              <span style={{ color: "#EF4444" }}>OFFLINE</span>
            )}
          </div>
        </div>

        {health && (
          <>
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
                SERVICE NAME
              </div>
              <div style={{ fontSize: "0.875rem", color: "var(--text-main)" }}>{health.service}</div>
            </div>

            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
                VERSION / ENV
              </div>
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem" }}>
                <span className="badge badge-cyan">v{health.version}</span>
                <span className="badge badge-green">{health.environment}</span>
              </div>
            </div>
          </>
        )}

        <div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
            INTELLIGENCE ENGINE
          </div>
          <div style={{ fontSize: "0.875rem", color: "var(--accent-amber)", marginTop: "0.25rem" }}>
            UNINITIALIZED (LEVEL 1 & 2 FOUNDATION)
          </div>
        </div>

        {error && (
          <div style={{ fontSize: "0.75rem", color: "#EF4444", background: "rgba(239, 68, 68, 0.1)", padding: "0.5rem", borderRadius: "4px" }}>
            {error}
          </div>
        )}

        <button className="btn" onClick={checkHealth} disabled={loading} style={{ marginTop: "0.5rem" }}>
          {loading ? "Checking..." : "Refresh Health"}
        </button>
      </div>
    </div>
  );
}
