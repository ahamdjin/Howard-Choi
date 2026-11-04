import { Car, Truck, Bike, PersonStanding, Footprints, FileText, BriefcaseBusiness, MapPin } from "lucide-react";
import { locationMedia } from "@/data/locationMedia";
import { practiceMedia } from "@/data/practiceMedia";
import { additionalLocations, type AdditionalLocation } from "@/data/additionalLocations";
import { practiceAreas } from "@/data/injurySite";
import { EditorialFrame, EditorialHero, ReadingLayout, ReadingSectionBlock, ConsultationCta } from "@/pages/editorial/shared";
import heroImage from "@/assets/law-firm/hero-city-boardroom.webp";

const sectionIcons = {
  "car-accidents": Car, "truck-accidents": Truck, rideshare: Car,
  motorcycle: Bike, pedestrians: PersonStanding, falls: Footprints,
  records: FileText, work: BriefcaseBusiness,
};

export default function AdditionalLocationPage({ city }: { city: AdditionalLocation }) {
  const photo = locationMedia[city.slug];
  const sections = [
    ...city.sections.slice(1).map(({ id, title, label }) => ({ id, label: label || title })),
    { id: "services", label: "Practice area guides" },
    { id: "consultation", label: "Your consultation" },
    { id: "nearby", label: "Other communities" },
  ];
  return (
    <EditorialFrame locale="en">
      <main className="detail-guide">
        <EditorialHero locale="en" eyebrow={city.county + " · Service area"} title={city.heading ?? city.name + " Personal Injury & Car Accident Lawyer"} description={city.lead} image={photo?.src ?? heroImage} imageAlt={photo?.alt ?? "Illustrative law-office interior"} imageFallback={heroImage} detail />
        <section id="local" className="site-shell py-14 md:py-20">
          <MapPin aria-hidden="true" className="mb-4 h-6 w-6 text-[#755D46]" />
          <h2 className="editorial-serif max-w-3xl text-4xl">{city.sections[0].title}</h2>
          <div className="mt-7 grid gap-6 md:grid-cols-2">
            {city.sections[0].paragraphs.map(paragraph => <p key={paragraph} className="text-base leading-8">{paragraph}</p>)}
          </div>
        </section>
        <ReadingLayout locale="en" label={city.name + " injury guide"} sections={sections}>
          {city.sections.slice(1).map((section) => (
            <ReadingSectionBlock key={section.id} id={section.id} Icon={sectionIcons[section.id as keyof typeof sectionIcons]} kicker={city.name + " · Local guide"} locale="en" title={section.title}>
              {section.practice && practiceMedia[section.practice] && <img src={practiceMedia[section.practice].src} alt={practiceMedia[section.practice].alt} width={900} height={500} loading="lazy" className="mb-7 aspect-[16/9] w-full object-cover" />}
              {section.paragraphs.map((paragraph) => <p key={paragraph} className="mb-5 text-base leading-8">{paragraph}</p>)}
              {section.link && <a href={section.link.href} className="mb-6 inline-block underline underline-offset-4">{section.link.label} →</a>}
              {section.id === "records" && (
                <ul className="space-y-3">
                  {city.sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer" className="underline underline-offset-4">{source.label} ↗</a></li>)}
                </ul>
              )}
            </ReadingSectionBlock>
          ))}
          <ReadingSectionBlock id="services" kicker={city.name} locale="en" title={"Explore the practice area for your " + city.name + " injury"}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {practiceAreas.map((practice) => <li key={practice.slug}><a href={"/practice-areas/" + practice.slug} className="block border-b py-4 underline underline-offset-4">{practice.title}</a></li>)}
            </ul>
          </ReadingSectionBlock>
          <ReadingSectionBlock id="consultation" kicker={city.name} locale="en" title="Speak with Howard Choi">
            <p className="text-base leading-8">Howard serves {city.name} from the Buena Park office at 6301 Beach Blvd, Suite 216. Bring the incident details and available records to a free consultation. Ask which issues need investigation and what information would help clarify your next step.</p>
            <p className="mt-5 text-base leading-8">No fee unless there is a recovery. <a href="/about/zero-fee-guarantee" className="underline">Read the fee promise</a>, or <a href="/attorney" className="underline">get to know Howard</a> before calling.</p>
            <ConsultationCta locale="en" />
          </ReadingSectionBlock>
          <ReadingSectionBlock id="nearby" kicker={city.name} locale="en" title="Explore other communities">
            <div className="flex flex-wrap gap-5">{additionalLocations.filter((item) => item.slug !== city.slug).map((item) => <a href={"/locations/" + item.slug} key={item.slug} className="underline">{item.name}</a>)}<a href="/locations" className="underline">All locations</a></div>
          </ReadingSectionBlock>
        </ReadingLayout>
      </main>
    </EditorialFrame>
  );
}
