import {
    BookOpen,
    Calendar,
    Clock,
    FileText,
    Folder,
    HandCoins,
    Landmark,
    LayoutGrid,
    Mic,
    Shield,
    Users,
} from 'lucide-react';

import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';

import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    // Management
    {
        title: 'Users',
        href: '/users',
        icon: Users,
        // group: 'Management'
    },
    {
        title: 'Roles & Permissions',
        href: '/roles',
        icon: Shield,
        // group: 'Management'
    },
    // Masjid
    {
        title: 'Masjid Profile',
        href: '/masjids',
        icon: Landmark,
        // group: 'Masjid'
    },
    {
        title: 'Prayer Times',
        href: '/prayer-times',
        icon: Clock,
        // group: 'Masjid'
    },
    {
        title: 'Events',
        href: '/events',
        icon: Calendar,
        // group: 'Masjid'
    },
    {
        title: 'Sermons',
        href: '/sermons',
        icon: Mic,
        // group: 'Masjid'
    },
    // Financial
    {
        title: 'Donations',
        href: '/donations',
        icon: HandCoins,
        // group: 'Financial'
    },
    {
        title: 'Financial Reports',
        href: '/financial-reports',
        icon: FileText,
        // group: 'Financial'
    },
    // Community
    {
        title: 'Obituaries',
        href: '/obituaries',
        // icon: Prayer,
        // group: 'Community'
    }
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <div className="p-4">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        />
                        <svg 
                            className="absolute left-3 top-3 h-4 w-4 text-gray-400" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                            />
                        </svg>
                    </div>
                </div>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}