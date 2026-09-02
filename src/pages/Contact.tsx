import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, MessageSquare, FileText, Phone, MapPin } from "lucide-react";
import bannerImage from "@/assets/detail-meadow-1.jpg";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent",
      description: "We'll get back to you as soon as possible.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />

      {/* Hero Image with Parallax */}
      <div className="relative w-full h-[50vh] overflow-hidden">
        <motion.img
          src={bannerImage}
          alt="Contact banner"
          style={{ y }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <main className="py-24 lg:py-32 px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-12">
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground mb-4 block">
              Contact
            </span>
            <h1 className="editorial-serif text-3xl md:text-4xl tracking-tight text-foreground mb-4">
              Start a Conversation
            </h1>
            <p className="text-sm leading-6 text-muted-foreground">
              Have a legal matter you’d like to discuss? Share the outline and we’ll help determine the right next step.
            </p>

            <div className="mt-7 flex flex-col items-center gap-2.5 text-[13px] text-muted-foreground">
              <a href="tel:+17146900007" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
                <Phone className="h-3.5 w-3.5" />
                +1 714-690-0007
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=6301+Beach+Blvd%2C+Buena+Park%2C+CA+90621"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <MapPin className="h-3.5 w-3.5" />
                6301 Beach Blvd, Buena Park, CA 90621
              </a>
            </div>
          </div>

          <Card className="p-8 lg:p-10 shadow-soft border border-border bg-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="flex items-center gap-1.5 mb-3 text-card-foreground text-[11px] uppercase tracking-wider font-normal">
                  <User className="h-3 w-3" />
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  className="rounded-md text-sm font-light"
                />
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center gap-1.5 mb-3 text-card-foreground text-[11px] uppercase tracking-wider font-normal">
                  <Mail className="h-3 w-3" />
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={255}
                  className="rounded-md text-sm font-light"
                />
              </div>

              <div>
                <Label htmlFor="subject" className="flex items-center gap-1.5 mb-3 text-card-foreground text-[11px] uppercase tracking-wider font-normal">
                  <MessageSquare className="h-3 w-3" />
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  maxLength={200}
                  className="rounded-md text-sm font-light"
                />
              </div>

              <div>
                <Label htmlFor="message" className="flex items-center gap-1.5 mb-3 text-card-foreground text-[11px] uppercase tracking-wider font-normal">
                  <FileText className="h-3 w-3" />
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={1000}
                  rows={5}
                  className="rounded-md resize-none text-sm font-light"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-[11px] uppercase tracking-wider font-normal"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
