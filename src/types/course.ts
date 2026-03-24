export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  duration: number; // minutes
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: {
    id: string;
    name: string;
  };
  thumbnail?: string;
  price: number;
  level: "beginner" | "intermediate" | "advanced";
  lessons: Lesson[];
  students: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseProgress {
  userId: string;
  courseId: string;
  completedLessons: string[];
  progress: number; // 0-100
  lastAccessedAt: Date;
}

export interface CreateCourseRequest {
  title: string;
  description: string;
  price: number;
  level: "beginner" | "intermediate" | "advanced";
}
