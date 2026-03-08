import MegaMenu from "@/components/MegaMenu";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Link } from "@/i18n/routing";

export default function GlobalHeader() {
  return (
    <header className="flex justify-between items-center w-full relative z-50 p-6 md:p-8 lg:px-16 bg-bg-dark border-b border-brand-ash/20">
      {/* Logo */}
      <div className="w-38 md:w-64">
        <Link href="/">
          <img src="/logo.svg" alt="Vyanzo" className="w-full h-auto" />
        </Link>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <MegaMenu />
      </div>
    </header>
  );
}
