import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Activity,
  Cpu,
  Settings2,
  Headphones,
  ShieldCheck,
  Zap,
  BadgeCheck,
  Lock,
  MessageSquare,
  RefreshCw,
  Send,
  ArrowUpRight,
  Star,
} from "lucide-react";
import heroImg from "@/assets/hero-dashboard.jpg";
import aboutImg from "@/assets/about-diagnostic.jpg";
import { ContactForm } from "@/components/contact-form";

export const Route = createFileRoute("/")({
  component: Index,
});

const NAV = [
  { label: "Главная", href: "#home" },
  { label: "Продукты", href: "#products" },
  { label: "О нас", href: "#about" },
  { label: "Преимущества", href: "#advantages" },
  { label: "Контакты", href: "#contact" },
];

const PRODUCTS = [
  { icon: Activity, title: "Диагностическое ПО", desc: "Глубокое сканирование блоков управления, live-данные и анализ ошибок для всех платформ Mercedes-Benz." },
  { icon: Cpu, title: "Кодирование и прошивка", desc: "Вариантное кодирование, онлайн-программирование SCN и перепрошивка модулей по проверенным процедурам." },
  { icon: Settings2, title: "Настройка систем", desc: "Активация ретрофитов, включение скрытых функций и персональная конфигурация автомобиля." },
  { icon: Headphones, title: "Техническая поддержка", desc: "Прямой доступ к инженерам, которые проведут вашу команду через сложные сценарии." },
];

const ADVANTAGES = [
  { icon: ShieldCheck, title: "Профессиональные решения", desc: "Инструменты уровня СТО, которым доверяют независимые специалисты по Mercedes-Benz по всему миру." },
  { icon: Zap, title: "Быстрая поддержка", desc: "Приоритетный отклик от техников, которые знают платформу изнутри." },
  { icon: BadgeCheck, title: "Проверенное ПО", desc: "Каждая версия валидирована по актуальным протоколам Mercedes-Benz." },
  { icon: Lock, title: "Безопасная покупка", desc: "Шифрованная доставка, подписанные установщики и конфиденциальное лицензирование." },
  { icon: MessageSquare, title: "Экспертная консультация", desc: "Индивидуальные рекомендации по подбору инструментария под ваш рабочий процесс." },
  { icon: RefreshCw, title: "Регулярные обновления", desc: "Постоянное расширение поддержки новых кузовов, блоков и диагностических процедур." },
];

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className={`glass flex items-center justify-between rounded-2xl px-5 py-3 transition-all ${scrolled ? "shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]" : ""}`}>
          <a href="#home" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-transparent">
              <Star className="h-4 w-4 text-[#00AEEF]" />
            </span>
            <span className="text-sm font-semibold tracking-[0.2em] uppercase">MB Suite</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-sm text-[#B5B5B5] transition hover:text-white">
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-white transition hover:border-[#00AEEF]/60 hover:bg-[#00AEEF]/10 md:inline-flex"
          >
            Получить консультацию
          </a>
          <button
            aria-label="Меню"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 md:hidden"
          >
            <div className="space-y-1.5">
              <span className="block h-px w-4 bg-white" />
              <span className="block h-px w-4 bg-white" />
            </div>
          </button>
        </div>
        {open && (
          <div className="glass mt-2 rounded-2xl p-4 md:hidden">
            <div className="flex flex-col gap-3">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="text-sm text-[#B5B5B5] hover:text-white">
                  {n.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const y = window.scrollY;
      ref.current.style.transform = `translate3d(0, ${y * 0.25}px, 0) scale(${1 + y * 0.0003})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="home" className="relative isolate overflow-hidden">
      <div ref={ref} className="absolute inset-0 -z-10 will-change-transform">
        <img src={heroImg} alt="" width={1920} height={1280} className="h-full w-full object-cover opacity-70" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#090909]/40 via-[#090909]/80 to-[#090909]" />
      <div className="absolute -left-40 top-1/3 -z-10 h-[500px] w-[500px] accent-ring animate-pulse-glow" />
      <div className="absolute right-0 top-1/4 -z-10 h-[600px] w-[600px] accent-ring animate-float" />

      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 pt-32 pb-24">
        <div className="max-w-4xl animate-rise">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-[#B5B5B5]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00AEEF] shadow-[0_0_12px_#00AEEF]" />
            Специалисты по ПО Mercedes-Benz
          </div>
          <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="text-gradient">Профессиональное ПО</span>
            <br />
            <span className="text-white">для </span>
            <span className="bg-gradient-to-r from-white via-[#cfeeff] to-[#00AEEF] bg-clip-text text-transparent">Mercedes-Benz</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#B5B5B5] sm:text-xl">
            Надёжное ПО для диагностики, кодирования и конфигурации для специалистов и автосервисов Mercedes-Benz.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 rounded-full bg-[#00AEEF] px-7 py-3.5 text-sm font-semibold text-[#03121b] transition hover:scale-[1.02] glow-accent"
            >
              Получить консультацию
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#products"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-white backdrop-blur transition hover:border-white/30 hover:bg-white/[0.07]"
            >
              Смотреть решения
            </a>
          </div>
        </div>

        <div className="reveal mt-24 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-4">
          {[
            ["12+", "Лет опыта"],
            ["3 400+", "Активных СТО"],
            ["98%", "Успешных решений"],
            ["24/7", "Поддержка экспертов"],
          ].map(([v, l]) => (
            <div key={l} className="bg-[#0d0d0d]/80 p-6 backdrop-blur">
              <div className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{v}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.2em] text-[#B5B5B5]">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="reveal mx-auto max-w-3xl text-center">
      <div className="text-xs uppercase tracking-[0.3em] text-[#00AEEF]">{kicker}</div>
      <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {sub && <p className="mx-auto mt-5 max-w-2xl text-base text-[#B5B5B5] sm:text-lg">{sub}</p>}
    </div>
  );
}

function Products() {
  return (
    <section id="products" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          kicker="Продукты"
          title="ПО, созданное для автосервиса"
          sub="Полный набор инструментов для каждого этапа современного обслуживания Mercedes-Benz."
        />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="reveal group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#151515] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#00AEEF]/40"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#00AEEF]/0 blur-3xl transition-all duration-500 group-hover:bg-[#00AEEF]/20" />
              <div className="relative">
                <div className="mb-8 grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent">
                  <Icon className="h-5 w-5 text-[#00AEEF]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#B5B5B5]">{desc}</p>
                <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#00AEEF] opacity-0 transition group-hover:opacity-100">
                  Подробнее <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Advantages() {
  return (
    <section id="advantages" className="relative py-32">
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          kicker="Почему мы"
          title="Преимущество, которое можно измерить"
          sub="Автосервисы выбирают нас по тем же причинам, по которым их клиенты выбирают Mercedes-Benz."
        />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="reveal group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#1E1E1E] to-[#151515] p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#00AEEF]/30"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="flex items-start gap-5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[#00AEEF]/20 bg-[#00AEEF]/5 transition group-hover:bg-[#00AEEF]/15">
                  <Icon className="h-5 w-5 text-[#00AEEF]" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#B5B5B5]">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="reveal relative order-2 lg:order-1">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-[#00AEEF]/20 via-transparent to-transparent blur-2xl" />
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#151515]">
              <img
                src={aboutImg}
                alt="Диагностический ноутбук, подключённый к Mercedes-Benz"
                width={1600}
                height={1200}
                loading="lazy"
                className="h-full w-full object-cover transition duration-[1.2s] hover:scale-105"
              />
            </div>
          </div>
          <div className="reveal order-1 lg:order-2">
            <div className="text-xs uppercase tracking-[0.3em] text-[#00AEEF]">О нас</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              <span className="text-gradient">Создано для специалистов</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#B5B5B5]">
              Мы разрабатываем ПО исключительно для автомобилей Mercedes-Benz — помогая независимым автосервисам и техническим специалистам диагностировать, кодировать и настраивать машины с той же точностью, что и официальные дилеры.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#B5B5B5]">
              Каждый релиз формируется на основе обратной связи от реальных СТО. Результат — инструменты, которые быстрее осваиваются, быстрее работают и заслуживают доверия на самых сложных задачах.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                ["Точность", "Построено на протоколах OEM"],
                ["Надёжность", "Валидация в каждом релизе"],
              ].map(([t, d]) => (
                <div key={t} className="rounded-2xl border border-white/[0.08] bg-[#151515] p-5">
                  <div className="text-sm font-semibold text-white">{t}</div>
                  <div className="mt-1 text-xs text-[#B5B5B5]">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="reveal relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#161616] to-[#0d0d0d] p-12 text-center sm:p-20">
          <div className="absolute left-1/2 top-1/2 -z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 accent-ring animate-pulse-glow" />
          <div className="relative">
            <div className="text-xs uppercase tracking-[0.3em] text-[#00AEEF]">Связаться с нами</div>
            <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              <span className="text-gradient">Нужно ПО для Mercedes-Benz?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base text-[#B5B5B5] sm:text-lg">
              Свяжитесь с нами сегодня — мы поможем подобрать решение под ваши задачи.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <ContactForm variant="primary" />
              <a
                href="https://t.me/Foreverinever"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-4 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/[0.07]"
              >
                <Send className="h-4 w-4" /> Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10">
                <Star className="h-4 w-4 text-[#00AEEF]" />
              </span>
              <span className="text-sm font-semibold tracking-[0.2em] uppercase">MB Suite</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#B5B5B5]">
              Профессиональное программное обеспечение и цифровые решения для специалистов и автосервисов Mercedes-Benz.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#B5B5B5]">Навигация</div>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV.map((n) => (
                <li key={n.href}><a href={n.href} className="text-white/80 hover:text-[#00AEEF]">{n.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#B5B5B5]">Контакты</div>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a href="https://t.me/Foreverinever" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/80 hover:text-[#00AEEF]"><Send className="h-4 w-4" /> Telegram</a></li>
              <li><a href="https://wa.me/" className="inline-flex items-center gap-2 text-white/80 hover:text-[#00AEEF]"><MessageSquare className="h-4 w-4" /> WhatsApp</a></li>
              <li><ContactForm variant="ghost" label="Написать нам" /></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 border-t border-white/[0.08] pt-8">
          <p className="text-xs leading-relaxed text-[#7a7a7a]">
            Mercedes-Benz является зарегистрированным товарным знаком Mercedes-Benz Group AG. Данный сайт не аффилирован с Mercedes-Benz Group AG и не одобрен ею.
          </p>
          <p className="mt-3 text-xs text-[#7a7a7a]">© {new Date().getFullYear()} MB Suite. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  useReveal();
  return (
    <main className="relative min-h-screen bg-[#090909] text-white">
      <Nav />
      <Hero />
      <Products />
      <Advantages />
      <About />
      <CTA />
      <Footer />
    </main>
  );
}
