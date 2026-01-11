
import React, { useState } from 'react';
import { PERIODIC_TABLE_DATA, CATEGORY_COLORS } from '../constants';
import { Element } from '../types';

export const PeriodicTable: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="overflow-x-auto">
        <div 
          className="grid gap-1 min-w-[900px]"
          style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))', gridTemplateRows: 'repeat(7, minmax(0, 1fr))' }}
        >
          {PERIODIC_TABLE_DATA.map((element) => (
            <div
              key={element.number}
              onClick={() => setSelectedElement(element)}
              className={`
                aspect-square border-2 rounded-md p-1 cursor-pointer transition-all hover:scale-110 flex flex-col items-center justify-center
                ${CATEGORY_COLORS[element.category] || 'bg-white border-gray-300'}
                ${selectedElement?.number === element.number ? 'ring-4 ring-indigo-500 scale-105' : ''}
              `}
              style={{ gridColumn: element.xpos, gridRow: element.ypos }}
            >
              <span className="text-[10px] self-start leading-none">{element.number}</span>
              <span className="text-xl font-bold leading-none">{element.symbol}</span>
              <span className="text-[8px] truncate leading-none mt-1">{element.name}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedElement && (
        <div className="bg-white rounded-xl shadow-xl p-6 border border-indigo-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div 
                className={`w-20 h-20 flex flex-col items-center justify-center rounded-lg border-2 ${CATEGORY_COLORS[selectedElement.category]}`}
              >
                <span className="text-sm">{selectedElement.number}</span>
                <span className="text-3xl font-bold">{selectedElement.symbol}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedElement.name}</h2>
                <p className="text-indigo-600 font-medium capitalize">{selectedElement.category}</p>
              </div>
            </div>
            <button 
              onClick={() => setSelectedElement(null)}
              className="text-gray-400 hover:text-gray-600 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Properties</h3>
              <div className="space-y-2">
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-500">Atomic Mass</span>
                  <span className="font-mono">{selectedElement.atomic_mass} u</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-500">Standard State</span>
                  <span className="font-medium">{selectedElement.phase}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Summary</h3>
              <p className="text-gray-600 leading-relaxed italic">"{selectedElement.summary}"</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
