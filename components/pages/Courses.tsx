'use client';

import { useState, useMemo } from 'react';
import { User, mockCourses } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EnrollmentModal from '@/components/modals/EnrollmentModal';

interface CoursesProps {
  user: User;
  onNavigate: (page: any, courseId?: string) => void;
}

const categories = ['All', 'DSA & Algorithms', 'Full Stack', 'Data Science', 'DevOps', 'System Design', 'Python', 'Java', 'Competitive Prog'];
const sortOptions = ['Most Popular', 'Highest Rated', 'Price ↑', 'Price ↓'];

export default function Courses({ user, onNavigate }: CoursesProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Most Popular');
  const [enrollmentModal, setEnrollmentModal] = useState({ isOpen: false, courseId: '', courseTitle: '', price: 0 });
  const [enrolledCourses, setEnrolledCourses] = useState<Set<string>>(new Set());

  const filteredAndSortedCourses = useMemo(() => {
    let filtered = mockCourses.filter((course) => {
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });

    // Sort
    if (sortBy === 'Most Popular') {
      filtered.sort((a, b) => b.students - a.students);
    } else if (sortBy === 'Highest Rated') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'Price ↑') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price ↓') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [selectedCategory, searchTerm, sortBy]);

  const handleEnrollClick = (courseId: string, title: string, price: number) => {
    setEnrollmentModal({ isOpen: true, courseId, courseTitle: title, price });
  };

  const handleConfirmEnrollment = () => {
    setEnrolledCourses((prev) => new Set([...prev, enrollmentModal.courseId]));
    setEnrollmentModal({ isOpen: false, courseId: '', courseTitle: '', price: 0 });
  };

  const getCourseGradient = (banner: string) => `bg-gradient-to-r ${banner}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Explore Courses</h1>
          <p className="text-slate-400">Learn from industry experts and advance your skills</p>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search courses, topics, instructors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none"
        />

        {/* Category Tabs - Horizontal Scroll */}
        <div className="overflow-x-auto pb-2 -mx-8 px-8">
          <div className="flex gap-3 min-w-min">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-orange-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex justify-end">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
          >
            {sortOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Courses Grid - 3 Columns */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedCourses.map((course) => (
            <Card
              key={course.id}
              className="border-slate-700 bg-slate-900 hover:border-orange-500 transition overflow-hidden group cursor-pointer"
              onClick={() => onNavigate('course-detail', course.id)}
            >
              {/* Banner */}
              <div className={`h-24 ${getCourseGradient(course.banner)} p-4 flex items-end justify-between`}>
                <span className="px-2 py-1 bg-black bg-opacity-50 rounded text-xs text-white font-semibold">
                  {course.difficulty}
                </span>
                <button 
                  className="text-2xl hover:scale-110 transition"
                  onClick={(e) => e.stopPropagation()}
                >
                  🤍
                </button>
              </div>

              <div className="p-6 space-y-4">
                {/* Instructor */}
                <div className="flex items-center gap-2">
                  <span className="text-lg">{course.instructor.avatar}</span>
                  <div>
                    <p className="text-sm font-semibold text-white">{course.instructor.name}</p>
                    {course.instructor.verified && <span className="text-xs text-orange-400">✓ Verified</span>}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white line-clamp-2">{course.title}</h3>

                {/* Rating and Students */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">⭐{course.rating}</span>
                    <span className="text-slate-500">({course.students.toLocaleString()})</span>
                  </div>
                </div>

                {/* Duration and Tags */}
                <div className="flex gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300">{course.duration}h</span>
                  {course.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-orange-500">₹{course.price.toLocaleString()}</span>
                  {course.originalPrice && (
                    <span className="text-sm text-slate-500 line-through">₹{course.originalPrice.toLocaleString()}</span>
                  )}
                </div>

                {/* Button */}
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    enrolledCourses.has(course.id)
                      ? onNavigate('course-detail', course.id)
                      : handleEnrollClick(course.id, course.title, course.price);
                  }}
                  className={`w-full font-semibold ${
                    enrolledCourses.has(course.id)
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-orange-600 hover:bg-orange-700'
                  }`}
                >
                  {enrolledCourses.has(course.id) ? 'Continue Learning' : 'Enroll Now'}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredAndSortedCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No courses found matching your criteria</p>
          </div>
        )}
      </div>

      <EnrollmentModal
        isOpen={enrollmentModal.isOpen}
        courseTitle={enrollmentModal.courseTitle}
        price={enrollmentModal.price}
        onClose={() => setEnrollmentModal({ isOpen: false, courseId: '', courseTitle: '', price: 0 })}
        onConfirm={handleConfirmEnrollment}
      />
    </div>
  );
}
