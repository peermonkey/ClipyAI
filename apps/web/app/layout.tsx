import './globals.css';
import { Providers } from '../components/Providers';

export const metadata = {
  title: 'Clippy.ai - AI-Powered Video Editing',
  description: 'Create viral clips with AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-inter antialiased"
        style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
