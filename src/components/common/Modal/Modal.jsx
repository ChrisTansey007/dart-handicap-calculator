import React from 'react';
import { X } from 'lucide-react';

/**
 * Reusable Modal component
 */
export const Modal = ({ 
  isOpen = true, 
  onClose, 
  title, 
  children,
  maxWidth = 'max-w-2xl',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`bg-gradient-to-br from-zinc-900 to-stone-900 border border-amber-800/40 rounded-2xl shadow-2xl w-full ${maxWidth} max-h-[90vh] overflow-y-auto p-6`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-stone-200">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
