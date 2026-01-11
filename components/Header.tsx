
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-950/80 backdrop-blur-md border-b border-slate-900 py-6 px-10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-[1.2rem] flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-500/20 transform hover:rotate-6 transition-transform">H</div>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-widest text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              NGUYỄN VĂN HÀ
            </h1>
            <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.3em] mt-1">
              AI Education • Digital Transformation
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-10">
           <div className="flex flex-col text-right">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Hỗ trợ 24/7</span>
              <span className="text-sm font-bold text-slate-200">0927.2222.05</span>
           </div>
           <div className="h-10 w-px bg-slate-800 hidden md:block"></div>
           <div className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></span>
              <span className="text-[10px] font-black text-green-400 uppercase tracking-tighter">AI Node Active</span>
           </div>
        </div>
      </div>
    </header>
  );
};

export default Header;