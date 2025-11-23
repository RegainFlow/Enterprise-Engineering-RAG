export interface Document {
  id: string;
  title: string;
  snippet: string;
  score: number;
  category: 'Civil' | 'Mechanical' | 'Software' | 'Electrical';
  fileType: 'PDF' | 'CAD' | 'DOCX' | 'Log';
  date: string;
  tags: string[];
  isSemanticMatch: boolean; // Simulating ELSER v2 retrieval
}

export interface SearchState {
  query: string;
  results: Document[];
  isLoading: boolean;
  filters: {
    categories: string[];
    fileTypes: string[];
  };
  mode: 'hybrid' | 'exact'; // ELSER vs Keyword
}

export interface SystemStats {
  dailyUsers: number;
  avgLatency: number; // ms
  indexSize: number; // million docs
  activeNodes: number;
}
