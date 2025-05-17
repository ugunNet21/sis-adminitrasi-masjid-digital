// js/components/pagination.tsx
import { router } from '@inertiajs/react';

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginationProps = {
    links: PaginationLink[];
};

export default function Pagination({ links }: PaginationProps) {
    const searchParam = new URLSearchParams(window.location.search).get('search');

    const handlePageChange = (url: string | null) => {
        if (url) {
            const updatedUrl = new URL(url);
            if (searchParam) {
                updatedUrl.searchParams.set('search', searchParam);
            }
            router.visit(updatedUrl.toString(), {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }
    };

    return (
        <div className="flex space-x-1 mt-4">
            {links.map((link, idx) => (
                <button
                    key={idx}
                    onClick={() => handlePageChange(link.url)}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`px-3 py-1 border rounded text-sm ${link.active
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        } ${!link.url ? 'pointer-events-none text-gray-400' : 'cursor-pointer'}`}
                    disabled={!link.url}
                />
            ))}
        </div>
    );
}