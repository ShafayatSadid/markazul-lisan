// components/shared/ImageUpload.jsx
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { FaCloudUploadAlt, FaSpinner, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ImageUpload({ value = "", onChange, label = "ছবি" }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("ফাইল সাইজ ৫ MB-এর বেশি হতে পারবে না");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("শুধু ইমেজ ফাইল আপলোড করুন");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.secure_url) {
        // f_auto + q_auto যোগ করে optimized URL
        const optimizedUrl = data.secure_url.replace(
          "/upload/",
          "/upload/f_auto,q_auto/"
        );
        onChange(optimizedUrl);
        toast.success("ছবি আপলোড হয়েছে");
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

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-foreground">{label}</label>

      {value ? (
        <div className="relative w-full max-w-xs">
          <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-border bg-secondary/10">
            <Image
              src={value}
              alt="Uploaded"
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-error text-white flex items-center justify-center shadow-md hover:bg-error/90 transition cursor-pointer"
            aria-label="Remove image"
          >
            <FaTimes className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <label className="w-full max-w-xs aspect-video rounded-xl border-2 border-dashed border-border hover:border-secondary bg-background hover:bg-secondary/5 flex flex-col items-center justify-center gap-2 cursor-pointer transition">
          {uploading ? (
            <>
              <FaSpinner className="w-6 h-6 text-secondary animate-spin" />
              <span className="text-xs text-text-muted">আপলোড হচ্ছে...</span>
            </>
          ) : (
            <>
              <FaCloudUploadAlt className="w-7 h-7 text-text-muted" />
              <span className="text-xs text-text-muted">
                ক্লিক করে ছবি নির্বাচন করুন
              </span>
              <span className="text-[10px] text-text-muted/70">
                সর্বোচ্চ ৫ MB
              </span>
            </>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            disabled={uploading}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}