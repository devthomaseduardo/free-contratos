import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, className, ...props }) => {
  return (
    <div className="flex flex-col gap-1 mb-3">
      <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold ml-1">
        {label}
      </label>
      <input
        className={`bg-slate-900 border border-slate-700 text-slate-100 rounded-lg px-4 py-2.5 focus:outline-none focus:border-neon-purple focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300 placeholder-slate-600 ${className}`}
        {...props}
      />
    </div>
  );
};

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }> = ({ label, className, ...props }) => {
  return (
    <div className="flex flex-col gap-1 mb-3">
      <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold ml-1">
        {label}
      </label>
      <textarea
        className={`bg-slate-900 border border-slate-700 text-slate-100 rounded-lg px-4 py-2.5 focus:outline-none focus:border-neon-purple focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300 placeholder-slate-600 min-h-[100px] resize-y ${className}`}
        {...props}
      />
    </div>
  );
};
