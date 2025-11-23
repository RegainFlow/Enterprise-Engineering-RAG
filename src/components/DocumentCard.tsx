import React from 'react';
import { Document } from '../types';
import GlassCard from './GlassCard';
import { PiFilePdfDuotone, PiFileDocDuotone, PiCubeDuotone, PiTerminalWindowDuotone, PiBrainDuotone } from "react-icons/pi";

interface DocumentCardProps {
  doc: Document;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ doc }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <PiFilePdfDuotone size={24} />;
      case 'DOCX': return <PiFileDocDuotone size={24} />;
      case 'CAD': return <PiCubeDuotone size={24} />;
      default: return <PiTerminalWindowDuotone size={24} />;
    }
  };

  const scorePercentage = Math.round(doc.score * 100);
  
  // Dynamic border color based on score
  const scoreColor = scorePercentage > 90 ? 'text-green-400' : scorePercentage > 80 ? 'text-primary' : 'text-yellow-400';
  const scoreBorder = scorePercentage > 90 ? 'border-green-400' : scorePercentage > 80 ? 'border-primary' : 'border-yellow-400';

  return (
    <GlassCard hoverEffect className="p-5 flex flex-col md:flex-row gap-5 group">
      {/* File Icon Section */}
      <div className="shrink-0 flex items-start justify-center pt-1">
        <div className="p-3 rounded-xl bg-white/5 text-text-secondary group-hover:text-primary group-hover:bg-primary/10 transition-colors">
          {getIcon(doc.fileType)}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-grow space-y-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
               {doc.isSemanticMatch && (
                  <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                    <PiBrainDuotone /> ELSER v2
                  </span>
               )}
               <span className="text-xs text-text-tertiary font-mono">{doc.date}</span>
            </div>
            <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors cursor-pointer">
              {doc.title}
            </h3>
          </div>
          
          {/* Score Badge */}
          <div className="flex flex-col items-end shrink-0 ml-4">
             <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${scoreBorder} bg-white/5 ${scoreColor} font-mono font-bold text-sm shadow-[0_0_10px_rgba(0,0,0,0.5)]`}>
               {scorePercentage}
             </div>
             <span className="text-[10px] text-text-tertiary mt-1">Relevance</span>
          </div>
        </div>

        <p className="text-text-secondary text-sm leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: doc.snippet }} />

        <div className="flex flex-wrap gap-2 pt-2">
          <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-text-secondary font-mono">
            {doc.category}
          </span>
          <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-text-secondary font-mono">
            {doc.fileType}
          </span>
          {doc.tags.map(tag => (
            <span key={tag} className="px-2 py-1 rounded-md bg-primary-alpha15 border border-primary-alpha25 text-xs text-primary font-mono">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};

export default DocumentCard;
