import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Space } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function EditSpace({ space }: { space: Space }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Spaces', href: '/spaces' },
        { title: space.name, href: `/spaces/${space.id}` },
        { title: 'Edit', href: `/spaces/${space.id}/edit` },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: space.name,
        description: space.description ?? '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('spaces.update', space.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${space.name}`} />

            <div className="flex flex-1 flex-col gap-4 p-4">
                <h1 className="text-xl font-semibold tracking-tight">Edit space</h1>

                <form onSubmit={submit} className="max-w-lg space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={3}
                        />
                        <InputError message={errors.description} />
                    </div>

                    <div className="flex items-center gap-3">
                        <Button disabled={processing}>Save changes</Button>
                        <Link
                            href={route('spaces.destroy', space.id)}
                            method="delete"
                            as="button"
                            className="text-sm text-destructive hover:underline"
                            onBefore={() => confirm('Delete this space and all its pages? This cannot be undone.')}
                        >
                            Delete space
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
