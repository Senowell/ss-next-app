import Link from "next/link";
import type { MenuItem } from "@/utils/siteInfo";

interface SidebarNavProps {
  menuData?: MenuItem[];
}

export default function SidebarNav({ menuData }: SidebarNavProps) {
  const categories = menuData || [
    {
      id: "1",
      Title: "Energy",
      Links: [{ id: "24", Label: "Power Cable Monitoring", URL: "Power-Cable-Monitoring", Open_In_New_Tab: false }],
    },
    {
      id: "2",
      Title: "Civil & Mining Infrastructure",
      Links: [
        { id: "25", Label: "Structural Health", URL: "/Structural-Health", Open_In_New_Tab: false },
        { id: "26", Label: "Fire Detection", URL: "/Fire-Detection", Open_In_New_Tab: false },
        { id: "27", Label: "Leak Detection", URL: "/Leak-Detection", Open_In_New_Tab: false },
        { id: "28", Label: "Geo Technical Monitoring", URL: "/Geo-Technical-Monitoring", Open_In_New_Tab: false },
      ],
    },
    {
      id: "3",
      Title: "Water, Oil & Gas",
      Links: [{ id: "29", Label: "Duct Super Vision", URL: "/Duct-Super-Vision", Open_In_New_Tab: false }],
    },
    {
      id: "4",
      Title: "Geo Technical",
      Links: [{ id: "30", Label: "LNG plant Supervision", URL: "/LNG-plant-Supervision", Open_In_New_Tab: false }],
    },
    {
      id: "5",
      Title: "Security",
      Links: [{ id: "31", Label: "Rail Road", URL: "/Rail-Road", Open_In_New_Tab: false }],
    },
  ];

  return (
    <aside className="w-full md:w-48 h-full md:max-h-[calc(100vh-73px)] bg-white px-6 md:px-0 py-6 md:border-r border-gray-200 md:mr-6 md:sticky md:top-[73px] md:overflow-y-auto">
      <nav className="space-y-3 md:space-y-6">
        {categories.map((category) => (
          <div key={category.id} className="space-y-1">
            {/* Category Title */}
            <h3 className="text-base font-bold text-gray-900">
              {category.Title}
            </h3>

            {/* Links */}
            <ul className="space-y-0">
              {category.Links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.URL}
                    className="text-sm text-gray-700 hover:text-gray-900"
                    target={link.Open_In_New_Tab ? "_blank" : "_self"}
                    rel={link.Open_In_New_Tab ? "noopener noreferrer" : ""}
                  >
                    {link.Label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
