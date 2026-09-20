import { trustProfile } from "@/data/trustProfile";

export default function ContentReviewLine({ className = "" }: { className?: string }) {
  const review = trustProfile.editorialReview;
  if (!review.enabled || !review.lastReviewed) return null;

  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] leading-5 text-foreground/50 ${className}`}>
      <span>
        Reviewed for legal accuracy by{" "}
        <a href="/attorney" className="font-medium text-foreground/75 underline underline-offset-3">
          {review.reviewer}
        </a>
      </span>
      <span aria-hidden="true">·</span>
      <span>California Bar No. {review.reviewerBarNumber}</span>
      <span aria-hidden="true">·</span>
      <span>Last reviewed {review.lastReviewed}</span>
    </div>
  );
}
