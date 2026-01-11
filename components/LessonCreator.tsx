
import React, { useState } from 'react';
import { Course, Lesson } from '../types';
import { Sparkles, Loader2, ArrowLeft, Wand2, Target, GraduationCap } from 'lucide-react';
import { generateLessonContent } from '../services/geminiService';

interface LessonCreatorProps {
  courses: Course[];
  onLessonCreated: (courseId: string, lesson: Lesson) => void;
  onCancel: () => void;
}

const LessonCreator: React.FC<LessonCreatorProps> = ({ courses, onLessonCreated, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('Trung học cơ sở');
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || '');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !selectedCourseId) return;

    setLoading(true);
    try {
      const lesson = await generateLessonContent(topic, level);
      onLessonCreated(selectedCourseId, lesson);
    } catch (error) {
      console.error("Lỗi khi tạo bài học:", error);
      alert("Đã có lỗi xảy ra khi kết nối với AI. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in zoom-in-95 duration-500">
      <header className="text-center">
        <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Sparkles size={32} />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">Soạn bài bằng AI</h2>
        <p className="text-slate-500">Mô tả chủ đề, Gemini sẽ giúp bạn soạn nội dung chi tiết và bài tập.</p>
      </header>

      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-indigo-100 border border-slate-100">
        <form onSubmit={handleGenerate} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Target size={16} /> Chọn khóa học
            </label>
            <select 
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none"
            >
              {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Wand2 size={16} /> Chủ đề hoặc nội dung cần soạn
            </label>
            <textarea 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ví dụ: Định luật bảo toàn năng lượng, Cách sử dụng câu điều kiện loại 1..."
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none min-h-[120px]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <GraduationCap size={16} /> Trình độ
              </label>
              <select 
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option>Tiểu học</option>
                <option>Trung học cơ sở</option>
                <option>Trung học phổ thông</option>
                <option>Đại học/Chuyên nghiệp</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button 
                type="submit"
                disabled={loading}
                className="w-full h-[58px] bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Đang soạn bài...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    Bắt đầu tạo
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="flex justify-center">
        <button 
          onClick={onCancel}
          className="text-slate-400 hover:text-slate-600 font-medium text-sm flex items-center gap-1"
        >
          <ArrowLeft size={16} /> Quay lại trang chủ
        </button>
      </div>
      
      {/* Informational Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
          <p className="text-xs font-bold text-amber-700 uppercase mb-1">Mẹo nhỏ 💡</p>
          <p className="text-sm text-amber-800">Mô tả càng chi tiết, bài giảng càng chất lượng. Bạn có thể yêu cầu thêm các ví dụ minh họa cụ thể.</p>
        </div>
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
          <p className="text-xs font-bold text-emerald-700 uppercase mb-1">Tính năng mới ✨</p>
          <p className="text-sm text-emerald-800">Tự động tạo câu hỏi trắc nghiệm kèm giải thích ngay sau mỗi bài học.</p>
        </div>
      </div>
    </div>
  );
};

export default LessonCreator;
