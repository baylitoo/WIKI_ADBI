import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    spaces: SpaceWithTree[];
    [key: string]: unknown;
}

export interface Space {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}

export interface SpaceWithTree extends Space {
    pages: PageTreeNode[];
}

export interface PageTreeNode {
    id: number;
    space_id: number;
    parent_id: number | null;
    title: string;
    slug: string;
    position: number;
}

export interface Page {
    id: number;
    space_id: number;
    parent_id: number | null;
    title: string;
    slug: string;
    position: number;
    current_version_id: number | null;
    created_at: string;
    updated_at: string;
    space?: Space;
    current_version?: PageVersion;
    children?: Page[];
    creator?: User;
}

export interface RecentPage {
    id: number;
    space_id: number;
    title: string;
    updated_at: string;
    space?: Pick<Space, 'id' | 'name'>;
}

export interface PageVersion {
    id: number;
    page_id: number;
    title: string;
    content: string;
    author_id: number | null;
    author?: User;
    created_at: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
