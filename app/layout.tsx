// app/layout.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/globals.css';
import { ReactNode } from 'react';
import MyNavbar from './Navbar';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>Open Mic Finder</title>
      </head>
      <body>
        <MyNavbar />
        {children}
      </body>
    </html>
  );
}
