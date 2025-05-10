import { readFile, readdir, stat } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { CompileMDXResult } from "next-mdx-remote/rsc";
import { Question } from "@/components/ui/Question";
import { Quiz } from "@/components/ui/Quiz";
import "server-only";
import { Course, Lesson, LessonData } from "./types";

// Path ke direktori konten
const contentDirectory = path.join(process.cwd(), "src/content");

// Opsi untuk rehype-pretty-code
const prettyCodeOptions = {
  theme: "github-dark",
};

// MDX components untuk digunakan dalam kompilasi
const mdxComponents = {
  Question: Question,
  Quiz: Quiz,
};

// Interface untuk data kursus dari frontmatter
interface CourseMetadata {
  title: string;
  description: string;
  image?: string;
  level: string;
  category: string;
  lessonsCount: number;
  [key: string]: any;
}

// Interface untuk data pelajaran dari frontmatter
interface LessonMetadata {
  title: string;
  description?: string;
  order: number;
  [key: string]: any;
}

// Interface untuk kursus yang diambil dari sistem file
interface CourseData extends CourseMetadata {
  id: string;
}

// Mendapatkan semua materi kursus
export async function getAllCourses(): Promise<CourseData[]> {
  const coursesDirectory = path.join(contentDirectory, "courses");
  
  if (!existsSync(coursesDirectory)) {
    return [];
  }
  
  const courseIds = await readdir(coursesDirectory);
  
  const coursesPromises = courseIds.map(async (courseId) => {
    const fullPath = path.join(coursesDirectory, courseId, "index.mdx");
    
    if (!existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = await readFile(fullPath, "utf8");
    const { data } = matter(fileContents);
    
    const courseData = data as CourseMetadata;
    
    return {
      id: courseId,
      ...courseData,
    };
  });
  
  const coursesWithNull = await Promise.all(coursesPromises);
  const courses = coursesWithNull.filter((course): course is CourseData => course !== null);
  
  return courses;
}

// Mendapatkan detail kursus berdasarkan ID
export async function getCourseById(courseId: string): Promise<Course | null> {
  const fullPath = path.join(contentDirectory, "courses", courseId, "index.mdx");
  
  if (!existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = await readFile(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  
  const mdxSource = await compileMDX({
    source: content,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [[rehypePrettyCode, prettyCodeOptions], rehypeSlug],
        remarkPlugins: [remarkGfm],
      },
    },
  });
  
  // Membaca semua file lesson dalam kursus
  const lessonsDirectory = path.join(contentDirectory, "courses", courseId, "lessons");
  let lessons: LessonData[] = [];
  
  if (existsSync(lessonsDirectory)) {
    const lessonFiles = await readdir(lessonsDirectory);
    
    const lessonsPromises = lessonFiles
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const lessonPath = path.join(lessonsDirectory, file);
        const lessonContent = await readFile(lessonPath, "utf8");
        const { data } = matter(lessonContent);
        
        const lessonData = data as LessonMetadata;
        
        return {
          id: file.replace(/\.mdx$/, ""),
          ...lessonData,
        };
      });
      
    const unsortedLessons = await Promise.all(lessonsPromises);
    lessons = unsortedLessons.sort((a, b) => a.order - b.order);
  }
  
  const courseData = data as CourseMetadata;
  
  return {
    id: courseId,
    content: {
      ...mdxSource,
      text: content,
    },
    lessons,
    lessonsData: lessons,
    featured: false, // Default value jika tidak ada di metadata
    ...courseData,
  };
}

// Mendapatkan detail pelajaran berdasarkan ID kursus dan ID pelajaran
export async function getLessonById(courseId: string, lessonId: string): Promise<Lesson | null> {
  const fullPath = path.join(contentDirectory, "courses", courseId, "lessons", `${lessonId}.mdx`);
  
  if (!existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = await readFile(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  
  const mdxSource = await compileMDX({
    source: content,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [[rehypePrettyCode, prettyCodeOptions], rehypeSlug],
        remarkPlugins: [remarkGfm],
      },
    },
  });
  
  const lessonData = data as LessonMetadata;
  
  return {
    id: lessonId,
    courseId,
    content: {
      ...mdxSource,
      text: content,
    },
    ...lessonData,
  };
} 