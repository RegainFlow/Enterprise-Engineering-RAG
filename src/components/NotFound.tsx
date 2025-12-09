import React from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from './GlassCard';
import NeonButton from './NeonButton';
import { PiWarningDiamondDuotone, PiHouseDuotone } from 'react-icons/pi';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <GlassCard className="p-12 max-w-2xl text-center">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 blur-2xl opacity-50">
              <PiWarningDiamondDuotone className="text-primary" size={120} />
            </div>
            <PiWarningDiamondDuotone className="text-primary relative" size={120} />
          </div>
        </div>

        <h1 className="font-logo text-6xl md:text-7xl font-bold mb-4 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
            404
          </span>
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
          Page Not Found
        </h2>

        <p className="text-text-secondary text-base mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist in our knowledge base.
          It might have been moved or deleted.
        </p>

        <div className="flex gap-4 justify-center">
          <NeonButton onClick={() => navigate('/discover')}>
            <div className="flex items-center gap-2">
              <PiHouseDuotone size={20} />
              Go Home
            </div>
          </NeonButton>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-lg border border-white/20 text-text-secondary hover:text-white hover:border-primary/30 transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

export default NotFound;
