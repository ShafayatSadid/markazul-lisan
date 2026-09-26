// components/admin/AdminTopbar.jsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { HiMenuAlt1 } from "react-icons/hi";
import { Avatar, Dropdown, Label } from "@heroui/react";
import { ArrowRightFromSquare } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";

const pageTitles = {
  "/admin": "ড্যাশবোর্ড",
  "/admin/courses": "কোর্স",
  "/admin/teachers": "শিক্ষক",
  "/admin/blogs": "ব্লগ",
  "/admin/books": "বই",
  "/admin/daily-content": "দৈনিক কন্টেন্ট",
  "/admin/students": "শিক্ষার্থী",
  "/admin/results": "ফলাফল",
};

export default function AdminTopbar({ onMenuClick }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const getTitle = () => {
    if (pageTitles[pathname]) return pageTitles[pathname];
    for (const [key, value] of Object.entries(pageTitles)) {
      if (pathname.startsWith(key + "/")) return value;
    }
    return "Admin Panel";
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <header className="h-16 bg-background border-b border-border flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden text-foreground hover:text-primary transition cursor-pointer"
          aria-label="Open menu"
        >
          <HiMenuAlt1 className="w-6 h-6" />
        </button>
        <h2 className="text-lg md:text-xl font-bold text-foreground">
          {getTitle()}
        </h2>
      </div>

      {/* Right — Avatar */}
      {user && (
        <Dropdown>
          <Dropdown.Trigger className="rounded-full cursor-pointer">
            <Avatar size="sm">
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
      )}
    </header>
  );
}