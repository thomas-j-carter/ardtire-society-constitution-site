import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid'; // Ensure heroicons is installed

export default function Breadcrumbs({ items }: { items: { label: string; href: string }[] }) {
  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
        <li>
          <Link href="/" className="hover:text-slate-600">Home</Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <ChevronRightIcon className="h-4 w-4 flex-shrink-0" />
            <Link href={item.href} className={index === items.length - 1 ? "text-indigo-600" : "hover:text-slate-600"}>
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}