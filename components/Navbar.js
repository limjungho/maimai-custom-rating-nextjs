"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Custom Rating이란?", href: "/whatiscustomrating" },
    { name: "Update & Help", href: "/help" },
  ];

  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center space-x-12 py-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                pathname === item.href
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-700"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
