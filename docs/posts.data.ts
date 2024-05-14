import { createContentLoader } from "vitepress";

export interface Post {
  title: string;
  url: string;
  date: {
    time: number;
    string: string;
  };
  categories: string[];
  tags: string[];
  thumbnail: string | undefined;
}

declare const data: Post[];
export { data };

export default createContentLoader("**/*.md", {
  transform(raw): Post[] {
    return raw
      .filter(({ frontmatter }) => !frontmatter.exclude)
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url,
        date: formatDate(frontmatter.date),
        categories: frontmatter.categories || [],
        tags: frontmatter.tags || [],
        thumbnail: frontmatter.thumbnail,
      }))
      .sort((a, b) => b.date.time - a.date.time);
  },
});

function formatDate(raw: string): Post["date"] {
  const date = new Date(raw);
  return {
    time: +date,
    string: date.toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }),
  };
}
