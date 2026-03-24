"use client";

import GlobalHeader from "@/components/GlobalHeader";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";

export default function PrivacyPolicyPage() {
  const t = useTranslations("PrivacyPolicyPage");

  return (
    <main className="min-h-screen bg-[#f8f9fc] font-sans flex flex-col">
      <GlobalHeader />

      <section className="w-full bg-bg-dark text-white py-24 px-4 md:px-8 font-sans relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-3xl -mr-[200px] -mt-[200px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <h1 className="text-hero-inner font-serif font-bold tracking-tight mb-6">
                {t("title")}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="section-xl bg-white relative -mt-12 rounded-t-[3rem] z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.05)] border-t border-brand-ash/10">
        <div className="max-w-[1000px] mx-auto pt-16 pb-20 px-4 md:px-8">
          <div className="prose prose-lg max-w-none text-text-light-bg/80">
            <p className="mb-6">{t("intro1")}</p>
            <p className="mb-12">{t("intro2")}</p>

            {/* Section 1: Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-bg-dark mb-4">{t("sections.cookies.title")}</h2>
              <p className="mb-4">{t("sections.cookies.description")}</p>
              <p className="mb-4">{t("sections.cookies.useTypes")}</p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  <strong>{t("sections.cookies.types.necessary.name")}</strong>: {t("sections.cookies.types.necessary.desc")}
                </li>
                <li>
                  <strong>{t("sections.cookies.types.performance.name")}</strong>: {t("sections.cookies.types.performance.desc")}
                </li>
                <li>
                  <strong>{t("sections.cookies.types.functional.name")}</strong>: {t("sections.cookies.types.functional.desc")}
                </li>
                <li>
                  <strong>{t("sections.cookies.types.advertising.name")}</strong>: {t("sections.cookies.types.advertising.desc")}
                </li>
              </ul>
              <p>{t("sections.cookies.conclusion")}</p>
            </div>

            {/* Section 2: Information We Collect */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-bg-dark mb-4">{t("sections.informationWeCollect.title")}</h2>
              
              <h3 className="text-xl font-semibold text-bg-dark mb-2">{t("sections.informationWeCollect.nonPersonal.title")}</h3>
              <p className="mb-2">{t("sections.informationWeCollect.nonPersonal.desc")}</p>
              <ul className="list-disc pl-6 mb-6 space-y-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <li key={`nonpersonal-${i}`}>{t(`sections.informationWeCollect.nonPersonal.items.${i}`)}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-bg-dark mb-2">{t("sections.informationWeCollect.personal.title")}</h3>
              <p className="mb-2">{t("sections.informationWeCollect.personal.desc")}</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <li key={`personal-${i}`}>{t(`sections.informationWeCollect.personal.items.${i}`)}</li>
                ))}
              </ul>
            </div>

            {/* Section 3: How We Use Your Data */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-bg-dark mb-4">{t("sections.howWeUseYourData.title")}</h2>
              <p className="mb-2">{t("sections.howWeUseYourData.desc")}</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <li key={`use-${i}`}>{t(`sections.howWeUseYourData.items.${i}`)}</li>
                ))}
              </ul>
            </div>

            {/* Section 4: Data Retention */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-bg-dark mb-4">{t("sections.dataRetention.title")}</h2>
              <p>{t("sections.dataRetention.desc")}</p>
            </div>

            {/* Section 5: Your Rights */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-bg-dark mb-4">{t("sections.yourRights.title")}</h2>
              <p className="mb-2">{t("sections.yourRights.desc")}</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <li key={`rights-${i}`}>{t(`sections.yourRights.items.${i}`)}</li>
                ))}
              </ul>
              <p className="whitespace-pre-line">{t("sections.yourRights.contact")}</p>
            </div>

            {/* Section 6: Data Security */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-bg-dark mb-4">{t("sections.dataSecurity.title")}</h2>
              <p>{t("sections.dataSecurity.desc")}</p>
            </div>

            {/* Section 7: Data Sharing */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-bg-dark mb-4">{t("sections.dataSharing.title")}</h2>
              <p className="mb-2">{t("sections.dataSharing.desc")}</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                {[0, 1, 2].map((i) => (
                  <li key={`share-${i}`}>{t(`sections.dataSharing.items.${i}`)}</li>
                ))}
              </ul>
              <p>{t("sections.dataSharing.conclusion")}</p>
            </div>

            {/* Section 8: International Data Transfers */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-bg-dark mb-4">{t("sections.internationalDataTransfers.title")}</h2>
              <p>{t("sections.internationalDataTransfers.desc")}</p>
            </div>

            {/* Section 9: External Links */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-bg-dark mb-4">{t("sections.externalLinks.title")}</h2>
              <p>{t("sections.externalLinks.desc")}</p>
            </div>

            {/* Section 10: Communications */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-bg-dark mb-4">{t("sections.communications.title")}</h2>
              <p>{t("sections.communications.desc")}</p>
            </div>

            {/* Section 11: Password Security */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-bg-dark mb-4">{t("sections.passwordSecurity.title")}</h2>
              <p>{t("sections.passwordSecurity.desc")}</p>
            </div>

            {/* Section 12: Updates to This Policy */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-bg-dark mb-4">{t("sections.updatesToThisPolicy.title")}</h2>
              <p>{t("sections.updatesToThisPolicy.desc")}</p>
            </div>

            {/* Section 13: Contact */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-bg-dark mb-4">{t("sections.contact.title")}</h2>
              <p>{t("sections.contact.email")}</p>
              <p>{t("sections.contact.website")}</p>
            </div>
            
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
