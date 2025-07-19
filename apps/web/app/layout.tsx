import './globals.css';
// import { Inter } from 'next/font/google';
import { Providers } from '../components/Providers';

// Use system fonts as fallback when Google Fonts are not accessible
// const inter = Inter({ 
//   subsets: ['latin'],
//   fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
//   display: 'swap',
// });

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
      <body className="font-sans">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
