
import React, { useState } from 'react';
import { Course, Lesson } from '../types';
import { ArrowLeft, PlayCircle, BookCheck, Info, ChevronRight, FileText, CheckCircle2 } from 'lucide-react';

interface CourseDetailProps {
  course: Course;
  onBack: () => void;
  onCreateLesson: () => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course, onBack, onCreateLesson }) => {
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(course.lessons[0] || null);

  return (
    <div className="animate-in slide-in-from-right duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-6 font-medium transition-colors"
      >
        <ArrowLeft size={18} />
        Quay lại danh sách
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Lesson Content */}
        <div className="flex-1 space-y-6">
          {activeLesson ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-50 bg-slate-50/50">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-extrabold text-slate-900">{activeLesson.title}</h2>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full flex items-center gap-1">
                    <CheckCircle2 size={12} /> Đã hoàn thành
                  </span>
                </div>
              </div>
              <div className="p-8 prose prose-slate max-w-none">
                <div className="mb-8 p-4 bg-indigo-50 rounded-xl border-l-4 border-indigo-500">
                  <h4 className="text-indigo-900 font-bold mb-1 flex items-center gap-2">
                    <Info size={16} /> Tóm tắt bài học
                  </h4>
                  <p className="text-indigo-800 text-sm italic">{activeLesson.summary}</p>
                </div>
                
                <div className="whitespace-pre-wrap text-slate-700 leading-relaxed text-lg">
                  {activeLesson.content}
                </div>

                {activeLesson.quiz && activeLesson.quiz.length > 0 && (
                  <div className="mt-12 space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <BookCheck className="text-indigo-600" /> Trắc nghiệm nhanh
                    </h3>
                    {activeLesson.quiz.map((q, idx) => (
                      <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <p className="font-bold mb-4">{idx + 1}. {q.question}</p>
                        <div className="space-y-3">
                          {q.options.map((opt, oIdx) => (
                            <button 
                              key={oIdx}
                              className="w-full text-left p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all flex items-center justify-between group"
                            >
                              <span>{opt}</span>
                              <div className="w-6 h-6 rounded-full border border-slate-300 group-hover:border-indigo-500" />
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-100 text-center space-y-4">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                <FileText size={40} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-bold">Chưa có bài học nào</h3>
              <p className="text-slate-500 max-w-sm mx-auto">Sử dụng AI để tạo nội dung bài giảng đầu tiên cho khóa học này ngay hôm nay.</p>
              <button 
                onClick={onCreateLesson}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
              >
                Tạo bài học bằng AI
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Lesson Navigation */}
        <div className="w-full lg:w-80 shrink-0 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50">
              <h3 className="font-bold text-lg">Nội dung khóa học</h3>
              <div className="mt-2 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-[35%] rounded-full" />
              </div>
              <p className="text-xs text-slate-400 mt-2 font-medium">3/10 bài học đã hoàn thành</p>
            </div>
            <div className="p-2 space-y-1">
              {course.lessons.map((lesson, idx) => (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all text-left ${activeLesson?.id === lesson.id ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:bg-slate-50 text-slate-600'}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${activeLesson?.id === lesson.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {idx + 1}
                  </div>
                  <span className="flex-1 truncate">{lesson.title}</span>
                  {activeLesson?.id === lesson.id && <ChevronRight size={16} />}
                </button>
              ))}
              
              <button 
                onClick={onCreateLesson}
                className="w-full flex items-center gap-3 p-4 rounded-xl text-indigo-600 font-bold hover:bg-indigo-50 transition-all border-2 border-dashed border-indigo-100 mt-4"
              >
                <PlayCircle size={20} />
                Thêm bài học mới
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-6 text-white">
            <h4 className="font-bold mb-2">Tài liệu tham khảo</h4>
            <p className="text-indigo-100 text-sm mb-4">Mở rộng kiến thức với thư viện tài liệu do AI tổng hợp.</p>
            <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold transition-colors">
              Xem tài liệu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
