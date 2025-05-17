import { useState } from 'react';

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

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/users', { search }, { preserveState: true, replace: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-4">Users</h1>

                <div className="overflow-x-auto bg-white shadow rounded-lg">
                    <form onSubmit={handleSearch} className="mb-4">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border border-gray-300 px-3 py-2 rounded"
                            placeholder="Search users..."
                        />
                        <button
                            type="submit"
                            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Search
                        </button>
                    </form>

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
                                        <span className={`px-2 py-1 text-xs rounded ${user.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {user.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 text-right space-x-2">
                                        <a href={`/users/${user.id}/edit`} className="text-blue-600 hover:underline">Edit</a>
                                        <button className="text-red-600 hover:underline">Delete</button>
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
