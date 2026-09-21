// app/contact/page.js
import ContactInfo from "@/components/shared/ContactInfo";

export const metadata = {
  title: "যোগাযোগ | মারকাজুল লিসান",
  description: "যেকোনো প্রশ্নে আমাদের সাথে যোগাযোগ করুন",
};

export default function ContactPage() {
  return (
    <section className="w-full bg-surface py-16 md:py-20 min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-3">
            যোগাযোগ
          </h1>
          <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto">
            যেকোনো প্রশ্নে আমাদের সাথে যোগাযোগ করুন
          </p>
        </div>

        <ContactInfo />
      </div>
    </section>
  );
}