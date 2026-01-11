
import React, { useState, useRef } from 'react';
import Header from './components/Header';
import { extractContentFromDocument } from './services/geminiService';
import { generatePptx } from './services/pptxService';
import { ExtractionResult } from './types';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [extractionResult, setExtractionResult] = useState<ExtractionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus(`Sẵn sàng xử lý: ${e.target.files[0].name}`);
      setError('');
      setExtractionResult(null);
    }
  };

  const handleAddSource = () => {
    if (isProcessing) return;
    fileInputRef.current?.click();
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleConvert = async () => {
    if (!file || isProcessing) return;
    setIsProcessing(true);
    setError('');
    setStatus('⚡ Đang khởi chạy AI trích xuất 100% câu hỏi...');

    try {
      const base64 = await fileToBase64(file);
      const mimeType = file.type;
      const result = await extractContentFromDocument(base64, mimeType);
      
      setExtractionResult(result);
      setStatus(`✅ Hoàn tất! Đã nhận diện ${result.slides.length} câu hỏi.`);
      
      // Auto-trigger first download
      await generatePptx(result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Hệ thống bận, Thầy vui lòng thử lại.');
      setStatus('');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadAgain = async () => {
    if (extractionResult) {
      await generatePptx(extractionResult);
    }
  };

  const handleReset = () => {
    setFile(null);
    setExtractionResult(null);
    setStatus('');
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-slate-100 font-sans selection:bg-orange-500/30">
      <Header />

      <main className="flex-grow container mx-auto px-6 py-12 max-w-5xl relative">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-blue-600/10 blur-[120px] pointer-events-none rounded-full"></div>

        {/* Hero Section */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-orange-400 via-white to-cyan-400 bg-clip-text text-transparent tracking-tight">
            PDF TO POWERPOINT <span className="text-white">SIÊU TỐC</span>
          </h2>
          <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Hệ thống AI chuyên dụng giúp thầy cô chuyển đổi 100% học liệu sang PowerPoint tương tác chỉ với 1 cú nhấp chuột.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch relative z-10">
          
          {/* File Selection Area (MÀU CAM) */}
          <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl flex flex-col items-center">
            <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-400 mb-6 border border-orange-500/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </div>
            
            <h3 className="text-lg font-bold mb-8 uppercase tracking-widest text-orange-400">Bước 1: Chọn Tài Liệu</h3>
            
            <button 
              onClick={handleAddSource}
              disabled={isProcessing}
              className={`
                relative w-full py-10 px-6 rounded-[2rem] border-2 border-dashed transition-all duration-300
                ${file 
                  ? 'border-orange-500 bg-orange-500/10 shadow-[0_0_30px_rgba(245,158,11,0.1)]' 
                  : 'border-slate-700 hover:border-orange-400 bg-slate-800/30 hover:bg-orange-500/5'} 
                ${isProcessing ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95 group'}
              `}
            >
              <div className={`w-20 h-20 mb-4 rounded-full flex items-center justify-center transition-all duration-500 ${file ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/40 rotate-12' : 'bg-orange-500/10 text-orange-400 group-hover:bg-orange-500 group-hover:text-white'}`}>
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <span className={`text-sm font-black text-center break-all px-4 ${file ? 'text-orange-400' : 'text-slate-400 group-hover:text-orange-300'}`}>
                {file ? file.name : "TẢI FILE PDF / WORD / ẢNH"}
              </span>
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx,image/*" />
          </div>

          {/* Execution Area (XANH NGỌC ĐẬM) */}
          <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl flex flex-col items-center">
            <div className="w-12 h-12 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-400 mb-6 border border-teal-500/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>

            <h3 className="text-lg font-bold mb-8 uppercase tracking-widest text-teal-400">Bước 2: Xuất PowerPoint</h3>

            <div className="w-full flex-grow flex flex-col justify-center items-center gap-6">
              
              {!extractionResult ? (
                <button 
                  onClick={handleConvert}
                  disabled={!file || isProcessing}
                  className={`
                    relative w-full py-6 rounded-full font-black text-lg uppercase tracking-widest transition-all duration-150
                    ${(!file || isProcessing) 
                      ? 'bg-slate-800 text-slate-600 cursor-not-allowed border-b-0' 
                      : 'bg-gradient-to-r from-teal-700 to-teal-900 text-white shadow-[0_8px_0_rgb(13,78,76)] hover:shadow-[0_4px_0_rgb(13,78,76)] hover:translate-y-[4px] active:shadow-none active:translate-y-[8px] border border-teal-500/30'}
                  `}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      ĐANG XỬ LÝ...
                    </span>
                  ) : "BẮT ĐẦU NGAY"}
                </button>
              ) : (
                <div className="w-full space-y-4 animate-in zoom-in-95 duration-300">
                  <button 
                    onClick={handleDownloadAgain}
                    className="relative w-full py-6 rounded-full font-black text-lg uppercase tracking-widest transition-all duration-150 bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_8px_0_rgb(5,150,105)] hover:shadow-[0_4px_0_rgb(5,150,105)] hover:translate-y-[4px] active:shadow-none active:translate-y-[8px] border border-emerald-400/30 flex items-center justify-center gap-3"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    TẢI FILE POWERPOINT
                  </button>
                  
                  <button 
                    onClick={handleReset}
                    className="w-full py-3 text-slate-400 hover:text-white font-bold text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 group"
                  >
                    <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    LÀM MỚI / CHỌN FILE KHÁC
                  </button>
                </div>
              )}

              <div className="min-h-[80px] w-full text-center flex flex-col justify-center">
                {status && (
                  <div className="py-3 px-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 shadow-[0_0_20px_rgba(20,184,166,0.05)]">
                    <p className="text-teal-400 font-bold text-xs animate-pulse flex items-center justify-center gap-2">
                      {extractionResult && (
                        <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                      {status}
                    </p>
                  </div>
                )}
                {error && (
                  <div className="py-3 px-4 rounded-2xl bg-red-500/10 border border-red-500/20">
                    <p className="text-red-400 font-bold text-xs">{error}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Tags */}
        <div className="mt-20 flex flex-wrap justify-center gap-8 opacity-60">
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_10px_#f59e0b]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">100% Nội dung gốc</span>
           </div>
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_10px_#14b8a6]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Infographic Chuyên nghiệp</span>
           </div>
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Tương tác thông minh</span>
           </div>
        </div>
      </main>

      <footer className="mt-auto py-12 border-t border-slate-900 bg-slate-950/50">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-600 mb-4">HỆ THỐNG TRỢ LÝ GIÁO DỤC HIỆN ĐẠI</p>
          <p className="text-xs font-bold text-teal-500/80">© 2024 THẦY NGUYỄN VĂN HÀ | HI-TECH EDUCATION SOLUTION</p>
        </div>
      </footer>
    </div>
  );
};

export default App;