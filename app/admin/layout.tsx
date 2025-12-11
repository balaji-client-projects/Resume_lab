import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Dashboard | JobFit Pro',
    description: 'Monitor Resume Generation Activity',
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="bg-neutral-950 min-h-screen text-white antialiased">
            {children}
        </div>
    );
}
