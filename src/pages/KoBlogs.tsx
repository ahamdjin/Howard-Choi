import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import KoreanNavigation from "@/components/KoreanNavigation";
import KoreanFooter from "@/components/KoreanFooter";
import { koBlogPosts } from "@/data/koBlogs";
import heroJusticeLibrary from "@/assets/law-firm/hero-justice-library.webp";

const koSerif = { fontFamily: '"Noto Serif KR", serif' } as const;

const KoBlogs = () => {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 900], [0, 115]);
  const heroScale = useTransform(scrollY, [0, 900], [1, 1.025]);

  return (
    <div className="min-h-screen overflow-x-clip bg-background" style={{ fontFamily: '"Noto Sans KR", sans-serif' }}>
      <KoreanNavigation />

      <div className="relative">
        <div className="sticky top-0 h-[58svh] min-h-[500px] overflow-hidden bg-[#17130f] text-[#f3eee5]">
          <motion.img
            src={heroJusticeLibrary}
            alt="법률 서재와 정의의 여신상"
            style={{ y: imageY, scale: heroScale }}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-[116%] w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#17130f]/62" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17130f]/80 via-[#17130f]/12 to-[#17130f]/16" />

          <div className="site-shell relative z-10 flex h-full items-end pb-14 md:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72 }}
              className="max-w-[760px]"
            >
              <span className="mb-4 block text-[12px] text-[#f3eee5]/62">인사이트</span>
              <h1 style={koSerif} className="text-[clamp(2.65rem,4vw,4.15rem)] font-medium leading-[1.13] tracking-[-0.04em]">
                중요한 결정을 더 명확하게 만드는 법률 인사이트.
              </h1>
              <p className="mt-5 max-w-[560px] text-[15px] leading-7 text-[#f3eee5]/70">
                기업 법무, 분쟁, 계약, 리스크에 관한 실무적인 관점을 담았습니다. 복잡한 문제를 어렵게 설명하기보다, 다음 판단을 분명하게 만드는 데 집중합니다.
              </p>
            </motion.div>
          </div>
        </div>

        <main className="relative z-10 bg-background py-16 md:py-20 lg:py-24">
          <div className="site-shell">
            <div className="mb-10 flex items-end justify-between border-b border-foreground/12 pb-5">
              <div>
                <span className="text-[11px] text-muted-foreground">최근 글</span>
                <h2 style={koSerif} className="mt-2 text-[clamp(1.9rem,2.6vw,2.75rem)] font-medium leading-[1.15] tracking-[-0.035em]">
                  선별된 법률 노트
                </h2>
              </div>
              <span className="hidden text-[11px] text-muted-foreground sm:block">총 {koBlogPosts.length}개 글</span>
            </div>

            <div className="divide-y divide-foreground/12">
              {koBlogPosts.map((post, index) => {
                const reverse = index % 2 === 1;

                return (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.18 }}
                    transition={{ duration: 0.68, delay: index * 0.06 }}
                    className="py-8 md:py-10 lg:py-12"
                  >
                    <Link
                      to={`/ko/blogs/${post.slug}`}
                      className={`group grid gap-7 lg:grid-cols-2 lg:items-stretch lg:gap-10 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
                    >
                      <div className="relative min-h-[310px] overflow-hidden rounded-[3px] bg-[#17130f] md:min-h-[390px]">
                        <img
                          src={post.image}
                          alt={post.alt}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-[#17130f]/10 transition-colors duration-500 group-hover:bg-transparent" />
                      </div>

                      <div className="flex min-h-[310px] flex-col justify-between py-1 md:min-h-[390px] lg:py-3">
                        <div>
                          <div className="mb-6 flex items-center gap-4 text-[11px] text-muted-foreground">
                            <span>{post.category}</span>
                            <span>·</span>
                            <span>{post.readingTime}</span>
                          </div>

                          <h2 style={koSerif} className="max-w-[610px] text-[clamp(2rem,3.25vw,3.45rem)] font-medium leading-[1.13] tracking-[-0.045em]">
                            {post.title}
                          </h2>
                          <p className="mt-5 max-w-[550px] text-[15px] leading-7 text-foreground/66">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="mt-10 flex items-center justify-between border-t border-foreground/12 pt-5 text-[12px]">
                          <span className="text-muted-foreground">{post.date}</span>
                          <span className="inline-flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                            글 읽기 <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      <KoreanFooter />
    </div>
  );
};

export default KoBlogs;
