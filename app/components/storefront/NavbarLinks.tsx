"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const navbarLinks = [
  { id: 0, name: "Home", href: "/" },
  { id: 1, name: "All Products", href: "/products/all" },
  { id: 2, name: "Laptops", href: "/products/laptops" },
  { id: 3, name: "Desktops", href: "/products/desktops" },
  { id: 4, name: "Gaming", href: "/products/gaming" },
  { id: 5, name: "PC Parts", href: "/products/pcparts" },
];

export function NavbarLinks() {
  const location = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-center items-center gap-x-2 ml-8">
        {navbarLinks.map((item) => (
          <Link
            href={item.href}
            key={item.id}
            className={cn(
              location === item.href
                ? "bg-muted"
                : "hover:bg-muted hover:bg-opacity-75",
              "group p-2 font-medium rounded-md"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center ml-4">
        <button onClick={() => setOpen(!open)} className=" right-3">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {open && (
          <div className="absolute top-14 left-0 w-full bg-background shadow-md p-4 flex flex-col gap-y-2 z-50">
            {navbarLinks.map((item) => (
              <Link
                href={item.href}
                key={item.id}
                onClick={() => setOpen(false)}
                className={cn(
                  location === item.href
                    ? "bg-muted"
                    : "hover:bg-muted hover:bg-opacity-75",
                  "block px-4 py-2 rounded-md font-medium"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
