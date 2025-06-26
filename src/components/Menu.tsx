"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      { icon: "/home.png", label: "Home", href: "/", visible: ["admin", "therapist", "parent"] },
      { icon: "/teacher.png", label: "Therapist", href: "/list/therapists", visible: ["admin", "therapist", "parent"] },
      { icon: "/student.png", label: "Students", href: "/list/students", visible: ["admin", "therapist"] },
      { icon: "/parent.png", label: "Parents", href: "/list/parents", visible: ["admin", "therapist"] },
      { icon: "/lesson.png", label: "Lessons", href: "/list/lessons", visible: ["admin", "teacher"] },
      { icon: "/calendar.png", label: "Events", href: "/list/events", visible: ["admin", "therapist", "parent"] },
      { icon: "/message.png", label: "Message", href: "/list/messages", visible: ["admin", "therapist", "parent"] },
      { icon: "/announcement.png", label: "Announcements", href: "/list/announcements", visible: ["admin", "therapist", "parent"] },
    ],
  },
  {
    title: "OTHER",
    items: [
      { icon: "/profile.png", label: "Profile", href: "/profile", visible: ["admin", "therapist", "parent"] },
      { icon: "/setting.png", label: "Settings", href: "/settings", visible: ["admin", "therapist", "parent"] },
      { icon: "/logout.png", label: "Logout", href: "/logout", visible: ["admin", "therapist", "parent"] },
    ],
  },
];

const Menu = () => {
  const { user, isLoaded } = useUser();
  const role = user?.publicMetadata?.role as string;

  if (!isLoaded) return null;

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((section) => (
        <div className="flex flex-col gap-2" key={section.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {section.title}
          </span>
          {section.items.map((item) =>
            item.visible.includes(role) ? (
              <Link
                href={item.href}
                key={item.label}
                className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
              >
                <Image src={item.icon} alt="" width={20} height={20} />
                <span className="hidden lg:block">{item.label}</span>
              </Link>
            ) : null
          )}
        </div>
      ))}
    </div>
  );
};

export default Menu;
