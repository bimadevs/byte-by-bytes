import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { CompileMDXResult } from "next-mdx-remote/rsc";
import { Question } from "@/components/ui/Question";
import { Quiz } from "@/components/ui/Quiz";

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

// Interface untuk pelajaran yang diambil dari sistem file
interface LessonData extends LessonMetadata {
  id: string;
}

// Interface untuk kursus dengan konten MDX dan pelajaran
interface Course extends CourseData {
  content: CompileMDXResult<Record<string, unknown>>;
  lessons: LessonData[];
}

// Interface untuk pelajaran dengan konten MDX
interface Lesson extends LessonData {
  courseId: string;
  content: CompileMDXResult<Record<string, unknown>>;
}

// Mendapatkan semua materi kursus
export async function getAllCourses(): Promise<CourseData[]> {
  const coursesDirectory = path.join(contentDirectory, "courses");
  
  if (!fs.existsSync(coursesDirectory)) {
    return [];
  }
  
  const courseIds = fs.readdirSync(coursesDirectory);
  
  const courses = courseIds
    .map((courseId) => {
      const fullPath = path.join(coursesDirectory, courseId, "index.mdx");
      
      if (!fs.existsSync(fullPath)) {
        return null;
      }
      
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      
      const courseData = data as CourseMetadata;
      
      return {
        id: courseId,
        ...courseData,
      };
    })
    .filter((course): course is CourseData => course !== null);
  
  return courses;
}

// Mendapatkan detail kursus berdasarkan ID
export async function getCourseById(courseId: string): Promise<Course | null> {
  const fullPath = path.join(contentDirectory, "courses", courseId, "index.mdx");
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, "utf8");
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
  
  if (fs.existsSync(lessonsDirectory)) {
    const lessonFiles = fs.readdirSync(lessonsDirectory);
    
    lessons = lessonFiles
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => {
        const lessonPath = path.join(lessonsDirectory, file);
        const lessonContent = fs.readFileSync(lessonPath, "utf8");
        const { data } = matter(lessonContent);
        
        const lessonData = data as LessonMetadata;
        
        return {
          id: file.replace(/\.mdx$/, ""),
          ...lessonData,
        };
      })
      .sort((a, b) => a.order - b.order);
  }
  
  const courseData = data as CourseMetadata;
  
  return {
    id: courseId,
    content: mdxSource,
    lessons,
    ...courseData,
  };
}

// Mendapatkan detail pelajaran berdasarkan ID kursus dan ID pelajaran
export async function getLessonById(courseId: string, lessonId: string): Promise<Lesson | null> {
  const fullPath = path.join(contentDirectory, "courses", courseId, "lessons", `${lessonId}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, "utf8");
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
    content: mdxSource,
    ...lessonData,
  };
} 