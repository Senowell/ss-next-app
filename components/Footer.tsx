import Link from "next/link";
import type { FooterData } from "@/utils/siteInfo";

interface FooterProps {
  footerData?: FooterData;
}

export default function Footer({ footerData }: FooterProps) {
  const siteName = footerData?.SiteName || "Senowell Systems";
  const description = footerData?.SiteDescription || "Senowell Labs is an engineering firm with in-house technology able to implement any fiber-optic monitoring solution in your asset. We support our customers every step of the project.";
  const copyright = footerData?.Copy_Right_Info || "Copyright © 2026 Senowell Systems. All rights reserved";
  const quickLinks = footerData?.QuickLinks || [];

  return (
    <footer className="bg-white">
      {/* Footer Content Container */}
      <div className="w-11/12 md:w-11/12 mx-auto py-12 border-t border-gray-200">
        {/* Top Section - About */}
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            {siteName}
          </h2>
          <p className="text-gray-700 text-base leading-relaxed max-w-3xl mx-auto md:mx-0">
            {description}
          </p>
        </div>

        {/* Bottom Section - Copyright and Links */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center items-center text-center md:text-left pt-4">
          {/* Copyright */}
          <p className="text-gray-700 text-sm mb-4 md:mb-0">
            {copyright}
          </p>

          {/* Footer Links */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-4 items-center md:items-center text-sm">
            {quickLinks.map((link, index) => (
              <div key={link.id} className="flex items-center gap-4">
                <Link
                  href={link.URL}
                  className="text-gray-700 hover:text-gray-900"
                  target={link.Open_In_New_Tab ? "_blank" : "_self"}
                  rel={link.Open_In_New_Tab ? "noopener noreferrer" : ""}
                >
                  {link.Label}
                </Link>
                {index < quickLinks.length - 1 && (
                  <span className="text-gray-700 hidden md:inline">|</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
