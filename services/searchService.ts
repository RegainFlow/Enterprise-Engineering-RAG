import { Document } from '../types';

const MOCK_DOCS: Document[] = [
  {
    id: '1',
    title: 'Turbine Blade Stress Analysis Report - Q3',
    snippet: '...finite element analysis (FEA) indicates <em>stress fractures</em> forming at the root of the blade under peak load conditions. Recommended material substitution to Titanium Alloy...',
    score: 0.98,
    category: 'Mechanical',
    fileType: 'PDF',
    date: '2023-10-12',
    tags: ['FEA', 'Safety', 'Critical'],
    isSemanticMatch: true,
  },
  {
    id: '2',
    title: 'API Gateway Rate Limiting Configuration',
    snippet: '...implementation of <em>token bucket algorithm</em> for distributed rate limiting across all microservices. Configured default limit to 1000 rps per client...',
    score: 0.95,
    category: 'Software',
    fileType: 'DOCX',
    date: '2023-11-05',
    tags: ['Infrastructure', 'Security'],
    isSemanticMatch: true,
  },
  {
    id: '3',
    title: 'Bridge Expansion Joint Schematics',
    snippet: '...detailed AutoCAD drawings for the thermal expansion joints for the North-South viaduct. Tolerance levels adjusted for extreme weather variability...',
    score: 0.89,
    category: 'Civil',
    fileType: 'CAD',
    date: '2023-09-20',
    tags: ['Blueprints', 'Construction'],
    isSemanticMatch: false,
  },
  {
    id: '4',
    title: 'Production Server Error Logs - Cluster B',
    snippet: '...[ERROR] Connection timeout to Elastic Cloud instance. <em>Heap memory usage</em> exceeded 95%. Garbage collection pause time > 2000ms...',
    score: 0.82,
    category: 'Software',
    fileType: 'Log',
    date: '2023-11-28',
    tags: ['Incident', 'Ops'],
    isSemanticMatch: false,
  },
  {
    id: '5',
    title: 'High Voltage Circuit Breaker Specs',
    snippet: '...technical specifications for SF6 gas insulated switchgear. Rated voltage 145kV. Semantic analysis suggests relevance to recent substation upgrades...',
    score: 0.91,
    category: 'Electrical',
    fileType: 'PDF',
    date: '2023-08-15',
    tags: ['Specs', 'High Voltage'],
    isSemanticMatch: true,
  },
  {
    id: '6',
    title: 'Code Review Guidelines v2.0',
    snippet: '...enforcing strict typing in TypeScript projects. All PRs must include unit tests covering at least 80% of new logic...',
    score: 0.75,
    category: 'Software',
    fileType: 'DOCX',
    date: '2023-12-01',
    tags: ['Process', 'DevEx'],
    isSemanticMatch: true,
  }
];

export const searchDocuments = async (query: string, mode: 'hybrid' | 'exact'): Promise<Document[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!query) return resolve([]);
      
      // Basic mock filtering logic
      const results = MOCK_DOCS.filter(doc => {
        const text = (doc.title + doc.snippet).toLowerCase();
        const q = query.toLowerCase();
        
        // Exact match logic
        if (mode === 'exact') {
            return text.includes(q);
        }
        
        // Hybrid/Semantic simulation: Returns more results (fuzzy)
        // In a real app, this is where ELSER would expand terms (e.g., 'stress' -> 'load', 'fracture')
        // For mock, we just return everything if query length > 2
        return text.includes(q) || (query.length > 3 && Math.random() > 0.3); 
      });

      // Sort by score
      resolve(results.sort((a, b) => b.score - a.score));
    }, 600); // Simulate network latency
  });
};
