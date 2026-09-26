// app/(auth)/login/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Form,
    TextField,
    Label,
    Input,
    FieldError,
    Button,
} from "@heroui/react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
    const router = useRouter();
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget).entries());

        setLoading(true);
        try {
            const { data: result, error } = await authClient.signIn.email({
                email: data.email,
                password: data.password,
            });

            if (result) {
                toast.success("লগইন সফল হয়েছে!");
                router.push("/");
                return;
            }

            toast.error(error?.message || "লগইন ব্যর্থ হয়েছে");
        } catch (err) {
            console.error(err);
            toast.error("কিছু একটা সমস্যা হয়েছে");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        setGoogleLoading(true);
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (err) {
            console.error(err);
            toast.error("Google লগইন ব্যর্থ হয়েছে");
            setGoogleLoading(false);
        }
    };

    return (
        <>
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                    লগইন
                </h1>
                <p className="text-sm text-text-muted">
                    আপনার অ্যাকাউন্টে প্রবেশ করুন
                </p>
            </div>

            <Form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                {/* Email */}
                <TextField
                    name="email"
                    type="email"
                    isRequired
                    validate={(v) => {
                        if (!v?.trim()) return "ইমেইল আবশ্যক";
                        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
                            return "সঠিক ইমেইল দিন";
                        return null;
                    }}
                >
                    <Label>ইমেইল</Label>
                    <Input placeholder="you@example.com" />
                    <FieldError />
                </TextField>

                {/* Password */}
                <TextField
                    name="password"
                    type={isShowPassword ? "text" : "password"}
                    isRequired
                    validate={(v) => {
                        if (!v) return "পাসওয়ার্ড আবশ্যক";
                        if (v.length < 6) return "কমপক্ষে ৬ অক্ষর হতে হবে";
                        return null;
                    }}
                >
                    <Label>পাসওয়ার্ড</Label>
                    <div className="relative">
                        <Input className="w-full" placeholder="••••••••" />
                        <button
                            type="button"
                            onClick={() => setIsShowPassword((p) => !p)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground transition cursor-pointer"
                            aria-label={isShowPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখান"}
                        >
                            {isShowPassword ? (
                                <IoEyeOffOutline className="w-5 h-5" />
                            ) : (
                                <IoEyeOutline className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                    <FieldError />
                </TextField>

                {/* Submit */}
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 disabled:opacity-50"
                >
                    {loading ? "লগইন হচ্ছে..." : "লগইন"}
                </Button>
            </Form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-text-muted">অথবা</span>
                <div className="flex-1 h-px bg-border" />
            </div>

            {/* Google */}
            <button
                type="button"
                onClick={handleGoogle}
                disabled={googleLoading}
                className="w-full inline-flex items-center justify-center gap-3 border border-border hover:border-secondary bg-background text-foreground font-semibold px-6 py-3 rounded-full transition-all duration-200 disabled:opacity-50 cursor-pointer"
            >
                <FcGoogle className="w-5 h-5" />
                {googleLoading ? "অপেক্ষা করুন..." : "Google দিয়ে লগইন"}
            </button>

            {/* Register link */}
            <p className="text-center text-sm text-text-muted mt-6">
                অ্যাকাউন্ট নেই?{" "}
                <Link
                    href="/register"
                    className="font-semibold text-secondary hover:text-primary transition"
                >
                    রেজিস্টার করুন
                </Link>
            </p>
        </>
    );
}