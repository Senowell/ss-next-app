import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface MarkdownRendererProps {
  content: unknown;
}

type RichTextNode = {
  type?: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  children?: RichTextNode[];
  level?: number;
  format?: "ordered" | "unordered";
};

function escapeMarkdown(text: string): string {
  return text.replace(/([\\`*_{}\[\]()#+\-.!|>])/g, "\\$1");
}

function applyInlineFormatting(text: string, node: RichTextNode): string {
  let formatted = escapeMarkdown(text);

  if (node.underline) {
    formatted = `<u>${formatted}</u>`;
  }

  if (node.italic) {
    formatted = `_${formatted}_`;
  }

  if (node.bold) {
    formatted = `**${formatted}**`;
  }

  return formatted;
}

function serializeInline(nodes?: RichTextNode[]): string {
  if (!nodes?.length) return "";

  return nodes
    .map((node) => {
      if (typeof node.text === "string") {
        return applyInlineFormatting(node.text, node);
      }

      if (node.children?.length) {
        const childText = serializeInline(node.children);
        return applyInlineFormatting(childText, node);
      }

      return "";
    })
    .join("");
}

function serializeBlock(block: RichTextNode, index: number): string {
  const inline = serializeInline(block.children).trim();

  switch (block.type) {
    case "heading": {
      const level = Math.min(Math.max(block.level ?? 1, 1), 6);
      return `${"#".repeat(level)} ${inline}`;
    }
    case "list": {
      const items = (block.children ?? [])
        .filter((child) => child.type === "list-item")
        .map((item, itemIndex) => {
          const itemText = serializeInline(item.children).trim();
          const marker = block.format === "ordered" ? `${itemIndex + 1}.` : "-";
          return `${marker} ${itemText}`;
        })
        .filter(Boolean);

      return items.join("\n");
    }
    case "quote":
      return inline
        .split("\n")
        .filter(Boolean)
        .map((line) => `> ${line}`)
        .join("\n");
    case "code":
      return `\`\`\`\n${inline}\n\`\`\``;
    case "paragraph":
    default:
      return inline;
  }
}

function toMarkdown(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";

  return content
    .map((block, index) => serializeBlock(block as RichTextNode, index))
    .filter((part) => part.trim().length > 0)
    .join("\n\n");
}

function normalizeMarkdown(content: string): string {
  return content.replace(
    /^<u>(#{1,6})\s+([\s\S]*?)<\/u>$/gim,
    (_, hashes: string, headingText: string) => `${hashes} <u>${headingText.trim()}</u>`
  );
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const markdown = normalizeMarkdown(toMarkdown(content));

  if (!markdown.trim()) return null;

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ children }) => <h1 className="text-gray-900 font-bold text-3xl mt-6 mb-4">{children}</h1>,
        h2: ({ children }) => <h2 className="text-gray-900 font-bold text-2xl mt-6 mb-3">{children}</h2>,
        h3: ({ children }) => <h3 className="text-gray-900 font-bold text-xl mt-5 mb-3">{children}</h3>,
        h4: ({ children }) => <h4 className="text-gray-900 font-bold text-lg mt-4 mb-2">{children}</h4>,
        h5: ({ children }) => <h5 className="text-gray-900 font-bold text-base mt-4 mb-2">{children}</h5>,
        h6: ({ children }) => <h6 className="text-gray-900 font-bold text-sm mt-4 mb-2">{children}</h6>,
        p: ({ children }) => <p className="text-gray-700 text-base leading-relaxed mb-4">{children}</p>,
        ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1 text-gray-700">{children}</ol>,
        li: ({ children }) => <li>{children}</li>,
        strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        u: ({ children }) => <u>{children}</u>,
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
