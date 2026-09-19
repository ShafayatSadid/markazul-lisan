// components/shared/Footer.jsx
import Link from "next/link";
import {
    FaFacebookF,
    FaYoutube,
    FaWhatsapp,
    FaGithub,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const quickLinks = [
    { href: "/", label: "হোম" },
    { href: "/courses", label: "কোর্স" },
    { href: "/teachers", label: "শিক্ষক" },
    { href: "/books", label: "বই" },
    { href: "/blog", label: "ব্লগ" },
];

const otherLinks = [
    { href: "/about", label: "আমাদের সম্পর্কে" },
    { href: "/admission", label: "ভর্তি + নিয়মাবলী" },
    { href: "/students", label: "শিক্ষার্থী" },
    { href: "/results", label: "ফলাফল" },
    { href: "/contact", label: "যোগাযোগ" },
];

const socialLinks = [
    { href: "https://facebook.com", icon: FaFacebookF, label: "Facebook" },
    { href: "https://youtube.com", icon: FaYoutube, label: "YouTube" },
    { href: "https://wa.me/8801000000000", icon: FaWhatsapp, label: "WhatsApp" },
];

const Footer = () => {
    return (
        <footer className="w-full bg-[#062B1E] text-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
                {/* Top grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Column 1 — Logo + Description + Social */}
                    <div className="text-center sm:text-left">
                        <Link href="/">
                            <h2 className="text-2xl font-extrabold tracking-tight mb-4">
                                <span className="text-primary">মারকাযুল </span>
                                <span className="text-secondary">লিসান</span>
                            </h2>
                        </Link>
                        <p className="text-sm text-white/70 leading-relaxed mb-6">
                            প্রবাসী বাংলাদেশিদের জন্য ইসলামিক শিক্ষা প্ল্যাটফর্ম।
                            Europe, America, Middle East যেখানেই থাকুন — ঘরে বসে শিখুন।
                        </p>
                        <div className="flex items-center justify-center sm:justify-start gap-3">
                            {socialLinks.map(({ href, icon: Icon, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-secondary hover:text-[#062B1E] transition-colors duration-200"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2 — Quick Links */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-lg font-bold mb-4 text-secondary">দ্রুত লিংক</h3>
                        <ul className="space-y-2.5">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/70 hover:text-secondary transition"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3 — Other Links */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-lg font-bold mb-4 text-secondary">অন্যান্য</h3>
                        <ul className="space-y-2.5">
                            {otherLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/70 hover:text-secondary transition"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4 — Contact + Newsletter */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-lg font-bold mb-4 text-secondary">যোগাযোগ</h3>
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-center justify-center sm:justify-start gap-3 text-sm text-white/70">
                                <MdEmail className="w-4 h-4 text-secondary flex-shrink-0" />
                                <span>info@markazullisan.com</span>
                            </li>
                            <li className="flex items-center justify-center sm:justify-start gap-3 text-sm text-white/70">
                                <MdPhone className="w-4 h-4 text-secondary flex-shrink-0" />
                                <span>+880 1000-000000</span>
                            </li>
                            <li className="flex items-center justify-center sm:justify-start gap-3 text-sm text-white/70">
                                <MdLocationOn className="w-4 h-4 text-secondary flex-shrink-0" />
                                <span>Dhaka, Bangladesh</span>
                            </li>
                        </ul>

                        {/* Newsletter */}
                        <form className="flex items-center gap-2 bg-white/10 rounded-full p-1 pl-4">
                            <input
                                type="email"
                                placeholder="আপনার ইমেইল"
                                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/50 outline-none py-2 min-w-0"
                            />
                            <button
                                type="submit"
                                className="bg-secondary hover:bg-primary text-[#062B1E] font-semibold text-sm px-4 py-2 rounded-full transition whitespace-nowrap cursor-pointer"
                            >
                                সাবস্ক্রাইব
                            </button>
                        </form>
                    </div>
                </div>


                {/* Bottom bar */}
                <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
                    <p className="text-sm text-white/60">
                        © {new Date().getFullYear()} Markazul Lisan. All rights reserved.
                    </p>
                    <p className="text-sm text-white/60 flex items-center gap-2">
                        Design & development by{" "}
                        <a
                            href="https://github.com/ShafayatSadid"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-secondary hover:text-primary font-semibold transition"
                        >
                            <FaGithub className="w-4 h-4" />
                            Shafayat Hossain
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;