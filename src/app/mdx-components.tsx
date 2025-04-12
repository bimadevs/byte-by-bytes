import type { MDXComponents } from "mdx/types";
import { Question } from "@/components/ui/Question";
import { Quiz } from "@/components/ui/Quiz";

export function useMDXComponents(): MDXComponents {
  return {
    h1: (props) => <h1 className="mt-2 scroll-m-20 text-3xl font-bold tracking-tight mb-6" {...props} />,
    h2: (props) => <h2 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight mb-4" {...props} />,
    h3: (props) => <h3 className="mt-6 scroll-m-20 text-xl font-semibold tracking-tight mb-3" {...props} />,
    p: (props) => <p className="leading-7 mb-4" {...props} />,
    ul: (props) => <ul className="my-4 ml-6 list-disc" {...props} />,
    ol: (props) => <ol className="my-4 ml-6 list-decimal" {...props} />,
    li: (props) => <li className="mt-2" {...props} />,
    blockquote: (props) => <blockquote className="mt-6 border-l-2 pl-6 italic" {...props} />,
    Question: Question,
    Quiz: Quiz
  };
} 