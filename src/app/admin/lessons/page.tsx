"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Plus, 
  BookOpen, 
  Search, 
  Filter, 
  ChevronRight, 
  Edit2, 
  Trash2, 
  FolderPlus,
  X,
  Palette,
  Check
} from "lucide-react";
import { useFeedback } from "@/components/admin/FeedbackProvider";

export default function AdminLessonsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const { showSuccess, showError, showWarning, confirm } = useFeedback();
  
  // Dynamic curriculum states
  const [grades, setGrades] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Group creation modal states
  const [showAddGradeModal, setShowAddGradeModal] = useState(false);
  const [newGradeTitle, setNewGradeTitle] = useState("");
  const [newGradeSubtitle, setNewGradeSubtitle] = useState("");
  const [newGradeColor, setNewGradeColor] = useState("#22c55e");

  // Group editing states
  const [editingGrade, setEditingGrade] = useState<any | null>(null);
  const [editGradeTitle, setEditGradeTitle] = useState("");
  const [editGradeSubtitle, setEditGradeSubtitle] = useState("");
  const [editGradeColor, setEditGradeColor] = useState("#22c55e");

  // Fetch both grades and lessons
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch grades/groups
      const gradesRes = await fetch("/api/admin/grades");
      let fetchedGrades = [];
      if (gradesRes.ok) {
        const gradesData = await gradesRes.json();
        fetchedGrades = gradesData.grades || [];
        setGrades(fetchedGrades);
      }

      // 2. Fetch lessons
      const lessonsRes = await fetch("/api/admin/lessons");
      if (lessonsRes.ok) {
        const lessonsData = await lessonsRes.json();
        setLessons(lessonsData.lessons || []);
      }
    } catch (error) {
      console.error("Failed to fetch curriculum data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditLesson = (lesson: any, gradeId: string) => {
    router.push(`/admin/lessons/${gradeId}/${lesson.slug}`);
  };

  const handleDeleteLesson = (lesson: any) => {
    confirm({
      title: "Delete Lesson",
      message: `Are you sure you want to delete lesson "${lesson.title}"?`,
      confirmText: "Delete",
      isDestructive: true,
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/admin/lessons/${lesson.gradeId}/${lesson.slug}`, {
            method: "DELETE"
          });
          if (res.ok) {
            showSuccess(`Lesson "${lesson.title}" deleted successfully.`);
            setLessons(prev => prev.filter(l => l.id !== lesson.id));
          } else {
            const err = await res.json();
            showError(`Failed to delete lesson: ${err.message || "Unknown error"}`);
          }
        } catch (error) {
          console.error("Error deleting lesson:", error);
          showError("An error occurred during deletion.");
        }
      }
    });
  };

  // Grade/Group operations
  const handleAddGradeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGradeTitle) return;

    try {
      const res = await fetch("/api/admin/grades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newGradeTitle,
          subtitle: newGradeSubtitle,
          color: newGradeColor
        })
      });

      if (res.ok) {
        showSuccess("Group level created successfully!");
        setNewGradeTitle("");
        setNewGradeSubtitle("");
        setNewGradeColor("#22c55e");
        setShowAddGradeModal(false);
        fetchData();
      } else {
        const err = await res.json();
        showError(`Error: ${err.message || "Failed to create group"}`);
      }
    } catch (error) {
      console.error("Error creating group:", error);
      showError("An unexpected error occurred.");
    }
  };

  const handleStartEditGrade = (grade: any) => {
    setEditingGrade(grade);
    setEditGradeTitle(grade.title);
    setEditGradeSubtitle(grade.subtitle || "");
    setEditGradeColor(grade.color || "#22c55e");
  };

  const handleEditGradeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editGradeTitle || !editingGrade) return;

    try {
      const res = await fetch(`/api/admin/grades/${editingGrade.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editGradeTitle,
          subtitle: editGradeSubtitle,
          color: editGradeColor
        })
      });

      if (res.ok) {
        showSuccess("Group level updated successfully!");
        setEditingGrade(null);
        fetchData();
      } else {
        const err = await res.json();
        showError(`Error: ${err.message || "Failed to update group"}`);
      }
    } catch (error) {
      console.error("Error updating group:", error);
      showError("An unexpected error occurred.");
    }
  };

  const handleDeleteGrade = (grade: any) => {
    confirm({
      title: "Delete Group Level",
      message: `WARNING: Deleting the group "${grade.title}" will PERMANENTLY delete ALL of its lessons and their contents!\n\nAre you absolutely sure you want to proceed?`,
      confirmText: "Delete All",
      isDestructive: true,
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/admin/grades/${grade.id}`, {
            method: "DELETE"
          });
          if (res.ok) {
            showSuccess(`Group "${grade.title}" and all its lessons have been successfully deleted.`);
            fetchData();
          } else {
            const err = await res.json();
            showError(`Failed to delete: ${err.message || "Unknown error"}`);
          }
        } catch (error) {
          console.error("Error deleting group:", error);
          showError("An error occurred during deletion.");
        }
      }
    });
  };

  const handleCreateLesson = (gradeId?: string) => {
    if (grades.length === 0) {
      showWarning("Please create at least one Group Level (grade) first before creating lessons!");
      return;
    }
    if (gradeId) {
      router.push(`/admin/lessons/new?gradeId=${gradeId}`);
    } else {
      router.push("/admin/lessons/new");
    }
  };

  const filteredGrades = grades.map(grade => ({
    ...grade,
    actualLessons: lessons.filter((l: any) => l.gradeId === grade.id)
  })).filter(grade => 
    grade.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (grade.subtitle && grade.subtitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
    grade.actualLessons.some((l: any) => l.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 relative">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
            Curriculum & Lesson Management
          </h1>
          <p className="text-white/50">Manage dynamic learning paths, groups, lessons, and content sections.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowAddGradeModal(true)}
            className="flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold rounded-xl transition-all active:scale-95"
          >
            <FolderPlus size={18} />
            Create New Group
          </button>
          <button 
            onClick={() => handleCreateLesson()}
            className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] active:scale-95"
          >
            <Plus size={20} />
            Create Lesson
          </button>
        </div>
      </div>

      {/* Toolbar Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
          <input 
            type="text" 
            placeholder="Search lessons or groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
          />
        </div>
      </div>

      {/* Add Group Modal */}
      {showAddGradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0d1411] border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FolderPlus size={22} className="text-green-400" />
                Create New Group Level
              </h3>
              <button 
                onClick={() => setShowAddGradeModal(false)}
                className="p-1 text-white/40 hover:text-white rounded-lg hover:bg-white/5 transition-all"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddGradeSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Group Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Preschool, Advanced Forex, Technical Charting"
                  value={newGradeTitle}
                  onChange={(e) => setNewGradeTitle(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Subtitle / Description</label>
                <input 
                  type="text" 
                  placeholder="e.g., Learn support & resistance models"
                  value={newGradeSubtitle}
                  onChange={(e) => setNewGradeSubtitle(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2 flex items-center gap-1.5">
                  <Palette size={16} /> Theme Color Accent
                </label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={newGradeColor}
                    onChange={(e) => setNewGradeColor(e.target.value)}
                    className="w-12 h-12 bg-transparent border-0 cursor-pointer rounded-xl"
                  />
                  <span className="font-mono text-sm text-white/40">{newGradeColor}</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button 
                  type="button"
                  onClick={() => setShowAddGradeModal(false)}
                  className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-green-500 hover:bg-green-400 text-black rounded-xl font-bold transition-all shadow-lg active:scale-95"
                >
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Group Modal */}
      {editingGrade && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0d1411] border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Edit2 size={20} className="text-green-400" />
                Edit Group Level
              </h3>
              <button 
                onClick={() => setEditingGrade(null)}
                className="p-1 text-white/40 hover:text-white rounded-lg hover:bg-white/5 transition-all"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditGradeSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Group Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Preschool, Advanced Forex"
                  value={editGradeTitle}
                  onChange={(e) => setEditGradeTitle(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Subtitle / Description</label>
                <input 
                  type="text" 
                  placeholder="e.g., Learn support & resistance models"
                  value={editGradeSubtitle}
                  onChange={(e) => setEditGradeSubtitle(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2 flex items-center gap-1.5">
                  <Palette size={16} /> Theme Color Accent
                </label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={editGradeColor}
                    onChange={(e) => setEditGradeColor(e.target.value)}
                    className="w-12 h-12 bg-transparent border-0 cursor-pointer rounded-xl"
                  />
                  <span className="font-mono text-sm text-white/40">{editGradeColor}</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button 
                  type="button"
                  onClick={() => setEditingGrade(null)}
                  className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-green-500 hover:bg-green-400 text-black rounded-xl font-bold transition-all shadow-lg active:scale-95"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Dynamic List */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white/5 border border-white/10 rounded-2xl">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500 mb-4"></div>
          <p className="text-white/50 text-sm">Loading custom curriculum...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredGrades.map((grade) => (
            <div key={grade.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all">
              <div 
                className="p-5 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5"
                style={{ borderLeft: `4px solid ${grade.color || "#22c55e"}` }}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-xl text-white">{grade.title}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/40 text-xs font-mono">
                      {grade.actualLessons.length} Lessons
                    </span>
                  </div>
                  {grade.subtitle && (
                    <p className="text-sm text-white/40 mt-1">{grade.subtitle}</p>
                  )}
                </div>
                
                {/* Group action buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCreateLesson(grade.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 rounded-lg text-green-400 hover:text-green-300 transition-all text-xs font-semibold border border-green-500/10"
                  >
                    <Plus size={12} />
                    Add Lesson
                  </button>
                  <button
                    onClick={() => handleStartEditGrade(grade)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-all text-xs font-semibold border border-white/5"
                  >
                    <Edit2 size={12} />
                    Edit Group
                  </button>
                  <button
                    onClick={() => handleDeleteGrade(grade)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 hover:text-red-300 transition-all text-xs font-semibold border border-red-500/10"
                  >
                    <Trash2 size={12} />
                    Delete Group
                  </button>
                </div>
              </div>

              {/* Lesson rows */}
              <div className="p-2 divide-y divide-white/5">
                {grade.actualLessons.map((lesson: any, index: number) => (
                  <div key={lesson.id} className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors group">
                    <div className="flex items-center gap-4">
                      <span className="text-white/20 font-mono text-sm">{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <p className="font-medium group-hover:text-green-400 transition-colors">{lesson.title}</p>
                        <p className="text-xs text-white/30 font-mono mt-0.5">{lesson.sections?.length || 0} content sections</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEditLesson(lesson, grade.id)}
                        className="p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-all"
                        title="Edit lesson details & content"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteLesson(lesson)}
                        className="p-2 hover:bg-red-500/20 rounded-lg text-white/50 hover:text-red-400 transition-all"
                        title="Delete lesson"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                {grade.actualLessons.length === 0 && (
                  <div className="p-10 text-center">
                    <p className="text-white/30 text-sm mb-4">No lessons created in this group level yet.</p>
                    <button
                      onClick={() => handleCreateLesson(grade.id)}
                      className="px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5"
                    >
                      <Plus size={14} /> Add First Lesson
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {filteredGrades.length === 0 && (
            <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
              <BookOpen size={48} className="text-white/10 mx-auto mb-4" />
              <h3 className="text-white/60 text-lg font-bold">No Groups/Grades Configured</h3>
              <p className="text-white/30 text-sm mt-1 mb-6 max-w-sm mx-auto">
                Define dynamic learning tiers first to structure your educational roadmap.
              </p>
              <button 
                onClick={() => setShowAddGradeModal(true)}
                className="px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl transition-all"
              >
                Create Your First Group Level
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
