"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { 
  ChevronLeft, 
  Save, 
  BookOpen, 
  Plus, 
  Type, 
  Link as LinkIcon, 
  GraduationCap, 
  ChevronDown, 
  Trash2,
  X,
  ArrowLeft
} from "lucide-react";
import { courseGrades, curricula } from "@/lib/data";

export default function EditLessonForm() {
  const router = useRouter();
  const params = useParams();
  const { grade: gradeParam, slug: slugParam } = params;

  const [title, setTitle] = useState("");
  const [grade, setGrade] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Find the lesson
    const gradeId = gradeParam as string;
    const lessonSlug = slugParam as string;
    
    if (gradeId && lessonSlug) {
      const lesson = curricula[gradeId]?.find((l: any) => l.slug === lessonSlug);
      if (lesson) {
        setTitle(lesson.title || "");
        setGrade(gradeId);
        setSlug(lesson.slug || "");
        setContent(lesson.content || []);
      }
    }
    setIsLoading(false);
  }, [gradeParam, slugParam]);

  useEffect(() => {
    if (title && !slugParam) {
      setSlug(title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, ""));
    }
  }, [title, slugParam]);

  const addContentBlock = () => {
    setContent([...content, {
      id: `block-${Date.now()}`,
      title: "",
      text: [""],
      visualType: "default"
    }]);
  };

  const updateContentBlock = (index: number, field: string, value: any) => {
    const newContent = [...content];
    if (field === "text") {
      newContent[index][field] = value.split("\n");
    } else {
      newContent[index][field] = value;
    }
    setContent(newContent);
  };

  const removeContentBlock = (index: number) => {
    setContent(content.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !grade || !slug) return;

    console.log("Saving lesson:", { title, grade, slug, content });
    alert("Lesson saved successfully!");
    router.push("/admin/lessons");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push("/admin/lessons")}
            className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-white/50 hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
              {slugParam ? "Edit Lesson" : "Create New Lesson"}
            </h1>
            <p className="text-white/50">Configure lesson details and educational content.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.push("/admin/lessons")}
            className="px-6 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-8 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] active:scale-95"
          >
            <Save size={20} />
            Save Changes
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Core Details Card */}
        <div className="bg-[#0d1411] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/5 bg-white/[0.02]">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen size={20} className="text-green-400" />
              General Information
            </h3>
          </div>
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Lesson Title</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Type size={18} className="text-white/40" />
                  </div>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Understanding Pip Calculations"
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Grade Level</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <GraduationCap size={18} className="text-white/40" />
                  </div>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-10 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all cursor-pointer"
                  >
                    <option value="" disabled>Select a grade</option>
                    {courseGrades.map((g) => (
                      <option key={g.id} value={g.id} className="bg-[#0d1411]">
                        {g.title}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown size={18} className="text-white/40" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">URL Slug</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LinkIcon size={18} className="text-white/40" />
                </div>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="understanding-pip-calculations"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all font-mono text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-[#0d1411] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus size={20} className="text-green-400" />
              Lesson Curriculum
            </h3>
            <button
              type="button"
              onClick={addContentBlock}
              className="px-4 py-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg text-sm font-bold transition-all flex items-center gap-2"
            >
              <Plus size={16} />
              Add Section
            </button>
          </div>
          
          <div className="p-8 space-y-6">
            {content.map((block, index) => (
              <div key={block.id || index} className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl space-y-4 relative group/block">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 text-white/40 flex items-center justify-center font-mono text-xs">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h4 className="font-bold text-white/90">Section Block</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeContentBlock(index)}
                    className="p-2 text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-white/30 uppercase tracking-wider mb-2">Section Title</label>
                    <input
                      type="text"
                      value={block.title}
                      onChange={(e) => updateContentBlock(index, "title", e.target.value)}
                      placeholder="e.g., The Core Concepts"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/30 uppercase tracking-wider mb-2">Section Content</label>
                    <textarea
                      value={block.text.join("\n")}
                      onChange={(e) => updateContentBlock(index, "text", e.target.value)}
                      placeholder="Enter the lesson text here. Use new lines for separate paragraphs."
                      rows={5}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}

            {content.length === 0 && (
              <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
                <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={32} className="text-white/10" />
                </div>
                <h4 className="text-white/50 font-bold mb-2">No Content Sections</h4>
                <p className="text-white/20 text-sm mb-6">Start building your lesson by adding your first content block.</p>
                <button
                  type="button"
                  onClick={addContentBlock}
                  className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all font-bold"
                >
                  Add Your First Section
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Action Bar (Mobile only or redundant) */}
        <div className="flex md:hidden flex-col gap-3">
          <button 
            type="submit"
            className="w-full py-4 bg-green-500 text-black font-bold rounded-xl"
          >
            Save Lesson
          </button>
          <button 
            onClick={() => router.push("/admin/lessons")}
            className="w-full py-4 bg-white/5 text-white font-bold rounded-xl"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
