import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export default function Welcome() {
    const { auth, name } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-6 text-foreground">
                <div className="flex items-center gap-2.5">
                    <div className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <AppLogoIcon className="size-5" />
                    </div>
                    <span className="text-lg font-semibold tracking-tight">{name}</span>
                </div>

                <div className="max-w-md space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Where the team's knowledge lives</h1>
                    <p className="text-sm text-muted-foreground">
                        Spaces, pages, and version history — one place to write it down and find it again.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {auth.user ? (
                        <Button asChild>
                            <Link href="/spaces">
                                Go to spaces
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    ) : (
                        <>
                            <Button asChild>
                                <Link href={route('login')}>Log in</Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href={route('register')}>Register</Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
