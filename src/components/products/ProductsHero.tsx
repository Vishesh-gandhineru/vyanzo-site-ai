import { useTranslations } from "next-intl";

export default function ProductsHero() {
  const t = useTranslations("ProductsPage.hero");

  return (
    <section className="w-full bg-bg-dark text-white py-24 px-4 md:px-8 font-sans relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-3xl -mr-[200px] -mt-[200px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 text-brand-primary text-sm font-sans font-bold tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
              {t("subtitle")}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-6 leading-[1.2]">
              {t("titleStart")}
              <br />
              <span className="text-brand-primary italic">
                {t("titleHighlight")}
              </span>
            </h1>
            <p className="text-brand-ash/80 text-lg md:text-xl font-sans font-normal max-w-2xl leading-relaxed">
              {t("description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
