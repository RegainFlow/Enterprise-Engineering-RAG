
import React, { useEffect, useRef, useState } from 'react';
import GlassCard from '../../components/GlassCard';
import { PiShareNetworkDuotone, PiFileTextDuotone, PiTagDuotone, PiMagnifyingGlassPlusDuotone, PiMagnifyingGlassMinusDuotone, PiArrowsOutSimpleDuotone } from "react-icons/pi";
import { MOCK_DOCS } from '../../services/searchService';
import { Document } from '../../types';

// Graph Types
interface Node extends Document {
    x: number;
    y: number;
    vx: number;
    vy: number;
}

interface Edge {
    source: string;
    target: string;
    strength: number;
}

// Color mapping for categories
const CATEGORY_COLORS: Record<string, string> = {
    'Material': '#00d6cb',      // Primary Cyan
    'Printer': '#3b82f6',       // Blue
    'Slicer': '#f59e0b',        // Orange
    'Troubleshooting': '#ef4444', // Red
    'Upgrade': '#10b981',       // Green
};

const KnowledgeGraphView: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [isInteractiveMode, setIsInteractiveMode] = useState(false);

    // Initialize Graph Data
    useEffect(() => {
        // 1. Create Nodes with random initial positions but centered
        const initialNodes: Node[] = MOCK_DOCS.map(doc => ({
            ...doc,
            x: 400 + (Math.random() - 0.5) * 200, // Start closer to center
            y: 300 + (Math.random() - 0.5) * 200,
            vx: 0,
            vy: 0
        }));

        // 2. Create Edges based on shared tags
        const initialEdges: Edge[] = [];
        for (let i = 0; i < initialNodes.length; i++) {
            for (let j = i + 1; j < initialNodes.length; j++) {
                const nodeA = initialNodes[i];
                const nodeB = initialNodes[j];

                // Count shared tags
                const sharedTags = nodeA.tags.filter(tag => nodeB.tags.includes(tag));

                // Also link if same category
                const sameCategory = nodeA.category === nodeB.category;

                if (sharedTags.length > 0 || sameCategory) {
                    initialEdges.push({
                        source: nodeA.id,
                        target: nodeB.id,
                        strength: sameCategory ? 0.05 : 0.1 // Weaker attraction to allow spread
                    });
                }
            }
        }

        setNodes(initialNodes);
        setEdges(initialEdges);
    }, []);

    // Handle Resize
    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;

        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                if (canvasRef.current) {
                    canvasRef.current.width = width;
                    canvasRef.current.height = height;
                }
            }
        });

        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, [isInteractiveMode]);

    // Force Simulation Loop
    useEffect(() => {
        if (nodes.length === 0 || !isInteractiveMode) return;

        let animationFrameId: number;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        const tick = () => {
            if (!canvas || !ctx) return;

            const width = canvas.width;
            const height = canvas.height;

            // Physics Constants - Adjusted for better spread
            const REPULSION = 1000;
            const ATTRACTION = 0.004;
            const CENTER_GRAVITY = 0.005;
            const DAMPING = 0.9;

            // Update Velocities
            nodes.forEach(node => {
                let fx = 0;
                let fy = 0;

                // 1. Repulsion
                nodes.forEach(other => {
                    if (node.id === other.id) return;
                    const dx = node.x - other.x;
                    const dy = node.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy) || 1;
                    const force = REPULSION / (distance * distance);
                    fx += (dx / distance) * force;
                    fy += (dy / distance) * force;
                });

                // 2. Attraction (Edges pull together)
                edges.forEach(edge => {
                    if (edge.source === node.id || edge.target === node.id) {
                        const otherId = edge.source === node.id ? edge.target : edge.source;
                        const other = nodes.find(n => n.id === otherId);
                        if (other) {
                            const dx = other.x - node.x;
                            const dy = other.y - node.y;
                            fx += dx * ATTRACTION;
                            fy += dy * ATTRACTION;
                        }
                    }
                });

                // 3. Center Gravity (Pull to center)
                const cx = width / 2;
                const cy = height / 2;
                fx += (cx - node.x) * CENTER_GRAVITY;
                fy += (cy - node.y) * CENTER_GRAVITY;

                // Apply Forces
                node.vx = (node.vx + fx) * DAMPING;
                node.vy = (node.vy + fy) * DAMPING;
                node.x += node.vx;
                node.y += node.vy;

                // Boundary Constraints (Loose)
                const padding = 50;
                node.x = Math.max(padding, Math.min(width - padding, node.x));
                node.y = Math.max(padding, Math.min(height - padding, node.y));
            });

            // Render
            ctx.clearRect(0, 0, width, height);

            // Apply Zoom/Pan Transform
            ctx.save();
            ctx.translate(width / 2 + offset.x, height / 2 + offset.y);
            ctx.scale(scale, scale);
            ctx.translate(-width / 2, -height / 2);

            // Draw Edges
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;
            edges.forEach(edge => {
                const source = nodes.find(n => n.id === edge.source);
                const target = nodes.find(n => n.id === edge.target);
                if (source && target) {
                    ctx.beginPath();
                    ctx.moveTo(source.x, source.y);
                    ctx.lineTo(target.x, target.y);
                    ctx.stroke();
                }
            });

            // Draw Nodes
            nodes.forEach(node => {
                const isHovered = hoveredNode?.id === node.id;
                const isSelected = selectedNode?.id === node.id;
                const radius = isHovered || isSelected ? 16 : 10; // Larger nodes

                // Node Body
                ctx.beginPath();
                ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = CATEGORY_COLORS[node.category] || '#ffffff';
                ctx.fill();

                // Glow effect
                if (isHovered || isSelected) {
                    ctx.shadowColor = CATEGORY_COLORS[node.category] || '#ffffff';
                    ctx.shadowBlur = 20;
                    ctx.stroke();
                    ctx.shadowBlur = 0; // Reset
                }

                // Label Background (Pill)
                const label = node.title.length > 15 ? node.title.substring(0, 15) + '...' : node.title;
                ctx.font = '12px "Exo 2"';
                const textWidth = ctx.measureText(label).width;

                ctx.fillStyle = 'rgba(18, 18, 19, 0.8)';
                ctx.beginPath();
                ctx.roundRect(node.x + radius + 5, node.y - 10, textWidth + 10, 20, 4);
                ctx.fill();

                // Label Text
                ctx.fillStyle = '#ffffff';
                ctx.fillText(label, node.x + radius + 10, node.y + 4);
            });

            ctx.restore();
            animationFrameId = requestAnimationFrame(tick);
        };

        tick();

        return () => cancelAnimationFrame(animationFrameId);
    }, [nodes, edges, hoveredNode, selectedNode, scale, offset, isInteractiveMode]);

    // Coordinate Transformation Helper
    const getTransformedCoordinates = (clientX: number, clientY: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };

        const rect = canvas.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // Apply inverse transform
        const width = canvas.width;
        const height = canvas.height;

        // (x - width/2 - offset.x) / scale + width/2
        const transformedX = (x - width / 2 - offset.x) / scale + width / 2;
        const transformedY = (y - height / 2 - offset.y) / scale + height / 2;

        return { x: transformedX, y: transformedY };
    };

    // Handle Mouse Interaction
    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (isDragging) {
            setOffset({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
            return;
        }

        const { x, y } = getTransformedCoordinates(e.clientX, e.clientY);

        // Find node under mouse
        const node = nodes.find(n => {
            const dx = n.x - x;
            const dy = n.y - y;
            return Math.sqrt(dx * dx + dy * dy) < 20 / scale; // Adjust hit radius by scale
        });

        setHoveredNode(node || null);
        if (canvasRef.current) {
            canvasRef.current.style.cursor = node ? 'pointer' : isDragging ? 'grabbing' : 'grab';
        }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const { x, y } = getTransformedCoordinates(e.clientX, e.clientY);
        const node = nodes.find(n => {
            const dx = n.x - x;
            const dy = n.y - y;
            return Math.sqrt(dx * dx + dy * dy) < 20 / scale;
        });

        if (node) {
            setSelectedNode(node);
        } else {
            setIsDragging(true);
            setDragStart({
                x: e.clientX - offset.x,
                y: e.clientY - offset.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleZoom = (delta: number) => {
        setScale(prev => Math.max(0.5, Math.min(3, prev + delta)));
    };

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col gap-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="font-logo text-3xl font-bold mb-2">Knowledge Graph</h2>
                    <p className="text-text-secondary">Visualize relationships between printing entities.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition-colors border border-white/10">
                        Export Graph
                    </button>
                    {isInteractiveMode && (
                        <button
                            onClick={() => { setScale(1); setOffset({ x: 0, y: 0 }); }}
                            className="px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm transition-colors border border-primary/20 flex items-center gap-2"
                        >
                            <PiArrowsOutSimpleDuotone /> Reset View
                        </button>
                    )}
                </div>
            </div>

            <div className="flex gap-6 h-full">
                {/* Graph Canvas or Intro Screen */}
                <GlassCard className="flex-grow relative overflow-hidden border-white/10 p-0" ref={containerRef as any}>
                    {!isInteractiveMode ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg-primary/50 backdrop-blur-sm z-10">
                            <div className="p-6 rounded-full bg-primary/10 mb-6 animate-pulse">
                                <PiShareNetworkDuotone size={64} className="text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Interactive Graph Visualization</h3>
                            <p className="text-text-secondary max-w-md text-center mb-8">
                                Explore semantic relationships between documents, authors, and printing concepts using our force-directed graph engine.
                            </p>
                            <div className="flex items-center gap-4 mb-12">
                                <div className="flex items-center gap-2 text-sm text-text-secondary">
                                    <span className="w-3 h-3 rounded-full bg-[#3b82f6]"></span> Documents
                                </div>
                                <div className="flex items-center gap-2 text-sm text-text-secondary">
                                    <span className="w-3 h-3 rounded-full bg-[#10b981]"></span> Concepts
                                </div>
                                <div className="flex items-center gap-2 text-sm text-text-secondary">
                                    <span className="w-3 h-3 rounded-full bg-[#8b5cf6]"></span> Authors
                                </div>
                            </div>
                            <button
                                onClick={() => setIsInteractiveMode(true)}
                                className="px-8 py-3 rounded-xl bg-primary hover:bg-primary-hover text-bg-primary font-bold transition-all transform hover:scale-105 shadow-neon"
                            >
                                Enter Interactive Mode
                            </button>
                        </div>
                    ) : (
                        <>
                            <canvas
                                ref={canvasRef}
                                className="w-full h-full block"
                                onMouseMove={handleMouseMove}
                                onMouseDown={handleMouseDown}
                                onMouseUp={handleMouseUp}
                                onMouseLeave={handleMouseUp}
                            />

                            {/* Zoom Controls */}
                            <div className="absolute top-4 right-4 flex flex-col gap-2">
                                <button onClick={() => handleZoom(0.1)} className="p-2 rounded-lg bg-bg-primary/80 border border-white/10 hover:text-primary transition-colors">
                                    <PiMagnifyingGlassPlusDuotone size={20} />
                                </button>
                                <button onClick={() => handleZoom(-0.1)} className="p-2 rounded-lg bg-bg-primary/80 border border-white/10 hover:text-primary transition-colors">
                                    <PiMagnifyingGlassMinusDuotone size={20} />
                                </button>
                            </div>

                            {/* Legend */}
                            <div className="absolute bottom-4 left-4 flex gap-4 text-xs bg-bg-primary/80 p-2 rounded-lg backdrop-blur-sm border border-white/10">
                                {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
                                    <div key={cat} className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                                        <span className="text-text-secondary">{cat}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </GlassCard>

                {/* Details Panel */}
                {selectedNode ? (
                    <GlassCard className="w-80 p-6 animate-fade-in shrink-0">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                <PiFileTextDuotone size={24} />
                            </div>
                            <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-text-secondary">
                                {selectedNode.category}
                            </span>
                        </div>
                        <h3 className="text-lg font-bold mb-2 leading-tight">{selectedNode.title}</h3>
                        <p className="text-sm text-text-secondary mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: selectedNode.snippet }} />

                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-xs text-text-tertiary">
                                <PiTagDuotone />
                                <span>Tags:</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {selectedNode.tags.map(tag => (
                                    <span key={tag} className="text-xs px-2 py-1 rounded bg-white/5 text-primary/80">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </GlassCard>
                ) : (
                    <GlassCard className="w-80 p-6 flex flex-col items-center justify-center text-center text-text-tertiary shrink-0">
                        <PiShareNetworkDuotone size={48} className="mb-4 opacity-20" />
                        <p>Select a node to view details</p>
                    </GlassCard>
                )}
            </div>
        </div>
    );
};

export default KnowledgeGraphView;
