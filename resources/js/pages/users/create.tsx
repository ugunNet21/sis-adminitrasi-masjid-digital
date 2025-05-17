// js/pages/users/create.tsx
import { useState } from 'react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
    Head,
    router,
    usePage,
} from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Users', href: '/users' },
    { title: 'Create', href: '/users/create' },
];

export default function UserCreate() {
    const { roles } = usePage().props as unknown as {
        roles: Array<{ id: number; name: string }>;
    };

    // Fix: Explicitly define roles as number[]
    const [form, setForm] = useState<{
        name: string;
        username: string;
        email: string;
        password: string;
        password_confirmation: string;
        phone: string;
        roles: number[]; // <--- Changed from never[] to number[]
        is_active: boolean;
    }>({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        roles: [], // Initializing as an empty array of numbers
        is_active: true,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        if (type === 'checkbox') {
            setForm((prevForm) => ({
                ...prevForm,
                [name]: checked,
            }));
        } else if (name === 'roles') {
            const selectedOptions = Array.from((e.target as HTMLSelectElement).options)
                .filter(option => option.selected)
                .map(option => Number(option.value));
            setForm((prevForm) => ({
                ...prevForm,
                roles: selectedOptions,
            }));
        } else {
            setForm((prevForm) => ({
                ...prevForm,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({}); // Clear previous errors

        router.post('/users', form, {
            onError: (err) => {
                setErrors(err);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create User" />
            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-4">Create New User</h1>

                <div className="mb-4">
                    <a href="/users/create" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Create User
                    </a>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone (Optional)</label>
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>
                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    id="password_confirmation"
                                    value={form.password_confirmation}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                                {errors.password_confirmation && <p className="text-red-500 text-xs mt-1">{errors.password_confirmation}</p>}
                            </div>
                            <div>
                                <label htmlFor="roles" className="block text-sm font-medium text-gray-700">Roles</label>
                                <select
                                    name="roles"
                                    id="roles"
                                    multiple
                                    value={form.roles.map(String)}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 h-32"
                                >
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.id}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.roles && <p className="text-red-500 text-xs mt-1">{errors.roles}</p>}
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="is_active"
                                    id="is_active"
                                    checked={form.is_active}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                                <label htmlFor="is_active" className="ml-2 block text-sm font-medium text-gray-700">Is Active</label>
                                {errors.is_active && <p className="text-red-500 text-xs mt-1">{errors.is_active}</p>}
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Create User
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}