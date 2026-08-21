const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface HealthResponse {
  status: string;
  service: string;
  version: string;
  environment: string;
}

export interface KnowledgeNode {
  id: string;
  title: string;
  path: string;
  category: string;
  tags: string[];
  snippet: string;
  frontmatter: Record<string, unknown>;
}

export interface KnowledgeLink {
  source: string;
  target: string;
  type: string;
  alias?: string;
  label?: string;
}

export interface UnresolvedLink {
  source_id: string;
  source_path: string;
  target_title: string;
  alias?: string;
  type: string;
}

export interface KnowledgeGraphData {
  nodes: KnowledgeNode[];
  links: KnowledgeLink[];
  unresolved_references: UnresolvedLink[];
  stats: {
    documents_indexed: number;
    relationships: number;
    unresolved_links: number;
    categories_count: number;
    errors?: number;
  };
}

export async function fetchHealth(): Promise<HealthResponse> {
  const res = await fetch(`${API_BASE_URL}/health`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Health check failed with status: ${res.status}`);
  }
  return res.json();
}

export async function fetchKnowledgeGraph(): Promise<KnowledgeGraphData> {
  const res = await fetch(`${API_BASE_URL}/api/knowledge`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch knowledge graph: ${res.status}`);
  }
  return res.json();
}

export async function fetchKnowledgeNode(nodeId: string): Promise<{
  node: KnowledgeNode;
  outgoing_links: KnowledgeLink[];
  backlinks: KnowledgeLink[];
}> {
  const res = await fetch(`${API_BASE_URL}/api/knowledge/nodes/${encodeURIComponent(nodeId)}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch node ${nodeId}: ${res.status}`);
  }
  return res.json();
}

export async function searchKnowledge(query: string): Promise<{
  query: string;
  total_results: number;
  results: KnowledgeNode[];
}> {
  const res = await fetch(
    `${API_BASE_URL}/api/knowledge/search?q=${encodeURIComponent(query)}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error(`Search failed: ${res.status}`);
  }
  return res.json();
}

export async function reindexKnowledge(): Promise<{
  status: string;
  message: string;
  stats: Record<string, unknown>;
}> {
  const res = await fetch(`${API_BASE_URL}/api/knowledge/reindex`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Reindexing failed: ${res.status}`);
  }
  return res.json();
}
