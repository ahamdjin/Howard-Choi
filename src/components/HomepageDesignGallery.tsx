import logo from "@/assets/law-firm/howard-choi-logo.png";
import howardImage from "@/assets/law-firm/lead-counsel.avif";

const HomepageDesignGallery = () => (
  <div className="bg-[#171717]">
    <section className="relative mx-auto flex h-[94svh] min-h-[720px] max-h-[980px] w-full items-center justify-center overflow-hidden bg-[#161513] text-white">
      <img
        src={howardImage}
        alt="Howard Choi, California personal injury attorney"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 flex w-full max-w-[1180px] flex-col items-center px-6 text-center">
        <img
          src={logo}
          alt="Buena Park Injury Lawyer"
          className="h-auto w-[150px] brightness-0 invert md:w-[190px]"
        />
        <p className="mt-7 text-[9px] uppercase tracking-[0.22em] text-white/55">
          California personal injury attorney
        </p>
        <h2 className="editorial-serif mt-4 text-[clamp(3.7rem,8vw,8.2rem)] leading-[0.84] tracking-[-0.055em]">
          Howard Choi
        </h2>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          <span className="rounded-full border border-white/25 bg-black/20 px-4 py-2.5 text-[8px] uppercase tracking-[0.14em] text-white/75">
            Bar No. 284364
          </span>
          <span className="rounded-full border border-white/25 bg-black/20 px-4 py-2.5 text-[8px] uppercase tracking-[0.14em] text-white/75">
            English / Korean
          </span>
          <span className="rounded-full border border-white/25 bg-black/20 px-4 py-2.5 text-[8px] uppercase tracking-[0.14em] text-white/75">
            Free Consultation
          </span>
          <span className="rounded-full border border-white/25 bg-black/20 px-4 py-2.5 text-[8px] uppercase tracking-[0.14em] text-white/75">
            Contingency Fee
          </span>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <div className="flex h-[104px] w-[104px] flex-col items-center justify-center rounded-full border border-white/30 bg-black/20">
            <span className="text-[7px] uppercase tracking-[0.2em] text-white/40">Demo only</span>
            <span className="editorial-serif mt-1 text-[22px] leading-none">TOP</span>
            <span className="mt-1 text-[7px] uppercase tracking-[0.12em] text-white/55">Attorney</span>
          </div>
          <div className="flex h-[104px] w-[104px] flex-col items-center justify-center rounded-full border border-white/30 bg-black/20">
            <span className="text-[7px] uppercase tracking-[0.2em] text-white/40">Demo only</span>
            <span className="editorial-serif mt-1 text-[22px] leading-none">10.0</span>
            <span className="mt-1 text-[7px] uppercase tracking-[0.12em] text-white/55">Rating</span>
          </div>
          <div className="flex h-[104px] w-[104px] flex-col items-center justify-center rounded-full border border-white/30 bg-black/20">
            <span className="text-[7px] uppercase tracking-[0.2em] text-white/40">Demo only</span>
            <span className="editorial-serif mt-1 text-[22px] leading-none">2026</span>
            <span className="mt-1 text-[7px] uppercase tracking-[0.12em] text-white/55">Recognition</span>
          </div>
        </div>

        <p className="mt-3 text-[7px] uppercase tracking-[0.19em] text-white/30">
          Demo recognition marks for layout only
        </p>
      </div>
    </section>
  </div>
);

export default HomepageDesignGallery;
