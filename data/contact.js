import { SOCIAL_LINKS } from "@/components/common/social-links";

export const CONTACT_DETAILS = {
  name: "Ranjit Jana",
  role: "Full Stack Developer & AI Engineer",
  email: "rjranjit099@gmail.com",
  phone: "+91 80018 01496",
  phoneHref: "tel:+918001801496",
  location: "Kolkata, India",
  resume: "/assets/cv/resume-ranjit-jana.pdf",
};

export const CONTACT_SOCIALS = SOCIAL_LINKS.filter((social) => social.external);
