"use client";

import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import { GlobalStyle } from "@/styles/GlobalStyle";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Camilla Luxe Essence - Affordable Luxury Fashion</title>
        <meta
          name="description"
          content="Discover affordable luxury fashion for men and women. Premium handbags, footwear, sneakers, and perfumes at accessible prices."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CartProvider>
            <GlobalStyle />
            <Navigation />
            <main style={{ paddingTop: "57px" }}>{children}</main>
            <Footer />
            <WhatsAppButton />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
