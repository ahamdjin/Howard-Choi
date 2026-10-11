import { useRef, useState, type FormEvent } from "react";
import { Camera, CheckCircle2, Info, Star, X } from "lucide-react";
import { brand } from "@/data/injurySite";

const MAX_PHOTO_BYTES = 2 * 1024 * 1024;
const GOOGLE_REVIEW_URL = "https://g.page/r/Cfv270Dk3LHdEAI/review";

export default function ReviewPage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [error, setError] = useState("");
  const photoInput = useRef<HTMLInputElement>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!rating || !comment.trim() || (!name.trim() && !email.trim()) || status === "saving") { setError("Please enter a name or email address."); return; }
    setStatus("saving");
    setError("");
    try {
      let encodedPhoto: { name: string; type: string; data: string } | null = null;
      if (photo) {
        const data = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
          reader.onerror = reject;
          reader.readAsDataURL(photo);
        });
        encodedPhoto = { name: photo.name, type: photo.type, data };
      }
      const response = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment: comment.trim(), name: name.trim(), email: email.trim(), photo: encodedPhoto }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We couldn’t send your feedback right now. Please try again.");
      setStatus("saved");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We couldn’t send your feedback right now. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <main className="relative flex min-h-[calc(100vh-14px)] items-center justify-center bg-[#e8eaed] px-3 py-8 font-sans text-[#202124] sm:px-5">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-35" style={{ backgroundImage: "linear-gradient(32deg,transparent 47%,#c2c7cc 48%,#c2c7cc 49%,transparent 50%),linear-gradient(112deg,transparent 47%,#d4d8db 48%,#d4d8db 49%,transparent 50%)", backgroundSize: "155px 105px, 200px 120px" }} />
      <div className="relative w-full max-w-[524px] overflow-hidden rounded-[24px] bg-white shadow-[0_16px_55px_rgba(32,33,36,.25)]">
        <header className="relative flex h-[64px] items-center justify-center border-b border-[#f1f3f4] px-12 text-center text-[14px] font-medium">
          {brand.name}
          <a aria-label="Close review page" href="/" className="absolute right-5 rounded-full p-2 text-[#5f6368] hover:bg-[#f1f3f4]"><X size={19}/></a>
        </header>
        {status === "saved" ? (
          <section className="px-7 py-14 text-center sm:px-8">
            <CheckCircle2 size={43} className="mx-auto mb-4 text-[#188038]"/>
            <h1 className="text-[22px] font-medium">Thank you for your feedback</h1>
            <p className="mx-auto mt-3 max-w-[360px] text-[14px] leading-6 text-[#5f6368]">Your feedback has been shared with our team.</p>
          </section>
        ) : (
          <form id="website-review-form" name="Website Review" data-form-name="Website Review" data-external-form="highlevel" onSubmit={submit} className="px-[28px] pb-[26px] pt-[25px] sm:px-[30px]">
            <div className="flex items-center gap-3">
              <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#deede6] text-[15px] font-semibold text-[#137333]">{(name.trim()[0] || "G").toUpperCase()}</div>
              <div><div className="text-[15px] font-medium">{name.trim() || "Guest reviewer"}</div><div className="flex items-center gap-1 text-[12px] text-[#5f6368]">Feedback shared with the firm <Info size={13}/></div></div>
            </div>
            <input type="hidden" name="review_rating" value={rating || ""} readOnly />
            <fieldset className="mt-[27px]">
              <legend className="sr-only">Rate your experience</legend>
              <div className="flex justify-center gap-[15px] sm:gap-[17px]" onMouseLeave={() => setHover(0)}>
                {[1,2,3,4,5].map((n) => <button key={n} type="button" aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`} aria-pressed={rating === n} onMouseEnter={() => setHover(n)} onFocus={() => setHover(n)} onBlur={() => setHover(0)} onClick={() => { setRating(n); if (n >= 4) window.location.assign(GOOGLE_REVIEW_URL); }} className="rounded-sm p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1a73e8]"><Star className={n <= (hover || rating) ? "fill-[#fbbc04] text-[#fbbc04]" : "fill-none text-[#80868b]"} size={29} strokeWidth={1.8}/></button>)}
              </div>
            </fieldset>
            <label htmlFor="review-comment" className="sr-only">Your feedback</label>
            <textarea id="review-comment" name="review_feedback" required maxLength={5000} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share details of your own experience at this place" className="mt-[27px] h-[95px] w-full resize-y rounded-[4px] border border-[#80868b] bg-white px-[13px] py-[12px] text-[14px] leading-[21px] outline-none placeholder:text-[#5f6368] focus:border-2 focus:border-[#1a73e8]"/>
            <input name="review_attachment" ref={photoInput} type="file" className="hidden" accept="image/jpeg,image/png,image/webp" onChange={(e) => {const file = e.target.files?.[0]; setPhotoError(""); if (file && file.size > MAX_PHOTO_BYTES) {setPhoto(null); setPhotoError("Photo must be under 2 MB."); return;} setPhoto(file || null);}} />
            <button type="button" onClick={() => photoInput.current?.click()} className="mt-[13px] flex h-[41px] w-full items-center justify-center gap-2 rounded-full bg-[#303442] text-[13px] font-semibold text-white hover:bg-[#242733]"><Camera size={17} className="text-[#8ab4f8]"/>{photo ? photo.name : "Add a photo (optional)"}</button>
            {photo && <button type="button" className="mt-2 text-xs text-[#1a73e8]" onClick={() => {setPhoto(null); if (photoInput.current) photoInput.current.value = "";}}>Remove photo</button>}
            {photoError && <p role="alert" className="mt-2 text-xs text-red-700">{photoError}</p>}
            {rating > 0 && <><div className="mt-5 grid grid-cols-2 gap-3"><label className="text-xs text-[#5f6368]">Name<input name="full_name" maxLength={120} value={name} onChange={(e)=>setName(e.target.value)} className="mt-1 w-full rounded border border-[#dadce0] p-2 text-sm text-[#202124]" autoComplete="name"/></label><label className="text-xs text-[#5f6368]">Email<input name="email" type="email" maxLength={254} value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 w-full rounded border border-[#dadce0] p-2 text-sm text-[#202124]" autoComplete="email"/></label></div>
            <p className="mt-3 text-[11px] leading-5 text-[#5f6368]">Enter your name or email so we can follow up if needed.</p></>}
            {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
            <footer className="mt-5 flex flex-wrap items-center justify-end gap-3">

              <a href="/" className="rounded border border-[#dadce0] px-4 py-2 text-[13px] text-[#1a73e8]">Cancel</a>
              <button type="submit" disabled={!rating || !comment.trim() || (!name.trim() && !email.trim()) || status === "saving"} className="rounded bg-[#1a73e8] px-5 py-2 text-[13px] font-medium text-white disabled:cursor-not-allowed disabled:bg-[#e8eaed] disabled:text-[#9aa0a6]">{status === "saving" ? "Sending…" : "Send feedback"}</button>
            </footer>
          </form>
        )}
      </div>
    </main>
  );
}
