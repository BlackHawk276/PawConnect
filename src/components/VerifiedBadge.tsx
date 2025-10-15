// Reusable verified badge component for shelter verification status
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface VerifiedBadgeProps {
  className?: string;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ className = '' }) => {
  return (
    <div className={`bg-success-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 font-semibold text-sm ${className}`}>
      <CheckCircle className="w-4 h-4" />
      Verified
    </div>
  );
};
