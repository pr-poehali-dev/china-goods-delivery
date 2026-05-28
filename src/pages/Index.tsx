import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const R = "#CC1D1D";

const WAREHOUSE_IMG = "https://cdn.poehali.dev/projects/e91b536a-b54e-42c5-a095-6aa42d311813/files/f0a366f5-9d8f-445d-aa91-eddd65e49f4f.jpg";
const TEAM_IMG = "https://cdn.poehali.dev/projects/e91b536a-b54e-42c5-a095-6aa42d311813/files/2ad2ff38-c1d3-4924-bb73-417e9cba094c.jpg";

const tariffs = [
  { label: "Супер-экспресс", sublabel: "до 7 дней", icon: "Plane", name: "Авиа-доставка", price: "От 6,5 ₽/г", popular: false },
  { label: "Экспресс", sublabel: "до 12 дней", icon: "Plane", name: "Авиа-доставка", price: "От 4 ₽/г", popular: true },
  { label: "Быстро", sublabel: "до 16 дней", icon: "Truck", name: "Авто-доставка", price: "От 2,5 ₽/г", popular: false },
  { label: "Средняя", sublabel: "18-25 дней", icon: "Truck", name: "Авто-доставка", price: "От 2,5 ₽/г", popular: false },
  { label: "Медленная", sublabel: "25-30 дней", icon: "Train", name: "ЖД-доставка", price: "От 3,6 ₽/г", popular: false },
];

const services = [
  { icon: "Search", title: "Ищем поставщиков и инспектируем", desc: "Проводим переговоры с поставщиками и проверяем на соответствие купленных товаров" },
  { icon: "ShoppingCart", title: "Выкупаем товары в Китае", desc: "Выкупаем ваши товары с известных китайских маркетплейсов: 1688, Alibaba, Taobao, Poizon, а также с заводов производителей и других площадок" },
  { icon: "Warehouse", title: "Бесплатно храним ваш товар на наших складах", desc: "Принимаем, упаковываем и храним ваш товар на наших складах до отправки по вашему адресу" },
];

const steps = [
  { num: "01", title: "Получаем вашу заявку и определяемся с задачей", desc: "Консультируем и согласовываем ваши условия, объёмы, сроки и др. пожелания" },
  { num: "02", title: "Ведём за вас переговоры с поставщиками", desc: "Мы берём на себя общение с китайскими поставщиками. Выкупим товар и направим на наш склад" },
  { num: "03", title: "Принимаем товар на нашем складе и проверяем его", desc: "Проверяем товар, гарантируем соответствие, предоставим отчёт, упакуем и отправим" },
  { num: "04", title: "Доставляем груз в Россию, Казахстан и Кыргызстан", desc: "До нашего склада «Южные Ворота» и до вашего адреса местной транспортной компанией" },
];

const faqs = [
  { q: "В какие города доставляете?", a: "Доставляем во все крупные города России, а также в Казахстан и Кыргызстан. Уточните ваш город у менеджера." },
  { q: "Какая минимальная сумма заказа?", a: "Минимальная сумма заказа от 70 000 рублей. Для небольших партий есть консолидированные отправки." },
  { q: "Как рассчитать стоимость доставки?", a: "Стоимость зависит от веса, объёма, типа товара и выбранного маршрута. Оставьте заявку и мы рассчитаем индивидуально." },
  { q: "Как происходит таможенное оформление?", a: "Наши лицензированные брокеры берут таможенное оформление на себя. Вам не нужно ни о чём беспокоиться." },
  { q: "Есть ли страхование груза?", a: "Да, страхование включено в стоимость. При повреждении или утере груза вы получаете компенсацию." },
];

const articles = [
  { title: "Обзор сайта Alibaba. Как найти и заказать товар", img: WAREHOUSE_IMG },
  { title: "Обзор сайта Poizon. Как найти и заказать товар", img: TEAM_IMG },
];

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.12 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return { ref, vis };
}

function FadeUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, vis } = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: `opacity 0.55s ${delay}ms ease, transform 0.55s ${delay}ms ease` }}>
      {children}
    </div>
  );
}

function AccountModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"login" | "reg">("login");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-3xl p-8 w-full max-w-sm mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <span className="font-bold text-lg">Личный кабинет</span>
          <button onClick={onClose}><Icon name="X" size={20} className="text-gray-400 hover:text-gray-700" /></button>
        </div>
        <div className="flex border border-gray-200 rounded-2xl overflow-hidden mb-5">
          {(["login", "reg"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2 text-sm font-semibold transition-colors ${tab === t ? "bg-[#CC1D1D] text-white" : "text-gray-500 hover:bg-gray-50"}`}>
              {t === "login" ? "Войти" : "Регистрация"}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {tab === "reg" && <input placeholder="Имя / Компания" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#CC1D1D]" />}
          <input type="email" placeholder="Email" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#CC1D1D]" />
          <input type="password" placeholder="Пароль" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#CC1D1D]" />
          <button className="btn-red w-full justify-center">{tab === "login" ? "Войти" : "Создать аккаунт"}</button>
        </div>
      </div>
    </div>
  );
}

function TrackingModal({ onClose }: { onClose: () => void }) {
  const [num, setNum] = useState("");
  const [res, setRes] = useState<"found" | "not-found" | null>(null);
  const steps2 = [
    { done: true, label: "Принят на склад в Гуанчжоу", date: "10 мая, 09:15" },
    { done: true, label: "Отправлен из Китая", date: "12 мая, 14:30" },
    { done: false, active: true, label: "В пути — транзит через Казахстан", date: "18 мая, 08:00" },
    { done: false, active: false, label: "Прибытие на таможню РФ", date: "~25 мая" },
    { done: false, active: false, label: "Доставка получателю", date: "~28 мая" },
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-3xl p-6 w-full max-w-md mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <span className="font-bold text-lg">Отслеживание заказа</span>
          <button onClick={onClose}><Icon name="X" size={20} className="text-gray-400 hover:text-gray-700" /></button>
        </div>
        <div className="flex gap-2 mb-4">
          <input value={num} onChange={e => setNum(e.target.value)} onKeyDown={e => e.key === "Enter" && setRes(num.toUpperCase().startsWith("SR") ? "found" : "not-found")}
            placeholder="Номер заказа (напр. SR-2026-00345)"
            className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#CC1D1D]" />
          <button className="btn-red" onClick={() => setRes(num.toUpperCase().startsWith("SR") ? "found" : "not-found")}>Найти</button>
        </div>
        {res === "found" && (
          <div className="space-y-3 mt-2">
            {steps2.map((s, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${s.done ? "bg-[#CC1D1D]" : s.active ? "border-2 border-[#CC1D1D]" : "border-2 border-gray-200"}`}>
                  {s.done ? <Icon name="Check" size={12} className="text-white" /> : s.active ? <div className="w-2 h-2 rounded-full bg-[#CC1D1D]" /> : <div className="w-2 h-2 rounded-full bg-gray-300" />}
                </div>
                <div>
                  <p className={`text-sm font-medium ${!s.done && !s.active ? "text-gray-400" : "text-gray-800"}`}>{s.label}</p>
                  <p className="text-xs text-gray-400">{s.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {res === "not-found" && <p className="text-sm text-gray-500 text-center py-4">Заказ не найден. Проверьте номер.</p>}
        <p className="text-xs text-gray-400 mt-3 text-center">Попробуйте SR-2026-00345 для демо</p>
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="w-full flex items-center justify-between py-4 text-left gap-4" onClick={() => setOpen(!open)}>
        <span className="font-semibold text-gray-900 text-[15px]">{q}</span>
        <span className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${open ? "border-[#CC1D1D] bg-[#CC1D1D]" : "border-gray-300"}`}>
          <Icon name={open ? "Minus" : "Plus"} size={14} className={open ? "text-white" : "text-gray-500"} />
        </span>
      </button>
      {open && <p className="text-gray-600 text-sm pb-4 leading-relaxed">{a}</p>}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [trackOpen, setTrackOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* TOP BAR */}
      <div className="hidden md:block bg-gray-50 border-b border-gray-200 text-xs text-gray-500 py-1.5">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Icon name="Clock" size={12} />Пн-Пт: 10:00–19:00, Сб: 11:00–17:00</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+78001234567" className="font-semibold text-gray-800 hover:text-[#CC1D1D] transition-colors">+7 (800) 123-45-67</a>
            <button className="btn-red text-xs py-1.5 px-4">Заказать звонок</button>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <header className={`sticky top-0 z-40 bg-white transition-shadow ${scrolled ? "shadow-sm" : "border-b border-gray-100"}`}>
        <div className="container flex items-center justify-between h-14">
          <a href="#" className="font-bold text-xl tracking-tight">
            СилкРоут<span style={{ color: R }}>.</span>
          </a>
          <nav className="hidden lg:flex items-center gap-6 text-sm">
            {[
              { label: "Главная", href: "#" },
              { label: "Тарифы", href: "#tariffs" },
              { label: "Доставка", href: "#how" },
              { label: "Услуги", href: "#services" },
              { label: "Блог", href: "#blog" },
              { label: "О компании", href: "#about" },
              { label: "Контакты", href: "#contacts" },
            ].map(l => (
              <a key={l.href} href={l.href} className="text-gray-600 hover:text-[#CC1D1D] transition-colors font-medium">{l.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setTrackOpen(true)} className="hidden md:flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#CC1D1D] transition-colors font-medium">
              <Icon name="MapPin" size={15} />Отследить
            </button>
            <button onClick={() => setAccountOpen(true)} className="hidden md:flex items-center gap-1.5 btn-outline-red text-xs py-2 px-3">
              <Icon name="User" size={14} />Кабинет
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-gray-700">
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="container py-3 space-y-0.5">
              {["Главная","Тарифы","Доставка","Услуги","Блог","О компании","Контакты"].map(l => (
                <a key={l} href="#" onClick={() => setMenuOpen(false)} className="block py-2.5 text-sm font-medium text-gray-700 hover:text-[#CC1D1D] border-b border-gray-50 last:border-0 transition-colors">{l}</a>
              ))}
              <div className="flex gap-2 pt-3">
                <button onClick={() => { setTrackOpen(true); setMenuOpen(false); }} className="btn-outline-red flex-1 justify-center text-xs py-2">Отследить</button>
                <button onClick={() => { setAccountOpen(true); setMenuOpen(false); }} className="btn-red flex-1 justify-center text-xs py-2">Кабинет</button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative bg-gray-900 text-white overflow-hidden min-h-[420px] flex items-center">
        <img src={WAREHOUSE_IMG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/70 to-transparent" />
        <div className="container relative z-10 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <FadeUp>
              <p className="text-sm text-gray-400 mb-2 uppercase tracking-widest font-medium">Доставка из Китая для бизнеса</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                Доставка из Китая для<br />
                <span className="text-white">селлеров </span>
                <span style={{ color: R }}>Wildberries</span>
                <span className="text-white"> и </span>
                <span style={{ color: R }}>Ozon</span>
              </h1>
              <p className="text-gray-400 text-sm mb-6">Минимальная сумма заказа от 70 000 рублей</p>
              <ul className="space-y-2 mb-8">
                {["Найдём поставщика в Китае", "Выкупим товар на наш склад", "Доставим в Россию и страны СНГ"].map(t => (
                  <li key={t} className="flex items-center gap-2 text-sm text-gray-300">
                    <Icon name="Check" size={15} className="text-[#CC1D1D] flex-shrink-0" />{t}
                  </li>
                ))}
              </ul>
              <a href="#contacts" className="btn-red text-[15px] px-7 py-3">
                <Icon name="Calculator" size={16} />
                Рассчитать стоимость доставки
              </a>
            </FadeUp>
          </div>
          {/* Right: quick calc widget */}
          <FadeUp delay={150} className="hidden md:block">
            <div className="bg-white text-gray-900 rounded-3xl p-6 shadow-2xl max-w-sm ml-auto">
              <p className="font-bold text-base mb-4">Нужна помощь или выбираете в первый раз?</p>
              <p className="text-sm text-gray-500 mb-4">Получите индивидуальный расчёт стоимости доставки</p>
              <div className="space-y-3">
                <input placeholder="Ваш телефон или WhatsApp" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#CC1D1D]" />
                <input placeholder="Тип товара" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#CC1D1D]" />
                <button className="btn-red w-full justify-center py-3">Получить расчёт</button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-[#CC1D1D] overflow-hidden py-3">
        <div className="flex marquee-track whitespace-nowrap">
          {[...Array(3)].map((_, j) => (
            <span key={j} className="flex items-center gap-10 mr-10">
              {["Авиадоставка", "Автодоставка", "ЖД-перевозки", "Морские перевозки", "Таможенное оформление", "Выкуп товаров", "Хранение на складе"].map(t => (
                <span key={t} className="text-white text-xs font-semibold uppercase tracking-widest flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-white/50 inline-block" />{t}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* TARIFFS */}
      <section id="tariffs" className="section-pad">
        <div className="container">
          <FadeUp>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Виды доставки<br />и тарифы</h2>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 max-w-xs">
                <p className="text-sm font-semibold text-gray-800 mb-2">Нужна помощь или выбираете в первый раз?</p>
                <div className="flex gap-2">
                  <input placeholder="Ваш телефон" className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#CC1D1D] min-w-0" />
                  <button className="btn-red text-xs px-4 py-2">Получить</button>
                </div>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            {/* Популярный label */}
            <div className="flex gap-0 mb-2 overflow-x-auto">
              {tariffs.map((t, i) => (
                <div key={i} className="tariff-card" style={{ width: 160, minWidth: 160 }}>
                  {t.popular ? <span className="text-xs font-bold text-[#CC1D1D] ml-2">Популярный</span> : <span className="text-xs text-transparent">_</span>}
                </div>
              ))}
            </div>
            <div className="tariff-scroll">
              {tariffs.map((t, i) => (
                <div key={i} className={`tariff-card rounded-2xl border-2 transition-all cursor-pointer overflow-hidden ${t.popular ? "border-[#CC1D1D] shadow-md shadow-red-100" : "border-gray-200 hover:border-[#CC1D1D] hover:shadow-md hover:shadow-red-50"}`} style={{ width: 160, minWidth: 160 }}>
                  <div className={`px-3 py-2.5 text-xs font-bold uppercase tracking-wide ${t.popular ? "bg-[#CC1D1D] text-white" : "bg-gray-100 text-gray-500"}`}>
                    {t.label}
                    <span className="block font-normal normal-case text-[11px] mt-0.5 opacity-80">{t.sublabel}</span>
                  </div>
                  <div className="p-3">
                    <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center mb-2">
                      <Icon name={t.icon} size={18} className="text-[#CC1D1D]" />
                    </div>
                    <p className="text-[13px] font-semibold text-gray-800 mb-1 leading-snug">{t.name}</p>
                    <p className="text-[13px] font-bold" style={{ color: R }}>{t.price}</p>
                    <button className="mt-3 w-full border border-gray-200 hover:border-[#CC1D1D] text-gray-700 hover:text-[#CC1D1D] rounded-xl text-xs py-1.5 transition-colors font-medium">Заказать</button>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* HOW WE HELP + VALUES */}
      <section id="services" className="section-pad bg-gray-50 border-y border-gray-100">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <FadeUp>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Как мы помогаем нашим клиентам</h2>
              <p className="text-gray-500 text-sm mb-6">в работе с Китаем</p>
              <div className="relative rounded-2xl overflow-hidden mb-4">
                <img src={WAREHOUSE_IMG} alt="Склад" className="w-full h-52 object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-end p-5">
                  <div>
                    <p className="text-white font-bold text-base mb-1">Оказываем полный комплекс услуг под ключ</p>
                    <p className="text-white/70 text-xs leading-relaxed mb-3">Мы можем найти и выкупить для вас товар с любой китайской платформы, примем его на наш склад в Китае (Гуанчжоу), где мы будем его надёжно хранить, упакуем и оперативно отправим по вашему адресу в любом объёме.</p>
                    <a href="#contacts" className="btn-red text-xs py-2 px-4">Заказать услугу</a>
                  </div>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={100}>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center">
                  <p className="text-3xl font-bold mb-1" style={{ color: R }}>Быстро</p>
                  <p className="text-gray-400 text-sm">Качественно</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">Надёжно</p>
                  <p className="text-gray-400 text-sm">Выгодно</p>
                </div>
                <img src={TEAM_IMG} alt="Команда" className="w-full h-36 object-cover rounded-2xl" />
              </div>
              <div className="space-y-5">
                {steps.slice(1, 3).map((s, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold" style={{ background: R }}>{s.num}</div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-0.5">{s.title}</p>
                      <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* 3 service cards */}
          <FadeUp delay={150} className="grid md:grid-cols-3 gap-5 mt-12">
            {services.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-[#CC1D1D] hover:shadow-lg hover:shadow-red-50 transition-all">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-3">
                  <Icon name={s.icon} size={20} className="text-[#CC1D1D]" />
                </div>
                <p className="font-bold text-[15px] text-gray-900 mb-2 leading-snug">{s.title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section id="how" className="section-pad">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <FadeUp>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Как мы работаем</h2>
              <div className="space-y-6">
                {steps.map((s, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm" style={{ background: R }}>{s.num}</div>
                    <div className="pt-1">
                      <p className="font-semibold text-gray-900 mb-1">{s.title}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={100}>
              <div className="flex gap-2 items-baseline mb-6">
                <span className="text-2xl font-bold" style={{ color: R }}>Быстро</span>
                <span className="text-gray-400 font-medium">Качественно</span>
              </div>
              <div className="flex gap-2 items-baseline mb-8">
                <span className="text-2xl font-bold text-gray-900">Надёжно</span>
                <span className="text-gray-400 font-medium">Выгодно</span>
              </div>
              <div className="space-y-5">
                {steps.map((s, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold" style={{ background: R }}>{s.num}</div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{s.title}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl overflow-hidden">
                <img src={TEAM_IMG} alt="Склад Китай" className="w-full h-48 object-cover" />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* TRACKING BANNER */}
      <div className="bg-gray-900 text-white py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon name="MapPin" size={24} className="text-[#CC1D1D]" />
            <div>
              <p className="font-bold">Отследите ваш заказ</p>
              <p className="text-gray-400 text-sm">Узнайте статус доставки в режиме реального времени</p>
            </div>
          </div>
          <button onClick={() => setTrackOpen(true)} className="btn-red px-8 py-3">
            <Icon name="Search" size={16} />Отследить заказ
          </button>
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="section-pad bg-gray-50 border-y border-gray-100">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <span className="text-xs font-bold text-[#CC1D1D] uppercase tracking-widest mb-2 block">О компании</span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Доставка из Китая с 2018 года</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                СилкРоут — надёжный партнёр для бизнеса, который работает с Китаем. Мы выстроили собственную
                сеть складов в Гуанчжоу, Иу, Шэньчжэне и Шанхае. Наши сотрудники говорят по-китайски и
                берут на себя весь процесс — от поиска поставщика до доставки до вашего склада.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { num: "8+", label: "лет на рынке" },
                  { num: "12 000+", label: "клиентов" },
                  { num: "150 000+", label: "доставок" },
                  { num: "98%", label: "грузов в срок" },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl border border-gray-200 p-3 text-center">
                    <p className="text-2xl font-bold" style={{ color: R }}>{s.num}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
              <a href="#contacts" className="btn-red">Связаться с нами</a>
            </FadeUp>
            <FadeUp delay={100}>
              <img src={TEAM_IMG} alt="Команда СилкРоут" className="rounded-2xl w-full object-cover h-72 md:h-96" />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="section-pad">
        <div className="container">
          <FadeUp>
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Полезные статьи</h2>
              <a href="#" className="text-sm text-[#CC1D1D] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Перейти в Блог <Icon name="ArrowRight" size={14} />
              </a>
            </div>
          </FadeUp>
          <FadeUp delay={100} className="grid md:grid-cols-2 gap-5">
            {articles.map((a, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-gray-200 hover:border-[#CC1D1D] hover:shadow-lg hover:shadow-red-50 transition-all cursor-pointer group">
                <div className="relative h-44">
                  <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <p className="font-semibold text-sm text-gray-800 leading-snug">{a.title}</p>
                  <Icon name="ArrowRight" size={18} className="text-[#CC1D1D] flex-shrink-0 ml-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad bg-gray-50 border-y border-gray-100">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <FadeUp>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Частые вопросы / FAQ</h2>
              <p className="text-gray-500 text-sm mb-6">Не нашли ответа? Напишите нам — ответим в течение 15 минут.</p>
              <a href="#contacts" className="btn-red">Задать вопрос</a>
            </FadeUp>
            <FadeUp delay={100}>
              <div>
                {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="section-pad">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <FadeUp>
              <span className="text-xs font-bold text-[#CC1D1D] uppercase tracking-widest mb-2 block">Свяжитесь с нами</span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Рассчитайте доставку бесплатно</h2>
              <p className="text-gray-500 text-sm mb-6">Ответим в течение 15 минут и подберём оптимальный маршрут</p>
              <div className="space-y-3 mb-8">
                {[
                  { icon: "Phone", v: "+7 (800) 123-45-67" },
                  { icon: "Mail", v: "hello@silkroute.ru" },
                  { icon: "MessageCircle", v: "WhatsApp: +7 (916) 123-45-67" },
                  { icon: "MapPin", v: "Москва, ул. Тверская, 14" },
                ].map(c => (
                  <div key={c.icon} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#fff0f0" }}>
                      <Icon name={c.icon} size={15} className="text-[#CC1D1D]" />
                    </div>
                    <span className="text-sm text-gray-700">{c.v}</span>
                  </div>
                ))}
              </div>
              <img src={WAREHOUSE_IMG} alt="" className="rounded-2xl w-full h-40 object-cover" />
            </FadeUp>
            <FadeUp delay={100}>
              <div className="bg-gray-50 rounded-3xl border border-gray-200 p-6">
                <h3 className="font-bold text-lg mb-4">Заявка на расчёт доставки</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="Ваше имя" className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#CC1D1D] bg-white" />
                    <input placeholder="Телефон / WhatsApp" className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#CC1D1D] bg-white" />
                  </div>
                  <input placeholder="Тип товара" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#CC1D1D] bg-white" />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="Вес (кг)" type="number" className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#CC1D1D] bg-white" />
                    <select className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#CC1D1D] bg-white text-gray-700">
                      <option value="">Способ доставки</option>
                      <option>Авиа</option>
                      <option>Авто</option>
                      <option>ЖД</option>
                      <option>Море</option>
                    </select>
                  </div>
                  <textarea placeholder="Дополнительные пожелания" rows={3} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#CC1D1D] bg-white resize-none" />
                  <button className="btn-red w-full justify-center py-3">
                    <Icon name="Send" size={15} />Отправить заявку
                  </button>
                  <p className="text-xs text-gray-400 text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="font-bold text-lg mb-2">СилкРоут<span style={{ color: R }}>.</span></p>
              <p className="text-gray-400 text-xs leading-relaxed mb-3">Доставка из Китая с 2018 года</p>
              <p className="text-gray-400 text-xs">Пн-Пт: 10:00–19:00</p>
              <p className="text-gray-400 text-xs">Сб: 11:00–17:00</p>
            </div>
            {[
              { title: "Доставка", links: ["Авиадоставка", "Автодоставка", "ЖД-доставка", "Морская доставка"] },
              { title: "Услуги", links: ["Выкуп товаров", "Хранение", "Таможня", "Страхование"] },
              { title: "Компания", links: ["О нас", "Блог", "Отзывы", "Контакты"] },
            ].map(col => (
              <div key={col.title}>
                <p className="font-semibold text-sm mb-3">{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map(l => (
                    <li key={l}><a href="#" className="text-gray-400 text-xs hover:text-[#CC1D1D] transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-gray-500 text-xs">© 2026 СилкРоут. Все права защищены.</p>
            <a href="#" className="text-gray-500 text-xs hover:text-white transition-colors">Политика конфиденциальности</a>
            <p className="text-gray-600 text-xs">+7 (800) 123-45-67</p>
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <button onClick={() => setTrackOpen(true)}
        className="fixed bottom-6 right-6 z-30 btn-red rounded-2xl w-14 h-14 p-0 flex items-center justify-center hover:scale-110 transition-transform"
        title="Отследить заказ">
        <Icon name="MapPin" size={22} />
      </button>

      {accountOpen && <AccountModal onClose={() => setAccountOpen(false)} />}
      {trackOpen && <TrackingModal onClose={() => setTrackOpen(false)} />}
    </div>
  );
}