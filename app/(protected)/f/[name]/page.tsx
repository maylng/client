import { ThreadHeader, ThreadList } from '@/app/(protected)/components/thread-list';
import { getThreadsForFolder } from '@/lib/queries';
import { Suspense } from 'react';

export function generateStaticParams() {
  const folderNames = [
    'inbox',
    'starred',
    'drafts',
    'sent',
    'archive',
    'trash',
  ];

  return folderNames.map((name) => ({ name }));
}

export default function ThreadsPage({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ q?: string; id?: string }>;
}) {
  return (
    <div className="flex h-screen">
      <Suspense fallback={<ThreadsSkeleton folderName="" />}>
        <Threads params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

function ThreadsSkeleton({ folderName }: { folderName: string }) {
  return (
    <div className="flex-grow border-r border-gray-200 overflow-hidden">
      <ThreadHeader folderName={folderName} />
    </div>
  );
}

async function Threads({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ q?: string; id?: string }>;
}) {
  const { name } = await params;
  const { q } = await searchParams;
  const threads = await getThreadsForFolder(name);

  return <ThreadList folderName={name} threads={threads} searchQuery={q} />;
}
