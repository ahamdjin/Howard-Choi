import { useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CalendarDays, Clock, Mail, MapPin, Phone } from "lucide-react";
import { format } from "date-fns";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import heroCityBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";

const timeSlots = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"];

const Contact = () => {
  const { toast } = useToast();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 90]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const openEmail = (subject: string, body: string) => {
    window.location.href = `mailto:hello@howardchoilaw.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleMessageSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    openEmail(
      formData.subject || "Website inquiry",
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
  };

  const handleConsultationRequest = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Choose a date and time",
        description: "Select a preferred consultation window first.",
      });
      return;
    }

    openEmail(
      "Consultation request",
      `Preferred consultation: ${format(selectedDate, "EEEE, MMMM d, yyyy")} at ${selectedTime} PT\n\nPlease confirm availability.`
    );
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Navigation />

      <section className="relative flex h-[54svh] min-h-[460px] items-end overflow-hidden bg-[#17130f] text-[#f3eee5]">
        <motion.img
          src={heroCityBoardroom}
          alt="Private law firm conference room"
          style={{ y: heroY }}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-[112%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#17130f]/64" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17130f]/78 via-transparent to-[#17130f]/12" />

        <div className="site-shell relative z-10 pb-12 md:pb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72 }}
            className="max-w-[700px]"
          >
            <span className="mb-4 block text-[11px] text-[#f3eee5]/62">Contact</span>
            <h1 className="editorial-serif text-[clamp(2.75rem,4.15vw,4.25rem)] leading-[0.95] tracking-[-0.024em]">
              Start with a clear conversation.
            </h1>
            <p className="mt-5 max-w-[540px] text-[14px] leading-6 text-[#f3eee5]/68 md:text-[15px]">
              Share the outline of your matter or choose a preferred consultation time. We’ll confirm fit, conflicts, and availability before moving forward.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="site-shell py-16 md:py-20 lg:py-24">
        <div className="mb-12 grid gap-8 border-b border-foreground/10 pb-9 md:grid-cols-3">
          <a href="tel:+17146900007" className="group border-t border-foreground/10 pt-5 md:border-t-0 md:pt-0">
            <Phone className="mb-4 h-4 w-4 text-muted-foreground" />
            <div className="text-[11px] text-muted-foreground">Phone</div>
            <div className="mt-2 text-[15px] transition-opacity group-hover:opacity-60">+1 714-690-0007</div>
          </a>
          <a href="mailto:hello@howardchoilaw.com" className="group border-t border-foreground/10 pt-5 md:border-t-0 md:pt-0">
            <Mail className="mb-4 h-4 w-4 text-muted-foreground" />
            <div className="text-[11px] text-muted-foreground">Email</div>
            <div className="mt-2 text-[15px] transition-opacity group-hover:opacity-60">hello@howardchoilaw.com</div>
          </a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=6301+Beach+Blvd%2C+Buena+Park%2C+CA+90621"
            target="_blank"
            rel="noreferrer"
            className="group border-t border-foreground/10 pt-5 md:border-t-0 md:pt-0"
          >
            <MapPin className="mb-4 h-4 w-4 text-muted-foreground" />
            <div className="text-[11px] text-muted-foreground">Office</div>
            <div className="mt-2 max-w-[260px] text-[15px] leading-6 transition-opacity group-hover:opacity-60">
              6301 Beach Blvd, Buena Park, CA 90621
            </div>
          </a>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.68 }}
            className="rounded-[4px] bg-[#e9e6e1] p-7 md:p-9"
          >
            <span className="text-[11px] text-foreground/48">Send a note</span>
            <h2 className="editorial-serif mt-3 text-[clamp(2.1rem,3vw,3.2rem)] leading-[0.98] tracking-[-0.022em]">
              Tell us what needs attention.
            </h2>
            <p className="mt-4 max-w-[470px] text-[14px] leading-6 text-foreground/58">
              A short outline is enough. Avoid sending confidential or time-sensitive information until an attorney-client relationship has been confirmed.
            </p>

            <form onSubmit={handleMessageSubmit} className="mt-8 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Name"
                  className="h-12 rounded-[2px] border-foreground/10 bg-background/70 px-4 text-[13px] shadow-none"
                />
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                  className="h-12 rounded-[2px] border-foreground/10 bg-background/70 px-4 text-[13px] shadow-none"
                />
              </div>
              <Input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Subject"
                className="h-12 rounded-[2px] border-foreground/10 bg-background/70 px-4 text-[13px] shadow-none"
              />
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="A brief outline of the matter"
                rows={7}
                className="resize-none rounded-[2px] border-foreground/10 bg-background/70 p-4 text-[13px] leading-6 shadow-none"
              />
              <button type="submit" className="liquid-cta mt-2 inline-flex rounded-full px-6 py-3 text-[12px] font-medium">
                <span className="relative z-10">Send inquiry</span>
              </button>
            </form>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.16 }}
            transition={{ duration: 0.68, delay: 0.06 }}
            className="rounded-[4px] bg-[#1a1714] p-7 text-[#f3eee5] md:p-9"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <span className="text-[11px] text-[#f3eee5]/42">Consultation</span>
                <h2 className="editorial-serif mt-3 max-w-[500px] text-[clamp(2.1rem,3vw,3.2rem)] leading-[0.98] tracking-[-0.022em]">
                  Choose a preferred time.
                </h2>
              </div>
              <CalendarDays className="mt-1 h-5 w-5 text-[#f3eee5]/42" />
            </div>
            <p className="mt-4 max-w-[500px] text-[14px] leading-6 text-[#f3eee5]/52">
              Select a weekday and a preferred time. This is a request, not an instant booking — the office will confirm availability.
            </p>

            <div className="mt-7 grid gap-5 xl:grid-cols-[1fr_0.72fr]">
              <div className="overflow-hidden rounded-[3px] bg-[#f4f1ec] p-2 text-[#211c17]">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < today || date.getDay() === 0 || date.getDay() === 6}
                  className="mx-auto w-fit"
                />
              </div>

              <div>
                <div className="mb-3 flex items-center gap-2 text-[11px] text-[#f3eee5]/46">
                  <Clock className="h-3.5 w-3.5" /> Pacific Time
                </div>
                <div className="grid grid-cols-2 gap-2 xl:grid-cols-1">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`rounded-[2px] border px-4 py-3 text-left text-[12px] transition-colors ${
                        selectedTime === time
                          ? "border-[#f3eee5] bg-[#f3eee5] text-[#211c17]"
                          : "border-[#f3eee5]/14 text-[#f3eee5]/68 hover:border-[#f3eee5]/36 hover:text-[#f3eee5]"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 border-t border-[#f3eee5]/12 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-[12px] text-[#f3eee5]/48">
                {selectedDate ? format(selectedDate, "EEE, MMM d, yyyy") : "Choose a date"}
                {selectedTime ? ` · ${selectedTime}` : ""}
              </div>
              <button type="button" onClick={handleConsultationRequest} className="liquid-cta inline-flex w-fit rounded-full px-6 py-3 text-[12px] font-medium">
                <span className="relative z-10">Request this time</span>
              </button>
            </div>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
