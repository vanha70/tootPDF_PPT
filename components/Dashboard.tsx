
import React from 'react';
import { Course } from '../types';
import { BookOpen, Trophy, Clock, Search, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ courses, onSelectCourse }) => {
  const data = courses.map(c => ({ name: c.title.substring(0, 10) + '...', progress: c.progress }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold text-slate-900">Chào mừng trở lại! 👋</h2>
        <p className="text-slate-500">Tiếp tục hành trình dạy và học của bạn hôm nay.</p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Khóa học</p>
            <p className="text-2xl font-bold">{courses.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Hoàn thành</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Giờ học</p>
            <p className="text-2xl font-bold">48h</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Khóa học của tôi</h3>
            <div className="flex gap-2">
              <button className="p-2 text-slate-400 hover:text-indigo-600"><Search size={20}/></button>
              <button className="p-2 text-slate-400 hover:text-indigo-600"><Filter size={20}/></button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map(course => (
              <div 
                key={course.id}
                onClick={() => onSelectCourse(course)}
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded uppercase">
                    {course.subject}
                  </span>
                  <div className="text-xs text-slate-400 flex items-center gap-1">
                    <BookOpen size={12} /> {course.lessons.length} bài
                  </div>
                </div>
                <h4 className="font-bold text-lg mb-2 group-hover:text-indigo-600 transition-colors">{course.title}</h4>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">{course.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Tiến độ</span>
                    <span className="text-indigo-600">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side Panel / Analytics */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold mb-4">Hoạt động tuần này</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="progress" radius={[4, 4, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#6366f1' : '#818cf8'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-indigo-900 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-bold text-lg mb-2">Thử thách mới!</h4>
              <p className="text-indigo-200 text-sm mb-4">Hoàn thành 3 bài giảng tuần này để nhận huy hiệu "Chuyên cần".</p>
              <button className="bg-white text-indigo-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors">
                Xem chi tiết
              </button>
            </div>
            <Trophy className="absolute -bottom-4 -right-4 w-24 h-24 text-white/10 rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
