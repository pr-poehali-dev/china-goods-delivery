import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/e91b536a-b54e-42c5-a095-6aa42d311813/files/4b6efc56-970f-454e-abe7-7b0b4324d1a3.jpg";
const WAREHOUSE_IMG = "https://cdn.poehali.dev/projects/e91b536a-b54e-42c5-a095-6aa42d311813/files/f0a366f5-9d8f-445d-aa91-eddd65e49f4f.jpg";
const TEAM_IMG = "https://cdn.poehali.dev/projects/e91b536a-b54e-42c5-a095-6aa42d311813/files/2ad2ff38-c1d3-4924-bb73-417e9cba094c.jpg";

const navLinks = [
  { label: "Тарифы", href: "#tariffs" },
  { label: "Отслеживание", href: "#tracking" },
  { label: "О компании", href: "#about" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Статьи", href: "#blog" },
  { label: "Контакты", href: "#contacts" },
];

const tariffs = [
  {
    icon: "Plane",
    name: "Авиадоставка",
    time: "7–14 дней",
    price: "от 650 ₽/кг",
    desc: "Самый быстрый способ. Подходит для срочных грузов и дорогостоящих товаров.",
    color: "from-orange-500 to-red-600",
    features: ["Трекинг в реальном времени", "Страхование включено", "Таможенное оформление"],
    popular: false,
  },
  {
    icon: "Ship",
    name: "Морская доставка",
    time: "30–45 дней",
    price: "от 85 ₽/кг",
    desc: "Оптимально для крупных партий. Самая экономичная доставка больших объёмов.",
    color: "from-blue-500 to-blue-700",
    features: ["Консолидация грузов", "Персональный менеджер", "Дверь-дверь"],
    popular: true,
  },
  {
    icon: "Truck",
    name: "Автодоставка",
    time: "18–25 дней",
    price: "от 220 ₽/кг",
    desc: "Золотая середина по цене и скорости. Отличный выбор для средних партий.",
    color: "from-amber-500 to-orange-600",
    features: ["Сборные грузы", "Еженедельные рейсы", "GPS-мониторинг"],
    popular: false,
  },
];

const stats = [
  { num: "8+", label: "лет на рынке" },
  { num: "12 000+", label: "довольных клиентов" },
  { num: "150 000+", label: "доставленных грузов" },
  { num: "98%", label: "грузов в срок" },
];

const reviews = [
  {
    name: "Алексей Громов",
    role: "Владелец интернет-магазина",
    text: "Работаем с СилкРоут уже 3 года. Ни одной серьёзной проблемы. Морская доставка — дёшево и чётко по срокам.",
    rating: 5,
    avatar: "А",
  },
  {
    name: "Мария Соколова",
    role: "Байер, fashion-бренд",
    text: "Авиадоставка просто огонь! Новую коллекцию получила за 8 дней. Менеджеры всегда на связи, отвечают быстро.",
    rating: 5,
    avatar: "М",
  },
  {
    name: "Дмитрий Лебедев",
    role: "Импортёр электроники",
    text: "Занимаюсь поставками 5 лет, работал с разными компаниями. СилкРоут — лучшие по соотношению цена/качество.",
    rating: 5,
    avatar: "Д",
  },
  {
    name: "Ольга Павлова",
    role: "Малый бизнес",
    text: "Первый раз заказывала товар из Китая, боялась что будет сложно. Менеджер объяснил всё по шагам, помог с таможней.",
    rating: 5,
    avatar: "О",
  },
];

const articles = [
  {
    tag: "Советы",
    title: "Как правильно упаковать товар для международной доставки",
    desc: "Разбираем ключевые требования к упаковке, чтобы ваш груз дошёл целым.",
    date: "15 мая 2026",
    icon: "Package",
  },
  {
    tag: "Таможня",
    title: "Таможенные лимиты в 2026: что изменилось для частных лиц",
    desc: "Актуальные правила беспошлинного ввоза товаров из Китая для физических лиц.",
    date: "3 мая 2026",
    icon: "FileText",
  },
  {
    tag: "Тренды",
    title: "ТОП-10 товаров из Китая, которые хорошо продаются в России",
    desc: "Аналитика рынка: какие категории товаров приносят наибольшую маржу.",
    date: "28 апр 2026",
    icon: "TrendingUp",
  },
];

const team = [
  { name: "Иван Чернов", role: "Генеральный директор", exp: "15 лет в логистике" },
  { name: "Юлия Ли", role: "Руководитель по Китаю", exp: "Живёт в Гуанчжоу 8 лет" },
  { name: "Павел Морозов", role: "Таможенный брокер", exp: "500+ оформленных грузов" },
  { name: "Светлана Нго", role: "Менеджер по клиентам", exp: "Говорит на 3 языках" },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`${className} transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {children}
    </div>
  );
}

function AccountModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"login" | "register">("login");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-2xl font-bold text-brand-dark">Личный кабинет</h3>
          <button onClick={onClose} className="text-brand-muted hover:text-brand-dark transition-colors">
            <Icon name="X" size={24} />
          </button>
        </div>
        <div className="flex gap-2 mb-6 bg-gray-100 rounded-xl p-1">
          {(["login", "register"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t ? "bg-white shadow text-brand-orange" : "text-brand-muted"}`}>
              {t === "login" ? "Войти" : "Регистрация"}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-brand-dark mb-1 block">Email</label>
            <input type="email" placeholder="your@email.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-colors" />
          </div>
          <div>
            <label className="text-sm font-medium text-brand-dark mb-1 block">Пароль</label>
            <input type="password" placeholder="••••••••"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-colors" />
          </div>
          {tab === "register" && (
            <div>
              <label className="text-sm font-medium text-brand-dark mb-1 block">Компания / Имя</label>
              <input type="text" placeholder="ООО Ромашка"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-colors" />
            </div>
          )}
          <button className="btn-primary w-full text-center block">
            {tab === "login" ? "Войти в кабинет" : "Создать аккаунт"}
          </button>
          {tab === "login" && (
            <p className="text-center text-sm text-brand-muted">
              <button className="text-brand-orange hover:underline">Забыли пароль?</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function TrackingSection() {
  const [trackNum, setTrackNum] = useState("");
  const [result, setResult] = useState<null | "found" | "not-found">(null);

  const handleTrack = () => {
    if (!trackNum.trim()) return;
    setResult(trackNum.toUpperCase().startsWith("SR") ? "found" : "not-found");
  };

  const mockSteps = [
    { status: "done", label: "Принят на склад в Гуанчжоу", date: "10 мая 2026", time: "09:15" },
    { status: "done", label: "Отправлен из Китая", date: "12 мая 2026", time: "14:30" },
    { status: "active", label: "В пути (транзит через Казахстан)", date: "18 мая 2026", time: "08:00" },
    { status: "pending", label: "Прибытие на таможню РФ", date: "~25 мая 2026", time: "" },
    { status: "pending", label: "Доставка получателю", date: "~28 мая 2026", time: "" },
  ];

  return (
    <section id="tracking" className="section-padding bg-brand-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-brand-orange blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-red-600 blur-3xl" />
      </div>
      <div className="container relative z-10">
        <AnimatedSection className="text-center mb-12">
          <span className="inline-block text-brand-orange font-semibold text-sm uppercase tracking-widest mb-3">GPS мониторинг</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">ОТСЛЕЖИВАНИЕ ЗАКАЗА</h2>
          <p className="text-white/60 max-w-xl mx-auto">Введите номер отправления для получения актуального статуса вашего груза</p>
        </AnimatedSection>
        <AnimatedSection className="max-w-2xl mx-auto">
          <div className="glass rounded-2xl p-6 mb-6">
            <div className="flex gap-3">
              <input
                value={trackNum}
                onChange={e => setTrackNum(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleTrack()}
                placeholder="Введите номер заказа (например: SR-2026-00345)"
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-orange transition-colors text-sm"
              />
              <button onClick={handleTrack} className="btn-primary whitespace-nowrap flex items-center gap-2">
                <Icon name="Search" size={18} />
                Найти
              </button>
            </div>
          </div>

          {result === "found" && (
            <div className="glass rounded-2xl p-6 animate-fade-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 gradient-brand rounded-full flex items-center justify-center">
                  <Icon name="Package" size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">{trackNum.toUpperCase()}</p>
                  <p className="text-sm text-white/60">Ожидаемая доставка: 28 мая 2026</p>
                </div>
                <span className="ml-auto px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-semibold rounded-full">В пути</span>
              </div>
              <div className="space-y-1">
                {mockSteps.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${step.status === "done" ? "gradient-brand" : step.status === "active" ? "border-2 border-brand-orange bg-brand-orange/20" : "border-2 border-white/20"}`}>
                        {step.status === "done"
                          ? <Icon name="Check" size={14} className="text-white" />
                          : <div className={`w-2 h-2 rounded-full ${step.status === "active" ? "bg-brand-orange" : "bg-white/20"}`} />}
                      </div>
                      {i < mockSteps.length - 1 && <div className={`w-0.5 h-8 mt-1 ${step.status === "done" ? "bg-brand-orange" : "bg-white/10"}`} />}
                    </div>
                    <div className="pb-4">
                      <p className={`text-sm font-medium ${step.status === "pending" ? "text-white/40" : "text-white"}`}>{step.label}</p>
                      <p className={`text-xs mt-0.5 ${step.status === "pending" ? "text-white/25" : "text-white/50"}`}>{step.date} {step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result === "not-found" && (
            <div className="glass rounded-2xl p-6 text-center animate-fade-up">
              <Icon name="PackageX" size={48} className="text-white/30 mx-auto mb-3" />
              <p className="text-white font-semibold mb-1">Заказ не найден</p>
              <p className="text-white/50 text-sm">Проверьте номер или обратитесь в поддержку</p>
            </div>
          )}

          <p className="text-center text-white/40 text-xs mt-4">Для демо введите: SR-2026-00345</p>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* NAVBAR */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
        <div className="container flex items-center justify-between h-16 md:h-20">
          <a href="#" className={`font-display text-2xl font-bold tracking-wider transition-colors ${scrolled ? "text-brand-dark" : "text-white"}`}>
            СИЛК<span className="text-brand-orange">РОУТ</span>
          </a>
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.href} href={l.href}
                className={`text-sm font-medium transition-colors hover:text-brand-orange ${scrolled ? "text-brand-dark" : "text-white/90"}`}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setAccountOpen(true)}
              className={`hidden md:flex items-center gap-2 text-sm font-semibold transition-all px-4 py-2 rounded-xl border-2 ${scrolled ? "border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white" : "border-white/60 text-white hover:border-white hover:bg-white/10"}`}>
              <Icon name="User" size={16} />
              Кабинет
            </button>
            <a href="#contacts" className="btn-primary hidden md:block text-sm py-2.5 px-5">
              Рассчитать доставку
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className={`lg:hidden transition-colors ${scrolled ? "text-brand-dark" : "text-white"}`}>
              <Icon name={menuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
            <div className="container py-4 space-y-1">
              {navLinks.map(l => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                  className="block py-3 text-brand-dark font-medium hover:text-brand-orange transition-colors border-b border-gray-50 last:border-0">
                  {l.label}
                </a>
              ))}
              <div className="pt-3 flex gap-3">
                <button onClick={() => { setAccountOpen(true); setMenuOpen(false); }}
                  className="btn-outline flex-1 text-center text-sm py-3">Кабинет</button>
                <a href="#contacts" className="btn-primary flex-1 text-center text-sm py-3">Рассчитать</a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Доставка из Китая" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
        <div className="container relative z-10 pt-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 glass text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-6 animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Доставляем грузы каждый день
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-none mb-6">
              ДОСТАВКА<br />
              <span className="gradient-text">ИЗ КИТАЯ</span><br />
              БЕЗ ХЛОПОТ
            </h1>
            <p className="text-white/75 text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
              Авиа, море, авто — выберите подходящий маршрут. Таможня, страховка и доставка до двери включены.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contacts" className="btn-primary text-base flex items-center gap-2">
                <Icon name="Calculator" size={18} />
                Рассчитать стоимость
              </a>
              <a href="#tariffs" className="text-base border-2 border-white/60 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:bg-white hover:text-brand-dark flex items-center gap-2">
                <Icon name="ArrowRight" size={18} />
                Смотреть тарифы
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-12">
              {[
                { icon: "Clock", text: "От 7 дней" },
                { icon: "Shield", text: "Страховка груза" },
                { icon: "MapPin", text: "Доставка до двери" },
                { icon: "Headphones", text: "Поддержка 24/7" },
              ].map(item => (
                <div key={item.icon} className="flex items-center gap-2 text-white/80 text-sm">
                  <Icon name={item.icon} size={16} className="text-brand-orange" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute right-8 bottom-24 hidden xl:block animate-float">
          <div className="glass-dark text-white rounded-2xl p-5 w-56">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center">
                <Icon name="Package" size={18} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-white/60">Груз доставлен</p>
                <p className="text-sm font-semibold">SR-2026-00344</p>
              </div>
            </div>
            <div className="flex justify-between text-xs text-white/50">
              <span>Только что</span>
              <span className="text-green-400 font-medium">✓ Успешно</span>
            </div>
          </div>
        </div>
        <a href="#tariffs" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-bounce">
          <Icon name="ChevronDown" size={32} />
        </a>
      </section>

      {/* MARQUEE */}
      <div className="gradient-brand py-4 overflow-hidden relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, j) => (
            <div key={j} className="flex items-center gap-12 mr-12">
              {["Авиадоставка от 7 дней", "Морские перевозки", "Автодоставка по СНГ", "Таможенное оформление", "Страхование грузов", "Личный менеджер 24/7"].map(t => (
                <span key={t} className="text-white font-semibold text-sm uppercase tracking-wider flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 inline-block" />
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className="py-16 bg-brand-light">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <AnimatedSection key={i} className="text-center">
                <div className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2">{s.num}</div>
                <p className="text-brand-muted text-sm">{s.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* TARIFFS */}
      <section id="tariffs" className="section-padding bg-white">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-block text-brand-orange font-semibold text-sm uppercase tracking-widest mb-3">Выберите маршрут</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-dark mb-4">ТАРИФЫ И СПОСОБЫ ДОСТАВКИ</h2>
            <p className="text-brand-muted max-w-xl mx-auto">Подберём оптимальный вариант с учётом вашего бюджета, сроков и типа товара</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {tariffs.map((t, i) => (
              <AnimatedSection key={i} className={`relative rounded-2xl overflow-hidden card-hover border-2 ${t.popular ? "border-brand-orange shadow-lg shadow-orange-100" : "border-gray-100"}`}>
                {t.popular && (
                  <div className="absolute top-4 right-4 gradient-brand text-white text-xs font-bold px-3 py-1 rounded-full z-10">Популярный</div>
                )}
                <div className={`bg-gradient-to-br ${t.color} p-6 text-white`}>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                    <Icon name={t.icon} size={24} className="text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-1">{t.name}</h3>
                  <p className="text-white/80 text-sm">{t.time}</p>
                </div>
                <div className="p-6">
                  <p className="text-3xl font-display font-bold text-brand-dark mb-2">{t.price}</p>
                  <p className="text-brand-muted text-sm mb-4">{t.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {t.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-brand-dark">
                        <Icon name="Check" size={16} className="text-brand-orange flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#contacts"
                    className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${t.popular ? "btn-primary" : "btn-outline"}`}>
                    Выбрать тариф
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-padding bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container relative z-10">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-block text-brand-orange font-semibold text-sm uppercase tracking-widest mb-3">Просто и прозрачно</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">КАК МЫ РАБОТАЕМ</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", icon: "MessageSquare", title: "Заявка", desc: "Оставьте заявку или напишите менеджеру. Ответим за 15 минут." },
              { num: "02", icon: "Calculator", title: "Расчёт", desc: "Подберём маршрут и рассчитаем точную стоимость доставки." },
              { num: "03", icon: "Package", title: "Отправка", desc: "Принимаем груз на склад в Китае и отправляем по выбранному маршруту." },
              { num: "04", icon: "Home", title: "Доставка", desc: "Доставим прямо до вашего склада или адреса в любом городе России." },
            ].map((step, i) => (
              <AnimatedSection key={i}>
                <div className="glass rounded-2xl p-6 h-full">
                  <div className="font-display text-5xl font-bold text-brand-orange/20 mb-3">{step.num}</div>
                  <div className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center mb-4">
                    <Icon name={step.icon} size={18} className="text-white" />
                  </div>
                  <h4 className="font-display text-xl font-bold mb-2">{step.title}</h4>
                  <p className="text-white/60 text-sm">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* TRACKING */}
      <TrackingSection />

      {/* ABOUT */}
      <section id="about" className="section-padding bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="inline-block text-brand-orange font-semibold text-sm uppercase tracking-widest mb-3">О нас</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-dark mb-6">МЫ ЗНАЕМ КИТАЙ ИЗНУТРИ</h2>
              <p className="text-brand-muted mb-6 leading-relaxed">
                Компания <strong className="text-brand-dark">СилкРоут</strong> основана в 2018 году. За эти годы мы выстроили
                собственную сеть складов в ключевых городах Китая — Гуанчжоу, Иу, Шэньчжэне и Шанхае.
              </p>
              <p className="text-brand-muted mb-8 leading-relaxed">
                Наша команда говорит по-китайски, знает местную специфику и умеет решать нестандартные задачи.
                Мы не просто перевозим грузы — мы помогаем бизнесу расти.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: "MapPin", text: "Склады в 4 городах Китая" },
                  { icon: "Globe", text: "Доставка в 50+ городов РФ" },
                  { icon: "Shield", text: "Лицензированный таможенный брокер" },
                  { icon: "Award", text: "Сертифицированный перевозчик" },
                ].map(item => (
                  <div key={item.icon} className="flex items-center gap-3 bg-brand-light rounded-xl p-3">
                    <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={14} className="text-white" />
                    </div>
                    <span className="text-sm font-medium text-brand-dark">{item.text}</span>
                  </div>
                ))}
              </div>
              <a href="#contacts" className="btn-primary inline-flex items-center gap-2">
                Связаться с нами
              </a>
            </AnimatedSection>
            <AnimatedSection>
              <div className="relative">
                <img src={WAREHOUSE_IMG} alt="Наш склад" className="rounded-2xl w-full object-cover h-80 lg:h-[480px]" />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border border-gray-100">
                  <p className="text-4xl font-display font-bold gradient-text">8+</p>
                  <p className="text-brand-muted text-sm">лет на рынке</p>
                </div>
                <div className="absolute -top-6 -right-6 gradient-brand rounded-2xl p-5 text-white">
                  <p className="text-4xl font-display font-bold">150K+</p>
                  <p className="text-white/80 text-sm">доставок</p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection className="mt-20">
            <h3 className="font-display text-3xl font-bold text-brand-dark text-center mb-10">НАША КОМАНДА</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {team.map((m, i) => (
                <div key={i} className="text-center card-hover bg-brand-light rounded-2xl p-6">
                  <div className="w-16 h-16 gradient-brand rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="font-display text-2xl font-bold text-white">{m.name[0]}</span>
                  </div>
                  <h4 className="font-semibold text-brand-dark mb-1">{m.name}</h4>
                  <p className="text-brand-orange text-sm font-medium mb-1">{m.role}</p>
                  <p className="text-brand-muted text-xs">{m.exp}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="section-padding bg-brand-light">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-block text-brand-orange font-semibold text-sm uppercase tracking-widest mb-3">Доверие клиентов</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-dark mb-4">ОТЗЫВЫ КЛИЕНТОВ</h2>
            <div className="flex items-center justify-center gap-2">
              {[1,2,3,4,5].map(s => <Icon key={s} name="Star" size={20} className="text-amber-400 fill-amber-400" />)}
              <span className="text-brand-muted text-sm ml-2">4.9 / 5 на основе 1200+ отзывов</span>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((r, i) => (
              <AnimatedSection key={i} className="bg-white rounded-2xl p-6 card-hover border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(r.rating)].map((_, s) => <Icon key={s} name="Star" size={16} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-brand-dark mb-4 leading-relaxed">«{r.text}»</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gradient-brand rounded-full flex items-center justify-center text-white font-bold text-sm">{r.avatar}</div>
                  <div>
                    <p className="font-semibold text-brand-dark text-sm">{r.name}</p>
                    <p className="text-brand-muted text-xs">{r.role}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="section-padding bg-white">
        <div className="container">
          <AnimatedSection className="flex items-end justify-between mb-12">
            <div>
              <span className="inline-block text-brand-orange font-semibold text-sm uppercase tracking-widest mb-3">Экспертиза</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-dark">ПОЛЕЗНЫЕ СТАТЬИ</h2>
            </div>
            <a href="#" className="hidden md:flex items-center gap-2 text-brand-orange font-semibold text-sm hover:gap-3 transition-all">
              Все статьи <Icon name="ArrowRight" size={16} />
            </a>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {articles.map((a, i) => (
              <AnimatedSection key={i} className="group cursor-pointer">
                <div className="bg-brand-light rounded-2xl overflow-hidden card-hover border border-gray-100">
                  <div className="gradient-brand h-3" />
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center">
                        <Icon name={a.icon} size={14} className="text-white" />
                      </div>
                      <span className="text-xs font-semibold text-brand-orange bg-orange-50 px-2 py-1 rounded-full">{a.tag}</span>
                    </div>
                    <h4 className="font-display text-lg font-bold text-brand-dark mb-2 group-hover:text-brand-orange transition-colors leading-snug">{a.title}</h4>
                    <p className="text-brand-muted text-sm mb-4 leading-relaxed">{a.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-brand-muted text-xs">{a.date}</span>
                      <Icon name="ArrowRight" size={16} className="text-brand-orange group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="section-padding bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img src={TEAM_IMG} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 to-brand-dark/80 pointer-events-none" />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <AnimatedSection>
              <span className="inline-block text-brand-orange font-semibold text-sm uppercase tracking-widest mb-3">Свяжитесь с нами</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">РАССЧИТАЙТЕ ДОСТАВКУ БЕСПЛАТНО</h2>
              <p className="text-white/60 mb-8">Ответим в течение 15 минут. Подберём оптимальный маршрут и стоимость специально для вашего товара.</p>
              <div className="space-y-4">
                {[
                  { icon: "Phone", label: "Телефон", val: "+7 (800) 123-45-67" },
                  { icon: "Mail", label: "Email", val: "hello@silkroute.ru" },
                  { icon: "MessageCircle", label: "WhatsApp / Telegram", val: "+7 (916) 123-45-67" },
                  { icon: "MapPin", label: "Офис", val: "Москва, ул. Тверская, 14" },
                ].map(c => (
                  <div key={c.icon} className="flex items-center gap-4">
                    <div className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name={c.icon} size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs">{c.label}</p>
                      <p className="text-white font-medium">{c.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection>
              <div className="glass rounded-2xl p-8">
                <h3 className="font-display text-2xl font-bold mb-6">Заявка на расчёт</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-white/60 text-xs mb-1 block">Ваше имя</label>
                      <input type="text" placeholder="Иван"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-orange text-sm transition-colors" />
                    </div>
                    <div>
                      <label className="text-white/60 text-xs mb-1 block">Телефон</label>
                      <input type="tel" placeholder="+7 (___) ___-__-__"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-orange text-sm transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="text-white/60 text-xs mb-1 block">Тип товара</label>
                    <input type="text" placeholder="Электроника, одежда, оборудование..."
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-orange text-sm transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-white/60 text-xs mb-1 block">Вес (кг)</label>
                      <input type="number" placeholder="100"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-orange text-sm transition-colors" />
                    </div>
                    <div>
                      <label className="text-white/60 text-xs mb-1 block">Способ доставки</label>
                      <select className="w-full bg-[#1a1a1a] border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange text-sm transition-colors">
                        <option value="">Выберите</option>
                        <option value="air">Авиа</option>
                        <option value="sea">Море</option>
                        <option value="auto">Авто</option>
                      </select>
                    </div>
                  </div>
                  <button className="btn-primary w-full flex items-center justify-center gap-2">
                    <Icon name="Send" size={16} />
                    Отправить заявку
                  </button>
                  <p className="text-center text-white/30 text-xs">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="font-display text-2xl font-bold mb-3">
                СИЛК<span className="text-brand-orange">РОУТ</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-4">Надёжная доставка товаров из Китая с 2018 года</p>
              <div className="flex gap-3">
                {["Telegram", "WhatsApp", "VK"].map(s => (
                  <a key={s} href="#" className="w-9 h-9 glass rounded-lg flex items-center justify-center hover:bg-brand-orange/20 transition-colors text-white/50 text-xs font-bold">
                    {s[0]}
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: "Услуги", links: ["Авиадоставка", "Морская доставка", "Автодоставка", "Таможня", "Страхование"] },
              { title: "Компания", links: ["О нас", "Команда", "Отзывы", "Статьи", "Карьера"] },
              { title: "Поддержка", links: ["Отследить заказ", "FAQ", "Контакты", "Конфиденциальность"] },
            ].map(col => (
              <div key={col.title}>
                <h5 className="font-display font-semibold mb-4 text-white/80">{col.title}</h5>
                <ul className="space-y-2">
                  {col.links.map(l => (
                    <li key={l}><a href="#" className="text-white/40 text-sm hover:text-brand-orange transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">© 2026 СилкРоут. Все права защищены.</p>
            <p className="text-white/20 text-xs">ООО «СилкРоут» · ИНН 7712345678 · ОГРН 1187746000000</p>
          </div>
        </div>
      </footer>

      {accountOpen && <AccountModal onClose={() => setAccountOpen(false)} />}

      <a href="#contacts"
        className="fixed bottom-6 right-6 gradient-brand text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/40 hover:scale-110 transition-transform z-30"
        title="Рассчитать доставку">
        <Icon name="MessageCircle" size={24} className="text-white" />
      </a>
    </div>
  );
}