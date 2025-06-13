import { UploadDropzone } from '@xclips/ui';

async function requestUpload(file: File) {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName: file.name, contentType: file.type, duration: 0 }),
  });
  const { url, key } = await resp.json();

  // Upload directly to S3
  await fetch(url, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/complete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key, size: file.size, duration: 0 }),
  });
}

export default function UploadPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12 bg-surface-matte">
      <h1 className="text-3xl font-bold mb-8">Upload Media</h1>
      <div className="w-full max-w-lg">
        <UploadDropzone onUploadRequested={requestUpload} />
      </div>
    </main>
  );
} 