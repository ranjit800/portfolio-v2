import ContactPage from "@/components/contact/ContactPage";

export const metadata = {
  title: "Contact | Ranjit Jana",
  description: "Contact Ranjit Jana, Full Stack Developer & AI Engineer in Kolkata. Get in touch about web development, AI products, and collaboration.",
};

export const dynamic = "force-dynamic";

export default function Page() {
  const canSend = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL);
  return <ContactPage canSend={canSend} />;
}
