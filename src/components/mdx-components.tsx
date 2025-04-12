import Image from "next/image";
import Link from "next/link";
import { MDXComponents } from "mdx/types";
import { Question } from "./ui/Question";
import { Quiz } from "./ui/Quiz";

const components: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1
      className="mt-2 scroll-m-20 text-3xl font-bold tracking-tight mb-6"
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight mb-4"
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className="mt-6 scroll-m-20 text-xl font-semibold tracking-tight mb-3"
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className="mt-4 scroll-m-20 text-lg font-semibold tracking-tight mb-2"
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p className="leading-7 mb-4" {...props} />
  ),
  a: ({ className, href, ...props }) => {
    const isInternal = href && !href.startsWith('http')
    if (isInternal) {
      return (
        <Link
          href={href}
          className="font-medium text-primary underline underline-offset-4"
          {...props}
        />
      )
    }
    return (
      <a 
        className="font-medium text-primary underline underline-offset-4"
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        {...props}
      />
    )
  },
  ul: ({ className, ...props }) => (
    <ul className="my-4 ml-6 list-disc" {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className="my-4 ml-6 list-decimal" {...props} />
  ),
  li: ({ className, ...props }) => (
    <li className="mt-2" {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className="mt-6 border-l-2 pl-6 italic"
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="rounded-md border my-6" alt={alt} {...props} />
  ),
  hr: ({ ...props }) => <hr className="my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full" {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="m-0 border-t p-0" {...props} />
  ),
  th: ({ className, ...props }) => (
    <th
      className="border px-4 py-2 text-left font-bold"
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className="border px-4 py-2 text-left"
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black p-4"
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
      {...props}
    />
  ),
  Question,
  Quiz
};

export function useMDXComponents(): MDXComponents {
  return components;
} 