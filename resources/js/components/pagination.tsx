// js/components/pagination.tsx
type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginationProps = {
    links: PaginationLink[];
};

export default function Pagination({ links }: PaginationProps) {
    if (links.length <= 3) return null; // skip if no pages

    return (
        <div className="flex space-x-1 mt-4">
            {links.map((link, idx) => (
                <a
                    key={idx}
                    href={link.url || '#'}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`px-3 py-1 border rounded text-sm ${
                        link.active
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    } ${!link.url && 'pointer-events-none text-gray-400'}`}
                />
            ))}
        </div>
    );
}
