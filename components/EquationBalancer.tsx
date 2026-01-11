
import React, { useState } from 'react';
import { balanceEquation } from '../services/geminiService';

export const EquationBalancer: React.FC = () => {
  const [equation, setEquation] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleBalance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!equation.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await balanceEquation(equation);
      setResult(data);
    } catch (err) {
      setError('Failed to balance equation. Please check the syntax.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-indigo-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.288a2 2 0 01-1.47 0l-.628-.288a6 6 0 00-3.86-.517l-2.387.477a2 2 0 00-1.022.547V18a2 2 0 002 2h11.428a2 2 0 002-2v-2.572zM12 14v4m-3-4v4m6-4v4M6 20h12a2 2 0 002-2v-3.8a2 2 0 00-1.233-1.843l-2.677-1.071a2 2 0 00-1.556.046l-2.308.81a2 2 0 01-1.332 0l-2.308-.81a2 2 0 00-1.556-.046L3.233 12.357A2 2 0 002 14.2V18a2 2 0 002 2z" />
          </svg>
          Equation Balancer
        </h2>
        
        <form onSubmit={handleBalance} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enter Equation</label>
            <input
              type="text"
              value={equation}
              onChange={(e) => setEquation(e.target.value)}
              placeholder="e.g., H2 + O2 -> H2O"
              className="w-full p-4 text-lg font-mono border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Balance Equation'}
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        {result && (
          <div className="mt-8 space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-xl text-center">
              <p className="text-sm text-indigo-600 uppercase font-bold mb-1 tracking-wider">Balanced Equation</p>
              <h3 className="text-2xl md:text-3xl font-mono text-indigo-900 font-bold break-all">
                {result.balanced}
              </h3>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-bold text-gray-800 border-l-4 border-indigo-600 pl-3">The Chemistry Logic</h4>
              <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                {result.explanation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
