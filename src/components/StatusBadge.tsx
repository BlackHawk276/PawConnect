// Status badge component for verification and application states
import React from 'react';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

type Status = 'pending' | 'approved' | 'rejected';

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const config = {
    pending: {
      icon: Clock,
      text: 'Pending Review',
      className: 'bg-yellow-100 text-yellow-700'
    },
    approved: {
      icon: CheckCircle,
      text: 'Approved',
      className: 'bg-green-100 text-green-700'
    },
    rejected: {
      icon: XCircle,
      text: 'Rejected',
      className: 'bg-red-100 text-red-700'
    }
  };

  const { icon: Icon, text, className: statusClass } = config[status];

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm ${statusClass} ${className}`}>
      <Icon className="w-4 h-4" />
      {text}
    </div>
  );
};
