import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clock, LoaderCircle, Phone } from "lucide-react";

type GHLCalendarProps = {
  locale?: "en" | "ko";
};

type AvailabilityDays = Record<string, { slots?: string[] } | string[]>;

export const GHL_CALENDAR_ID = "GpAHipyEcevlPgeso3ZO";
export const GHL_LOCATION_ID = "gfYUTFnb4HXoCMB4p3Xk";
const PACIFIC_TIMEZONE = "America/Los_Angeles";
const VIBE_API_URL = "https://backend.leadconnectorhq.com/vibe-ai";
const PUBLIC_CALENDAR_BASE = "https://backend.leadconnectorhq.com/calendars";
const BUSINESS_OPEN_MINUTES = 8 * 60;
const BUSINESS_CLOSE_MINUTES = 17 * 60;

const pad = (value: number) => String(value).padStart(2, "0");
const dateKey = (date: Date) => `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
const fromDateKey = (key: string) => {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 12));
};
const firstOfMonth = (key: string) => {
  const date = fromDateKey(key);
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1, 12));
};
const shiftMonth = (date: Date, offset: number) => new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + offset, 1, 12));
const sameMonth = (a: Date, b: Date) => a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth();

const pacificTodayKey = () => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: PACIFIC_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const get = (type: "year" | "month" | "day") => parts.find((part) => part.type === type)?.value || "";
  return `${get("year")}-${get("month")}-${get("day")}`;
};

const buildMonthGrid = (month: Date) => {
  const first = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth(), 1, 12));
  const last = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + 1, 0, 12));
  const gridStart = new Date(first);
  gridStart.setUTCDate(first.getUTCDate() - first.getUTCDay());
  const gridEnd = new Date(last);
  gridEnd.setUTCDate(last.getUTCDate() + (6 - last.getUTCDay()));

  const days: Date[] = [];
  for (const cursor = new Date(gridStart); cursor <= gridEnd; cursor.setUTCDate(cursor.getUTCDate() + 1)) {
    days.push(new Date(cursor));
  }
  return days;
};

const monthRange = (month: Date) => ({
  startDate: Date.UTC(month.getUTCFullYear(), month.getUTCMonth(), 1, 0, 0, 0),
  endDate: Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + 1, 0, 23, 59, 59),
});

const getSlotsForDate = (days: AvailabilityDays, key: string) => {
  const day = days[key];
  if (!day) return [];
  if (Array.isArray(day)) return day;
  return Array.isArray(day.slots) ? day.slots : [];
};

const pacificMinutes = (slot: string) => {
  const date = new Date(slot);
  if (Number.isNaN(date.getTime())) return -1;
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: PACIFIC_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? -1);
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? -1);
  return hour >= 0 && minute >= 0 ? hour * 60 + minute : -1;
};

const withinBusinessHours = (slot: string) => {
  const minutes = pacificMinutes(slot);
  return minutes >= BUSINESS_OPEN_MINUTES && minutes < BUSINESS_CLOSE_MINUTES;
};

const filterAvailability = (days: AvailabilityDays): AvailabilityDays =>
  Object.fromEntries(
    Object.keys(days || {}).map((key) => [
      key,
      { slots: getSlotsForDate(days, key).filter(withinBusinessHours) },
    ]),
  );

const GHLCalendar = ({ locale = "en" }: GHLCalendarProps) => {
  const isKorean = locale === "ko";
  const todayKey = pacificTodayKey();
  const currentMonth = firstOfMonth(todayKey);
  const [month, setMonth] = useState(currentMonth);
  const [availability, setAvailability] = useState<AvailabilityDays>({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [booking, setBooking] = useState(false);
  const [bookedSlot, setBookedSlot] = useState("");
  const [error, setError] = useState("");
  const [details, setDetails] = useState({ firstName: "", lastName: "", email: "", phone: "", notes: "" });
  const [consent, setConsent] = useState(false);

  const calendarDays = useMemo(() => buildMonthGrid(month), [month]);
  const monthLabel = new Intl.DateTimeFormat(isKorean ? "ko-KR" : "en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(month);

  const dayFormatter = new Intl.DateTimeFormat(isKorean ? "ko-KR" : "en-US", {
    month: "short",
    day: "numeric",
    weekday: "long",
    timeZone: "UTC",
  });

  const timeFormatter = new Intl.DateTimeFormat(isKorean ? "ko-KR" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: PACIFIC_TIMEZONE,
  });

  const weekdays = isKorean ? ["일", "월", "화", "수", "목", "금", "토"] : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    let active = true;
    const { startDate, endDate } = monthRange(month);
    setLoading(true);
    setLoadError(false);
    setError("");
    setSelectedDate("");
    setSelectedSlot("");

    fetch(
      `${PUBLIC_CALENDAR_BASE}/${GHL_CALENDAR_ID}/free-slots?startDate=${startDate}&endDate=${endDate}&timezone=${encodeURIComponent(PACIFIC_TIMEZONE)}`,
    )
      .then(async (response) => {
        if (!response.ok) throw new Error(`Availability request failed (${response.status})`);
        return response.json() as Promise<AvailabilityDays>;
      })
      .then((rawDays) => {
        if (!active) return;
        const days = filterAvailability(rawDays || {});
        setAvailability(days);
        const firstAvailable = Object.keys(days)
          .sort()
          .find((key) => key >= todayKey && getSlotsForDate(days, key).length > 0);
        if (firstAvailable) setSelectedDate(firstAvailable);
      })
      .catch((caught) => {
        console.error("HighLevel public calendar availability failed:", caught);
        if (active) setLoadError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [month, todayKey]);

  if (bookedSlot) {
    return (
      <div className="rounded-[3px] bg-[#f9f8f6] p-7 text-[#1e1c1a] md:p-10">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2b241e] text-[#f3eee5]">
          <Check className="h-4 w-4" />
        </div>
        <div className="mt-7 max-w-[590px]">
          <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#1e1c1a]/38">
            {isKorean ? "예약 완료" : "Consultation booked"}
          </span>
          <h3 className="editorial-serif mt-3 text-[clamp(2rem,3.2vw,3.3rem)] leading-[0.98] tracking-[-0.025em]">
            {isKorean ? "상담 일정이 예약되었습니다." : "Your consultation is on the calendar."}
          </h3>
          <p className="mt-5 text-[14px] leading-6 text-[#1e1c1a]/58">
            {dayFormatter.format(new Date(bookedSlot))} · {timeFormatter.format(new Date(bookedSlot))} PT
          </p>
          <p className="mt-2 text-[13px] leading-6 text-[#1e1c1a]/48">
            {isKorean
              ? "입력하신 연락처로 예약 확인 및 필요한 안내가 전송됩니다."
              : "A booking confirmation and any appointment instructions will be sent to the contact information you provided."}
          </p>
        </div>
      </div>
    );
  }

  const slots = selectedDate ? getSlotsForDate(availability, selectedDate) : [];
  const canGoBack = month > currentMonth;

  const handleBook = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedSlot || !consent || booking) return;
    setBooking(true);
    setError("");

    try {
      const response = await fetch(`${VIBE_API_URL}/booking/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locationId: GHL_LOCATION_ID,
          calendarId: GHL_CALENDAR_ID,
          firstName: details.firstName.trim(),
          lastName: details.lastName.trim(),
          email: details.email.trim(),
          phone: details.phone.trim(),
          notes: details.notes.trim(),
          selectedSlot,
          selectedTimezone: PACIFIC_TIMEZONE,
          sessionId: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        console.error("HighLevel public booking failed:", response.status, payload);
        throw new Error("BOOKING_FAILED");
      }

      setBookedSlot(selectedSlot);
    } catch (caught) {
      console.error("HighLevel public booking error:", caught);
      setError(
        isKorean
          ? "예약을 완료할 수 없습니다. 다른 시간을 선택하거나 잠시 후 다시 시도해 주세요."
          : "We couldn't complete the booking. Please choose another time or try again shortly.",
      );
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-[3px] bg-[#f9f8f6] text-[#1e1c1a]">
      <div className="grid xl:grid-cols-[1.02fr_0.98fr]">
        <div className="border-b border-[#1e1c1a]/10 p-5 md:p-7 xl:border-b-0 xl:border-r">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-[#1e1c1a]/38">
                {isKorean ? "01 · 날짜" : "01 · Date"}
              </span>
              <div className="mt-1 text-[15px] font-medium">{monthLabel}</div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => canGoBack && setMonth((value) => shiftMonth(value, -1))}
                disabled={!canGoBack || loading}
                className="flex h-9 w-9 items-center justify-center border border-[#1e1c1a]/10 disabled:opacity-25"
                aria-label={isKorean ? "이전 달" : "Previous month"}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setMonth((value) => shiftMonth(value, 1))}
                disabled={loading}
                className="flex h-9 w-9 items-center justify-center border border-[#1e1c1a]/10"
                aria-label={isKorean ? "다음 달" : "Next month"}
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-7 gap-y-2">
            {weekdays.map((day) => (
              <div key={day} className="pb-2 text-center text-[9px] font-medium uppercase tracking-[0.08em] text-[#1e1c1a]/32">
                {day}
              </div>
            ))}
            {calendarDays.map((day) => {
              const key = dateKey(day);
              const inMonth = sameMonth(day, month);
              const daySlots = getSlotsForDate(availability, key);
              const available = inMonth && key >= todayKey && daySlots.length > 0;
              const selected = key === selectedDate;
              return (
                <button
                  type="button"
                  key={key}
                  disabled={!available || loading}
                  onClick={() => {
                    setSelectedDate(key);
                    setSelectedSlot("");
                    setError("");
                  }}
                  className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full text-[12px] transition-colors ${
                    selected
                      ? "bg-[#2b241e] text-[#f3eee5]"
                      : available
                        ? "text-[#1e1c1a] hover:bg-[#2b241e]/8"
                        : inMonth
                          ? "text-[#1e1c1a]/22"
                          : "text-[#1e1c1a]/10"
                  }`}
                >
                  {day.getUTCDate()}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-[#1e1c1a]/10 pt-4 text-[10px] text-[#1e1c1a]/38">
            <span>{isKorean ? "오전 8시–오후 5시 예약 가능" : "Booking window · 8:00 AM–5:00 PM"}</span>
            <span>Pacific Time</span>
          </div>
        </div>

        <div className="bg-[#f1eee8] p-5 md:p-7">
          {loading ? (
            <div className="flex min-h-[360px] items-center justify-center text-[#1e1c1a]/42">
              <LoaderCircle className="h-5 w-5 animate-spin" />
            </div>
          ) : loadError ? (
            <div className="flex min-h-[360px] flex-col justify-center">
              <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-[#1e1c1a]/38">
                {isKorean ? "예약 연결" : "Calendar connection"}
              </span>
              <h3 className="editorial-serif mt-3 max-w-[340px] text-[1.9rem] leading-[1.02] tracking-[-0.02em]">
                {isKorean ? "예약 가능 시간을 불러오지 못했습니다." : "We couldn't load the available times."}
              </h3>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-6 inline-flex w-fit items-center gap-2 border border-[#1e1c1a]/14 bg-[#f9f8f6] px-4 py-3 text-[11px] font-medium"
              >
                {isKorean ? "다시 시도" : "Try again"}
              </button>
              <a href="tel:+17146900007" className="mt-4 inline-flex w-fit items-center gap-2 text-[10px] text-[#1e1c1a]/46">
                <Phone className="h-3 w-3" /> 714-690-0007
              </a>
            </div>
          ) : selectedDate ? (
            <div>
              <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-[#1e1c1a]/38">
                {isKorean ? "02 · 시간" : "02 · Time"}
              </span>
              <h3 className="editorial-serif mt-2 text-[1.65rem] leading-none tracking-[-0.02em]">
                {dayFormatter.format(fromDateKey(selectedDate))}
              </h3>

              <div className="mt-5 grid max-h-[250px] grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
                {slots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => {
                      setSelectedSlot(slot);
                      setError("");
                    }}
                    className={`flex items-center justify-center gap-2 border px-3 py-3 text-[11px] transition-colors ${
                      selectedSlot === slot
                        ? "border-[#2b241e] bg-[#2b241e] text-[#f3eee5]"
                        : "border-[#1e1c1a]/10 bg-[#f9f8f6] hover:border-[#1e1c1a]/28"
                    }`}
                  >
                    <Clock className="h-3 w-3" />
                    {timeFormatter.format(new Date(slot))}
                  </button>
                ))}
              </div>

              {selectedSlot ? (
                <form onSubmit={handleBook} className="mt-7 border-t border-[#1e1c1a]/10 pt-6">
                  <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-[#1e1c1a]/38">
                    {isKorean ? "03 · 연락처" : "03 · Your details"}
                  </span>
                  <div className="mt-4 space-y-2.5">
                    <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                      <input
                        required
                        name="first_name"
                        autoComplete="given-name"
                        value={details.firstName}
                        onChange={(event) => setDetails((value) => ({ ...value, firstName: event.target.value }))}
                        placeholder={isKorean ? "이름" : "First name"}
                        className="h-11 w-full border border-[#1e1c1a]/10 bg-[#f9f8f6] px-3.5 text-[12px] outline-none transition-colors placeholder:text-[#1e1c1a]/30 focus:border-[#1e1c1a]/35"
                      />
                      <input
                        required
                        name="last_name"
                        autoComplete="family-name"
                        value={details.lastName}
                        onChange={(event) => setDetails((value) => ({ ...value, lastName: event.target.value }))}
                        placeholder={isKorean ? "성" : "Last name"}
                        className="h-11 w-full border border-[#1e1c1a]/10 bg-[#f9f8f6] px-3.5 text-[12px] outline-none transition-colors placeholder:text-[#1e1c1a]/30 focus:border-[#1e1c1a]/35"
                      />
                    </div>
                    <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                      <input
                        required
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={details.email}
                        onChange={(event) => setDetails((value) => ({ ...value, email: event.target.value }))}
                        placeholder={isKorean ? "이메일" : "Email"}
                        className="h-11 w-full border border-[#1e1c1a]/10 bg-[#f9f8f6] px-3.5 text-[12px] outline-none transition-colors placeholder:text-[#1e1c1a]/30 focus:border-[#1e1c1a]/35"
                      />
                      <input
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        value={details.phone}
                        onChange={(event) => setDetails((value) => ({ ...value, phone: event.target.value }))}
                        placeholder={isKorean ? "전화번호" : "Phone"}
                        className="h-11 w-full border border-[#1e1c1a]/10 bg-[#f9f8f6] px-3.5 text-[12px] outline-none transition-colors placeholder:text-[#1e1c1a]/30 focus:border-[#1e1c1a]/35"
                      />
                    </div>
                    <textarea
                      value={details.notes}
                      onChange={(event) => setDetails((value) => ({ ...value, notes: event.target.value }))}
                      placeholder={isKorean ? "추가 메모 (선택 사항)" : "Additional notes (optional)"}
                      className="min-h-[76px] w-full resize-none border border-[#1e1c1a]/10 bg-[#f9f8f6] px-3.5 py-3 text-[12px] outline-none transition-colors placeholder:text-[#1e1c1a]/30 focus:border-[#1e1c1a]/35"
                    />
                    <label className="flex cursor-pointer items-start gap-3 pt-1 text-[10px] leading-5 text-[#1e1c1a]/48">
                      <input
                        required
                        type="checkbox"
                        checked={consent}
                        onChange={(event) => setConsent(event.target.checked)}
                        className="mt-1 h-3.5 w-3.5 accent-[#2b241e]"
                      />
                      <span>
                        {isKorean
                          ? "이 상담과 관련된 전화, 문자 및 이메일 안내를 받는 데 동의합니다."
                          : "I agree to receive appointment-related calls, texts, and emails about this consultation."}
                      </span>
                    </label>
                  </div>

                  {error ? <p className="mt-3 text-[11px] leading-5 text-[#8f3d31]">{error}</p> : null}

                  <button
                    type="submit"
                    disabled={booking || !consent}
                    className="mt-5 flex w-full items-center justify-center gap-2 bg-[#2b241e] px-5 py-3.5 text-[11px] font-medium text-[#f3eee5] transition-opacity disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    {booking ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> : null}
                    {booking
                      ? isKorean ? "예약 중..." : "Booking..."
                      : isKorean ? "상담 예약" : "Book consultation"}
                  </button>
                </form>
              ) : (
                <p className="mt-6 max-w-[360px] text-[11px] leading-5 text-[#1e1c1a]/42">
                  {isKorean ? "가능한 시간을 선택하면 연락처 입력 단계가 열립니다." : "Choose an available time to continue with your contact details."}
                </p>
              )}
            </div>
          ) : (
            <div className="flex min-h-[360px] flex-col justify-center">
              <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-[#1e1c1a]/38">
                {isKorean ? "이번 달" : "This month"}
              </span>
              <h3 className="editorial-serif mt-3 max-w-[330px] text-[1.9rem] leading-[1.02] tracking-[-0.02em]">
                {isKorean ? "현재 표시할 수 있는 상담 시간이 없습니다." : "No consultation times are showing for this month."}
              </h3>
              <button
                type="button"
                onClick={() => setMonth((value) => shiftMonth(value, 1))}
                className="mt-6 inline-flex w-fit items-center gap-2 text-[11px] font-medium"
              >
                {isKorean ? "다음 달 보기" : "View next month"}<ArrowRight className="h-3.5 w-3.5" />
              </button>
              <a href="tel:+17146900007" className="mt-4 inline-flex w-fit items-center gap-2 text-[10px] text-[#1e1c1a]/46">
                <Phone className="h-3 w-3" /> 714-690-0007
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GHLCalendar;
