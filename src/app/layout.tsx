import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Todayeat',
  description:
    'A web application that automatically recognizes food and records nutritional information just by taking a photo.'
};

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
};

export default RootLayout;
