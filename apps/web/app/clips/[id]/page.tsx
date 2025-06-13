import { notFound } from 'next/navigation';
import { TimelineScrubber, Button, ExportModal } from '@xclips/ui';

interface Params { params: { id: string } }

async function fetchClip(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clip/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const data = await res.json();
  return data.clip as { id: string; url: string; start: number; end: number };
}

export default async function ClipPage({ params }: Params) {
  const clip = await fetchClip(params.id);
  if (!clip) return notFound();

  return (
    <main className="p-8 flex flex-col items-center gap-6">
      <video src={clip.url} controls className="w-full max-w-3xl rounded-lg shadow" />
      <TimelineScrubber duration={clip.end} start={clip.start} end={clip.end} onChange={() => {}} />
      <div className="flex gap-4">
        <Button label="Save" onClick={() => {}} />
        <ExportModal clipId={clip.id} />
      </div>
    </main>
  );
} 