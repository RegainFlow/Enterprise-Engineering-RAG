export interface Document {
  id: string;
  title: string;
  snippet: string;
  score: number;
  category: 'Material' | 'Printer' | 'Slicer' | 'Troubleshooting' | 'Upgrade';
  fileType: 'PDF' | 'STL' | 'GCODE' | 'Config' | 'Firmware' | 'Image';
  date: string;
  tags: string[];
  isSemanticMatch: boolean; // Simulating Neural Search
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
