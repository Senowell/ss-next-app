"use client";

import Link from "next/link";
import { useState } from "react";
import SidebarNav from "./SidebarNav";
import type { HeaderData } from "@/utils/siteInfo";

interface HeaderProps {
  headerData?: HeaderData;
}

export default function Header({ headerData }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const siteName = headerData?.SiteName || "Senowell Systems";
  const quickLinks = headerData?.QuickLinks || [];

  return (
    <header>
      {/* Desktop Header */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 w-full py-4 justify-center items-center border-b border-gray-200 bg-white z-40">
        <div className="w-11/12 flex justify-between items-center">
        {/* Logo/Brand */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          {siteName}
        </Link>

          {/* Navigation Links */}
          <div className="flex gap-8">
            {quickLinks.map((link) => (
              <Link
                key={link.id}
                href={link.URL}
                className="text-gray-700 hover:text-gray-900"
                target={link.Open_In_New_Tab ? "_blank" : "_self"}
                rel={link.Open_In_New_Tab ? "noopener noreferrer" : ""}
              >
                {link.Label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <nav className="md:hidden fixed top-0 left-0 right-0 w-full px-6 py-4 flex items-center gap-4 border-b border-gray-200 bg-white z-40">
        {/* Hamburger Menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2"
          aria-label="Toggle menu"
        >
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line y1="1" x2="19.2" y2="1" stroke="#4C4C4C" strokeWidth="2"/>
            <line y1="5.8" x2="19.2" y2="5.8" stroke="#4C4C4C" strokeWidth="2"/>
            <line y1="10.6" x2="19.2" y2="10.6" stroke="#4C4C4C" strokeWidth="2"/>
          </svg>
          <span className="text-base font-semibold text-gray-800">MENU</span>
        </button>

        {/* Logo/Brand - Float to right */}
        <Link href="/" className="text-2xl font-bold text-blue-600 ml-auto whitespace-nowrap">
          {siteName}
        </Link>
      </nav>

      {/* Mobile Menu Sidebar */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsMenuOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="absolute inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-lg flex flex-col overflow-y-auto">
            {/* Close Button */}
            <div className="flex justify-end pt-4 px-6 flex-shrink-0">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full"
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="2" y1="2" x2="18" y2="18" stroke="#4C4C4C" strokeWidth="2"/>
                  <line x1="18" y1="2" x2="2" y2="18" stroke="#4C4C4C" strokeWidth="2"/>
                </svg>
              </button>
            </div>

            {/* SidebarNav for Mobile */}
            <div onClick={() => setIsMenuOpen(false)}>
              <SidebarNav menuData={headerData?.Menu} />
            </div>
            
            {/* Navigation Links */}
            <div className="flex flex-col gap-3 px-6 pb-6 flex-shrink-0">
              {quickLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.URL}
                  className="text-base font-bold text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                  target={link.Open_In_New_Tab ? "_blank" : "_self"}
                  rel={link.Open_In_New_Tab ? "noopener noreferrer" : ""}
                >
                  {link.Label}
                </Link>
              ))}
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
