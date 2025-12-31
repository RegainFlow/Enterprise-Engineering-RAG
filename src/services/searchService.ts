import { Document } from '../types';

export const MOCK_DOCS: Document[] = [
  {
    id: '1',
    title: 'PLA Layer Adhesion Failure Analysis',
    snippet: '...poor layer bonding observed at 190°C. Raising hotend temp to 215°C improved strength by 40%. Recommended fan speed reduction to 50% for initial layers...',
    score: 0.98,
    category: 'Troubleshooting',
    fileType: 'PDF',
    date: '2025-01-12',
    tags: ['PLA', 'Adhesion', 'Temperature'],
    isSemanticMatch: true,
  },
  {
    id: '2',
    title: 'Prusa MK4 Input Shaper Config',
    snippet: '...optimized <em>IS profile</em> for high-speed PETG printing. Acceleration set to 4000mm/s². Vibration compensation eliminates ringing visible on Y-axis...',
    score: 0.95,
    category: 'Printer',
    fileType: 'Config',
    date: '2025-02-05',
    tags: ['Firmware', 'Speed', 'Quality'],
    isSemanticMatch: true,
  },
  {
    id: '3',
    title: 'TPU 95A Retraction Settings',
    snippet: '...disable retraction to prevent clogging in Bowden setups. For direct drive, restrict retraction length to 0.8mm at 30mm/s. Hygroscopic warnings apply...',
    score: 0.89,
    category: 'Material',
    fileType: 'PDF',
    date: '2024-11-20',
    tags: ['Flexible', 'Settings', 'Clog'],
    isSemanticMatch: false,
  },
  {
    id: '4',
    title: 'Voron 2.4 Gantry Leveling Macro',
    snippet: '...Quad Gantry Leveling (QGL) failing on Z2 motor. Check belt tension variance. <em>Klipper log</em> shows "Probe triggered prior to movement" error...',
    score: 0.82,
    category: 'Printer',
    fileType: 'Config',
    date: '2025-01-28',
    tags: ['Klipper', 'Voron', 'Macro'],
    isSemanticMatch: false,
  },
  {
    id: '5',
    title: 'OrcaSlicer V1.9 Beta Release Notes',
    snippet: '...new seam painting algorithm reduces visible z-seams on cylindrical objects. Added organic supports for resin printers and improved bridging logic...',
    score: 0.91,
    category: 'Slicer',
    fileType: 'PDF',
    date: '2024-10-15',
    tags: ['Update', 'Software', 'Support'],
    isSemanticMatch: true,
  },
  {
    id: '6',
    title: 'Nylon PA12 Bed Adhesion Guide',
    snippet: '...requires Garolite (G10) surface or copious amount of PVA glue. Enclosure temp must be maintained at 50°C to prevent warping. Bed temp: 100°C...',
    score: 0.87,
    category: 'Material',
    fileType: 'PDF',
    date: '2024-12-01',
    tags: ['Nylon', 'Warping', 'Enclosure'],
    isSemanticMatch: true,
  },
  {
    id: '7',
    title: 'Dual Z-Axis Upgrade Kit Manual',
    snippet: '...installation steps for Ender 3 series. Eliminate X-gantry sag. Requires motherboard V4.2.7 or higher for independent stepper drivers...',
    score: 0.85,
    category: 'Upgrade',
    fileType: 'PDF',
    date: '2024-09-15',
    tags: ['Mod', 'Hardware', 'Stability'],
    isSemanticMatch: true,
  },
  {
    id: '8',
    title: 'Resin Exposure Test Matrix - 8K Resin',
    snippet: '...validation of 1.8s exposure time for 0.05mm layers on Saturn 3 Ultra. Overexposure causing loss of detail in negative spaces...',
    score: 0.94,
    category: 'Material',
    fileType: 'Image',
    date: '2025-01-10',
    tags: ['SLA', 'Resin', 'Calibration'],
    isSemanticMatch: true,
  },
  {
    id: '9',
    title: 'OctoPrint Raspberry Pi 4 Image',
    snippet: '...pre-configured Raspbian image with Webcam support and Spaghetti Detective plugin. Fixes USB serial connection dropouts...',
    score: 0.78,
    category: 'Printer',
    fileType: 'Firmware',
    date: '2024-11-05',
    tags: ['OctoPrint', 'Monitor', 'WiFi'],
    isSemanticMatch: false,
  },
  {
    id: '10',
    title: 'Lithophane Generation Tutorial',
    snippet: '...convert photos to STL. Use 100% infill. Set "positive image" setting for correct light transmission. Recommend white PLA...',
    score: 0.85,
    category: 'Slicer',
    fileType: 'STL',
    date: '2024-10-20',
    tags: ['Art', 'Post-Processing'],
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
