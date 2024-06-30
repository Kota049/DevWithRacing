"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/molecules/header";
import { useAtomValue } from "jotai";
import errorAtom from "./globalState/error";
import { Snackbar } from "@mui/material";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const errors = useAtomValue(errorAtom);
  const [open, setOpen] = useState(false);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {errors.map((msg, index) => {
          return (
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={open}
              onClose={() => {
                setOpen(false);
              }}
              message={msg}
              key={index}
            />
          );
        })}
        {children}
      </body>
    </html>
  );
}
