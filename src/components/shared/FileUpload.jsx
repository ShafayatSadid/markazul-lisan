// components/shared/FileUpload.jsx
"use client";

import { useRef, useState } from "react";
import {
  FaFilePdf,
  FaSpinner,
  FaTimes,
  FaCloudUploadAlt,
  FaDownload,
} from "react-icons/fa";
import toast from "react-hot-toast";

export default function FileUpload({ value = "", onChange, label = "ফাইল" }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      toast.error("ফাইল সাইজ 20 MB-এর বেশি হতে পারবে না");
      return;
    }

    if (file.type !== "application/pdf") {
      toast.error("শুধু PDF ফাইল আপলোড করুন");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.secure_url) {
        onChange(data.secure_url);
        toast.success("ফাইল আপলোড হয়েছে");
      } else {
        toast.error(data.error?.message || "আপলোড ব্যর্থ হয়েছে");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("আপলোডে সমস্যা হয়েছে");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleClear = () => {
    onChange("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const getFileName = (url) => {
    try {
      const parts = url.split("/");
      return decodeURIComponent(parts[parts.length - 1]);
    } catch {
      return "ফাইল";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-foreground">{label}</label>

      {value ? (
        <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-background">
          <div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center shrink-0">
            <FaFilePdf className="w-5 h-5 text-error" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-text-muted truncate">
              {getFileName(value)}
            </p>
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-primary hover:text-primary-hover transition inline-flex items-center gap-1 mt-0.5"
            >
              <FaDownload className="w-3 h-3" />
              ডাউনলোড দেখুন
            </a>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="w-7 h-7 rounded-full bg-error text-white flex items-center justify-center shadow-md hover:bg-error/90 transition cursor-pointer shrink-0"
            aria-label="Remove file"
          >
            <FaTimes className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <label className="w-full rounded-xl border-2 border-dashed border-border hover:border-secondary bg-background hover:bg-secondary/5 flex flex-col items-center justify-center gap-2 cursor-pointer transition py-6 px-4">
          {uploading ? (
            <>
              <FaSpinner className="w-6 h-6 text-secondary animate-spin" />
              <span className="text-xs text-text-muted">আপলোড হচ্ছে...</span>
            </>
          ) : (
            <>
              <FaCloudUploadAlt className="w-7 h-7 text-text-muted" />
              <span className="text-xs text-text-muted">
                ক্লিক করে PDF ফাইল নির্বাচন করুন
              </span>
              <span className="text-[10px] text-text-muted/70">
                সর্বোচ্চ 20 MB
              </span>
            </>
          )}
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFile}
            disabled={uploading}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}