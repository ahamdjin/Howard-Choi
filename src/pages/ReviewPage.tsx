import { useState, type FormEvent } from "react";
import { ArrowLeft, CheckCircle2, Info, Star, X } from "lucide-react";
import { brand } from "@/data/injurySite";

const GOOGLE_REVIEW_URL = "https://g.page/r/Cfv270Dk3LHdEAI/review";

export default function ReviewPage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!rating || !comment.trim() || (!name.trim() && !email.trim()) || status === "saving") { setError("Please enter a name or email address."); return; }
    setStatus("saving");
    setError("");
    // HighLevel External Tracking observes this native form submission,
    // matching the contact and calculator forms on the website.
    window.setTimeout(() => setStatus("saved"), 1500);
  };

  return (
    <main className="review-screen relative min-h-[100dvh] bg-white text-[#202124] md:flex md:items-center md:justify-center md:p-6">
      <style>{`@media (prefers-color-scheme: dark) {
        .review-screen { background:#202124!important; color:#e8eaed!important }
        .review-panel { background:#202124!important; color:#e8eaed!important }
        .review-muted { color:#bdc1c6!important }
        .review-input { background:#202124!important; color:#f1f3f4!important; border-color:#858a90!important }
        .review-postbar { background:#202124!important; border-color:#3c4043!important }
        .review-map-overlay { background:rgba(0,0,0,.65)!important }
      }`}</style>
      <div className="absolute inset-0 hidden overflow-hidden md:block" aria-hidden="true">
        <iframe tabIndex={-1} title="Buena Park map background" className="h-full w-full scale-[1.08] border-0" src="https://maps.google.com/maps?q=6301%20Beach%20Blvd%20Buena%20Park%20CA&t=m&z=16&ie=UTF8&iwloc=&output=embed" loading="lazy" />
        <div className="review-map-overlay pointer-events-none absolute inset-0 bg-[#202124]/35" />
      </div>
      <div className="review-panel relative mx-auto flex min-h-[100dvh] w-full flex-col bg-white md:min-h-[min(800px,90dvh)] md:max-w-[1100px] md:rounded-[36px] md:shadow-[0_24px_65px_rgba(0,0,0,.32)]">
        <header className="flex h-[72px] shrink-0 items-center gap-5 px-6 text-[18px] font-medium md:h-[110px] md:justify-center md:text-[28px]">
          <a href="/" aria-label="Go back" className="md:hidden"><ArrowLeft size={24}/></a>
          <span>{brand.name}</span>
        </header>
        {status === "saved" ? (
          <section className="flex flex-1 flex-col items-center justify-center px-7 py-14 text-center">
            <CheckCircle2 size={43} className="mx-auto mb-4 text-[#188038]"/>
            <h1 className="text-[22px] font-medium">Thank you for your feedback</h1>
            <p className="mx-auto mt-3 max-w-[360px] text-[14px] leading-6 text-[#5f6368]">Thank you for sharing your experience.</p>
          </section>
        ) : (
          <form id="website-review-form" name="Website Review" data-form-name="Website Review" data-external-form="highlevel" onSubmit={submit} className="flex flex-1 flex-col px-[30px] pt-[44px] md:px-[64px] md:pt-[34px]">
            <div className="flex items-center gap-5">
              <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full bg-[#1a73e8] text-[23px] font-semibold text-white md:h-[76px] md:w-[76px]">{(name.trim()[0] || "G").toUpperCase()}</div>
              <div><div className="text-[18px] font-medium md:text-[24px]">{name.trim() || "Guest reviewer"}</div><div className="review-muted flex items-center gap-1 text-[13px] text-[#5f6368] md:text-[17px]">Sharing feedback with Buena Park Injury Lawyer <Info size={13}/></div></div>
            </div>
            <fieldset className="mt-[44px]">
              <legend className="sr-only">Rate your experience</legend>
              <div className="flex justify-center gap-[18px] md:gap-[40px]" onMouseLeave={() => setHover(0)}>
                {[1,2,3,4,5].map((n) => <button key={n} type="button" aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`} aria-pressed={rating === n} onMouseEnter={() => setHover(n)} onFocus={() => setHover(n)} onBlur={() => setHover(0)} onClick={() => { setRating(n); if (n >= 4) window.location.assign(GOOGLE_REVIEW_URL); }} className="rounded-sm p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1a73e8]"><Star className={n <= (hover || rating) ? "fill-[#fbbc04] text-[#fbbc04]" : "fill-none text-[#80868b]"} size={36} strokeWidth={1.8}/></button>)}
              </div>
            </fieldset>
            {rating > 0 && (
              <label className="review-muted mt-4 flex items-center justify-center gap-2 text-[12px] text-[#5f6368]">
                Your rating
                <input
                  type="text"
                  name="review_rating"
                  aria-label="Review rating"
                  value={`${rating} Star`}
                  readOnly
                  className="review-input w-[80px] rounded border border-[#dadce0] bg-[#f8f9fa] px-2 py-1 text-center text-[12px] text-[#202124]"
                />
              </label>
            )}
            <label htmlFor="review-comment" className="sr-only">Your feedback</label>
            <textarea id="review-comment" name="review_feedback" required maxLength={5000} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share details of your own experience at this place" className="review-input mt-[48px] h-[170px] w-full resize-y rounded-[9px] border border-[#80868b] bg-white px-[26px] py-[26px] text-[17px] leading-[1.5] outline-none placeholder:text-[#5f6368] focus:border-2 focus:border-[#1a73e8] md:h-[208px] md:text-[23px]"/>
            <div className="mt-7 flex h-[60px] w-full items-center justify-center rounded-full bg-[#2e3342] text-[16px] font-semibold text-white md:h-[86px] md:text-[23px]">Add photos &amp; videos</div>
            {rating > 0 && <><div className="mt-6 grid grid-cols-2 gap-3"><label className="text-xs text-[#5f6368]">Name<input name="full_name" maxLength={120} value={name} onChange={(e)=>setName(e.target.value)} className="mt-1 w-full rounded border border-[#dadce0] p-2 text-sm text-[#202124]" autoComplete="name"/></label><label className="text-xs text-[#5f6368]">Email<input name="email" type="email" maxLength={254} value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 w-full rounded border border-[#dadce0] p-2 text-sm text-[#202124]" autoComplete="email"/></label></div>
            <p className="mt-3 text-[11px] leading-5 text-[#5f6368]">Enter your name or email so we can follow up if needed.</p></>}
            {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
            <footer className="review-postbar sticky bottom-0 mt-auto flex items-center justify-end gap-4 border-t border-[#f1f3f4] bg-white py-5 md:py-8">

              <a href="/" className="hidden rounded border border-[#dadce0] px-8 py-3 text-[18px] text-[#1a73e8] md:inline-flex">Cancel</a>
              <button type="submit" disabled={!rating || !comment.trim() || (!name.trim() && !email.trim()) || status === "saving"} className="w-full rounded-full bg-[#1a73e8] px-8 py-4 text-[17px] font-medium text-white disabled:cursor-not-allowed disabled:bg-[#e8eaed] disabled:text-[#9aa0a6] md:w-auto md:rounded-[8px] md:text-[20px]">{status === "saving" ? "Posting…" : "Post"}</button>
            </footer>
          </form>
        )}
      </div>
    </main>
  );
}
