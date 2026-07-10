import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageEditor } from '@/components/wiki/page-editor';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Page, type Space } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function CreatePage({ space, parent }: { space: Space; parent: Page | null }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Spaces', href: '/spaces' },
        { title: space.name, href: `/spaces/${space.id}` },
        ...(parent ? [{ title: parent.title, href: `/pages/${parent.id}` }] : []),
        { title: 'New page', href: '#' },
    ];

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        parent_id: parent?.id ?? null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('pages.store', space.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New page" />

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
                        <Button disabled={processing}>Publish page</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
