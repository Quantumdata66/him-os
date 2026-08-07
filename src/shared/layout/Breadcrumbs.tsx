'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

const HUB_LABEL_MAP: Record<string, string> = {
  dashboard: 'HOME',
  today: 'TODAY',
  build: 'BUILD',
  learn: 'LEARN',
  grow: 'GROW',
  think: 'THINK',
  review: 'REVIEW',
  projects: 'PROJECTS',
  career: 'CAREER',
  portfolio: 'PORTFOLIO',
  courses: 'COURSES',
  books: 'BOOKS',
  anki: 'ANKI',
  finance: 'FINANCE',
  ventures: 'VENTURES',
  tax: 'TAX',
  notes: 'NOTES',
  graph: 'GRAPH',
  decisions: 'DECISIONS',
};

export const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return (
      <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-xs text-text-secondary">
        <span className="font-semibold text-accent-mint tracking-wide">HOME</span>
      </nav>
    );
  }

  // Map segments into breadcrumb items
  const items = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = HUB_LABEL_MAP[segment] || segment.toUpperCase();
    const isLast = index === segments.length - 1;
    return { href, label, isLast };
  });

  // Decision 004: Collapse intermediate nodes if path depth > 3
  let displayItems = items;
  if (items.length > 3) {
    displayItems = [
      items[0],
      { href: items[items.length - 2].href, label: '...', isLast: false },
      items[items.length - 1],
    ];
  }

  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-xs font-sans select-none">
      <Link
        href="/dashboard"
        className="text-text-secondary hover:text-accent-mint font-semibold transition-colors duration-150"
      >
        HOME
      </Link>

      {displayItems.map((item, idx) => (
        <React.Fragment key={item.href + idx}>
          <ChevronRight className="w-3.5 h-3.5 text-text-muted shrink-0" />
          {item.isLast ? (
            <span aria-current="page" className="font-semibold text-accent-mint tracking-wide truncate max-w-[120px] sm:max-w-none">
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className="text-text-secondary hover:text-accent-mint font-medium transition-colors duration-150 truncate max-w-[100px] sm:max-w-none"
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
