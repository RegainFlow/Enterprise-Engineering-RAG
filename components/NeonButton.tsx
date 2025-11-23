import React from 'react';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'glass';
  icon?: React.ReactNode;
}

const NeonButton: React.FC<NeonButtonProps> = ({ children, variant = 'primary', icon, className = '', ...props }) => {
  const baseStyle = "flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-sans font-medium transition-all duration-300 ease-out";
  
  const variants = {
    primary: "bg-primary-alpha15 text-primary border border-primary shadow-neon-subtle hover:bg-primary-alpha25 hover:shadow-neon-hover hover:-translate-y-0.5",
    glass: "bg-white/5 backdrop-blur-md text-white border border-white/10 hover:bg-white/10 hover:border-primary/50"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  );
};

export default NeonButton;
