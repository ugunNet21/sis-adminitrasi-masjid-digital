import {
    useEffect,
    useState,
} from 'react';

// js/pages/users/index.tsx
import { debounce } from 'lodash';

import Pagination from '@/components/pagination';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
    Head,
    router,
    usePage,
} from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Users', href: '/users' },
];

export default function UserIndex() {
    const { users, filters } = usePage().props as unknown as {
        users: {
            data: any[];
            links: any[];
        };
        filters: {
            search?: string;
        };
    };

    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        const debounced = debounce(() => {
            // Only trigger if search has changed
            if (search !== filters.search) {
                router.get(
                    '/users',
                    { search: search || undefined },
                    { preserveState: true, preserveScroll: true, replace: true }
                );
            }
        }, 500);

        debounced();

        return () => debounced.cancel();
    }, [search, filters.search]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-4">Users</h1>

                {/* Create Button */}
                <div className="mb-4">
                    <a href="/users/create" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Create User
                    </a>
                </div>

                <div className="overflow-x-auto bg-white shadow rounded-lg">
                    {/* Search input */}
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 px-3 py-2 rounded mb-4"
                        placeholder="Search users..."
                    />

                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Name</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Email</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Username</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Roles</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Active</th>
                                <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.data.map((user: any) => (
                                <tr key={user.id}>
                                    <td className="px-4 py-2">{user.name}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2">{user.username}</td>
                                    <td className="px-4 py-2">
                                        {user.roles.map((role: any) => role.name).join(', ')}
                                    </td>
                                    <td className="px-4 py-2">
                                        <span
                                            className={`px-2 py-1 text-xs rounded ${user.is_active
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                                }`}
                                        >
                                            {user.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 text-right space-x-2">
                                        <a
                                            href={`/users/${user.id}/edit`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </a>
                                        <button
                                            onClick={() => {
                                                if (confirm('Are you sure you want to delete this user?')) {
                                                    router.delete(`/users/${user.id}`);
                                                }
                                            }}
                                            className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Pagination links={users.links} />
                </div>
            </div>
        </AppLayout>
    );
}