// app/(auth)/register/page.jsx
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

export default function RegisterPage() {
  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    if (data.password !== data.confirmPassword) {
      toast.error("পাসওয়ার্ড দুটো মিলছে না");
      return;
    }

    setLoading(true);
    try {
      const { data: result, error } = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (result) {
        toast.success("অ্যাকাউন্ট তৈরি হয়েছে!");
        router.push("/");
        return;
      }

      toast.error(error?.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
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
      toast.error("Google রেজিস্ট্রেশন ব্যর্থ হয়েছে");
      setGoogleLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
          রেজিস্টার
        </h1>
        <p className="text-sm text-text-muted">
          নতুন অ্যাকাউন্ট তৈরি করুন
        </p>
      </div>

      <Form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {/* Name */}
        <TextField
          name="name"
          isRequired
          validate={(v) => {
            if (!v?.trim()) return "নাম আবশ্যক";
            if (v.trim().length < 2) return "কমপক্ষে ২ অক্ষর হতে হবে";
            return null;
          }}
        >
          <Label>পূর্ণ নাম</Label>
          <Input placeholder="আপনার নাম" />
          <FieldError />
        </TextField>

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
          value={passwordValue}
          onChange={setPasswordValue}
          validate={(v) => {
            if (!v) return "পাসওয়ার্ড আবশ্যক";
            if (v.length < 6) return "কমপক্ষে ৬ অক্ষর হতে হবে";
            if (!/[A-Z]/.test(v)) return "কমপক্ষে একটা বড় হাতের অক্ষর থাকতে হবে";
            if (!/[a-z]/.test(v)) return "কমপক্ষে একটা ছোট হাতের অক্ষর থাকতে হবে";
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

        {/* Confirm Password */}
        <TextField
          name="confirmPassword"
          type={isShowConfirm ? "text" : "password"}
          isRequired
          validate={(v) => {
            if (!v) return "পাসওয়ার্ড নিশ্চিত করুন";
            if (v !== passwordValue) return "পাসওয়ার্ড দুটো মিলছে না";
            return null;
          }}
        >
          <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>
          <div className="relative">
            <Input className="w-full" placeholder="••••••••" />
            <button
              type="button"
              onClick={() => setIsShowConfirm((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground transition cursor-pointer"
              aria-label={isShowConfirm ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখান"}
            >
              {isShowConfirm ? (
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
          {loading ? "তৈরি হচ্ছে..." : "রেজিস্টার করুন"}
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
        {googleLoading ? "অপেক্ষা করুন..." : "Google দিয়ে রেজিস্টার"}
      </button>

      {/* Login link */}
      <p className="text-center text-sm text-text-muted mt-6">
        আগে থেকেই অ্যাকাউন্ট আছে?{" "}
        <Link
          href="/login"
          className="font-semibold text-secondary hover:text-primary transition"
        >
          লগইন করুন
        </Link>
      </p>
    </>
  );
}