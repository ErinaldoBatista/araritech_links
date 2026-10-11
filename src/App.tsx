import { Header } from "./components/Header";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { EbookCard } from "./components/EbookCard";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[26rem]" />

      <div className="relative mx-auto flex w-full max-w-[30rem] flex-col gap-5 px-4 pt-9 pb-10 sm:pt-14">
        <main className="flex flex-col gap-6">
          <Header />
          <div className="flex flex-col gap-5">
            <WhatsAppButton />
            <EbookCard />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
