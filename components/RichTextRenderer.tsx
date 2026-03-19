"use client";

import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";

interface RichTextRendererProps {
  content: unknown;
}

type InlineMods = { bold?: boolean; italic?: boolean; underline?: boolean };
type TextNode = { type: "text"; text: string } & InlineMods;

function unwrapLineModifiers(line: string): { text: string; mods: InlineMods } {
  let text = line;
  const mods: InlineMods = {};

  while (true) {
    const underlineMatch = text.match(/^<u>([\s\S]+)<\/u>$/i);
    if (underlineMatch) {
      mods.underline = true;
      text = underlineMatch[1].trim();
      continue;
    }

    break;
  }

  return { text, mods };
}

function parseInline(text: string, mods: InlineMods = {}): TextNode[] {
  if (!text) return [];

  const patterns: { regex: RegExp; key: keyof InlineMods }[] = [
    { regex: /<u>([\s\S]+?)<\/u>/i, key: "underline" },
    { regex: /\*\*(.+?)\*\*/, key: "bold" },
    { regex: /_(.+?)_/, key: "italic" },
    { regex: /\*(.+?)\*/, key: "italic" },
  ];

  let earliest: { match: RegExpExecArray; key: keyof InlineMods } | null = null;

  for (const { regex, key } of patterns) {
    const m = regex.exec(text);
    if (m && (!earliest || m.index < earliest.match.index)) {
      earliest = { match: m, key };
    }
  }

  if (!earliest) {
    return [{ type: "text", text, ...mods }];
  }

  const nodes: TextNode[] = [];
  const { match, key } = earliest;

  if (match.index > 0) {
    nodes.push({ type: "text", text: text.slice(0, match.index), ...mods });
  }

  nodes.push(...parseInline(match[1], { ...mods, [key]: true }));

  const after = match.index + match[0].length;
  if (after < text.length) {
    nodes.push(...parseInline(text.slice(after), mods));
  }

  return nodes;
}

function stringToBlocks(text: string): BlocksContent {
  const lines = text.split("\n").map((l) => l.trim());
  const blocks: BlocksContent = [];

  for (const line of lines) {
    if (!line) continue;

    const { text: normalizedLine, mods } = unwrapLineModifiers(line);

    const headingMatch = normalizedLine.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length as 1 | 2 | 3 | 4 | 5 | 6;
      blocks.push({
        type: "heading",
        level,
        children: parseInline(headingMatch[2], mods),
      });
    } else {
      blocks.push({
        type: "paragraph",
        children: parseInline(normalizedLine, mods),
      });
    }
  }

  return blocks;
}

export default function RichTextRenderer({ content }: RichTextRendererProps) {
  if (!content) return null;

  const blocks: BlocksContent = typeof content === "string"
    ? stringToBlocks(content)
    : content as BlocksContent;

  if (!blocks.length) return null;

  return (
    <BlocksRenderer
      content={blocks}
      blocks={{
        paragraph: ({ children }) => (
          <p className="text-gray-700 text-base leading-relaxed mb-4">{children}</p>
        ),
        heading: ({ children, level }) => {
          const className = "text-gray-900 font-bold text-xl mt-6 mb-2";
          if (level === 1) return <h1 className={className}>{children}</h1>;
          if (level === 2) return <h2 className={className}>{children}</h2>;
          if (level === 3) return <h3 className={className}>{children}</h3>;
          if (level === 4) return <h4 className={className}>{children}</h4>;
          if (level === 5) return <h5 className={className}>{children}</h5>;
          return <h6 className={className}>{children}</h6>;
        },
      }}
      modifiers={{
        bold: ({ children }) => <strong>{children}</strong>,
        italic: ({ children }) => <span className="italic">{children}</span>,
        underline: ({ children }) => <span className="underline">{children}</span>,
      }}
    />
  );
}

