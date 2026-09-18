// components/shared/NavBar.jsx
"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoClose, IoChevronDown } from "react-icons/io5";
import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import { ArrowRightFromSquare, Persons } from "@gravity-ui/icons";

// import { authClient } from "@/lib/auth-client";

const primaryLinks = [
  { href: "/", label: "হোম" },
  { href: "/courses", label: "কোর্স" },
  { href: "/teachers", label: "শিক্ষক" },
  { href: "/books", label: "বই" },
  { href: "/blog", label: "ব্লগ" },
];

const moreLinks = [
  { href: "/about", label: "আমাদের সম্পর্কে" },
  { href: "/admission", label: "ভর্তি + নিয়মাবলী" },
  { href: "/students", label: "শিক্ষার্থী" },
  { href: "/results", label: "ফলাফল" },
  { href: "/contact", label: "যোগাযোগ" },
];

const NavBar = () => {
  const sideMenuRef = useRef(null);
  const [burger, setBurger] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

//   const { data: session } = authClient.useSession();
  const user = null

  const openMenu = () => {
    if (sideMenuRef.current) {
      setBurger(false);
      sideMenuRef.current.style.transform = "translateX(0)";
    }
  };

  const closeMenu = () => {
    if (sideMenuRef.current) {
      sideMenuRef.current.style.transform = "translateX(-100%)";
      setBurger(true);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const isActive = (href) => pathname === href;

  return (
    <nav className="w-full fixed top-0 left-0 px-5 lg:px-8 py-4 flex justify-between items-center z-40 border-b border-border bg-background/80 backdrop-blur-md shadow-sm transition-colors duration-300">

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        {burger ? (
          <HiMenuAlt1
            className="w-6 h-6 text-foreground cursor-pointer hover:text-primary transition"
            onClick={openMenu}
          />
        ) : (
          <></>
        )}
      </div>

      {/* Mobile Side Menu */}
      <ul
        ref={sideMenuRef}
        style={{ transform: "translateX(-100%)" }}
        className="flex md:hidden flex-col gap-4 py-20 px-8 fixed left-0 top-0 bottom-0 w-64 z-50 h-screen bg-background shadow-2xl transition-transform duration-300 text-foreground overflow-y-auto"
      >
        <div className="absolute left-6 top-6">
          <IoClose
            onClick={closeMenu}
            className="w-6 h-6 cursor-pointer hover:text-primary transition"
          />
        </div>

        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mt-4">
          প্রধান
        </p>
        {primaryLinks.map((link) => (
          <li key={link.href}>
            <Link
              onClick={closeMenu}
              href={link.href}
              className={`text-lg font-bold transition ${
                isActive(link.href) ? "text-primary" : "hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}

        <div className="border-t border-border my-2" />

        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
          অন্যান্য
        </p>
        {moreLinks.map((link) => (
          <li key={link.href}>
            <Link
              onClick={closeMenu}
              href={link.href}
              className={`text-lg font-bold transition ${
                isActive(link.href) ? "text-primary" : "hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}

        <li className="mt-6">
          <Link href="/admission" onClick={closeMenu}>
            <Button className="w-full bg-primary hover:bg-primary-hover text-white font-semibold px-5 py-2.5 rounded-full shadow-md transition-all duration-200">
              ভর্তি হোন
            </Button>
          </Link>
        </li>
      </ul>

      {/* Logo */}
      <div className="flex-1 md:flex-none text-center md:text-left">
        <Link href="/">
          <h1 className="text-2xl font-extrabold tracking-tight leading-tight">
            <span className="text-primary">মারকাজুল </span>
            <span className="text-secondary">লিসান</span>
          </h1>
        </Link>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-8 py-2.5 bg-background/70 backdrop-blur-sm shadow-md border border-border">
        {primaryLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`text-sm font-semibold transition ${
                isActive(link.href)
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}

        {/* More dropdown */}
        <li>
          <Dropdown>
            <Dropdown.Trigger className="cursor-pointer">
              <span className="flex items-center gap-1 text-sm font-semibold text-foreground hover:text-primary transition">
                আরও
                <IoChevronDown className="w-4 h-4" />
              </span>
            </Dropdown.Trigger>
            <Dropdown.Popover className="bg-surface border border-border shadow-2xl rounded-2xl p-0 min-w-[200px]">
              <Dropdown.Menu>
                {moreLinks.map((link) => (
                  <Dropdown.Item
                    key={link.href}
                    id={link.href}
                    textValue={link.label}
                    href={link.href}
                  >
                    <Label className="text-foreground">{link.label}</Label>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </li>
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <div className="hidden md:block">
          <Link href="/admission">
            <Button className="bg-primary hover:bg-primary-hover text-white font-semibold px-5 py-2.5 rounded-full shadow-md transition-all duration-200 hover:scale-105">
              ভর্তি হোন
            </Button>
          </Link>
        </div>

        {/* Admin profile dropdown */}
        {user ? (
          <Dropdown>
            <Dropdown.Trigger className="rounded-full cursor-pointer">
              <Avatar size="md">
                <Avatar.Image alt={user?.name} src={user?.image} />
                <Avatar.Fallback delayMs={600}>
                  {user?.name?.slice(0, 2).toUpperCase()}
                </Avatar.Fallback>
              </Avatar>
            </Dropdown.Trigger>

            <Dropdown.Popover className="bg-surface border border-border shadow-2xl rounded-2xl p-0 min-w-[220px]">
              <div className="px-4 pt-4 pb-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <Avatar size="sm">
                    <Avatar.Image alt={user?.name} src={user?.image} />
                    <Avatar.Fallback delayMs={600}>
                      {user?.name?.slice(0, 2).toUpperCase()}
                    </Avatar.Fallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold text-foreground leading-5">
                      {user?.name}
                    </p>
                    <p className="text-xs text-text-muted leading-4 truncate max-w-[140px]">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>

              <Dropdown.Menu>
                <Dropdown.Item
                  id="dashboard"
                  textValue="Dashboard"
                  href="/dashboard"
                >
                  <div className="flex items-center gap-3">
                    <Persons className="size-4 text-text-muted" />
                    <Label className="text-foreground">ড্যাশবোর্ড</Label>
                  </div>
                </Dropdown.Item>

                <Dropdown.Item
                  id="logout"
                  textValue="Logout"
                  variant="danger"
                  className="mt-1 border-t border-border pt-2"
                >
                  <div
                    onClick={handleSignOut}
                    className="flex w-full items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-3">
                      <ArrowRightFromSquare className="size-4 text-error" />
                      <Label className="text-error">লগআউট</Label>
                    </div>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default NavBar;