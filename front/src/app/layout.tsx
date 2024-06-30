"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/molecules/header";
import { useAtomValue, useSetAtom } from "jotai";
import errorAtom from "./globalState/error";
import { Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const errors = useAtomValue(errorAtom);
  const setErrors = useSetAtom(errorAtom);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {errors?.map((msg, index) => {
          return (
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={true}
              onClose={() => {
                setErrors((prev) => {
                  return prev.filter((_, i) => i != index);
                });
              }}
              autoHideDuration={5000}
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
