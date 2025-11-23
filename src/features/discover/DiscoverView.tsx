import React, { useState } from 'react';
import GlassCard from '../../components/GlassCard';
import NeonButton from '../../components/NeonButton';
import DocumentCard from '../../components/DocumentCard';
import StatsSidebar from '../../components/StatsSidebar';
import { PiMagnifyingGlassDuotone, PiSlidersDuotone, PiLightningDuotone } from "react-icons/pi";
import { searchDocuments } from '../../services/searchService';
import { Document } from '../../types';

const DiscoverView: React.FC = () => {
    const [query, setQuery] = useState('');
    const [mode, setMode] = useState<'hybrid' | 'exact'>('hybrid');
    const [results, setResults] = useState<Document[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setSearched(true);
        try {
            const data = await searchDocuments(query, mode);
            setResults(data);
        } catch (error) {
            console.error("Search failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8">

            {/* Main Results Area */}
            <div className="flex-grow space-y-6">

                {/* Search Hero Section (Inline for Discover View) */}
                <div className="text-center mb-8">
                    <h2 className="font-logo text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                        Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Engineering Intelligence</span>
                    </h2>
                    <p className="text-text-secondary text-base mb-6 max-w-2xl mx-auto">
                        Search across 6M+ technical documents using ELSER v2 semantic retrieval.
                    </p>

                    <GlassCard className="p-2 flex items-center gap-2 max-w-3xl mx-auto border-white/20 shadow-neon-subtle">
                        <div className="pl-4 text-text-tertiary">
                            <PiMagnifyingGlassDuotone size={24} />
                        </div>
                        <form onSubmit={handleSearch} className="flex-grow">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Try 'turbine blade stress analysis'..."
                                className="w-full bg-transparent border-none outline-none text-white placeholder-text-tertiary font-sans text-lg h-12"
                            />
                        </form>
                        <div className="h-8 w-[1px] bg-white/10 mx-2" />

                        {/* Mode Toggle */}
                        <button
                            onClick={() => setMode(mode === 'hybrid' ? 'exact' : 'hybrid')}
                            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white/5 transition-colors group relative"
                            title="Toggle Retrieval Mode"
                        >
                            <span className={`text-sm font-medium transition-colors ${mode === 'hybrid' ? 'text-primary' : 'text-text-secondary'}`}>
                                {mode === 'hybrid' ? 'Hybrid' : 'Exact'}
                            </span>
                            <PiLightningDuotone className={mode === 'hybrid' ? 'text-primary' : 'text-text-secondary'} />
                        </button>

                        <NeonButton onClick={() => handleSearch(undefined)} className="ml-2">
                            Search
                        </NeonButton>
                    </GlassCard>
                </div>

                {/* Results Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                    <div className="text-text-secondary text-sm">
                        {searched ? (
                            <>Found <span className="text-white font-mono">{results.length}</span> results in <span className="text-white font-mono">0.62s</span></>
                        ) : (
                            "Ready to search index 'eng-docs-v2'"
                        )}
                    </div>
                    <button className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors text-sm">
                        <PiSlidersDuotone /> Sort: Relevance
                    </button>
                </div>

                {loading ? (
                    // Skeleton Loading
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-40 rounded-2xl bg-white/5 animate-pulse border border-white/5" />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {results.length > 0 ? (
                            results.map(doc => (
                                <DocumentCard key={doc.id} doc={doc} />
                            ))
                        ) : searched ? (
                            <div className="text-center py-20 text-text-tertiary">
                                <div className="text-4xl mb-4 opacity-20">¯\_(ツ)_/¯</div>
                                No documents found matching your criteria.
                            </div>
                        ) : (
                            <div className="text-center py-20 text-text-tertiary">
                                Start searching to explore the knowledge base.
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Sidebar */}
            <StatsSidebar />
        </div>
    );
};

export default DiscoverView;
