import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = false }) => {
  return (
    <div className={`
      relative overflow-hidden
      bg-white/[0.03] backdrop-blur-xl
      border border-white/10 rounded-2xl
      shadow-glass
      ${hoverEffect ? 'transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.05] hover:shadow-neon-subtle' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default GlassCard;
