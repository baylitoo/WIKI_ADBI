import { cn } from '@/lib/utils';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Heading1, Heading2, Italic, List, ListOrdered, Quote, Strikethrough } from 'lucide-react';
import { Markdown } from 'tiptap-markdown';
import { Toggle } from '@/components/ui/toggle';

function getMarkdown(editor: Editor): string {
    return (editor.storage as unknown as { markdown: { getMarkdown: () => string } }).markdown.getMarkdown();
}

export function PageEditor({
    content,
    onChange,
    editable = true,
    className,
}: {
    content: string;
    onChange?: (markdown: string) => void;
    editable?: boolean;
    className?: string;
}) {
    const editor = useEditor({
        editable,
        extensions: [
            StarterKit,
            Link.configure({ openOnClick: !editable, autolink: true }),
            Placeholder.configure({ placeholder: 'Write something…' }),
            Markdown.configure({ html: false, tightLists: true, linkify: true }),
        ],
        content,
        editorProps: {
            attributes: {
                class: cn('tiptap prose-sm max-w-none focus:outline-none', editable && 'min-h-[50vh]'),
            },
        },
        onUpdate: ({ editor }) => {
            onChange?.(getMarkdown(editor));
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <div className={cn('flex flex-col', className)}>
            {editable && (
                <div className="mb-2 flex flex-wrap items-center gap-1 rounded-md border border-border bg-card p-1">
                    <Toggle size="sm" pressed={editor.isActive('bold')} onPressedChange={() => editor.chain().focus().toggleBold().run()}>
                        <Bold className="size-4" />
                    </Toggle>
                    <Toggle size="sm" pressed={editor.isActive('italic')} onPressedChange={() => editor.chain().focus().toggleItalic().run()}>
                        <Italic className="size-4" />
                    </Toggle>
                    <Toggle size="sm" pressed={editor.isActive('strike')} onPressedChange={() => editor.chain().focus().toggleStrike().run()}>
                        <Strikethrough className="size-4" />
                    </Toggle>
                    <Toggle
                        size="sm"
                        pressed={editor.isActive('heading', { level: 1 })}
                        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    >
                        <Heading1 className="size-4" />
                    </Toggle>
                    <Toggle
                        size="sm"
                        pressed={editor.isActive('heading', { level: 2 })}
                        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    >
                        <Heading2 className="size-4" />
                    </Toggle>
                    <Toggle
                        size="sm"
                        pressed={editor.isActive('bulletList')}
                        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                    >
                        <List className="size-4" />
                    </Toggle>
                    <Toggle
                        size="sm"
                        pressed={editor.isActive('orderedList')}
                        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                    >
                        <ListOrdered className="size-4" />
                    </Toggle>
                    <Toggle
                        size="sm"
                        pressed={editor.isActive('blockquote')}
                        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
                    >
                        <Quote className="size-4" />
                    </Toggle>
                </div>
            )}
            <EditorContent editor={editor} />
        </div>
    );
}
