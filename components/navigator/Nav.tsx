"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/components/navigator/Navigation.module.css"; 

const pages = [
  { href: "/", title: "Home" },
  { href: "/DnD", title: "DnD" },
  { href: "/ToDo", title: "ToDo" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
          {pages.map(({ href, title }) => (
            <li
              key={href}
              className={`${styles.navItem} ${
                pathname === href ? styles.active : ""
              }`}
            >
              <Link href={href} className={styles.navLink}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}