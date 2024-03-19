import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import Providers from "@/components/Providers";
// import Navbar from "@/components/Navbar";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Iskus Power Ltd",
  description: "Admin application for staff",
  icons:{
    icon:'/favicon1.ico'
  }
};

export default  function RootLayout({ children }) {


  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>   
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
