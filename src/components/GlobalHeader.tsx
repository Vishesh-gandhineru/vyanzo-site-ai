import MegaMenu from "@/components/MegaMenu";

export default function GlobalHeader() {
  return (
    <header className="flex justify-between items-start w-full relative z-50 p-6 md:p-8 lg:px-16 bg-bg-dark border-b border-brand-ash/20">
      {/* Logo */}
      <div className="w-40 md:w-48">
        <a href="/">
          <img 
             src="/logo.svg" 
             alt="Vyanzo" 
             className="w-full h-auto invert brightness-0" 
          />
        </a>
      </div>

      {/* Mega Menu Component */}
      <MegaMenu />
    </header>
  );
}
