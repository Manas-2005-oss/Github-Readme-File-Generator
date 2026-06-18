import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface MarkdownRendererProps {
  markdown: string;
}

export function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  // Simple yet highly functional markdown parser for GitHub fidelity
  const lines = markdown.split('\n');
  const renderedElements = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let codeBlockLanguage = '';

  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 1500);
  };

  // Helper to parse inline styles (bold, code, links, images/badges)
  const parseInlineStyles = (text: string) => {
    // Handle Images/Badges: ![alt](url)
    const imgRegex = /!\[([^\]]*)\]\(([^)]*)\)/g;
    let parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    // We do a single pass to handle images/badges, then wrap bold/inline code in text parts
    while ((match = imgRegex.exec(text)) !== null) {
      const precedingText = text.substring(lastIndex, match.index);
      if (precedingText) {
        parts = [...parts, ...parseTextFormatting(precedingText)];
      }

      const alt = match[1];
      const url = match[2];
      
      parts.push(
        <img
          key={`img-${match.index}`}
          src={url}
          alt={alt}
          referrerPolicy="no-referrer"
          className="inline-block my-1 max-h-12 mr-1.5 transition-all hover:scale-[1.02]"
        />
      );
      lastIndex = imgRegex.lastIndex;
    }

    const remainingText = text.substring(lastIndex);
    if (remainingText) {
      parts = [...parts, ...parseTextFormatting(remainingText)];
    }

    return parts.length > 0 ? parts : [text];
  };

  const parseTextFormatting = (rawText: string): React.ReactNode[] => {
    // We parse basic inline structures: **bold**, `code`, [link](url)
    let text = rawText;
    
    // Quick check to see if there's any format. If not, return text.
    if (!text.includes('**') && !text.includes('`') && !text.includes('[') && !text.includes('*')) {
      return [text];
    }

    interface InlineToken {
      type: 'text' | 'bold' | 'code' | 'link' | 'italic';
      content: string;
      href?: string;
    }

    let tokens: InlineToken[] = [{ type: 'text', content: text }];

    // 1. Parse Bold (**bold**)
    let tempTokens: InlineToken[] = [];
    tokens.forEach((token) => {
      if (token.type !== 'text') {
        tempTokens.push(token);
        return;
      }
      const parts = token.content.split(/\*\*([^*]+)\*\*/g);
      parts.forEach((part, index) => {
        if (index % 2 === 1) {
          tempTokens.push({ type: 'bold', content: part });
        } else if (part) {
          tempTokens.push({ type: 'text', content: part });
        }
      });
    });
    tokens = tempTokens;

    // 2. Parse Links ([text](url))
    tempTokens = [];
    tokens.forEach((token) => {
      if (token.type !== 'text') {
        tempTokens.push(token);
        return;
      }
      const parts = token.content.split(/\[([^\]]+)\]\(([^)]+)\)/g);
      for (let i = 0; i < parts.length; i += 3) {
        if (parts[i]) {
          tempTokens.push({ type: 'text', content: parts[i] });
        }
        if (parts[i + 1] && parts[i + 2]) {
          tempTokens.push({ type: 'link', content: parts[i + 1], href: parts[i + 2] });
        }
      }
    });
    tokens = tempTokens;

    // 3. Parse Inline Code (`code`)
    tempTokens = [];
    tokens.forEach((token) => {
      if (token.type !== 'text') {
        tempTokens.push(token);
        return;
      }
      const parts = token.content.split(/`([^`]+)`/g);
      parts.forEach((part, index) => {
        if (index % 2 === 1) {
          tempTokens.push({ type: 'code', content: part });
        } else if (part) {
          tempTokens.push({ type: 'text', content: part });
        }
      });
    });
    tokens = tempTokens;

    return tokens.map((token, idx) => {
      switch (token.type) {
        case 'bold':
          return <strong key={idx} className="font-semibold text-zinc-900 dark:text-zinc-50">{token.content}</strong>;
        case 'code':
          return (
            <code key={idx} className="px-1.5 py-0.5 font-mono text-sm bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/50 rounded text-rose-500 dark:text-rose-400">
              {token.content}
            </code>
          );
        case 'link':
          return (
            <a
              key={idx}
              href={token.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center gap-0.5"
            >
              {token.content}
            </a>
          );
        default:
          return token.content;
      }
    });
  };

  // Run line-by-line parser block detection
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect Code Block
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // Close code block
        const codeText = codeBlockContent.join('\n');
        const codeId = `code-block-${i}`;
        const isCopied = copiedCodeId === codeId;
        
        renderedElements.push(
          <div key={`code-${i}`} className="my-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 overflow-hidden font-mono text-sm">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-zinc-900 text-zinc-500 text-xs font-semibold">
              <span className="flex items-center gap-1.5 capitalize">
                <Terminal className="w-3.5 h-3.5" />
                {codeBlockLanguage || 'terminal'}
              </span>
              <button
                onClick={() => handleCopyCode(codeText, codeId)}
                className="flex items-center gap-1 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors py-0.5 px-2 rounded hover:bg-zinc-200/50 dark:hover:bg-zinc-800/60"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {isCopied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-zinc-800 dark:text-zinc-200 text-sm leading-relaxed whitespace-pre font-mono">
              <code>{codeText}</code>
            </pre>
          </div>
        );
        inCodeBlock = false;
        codeBlockContent = [];
      } else {
        // Open code block
        inCodeBlock = true;
        codeBlockLanguage = line.trim().slice(3).toLowerCase() || 'bash';
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Detect Headers
    if (line.startsWith('# ')) {
      renderedElements.push(
        <h1 key={`h1-${i}`} className="mt-8 mb-4 text-3xl font-extrabold pb-2 border-b border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white tracking-tight flex items-center justify-between">
          <span>{parseInlineStyles(line.slice(2))}</span>
        </h1>
      );
      continue;
    }
    if (line.startsWith('## ')) {
      renderedElements.push(
        <h2 key={`h2-${i}`} className="mt-7 mb-4 text-2xl font-bold pb-2 border-b border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 tracking-tight">
          {parseInlineStyles(line.slice(3))}
        </h2>
      );
      continue;
    }
    if (line.startsWith('### ')) {
      renderedElements.push(
        <h3 key={`h3-${i}`} className="mt-6 mb-3 text-xl font-semibold text-zinc-800 dark:text-zinc-200 tracking-tight">
          {parseInlineStyles(line.slice(4))}
        </h3>
      );
      continue;
    }
    if (line.startsWith('#### ')) {
      renderedElements.push(
        <h4 key={`h4-${i}`} className="mt-5 mb-2 text-lg font-medium text-zinc-800 dark:text-zinc-300">
          {parseInlineStyles(line.slice(5))}
        </h4>
      );
      continue;
    }

    // Horizontal Rule
    if (line.trim() === '---' || line.trim() === '***') {
      renderedElements.push(<hr key={`hr-${i}`} className="my-6 border-zinc-200 dark:border-zinc-800" />);
      continue;
    }

    // Blockquotes
    if (line.trim().startsWith('>')) {
      renderedElements.push(
        <blockquote key={`quote-${i}`} className="my-4 pl-4 border-l-4 border-sky-500/50 dark:border-sky-500/30 text-zinc-600 dark:text-zinc-400 italic">
          {parseInlineStyles(line.trim().slice(1).trim())}
        </blockquote>
      );
      continue;
    }

    // Lists (Ordered / Unordered)
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      renderedElements.push(
        <div key={`list-un-${i}`} className="flex items-start gap-2.5 my-1.5 pl-4 text-zinc-700 dark:text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 shrink-0 mt-2.5" />
          <div className="flex-1 leading-relaxed text-sm">
            {parseInlineStyles(line.trim().slice(2))}
          </div>
        </div>
      );
      continue;
    }

    const numberListMatch = line.trim().match(/^(\d+)\.\s(.*)/);
    if (numberListMatch) {
      const idxStr = numberListMatch[1];
      const content = numberListMatch[2];
      renderedElements.push(
        <div key={`list-or-${i}`} className="flex items-start gap-2 my-1.5 pl-4 text-zinc-700 dark:text-zinc-300">
          <span className="font-mono text-xs font-semibold text-zinc-400 shrink-0 mt-1 sm:mt-1.5 min-w-4 text-right">
            {idxStr}.
          </span>
          <div className="flex-1 leading-relaxed text-sm">
            {parseInlineStyles(content)}
          </div>
        </div>
      );
      continue;
    }

    // Plain Paragraph
    if (line.trim()) {
      renderedElements.push(
        <p key={`p-${i}`} className="my-3.5 text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm">
          {parseInlineStyles(line)}
        </p>
      );
    } else {
      // Keep empty line spacing slightly
      renderedElements.push(<div key={`br-${i}`} className="h-2" />);
    }
  }

  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200 select-text">
      {renderedElements}
    </div>
  );
}
