import React, { useState } from 'react';
import { Calculator, X, Minus, Plus, Divide, X as Multiply, RotateCcw } from 'lucide-react';

export const FloatingCalculator = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [display, setDisplay] = useState('0');
    const [prevValue, setPrevValue] = useState(null);
    const [operation, setOperation] = useState(null);
    const [shouldReset, setShouldReset] = useState(false);

    const handleNumber = (num) => {
        if (display === '0' || shouldReset) {
            setDisplay(num.toString());
            setShouldReset(false);
        } else {
            setDisplay(display + num);
        }
    };

    const handleOperation = (op) => {
        setPrevValue(parseFloat(display));
        setOperation(op);
        setShouldReset(true);
    };

    const calculate = () => {
        const current = parseFloat(display);
        const prev = prevValue;
        let result = 0;

        if (operation === '+') result = prev + current;
        if (operation === '-') result = prev - current;
        if (operation === '*') result = prev * current;
        if (operation === '/') result = prev / current;

        setDisplay(result.toString());
        setPrevValue(null);
        setOperation(null);
        setShouldReset(true);
    };

    const clear = () => {
        setDisplay('0');
        setPrevValue(null);
        setOperation(null);
        setShouldReset(false);
    };

    if (!isOpen) {
        return (
            <button 
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl shadow-2xl shadow-indigo-500/40 flex items-center justify-center transition-all active:scale-90 z-[100] group"
            >
                <Calculator size={24} className="group-hover:rotate-12 transition-transform" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 w-72 glass border border-white/10 rounded-3xl shadow-2xl z-[100] animate-in-scale overflow-hidden">
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                <div className="flex items-center gap-2">
                    <Calculator size={14} className="text-indigo-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Calculadora Tech</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                    <X size={16} />
                </button>
            </div>

            <div className="p-4 space-y-4">
                <div className="bg-slate-950/80 p-4 rounded-2xl border border-white/5 text-right">
                    <p className="text-[10px] text-slate-600 font-mono h-4 truncate">
                        {prevValue !== null ? `${prevValue} ${operation}` : ''}
                    </p>
                    <p className="text-2xl font-bold text-white font-mono truncate">{display}</p>
                </div>

                <div className="grid grid-cols-4 gap-2">
                    <button onClick={clear} className="col-span-2 p-3 rounded-xl bg-rose-500/10 text-rose-400 text-xs font-bold hover:bg-rose-500 hover:text-white transition-all"><RotateCcw size={16} className="mx-auto" /></button>
                    <button onClick={() => handleOperation('/')} className="p-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-indigo-600 transition-all font-bold">/</button>
                    <button onClick={() => handleOperation('*')} className="p-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-indigo-600 transition-all font-bold">*</button>
                    
                    {[7, 8, 9].map(n => <button key={n} onClick={() => handleNumber(n)} className="p-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all font-bold">{n}</button>)}
                    <button onClick={() => handleOperation('-')} className="p-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-indigo-600 transition-all font-bold">-</button>
                    
                    {[4, 5, 6].map(n => <button key={n} onClick={() => handleNumber(n)} className="p-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all font-bold">{n}</button>)}
                    <button onClick={() => handleOperation('+')} className="p-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-indigo-600 transition-all font-bold">+</button>
                    
                    {[1, 2, 3].map(n => <button key={n} onClick={() => handleNumber(n)} className="p-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all font-bold">{n}</button>)}
                    <button onClick={calculate} className="p-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-all font-bold row-span-2">=</button>
                    
                    <button onClick={() => handleNumber(0)} className="col-span-2 p-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all font-bold">0</button>
                    <button onClick={() => !display.includes('.') && setDisplay(display + '.')} className="p-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all font-bold">.</button>
                </div>
            </div>

            <div className="p-3 bg-indigo-600/5 border-t border-white/5 flex justify-center gap-4">
                <button 
                    onClick={() => {
                        const val = parseFloat(display);
                        setDisplay((val * 160).toString()); // Example: Hourly to Monthly (160h)
                    }}
                    className="text-[8px] font-black uppercase text-indigo-400 hover:text-indigo-300"
                >
                    x160h (Mês)
                </button>
                <button 
                    onClick={() => {
                        const val = parseFloat(display);
                        setDisplay((val * 1.2).toString()); // Example: Add 20% margin
                    }}
                    className="text-[8px] font-black uppercase text-indigo-400 hover:text-indigo-300"
                >
                    +20% Margem
                </button>
            </div>
        </div>
    );
};
