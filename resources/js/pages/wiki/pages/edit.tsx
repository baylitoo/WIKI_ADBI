import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageEditor } from '@/components/wiki/page-editor';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Page } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function EditPage({ page }: { page: Page }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Spaces', href: '/spaces' },
        { title: page.title, href: `/pages/${page.id}` },
        { title: 'Edit', href: `/pages/${page.id}/edit` },
    ];

    const { data, setData, put, processing, errors } = useForm({
        title: page.title,
        content: page.current_version?.content ?? '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('pages.update', page.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${page.title}`} />

            <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 p-4">
                <form onSubmit={submit} className="flex flex-1 flex-col gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            className="text-lg font-semibold"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            autoFocus
                            required
                        />
                        <InputError message={errors.title} />
                    </div>

                    <div className="grid gap-2">
                        <Label>Content</Label>
                        <PageEditor content={data.content} onChange={(markdown) => setData('content', markdown)} />
                        <InputError message={errors.content} />
                    </div>

                    <div>
                        <Button disabled={processing}>Save changes</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
