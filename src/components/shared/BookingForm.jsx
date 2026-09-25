// components/shared/BookingForm.jsx
"use client";

import { useState } from "react";
import {
  Form,
  TextField,
  Label,
  Input,
  TextArea,
  FieldError,
  Select,
  ListBox,
  Button,
} from "@heroui/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function BookingForm({ courses = [], defaultCourse = "" }) {
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(defaultCourse);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    setLoading(true);

    try {
      const payload = {
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
        course,
        name: data.name,
        phone: data.phone,
        email: data.email,
        age: data.age,
        country: data.country,
        message: data.message || "",
        subject: `New Admission Request - ${course}`,
        from_name: "Markazul Lisan",
        botcheck: "",
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("আপনার আবেদন গ্রহণ করা হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।");
        e.target.reset();
        setCourse(defaultCourse);
        router.push("/");
      } else {
        toast.error(result.message || "কিছু একটা সমস্যা হয়েছে।");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      toast.error("নেটওয়ার্ক সমস্যা, আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit}
    >
      {/* Course */}
      {defaultCourse ? (
        <TextField name="course" isReadOnly defaultValue={defaultCourse}>
          <Label>কোর্স</Label>
          <Input />
        </TextField>
      ) : (
        <Select
          name="course"
          placeholder="কোর্স নির্বাচন করুন"
          isRequired
          selectedKey={course}
          onSelectionChange={setCourse}
        >
          <Label>কোর্স</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {courses.map((c) => (
                <ListBox.Item key={c._id} id={c.name} textValue={c.name}>
                  {c.name}
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
          <FieldError />
        </Select>
      )}

      {/* Name */}
      <TextField
        name="name"
        isRequired
        validate={(v) => (!v?.trim() ? "নাম আবশ্যক" : null)}
      >
        <Label>নাম</Label>
        <Input placeholder="আপনার পূর্ণ নাম" />
        <FieldError />
      </TextField>

      {/* Phone */}
      <TextField
        name="phone"
        type="tel"
        isRequired
        validate={(v) => {
          if (!v?.trim()) return "ফোন নম্বর আবশ্যক";
          if (!/^[0-9+\-\s]+$/.test(v))
            return "শুধুমাত্র সংখ্যা ও + চিহ্ন ব্যবহার করুন";
          return null;
        }}
      >
        <Label>ফোন</Label>
        <Input placeholder="+880 1XXX-XXXXXX" />
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

      {/* Age */}
      <TextField
        name="age"
        type="number"
        isRequired
        validate={(v) => {
          if (!v?.trim()) return "বয়স আবশ্যক";
          const n = parseInt(v);
          if (isNaN(n) || n < 1 || n > 120) return "সঠিক বয়স দিন";
          return null;
        }}
      >
        <Label>বয়স</Label>
        <Input placeholder="25" />
        <FieldError />
      </TextField>

      {/* Country */}
      <TextField
        name="country"
        isRequired
        validate={(v) => (!v?.trim() ? "দেশ আবশ্যক" : null)}
      >
        <Label>দেশ</Label>
        <Input placeholder="Germany" />
        <FieldError />
      </TextField>

      {/* Message */}
      <TextField name="message">
        <Label>বার্তা (optional)</Label>
        <TextArea placeholder="আপনার প্রশ্ন বা মন্তব্য" rows={4} />
      </TextField>

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 disabled:opacity-50"
      >
        {loading ? "পাঠানো হচ্ছে..." : "পাঠান"}
      </Button>
    </Form>
  );
}