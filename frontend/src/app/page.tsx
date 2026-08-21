import StatusPanel from "@/components/StatusPanel";
import KnowledgeInspector from "@/components/KnowledgeInspector";

export default function Home() {
  return (
    <main className="container">
      {/* Brand Header */}
      <header className="brand-header">
        <div>
          <h1 className="brand-title">FRIDAY</h1>
          <div className="brand-subtitle">PERSONAL AI INTELLIGENCE SYSTEM</div>
        </div>

        <div style={{ textAlign: "right" }}>
          <span className="badge badge-cyan" style={{ fontSize: "0.875rem" }}>
            LEVEL 1 & 2 ENGINE ACTIVE
          </span>
        </div>
      </header>

      {/* Main Grid: Left Status Panel, Right Knowledge Inspector */}
      <div className="grid-two">
        <aside>
          <StatusPanel />
        </aside>

        <section>
          <KnowledgeInspector />
        </section>
      </div>
    </main>
  );
}
