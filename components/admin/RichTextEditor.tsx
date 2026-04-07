'use client';

import { useState } from 'react';
import { Bold, Italic, List, ListOrdered, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
}

export default function RichTextEditor({
  content,
  onChange,
  onImageUpload,
}: RichTextEditorProps) {
  const [isUploading, setIsUploading] = useState(false);

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.getElementById('editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end);

    onChange(newText);

    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const handleImageUpload = async () => {
    if (!onImageUpload) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      setIsUploading(true);
      try {
        const url = await onImageUpload(file);
        insertMarkdown(`![Image](${url})`);
      } catch (error) {
        alert('Failed to upload image');
      } finally {
        setIsUploading(false);
      }
    };
    input.click();
  };

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b border-gray-700 bg-gray-900">
        <button
          type="button"
          onClick={() => insertMarkdown('**', '**')}
          className="p-2 hover:bg-gray-700 rounded transition-colors"
          title="Bold"
        >
          <Bold size={18} className="text-gray-300" />
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown('*', '*')}
          className="p-2 hover:bg-gray-700 rounded transition-colors"
          title="Italic"
        >
          <Italic size={18} className="text-gray-300" />
        </button>
        <div className="w-px h-6 bg-gray-700" />
        <button
          type="button"
          onClick={() => insertMarkdown('## ')}
          className="p-2 hover:bg-gray-700 rounded transition-colors text-gray-300 text-sm font-bold"
          title="Heading"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown('### ')}
          className="p-2 hover:bg-gray-700 rounded transition-colors text-gray-300 text-sm font-bold"
          title="Heading"
        >
          H3
        </button>
        <div className="w-px h-6 bg-gray-700" />
        <button
          type="button"
          onClick={() => insertMarkdown('- ')}
          className="p-2 hover:bg-gray-700 rounded transition-colors"
          title="Bullet List"
        >
          <List size={18} className="text-gray-300" />
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown('1. ')}
          className="p-2 hover:bg-gray-700 rounded transition-colors"
          title="Numbered List"
        >
          <ListOrdered size={18} className="text-gray-300" />
        </button>
        <div className="w-px h-6 bg-gray-700" />
        <button
          type="button"
          onClick={() => insertMarkdown('[', '](url)')}
          className="p-2 hover:bg-gray-700 rounded transition-colors"
          title="Link"
        >
          <LinkIcon size={18} className="text-gray-300" />
        </button>
        {onImageUpload && (
          <button
            type="button"
            onClick={handleImageUpload}
            disabled={isUploading}
            className="p-2 hover:bg-gray-700 rounded transition-colors disabled:opacity-50"
            title="Insert Image"
          >
            <ImageIcon size={18} className="text-gray-300" />
          </button>
        )}
      </div>

      {/* Editor */}
      <textarea
        id="editor"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-h-[400px] p-4 bg-gray-800 text-white focus:outline-none resize-y font-mono text-sm"
        placeholder="Write your content here... (Markdown supported)"
      />

      {/* Help text */}
      <div className="p-2 border-t border-gray-700 bg-gray-900">
        <p className="text-xs text-gray-500">
          Supports Markdown: **bold**, *italic*, ## headings, - lists, [links](url), ![images](url)
        </p>
      </div>
    </div>
  );
}
