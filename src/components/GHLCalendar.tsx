type GHLCalendarProps = {
  locale?: "en" | "ko";
};

export const GHL_CALENDAR_ID = "GpAHipyEcevlPgeso3ZO";
export const GHL_LOCATION_ID = "gfYUTFnb4HXoCMB4p3Xk";

const GHLCalendar = ({ locale = "en" }: GHLCalendarProps) => {
  const title = locale === "ko" ? "상담 예약 캘린더" : "Consultation booking calendar";

  return (
    <div className="overflow-hidden rounded-[3px] bg-[#f9f8f6]">
      <iframe
        src={`https://api.leadconnectorhq.com/widget/booking/${GHL_CALENDAR_ID}`}
        style={{ width: "100%", border: "none", overflow: "hidden" }}
        scrolling="no"
        id={`${GHL_CALENDAR_ID}_1789093000000`}
        title={title}
        data-calendar-id={GHL_CALENDAR_ID}
        data-location-id={GHL_LOCATION_ID}
        className="block min-h-[720px] w-full bg-[#f9f8f6] md:min-h-[760px]"
      />
    </div>
  );
};

export default GHLCalendar;
