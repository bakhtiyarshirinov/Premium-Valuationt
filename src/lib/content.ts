export type Locale = "az" | "ru";

export const locales: Locale[] = ["az", "ru"];

export const companyInfo = {
  name: "Premium Qiymətləndirmə MMC",
  address: "Bakı şəhəri, Nərimanov rayonu, Məmməd Araz 20 (AP Plaza)",
  phones: ["+994 50 380 15 02", "+994 70 380 15 02"],
  phoneLinks: ["+994503801502", "+994703801502"],
  email: "premiumqiymetlendirme@gmail.com",
  whatsappNumber: "994503801502",
  mapEmbedSrc:
    "https://www.google.com/maps?q=Memmed+Araz+20+AP+Plaza+Baku&output=embed",
};

export type ServiceId =
  | "daşınmaz-əmlak"
  | "daşınar-əmlak"
  | "biznes"
  | "zərər-risk"
  | "qeyri-maddi";

export interface ServiceContent {
  id: ServiceId;
  icon: "home" | "truck" | "briefcase" | "shield-alert" | "gem";
  title: string;
  shortDesc: string;
  longDesc: string;
  bullets: string[];
}

// PLACEHOLDER — client will provide real team photos and names later.
// imageUrl stays null until then; avatar component falls back to an icon.
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string | null;
}

// TODO: client will provide real photos and names — currently placeholder data
export interface NewsArticle {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  body: string[];
}

interface SiteContent {
  nav: {
    home: string;
    services: string;
    about: string;
    news: string;
    contact: string;
    calculator: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scrollHint: string;
  };
  stats: { value: number; suffix: string; label: string }[];
  servicesSection: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: string;
  };
  services: ServiceContent[];
  process: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: { title: string; desc: string; time: string }[];
  };
  whyUs: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { title: string; desc: string }[];
  };
  team: {
    eyebrow: string;
    title: string;
    subtitle: string;
    members: TeamMember[];
  };
  newsSection: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: string;
    readMore: string;
  };
  news: NewsArticle[];
  about: {
    eyebrow: string;
    title: string;
    paragraph: string;
    cta: string;
  };
  ctaBanner: {
    title: string;
    subtitle: string;
    cta: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    addressLabel: string;
    phoneLabel: string;
    emailLabel: string;
    hoursLabel: string;
    hoursValue: string;
    form: {
      name: string;
      namePlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      service: string;
      servicePlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submitWhatsapp: string;
      submitEmail: string;
      successToast: string;
      errorRequired: string;
    };
  };
  footer: {
    tagline: string;
    quickLinksTitle: string;
    servicesTitle: string;
    contactTitle: string;
    rights: string;
  };
  pages: {
    services: { title: string; description: string; heroTitle: string; heroSubtitle: string };
    about: {
      title: string;
      description: string;
      heroTitle: string;
      heroSubtitle: string;
      missionTitle: string;
      mission: string;
      visionTitle: string;
      vision: string;
      valuesTitle: string;
      values: { title: string; desc: string }[];
    };
    contact: { title: string; description: string; heroTitle: string; heroSubtitle: string };
    news: { title: string; description: string; heroTitle: string; heroSubtitle: string };
  };
}

const az: SiteContent = {
  nav: {
    home: "Ana Səhifə",
    services: "Xidmətlər",
    about: "Haqqımızda",
    news: "Xəbərlər",
    contact: "Əlaqə",
    calculator: "Kalkulyator",
    cta: "Sifariş et",
  },
  hero: {
    eyebrow: "Peşəkar Qiymətləndirmə Xidmətləri",
    title: "PREMIUM QİYMƏTLƏNDİRMƏ",
    subtitle:
      "Daşınmaz əmlak, biznes və aktivlərin dəqiq, etibarlı və sürətli qiymətləndirilməsi",
    ctaPrimary: "Sifariş et",
    ctaSecondary: "Xidmətlərimiz",
    scrollHint: "Aşağı sürüşdür",
  },
  stats: [
    { value: 5, suffix: "+", label: "İllik Təcrübə" },
    { value: 200, suffix: "+", label: "Müştəri" },
    { value: 350, suffix: "+", label: "Layihə" },
    { value: 5, suffix: "", label: "Xidmət Sahəsi" },
  ],
  servicesSection: {
    eyebrow: "Xidmətlərimiz",
    title: "Qiymətləndirmə Sahələrimiz",
    subtitle:
      "Beynəlxalq standartlara uyğun metodologiya ilə geniş spektrli qiymətləndirmə xidmətləri təklif edirik",
    cta: "Ətraflı",
  },
  services: [
    {
      id: "daşınmaz-əmlak",
      icon: "home",
      title: "Daşınmaz Əmlakın Qiymətləndirilməsi",
      shortDesc: "Mənzil, ev, torpaq və kommersiya obyektlərinin bazar dəyərinin müəyyənləşdirilməsi",
      longDesc:
        "Mənzil, fərdi ev, torpaq sahəsi və kommersiya təyinatlı obyektlərin bazar dəyərini beynəlxalq qiymətləndirmə standartlarına əsaslanaraq müəyyən edirik. Bank krediti, alqı-satqı, icarə və hüquqi proseslər üçün etibarlı hesabat təqdim olunur.",
      bullets: [
        "Mənzil və yaşayış sahələri",
        "Fərdi yaşayış evləri və villalar",
        "Torpaq sahələri",
        "Ofis, anbar və kommersiya obyektləri",
        "Bank krediti üçün girov qiymətləndirməsi",
      ],
    },
    {
      id: "daşınar-əmlak",
      icon: "truck",
      title: "Daşınar Əmlakın Qiymətləndirilməsi",
      shortDesc: "Avadanlıq, nəqliyyat vasitələri və texnikanın dəyər ekspertizası",
      longDesc:
        "İstehsalat avadanlıqları, nəqliyyat vasitələri, xüsusi texnika və digər daşınar aktivlərin cari bazar dəyərini texniki vəziyyət, amortizasiya və bazar göstəricilərini nəzərə alaraq qiymətləndiririk.",
      bullets: [
        "İstehsalat və sənaye avadanlıqları",
        "Minik və yük nəqliyyat vasitələri",
        "Xüsusi texnika və mexanizmlər",
        "Ofis texnikası və avadanlıqlar",
        "Sığorta və lizinq üçün qiymətləndirmə",
      ],
    },
    {
      id: "biznes",
      icon: "briefcase",
      title: "Biznes və Müəssisələrin Qiymətləndirilməsi",
      shortDesc: "Şirkətin tam bazar dəyərinin və pay strukturunun müəyyən edilməsi",
      longDesc:
        "Fəaliyyət göstərən müəssisələrin, paylarının və biznes layihələrinin bazar dəyərini maliyyə təhlili, gəlir potensialı və sahə göstəriciləri əsasında qiymətləndiririk. Birləşmə, satış və investisiya qərarları üçün dəstək oluruq.",
      bullets: [
        "Şirkətin tam bazar dəyəri",
        "Pay və nizamnamə kapitalının dəyəri",
        "Birləşmə və satınalma əməliyyatları",
        "İnvestisiya layihələrinin qiymətləndirilməsi",
        "Maliyyə hesabatlılığı üçün ekspertiza",
      ],
    },
    {
      id: "zərər-risk",
      icon: "shield-alert",
      title: "Zərər və Risklərin Qiymətləndirilməsi",
      shortDesc: "Sığorta, məhkəmə və mübahisəli hallar üçün ekspert rəyi",
      longDesc:
        "Sığorta hadisələri, məhkəmə çəkişmələri və mübahisəli vəziyyətlərdə dəyən zərərin həcmini müstəqil ekspert rəyi ilə sənədləşdiririk. Hesabatlarımız məhkəmə və dövlət qurumları tərəfindən qəbul edilən formatda hazırlanır.",
      bullets: [
        "Sığorta hadisələri üzrə zərər hesablanması",
        "Məhkəmə-iqtisad ekspertizası",
        "Mübahisəli əmlak qiymətləndirməsi",
        "Risk təhlili və hesabatlılığı",
        "Dövlət qurumları üçün rəsmi rəy",
      ],
    },
    {
      id: "qeyri-maddi",
      icon: "gem",
      title: "Qeyri-Maddi Aktivlərin Qiymətləndirilməsi",
      shortDesc: "Əqli mülkiyyət, brend, pay və qiymətli kağızların dəyər təhlili",
      longDesc:
        "Əqli mülkiyyət hüquqları, ticarət markası, brend dəyəri, pay və qiymətli kağızlar kimi qeyri-maddi aktivlərin bazar dəyərini beynəlxalq metodologiya ilə müəyyənləşdiririk.",
      bullets: [
        "Əqli mülkiyyət və patentlər",
        "Brend və ticarət markası dəyəri",
        "Səhm və qiymətli kağızlar",
        "Lisenziya və müqavilə hüquqları",
        "Qudvil (goodwill) qiymətləndirməsi",
      ],
    },
  ],
  process: {
    eyebrow: "Necə İşləyir",
    title: "Qiymətləndirmə Prosesi",
    subtitle: "Sadə, şəffaf və izlənilə bilən 4 addımlı proses",
    steps: [
      {
        title: "Müraciət",
        desc: "Formu doldurun və ya bizə zəng/WhatsApp vasitəsilə müraciət edin",
        time: "5 dəqiqə",
      },
      {
        title: "Sahədə baxış və ekspertiza",
        desc: "Mütəxəssisimiz təyin olunan vaxtda obyektə baxış keçirir",
        time: "1-2 gün",
      },
      {
        title: "Hesabatın hazırlanması",
        desc: "Toplanan məlumatlar əsasında qiymətləndirmə hesabatı tərtib olunur",
        time: "2-3 gün",
      },
      {
        title: "Rəsmi nəticənin təqdimatı",
        desc: "Möhürlü rəsmi hesabat sizə təhvil verilir",
        time: "1 gün",
      },
    ],
  },
  whyUs: {
    eyebrow: "Niyə Biz",
    title: "Bizi Seçməyiniz üçün Səbəblər",
    subtitle: "Müştərilərimizə yüksək keyfiyyət və etibarlılıq təqdim edirik",
    items: [
      { title: "Sürətli icra", desc: "Müraciətdən nəticəyə qədər minimal müddət" },
      { title: "Şəffaf qiymət", desc: "Gizli xərc yoxdur, qiymət əvvəlcədən razılaşdırılır" },
      { title: "Beynəlxalq metodologiya", desc: "Qlobal qiymətləndirmə standartlarına uyğunluq" },
      { title: "Akkreditasiya olunmuş mütəxəssislər", desc: "Sertifikatlı və təcrübəli ekspertlər" },
      { title: "Fərdi yanaşma", desc: "Hər layihəyə xüsusi diqqət və çevik həll yolları" },
      { title: "Bütün Azərbaycan üzrə xidmət", desc: "Bakı və regionlarda əmlak ekspertizası" },
    ],
  },
  team: {
    eyebrow: "Komandamız",
    title: "Peşəkar Komandamızla Tanış Olun",
    subtitle:
      "Sahə üzrə təcrübəli mütəxəssislərimiz sizə ən dəqiq və etibarlı xidməti təqdim edir",
    members: [
      // imageUrl: set to "/images/team/<slug>.jpg" when photo is ready
      { id: "edalat-shirinov",       name: "Ədalət Şirinov",       role: "Direktor / Təsisçi",           imageUrl: null },
      { id: "faqan-safaraliyev",     name: "Fəqan Səfərəliyev",    role: "Baş Qiymətləndirici",          imageUrl: null },
      { id: "nahid-ibrahim",         name: "Nahid İbrahimov",         role: "Baş Mühasib",                  imageUrl: null },
      { id: "sahin-allahverdiyev",   name: "Şahin Allahverdiyev",  role: "Qiymətləndirici Köməkçisi",    imageUrl: null },
      { id: "baxtiyar-shirinov",     name: "Bəxtiyar Şirinov",     role: "Qiymətləndirici Köməkçisi",    imageUrl: null },
      { id: "samira-rahimova",       name: "Samirə Rəhimova",      role: "Direktor muavini",            imageUrl: null },
      { id: "aysel-rahimova",        name: "Aysel Qurbanova",       role: "Office Manager",               imageUrl: null },
    ],
  },
  newsSection: {
    eyebrow: "Xəbərlər",
    title: "Son Xəbərlər və Analitika",
    subtitle: "Şirkətimizin son xəbərləri və bazarla bağlı analitik məqalələr",
    cta: "Hamısına bax",
    readMore: "Ətraflı oxu",
  },
  // TODO: client will provide real article content later — currently placeholder data
  news: [
    {
      slug: "dasinmaz-emlak-bazarinda-qiymet-dinamikasi",
      date: "2026-05-12",
      title: "Daşınmaz əmlak bazarında qiymət dinamikası",
      excerpt:
        "Bakı daşınmaz əmlak bazarında son rüb ərzində müşahidə olunan qiymət dəyişikliklərinə qısa baxış.",
      body: [
        "Son aylarda Bakı şəhəri üzrə daşınmaz əmlak bazarında həm tələb, həm də qiymət göstəricilərində nəzərə çarpan dinamika müşahidə olunur. Mənzil seqmentində qiymətlər əsasən sabit qalsa da, kommersiya obyektlərində regional fərqlər artmaqdadır.",
        "Qiymətləndirmə zamanı bazar tendensiyalarının düzgün təhlili böyük əhəmiyyət kəsb edir. Mütəxəssislərimiz hər obyekti ətraflı bazar araşdırması əsasında qiymətləndirir və müştərilərimizə real bazar dəyərini əks etdirən hesabat təqdim edir.",
        "Bu, placeholder məqalədir — real bazar analitikası və statistik məlumatlar tezliklə əlavə olunacaq.",
      ],
    },
    {
      slug: "biznes-qiymetlendirilmesinde-beynelxalq-standartlar",
      date: "2026-04-28",
      title: "Biznes qiymətləndirilməsində beynəlxalq standartlar",
      excerpt:
        "IVS və IFRS standartlarının biznes qiymətləndirməsi proseslərinə tətbiqi haqqında qısa məlumat.",
      body: [
        "Beynəlxalq Qiymətləndirmə Standartları (IVS) və Maliyyə Hesabatlılığının Beynəlxalq Standartları (IFRS) biznes qiymətləndirməsi sahəsində etibarlılığın əsas təminatçısıdır.",
        "Bu standartlara uyğunluq, qiymətləndirmə hesabatlarının həm yerli, həm də beynəlxalq səviyyədə qəbul edilməsini təmin edir. Komandamız bütün layihələrdə bu metodologiyalara əsaslanır.",
        "Bu, placeholder məqalədir — mövzu üzrə ətraflı analitik məzmun tezliklə əlavə olunacaq.",
      ],
    },
    {
      slug: "premium-qiymetlendirme-yeni-xidmet-saheni-teqdim-edir",
      date: "2026-04-10",
      title: "Premium Qiymətləndirmə yeni xidmət sahəsini təqdim edir",
      excerpt:
        "Şirkətimiz müştərilərinə daha geniş xidmət spektri təklif etmək üçün yeni istiqamət üzərində işləyir.",
      body: [
        "Premium Qiymətləndirmə MMC olaraq, müştərilərimizin artan tələbatına cavab vermək üçün xidmət spektrimizi davamlı olaraq genişləndiririk.",
        "Yeni xidmət sahəsi haqqında ətraflı məlumat tezliklə rəsmi olaraq elan olunacaq. Komandamız hazırda bu istiqamətdə son hazırlıq işlərini aparır.",
        "Bu, placeholder məqalədir — rəsmi elan və xidmət detalları tezliklə əlavə olunacaq.",
      ],
    },
  ],
  about: {
    eyebrow: "Haqqımızda",
    title: "Etibara Əsaslanan Qiymətləndirmə",
    paragraph:
      "Premium Qiymətləndirmə MMC olaraq, daşınmaz əmlak, biznes və aktivlərin dəqiq qiymətləndirilməsi sahəsində peşəkar komanda ilə fəaliyyət göstəririk. Məqsədimiz hər müştəriyə şəffaf, sürətli və beynəlxalq standartlara cavab verən nəticə təqdim etməkdir.",
    cta: "Daha çox öyrən",
  },
  ctaBanner: {
    title: "Əmlakınızın və ya biznesinizin dəyərini bilmək istəyirsiniz?",
    subtitle: "Mütəxəssis komandamız sizə 24 saat ərzində geri dönüş edəcək",
    cta: "İndi sorğu göndər",
  },
  contact: {
    eyebrow: "Əlaqə",
    title: "Bizimlə Əlaqə Saxlayın",
    subtitle: "Sualınız var? Sorğu formunu doldurun, ən qısa zamanda sizinlə əlaqə saxlayacağıq",
    addressLabel: "Ünvan",
    phoneLabel: "Telefon",
    emailLabel: "Email",
    hoursLabel: "İş saatları",
    hoursValue: "B.e – Cümə: 09:00 – 18:00",
    form: {
      name: "Ad Soyad",
      namePlaceholder: "Adınızı və soyadınızı daxil edin",
      phone: "Telefon",
      phonePlaceholder: "+994 XX XXX XX XX",
      email: "Email",
      emailPlaceholder: "email@example.com",
      service: "Xidmət növü",
      servicePlaceholder: "Xidmət seçin",
      message: "Mesajınız",
      messagePlaceholder: "Sorğunuzu qısaca yazın...",
      submitWhatsapp: "WhatsApp ilə göndər",
      submitEmail: "Email ilə göndər",
      successToast: "WhatsApp açılır...",
      errorRequired: "Bu xana mütləq doldurulmalıdır",
    },
  },
  footer: {
    tagline: "Dəqiq, etibarlı və sürətli qiymətləndirmə xidmətləri.",
    quickLinksTitle: "Sürətli Keçidlər",
    servicesTitle: "Xidmətlər",
    contactTitle: "Əlaqə",
    rights: "© 2026 Premium Qiymətləndirmə MMC. Bütün hüquqlar qorunur.",
  },
  pages: {
    services: {
      title: "Xidmətlər",
      description:
        "Premium Qiymətləndirmə MMC-nin təklif etdiyi daşınmaz əmlak, daşınar əmlak, biznes, risk və qeyri-maddi aktivlərin qiymətləndirilməsi xidmətləri.",
      heroTitle: "Xidmətlərimiz",
      heroSubtitle: "Beynəlxalq standartlara uyğun, geniş spektrli qiymətləndirmə həlləri",
    },
    about: {
      title: "Haqqımızda",
      description:
        "Premium Qiymətləndirmə MMC haqqında — missiyamız, dəyərlərimiz və peşəkar komandamız.",
      heroTitle: "Haqqımızda",
      heroSubtitle: "Etibar və dəqiqlik üzərində qurulan qiymətləndirmə təcrübəsi",
      missionTitle: "Missiyamız",
      mission:
        "Müştərilərimizə əmlak və aktivlərinin real dəyərini şəffaf, obyektiv və beynəlxalq standartlara uyğun şəkildə müəyyənləşdirməkdə dəstək olmaq.",
      visionTitle: "Vizyonumuz",
      vision:
        "Azərbaycanda qiymətləndirmə sektorunda etibarlılıq və peşəkarlığın simvolu olmaq.",
      valuesTitle: "Dəyərlərimiz",
      values: [
        { title: "Obyektivlik", desc: "Hər qiymətləndirmə qərəzsiz və faktlara əsaslanır" },
        { title: "Şəffaflıq", desc: "Proses və qiymət siyasətimiz tam açıqdır" },
        { title: "Peşəkarlıq", desc: "Sertifikatlı ekspertlər və müasir metodologiya" },
        { title: "Sürət", desc: "Vaxtınıza dəyər veririk, prosesi optimallaşdırırıq" },
      ],
    },
    contact: {
      title: "Əlaqə",
      description:
        "Premium Qiymətləndirmə MMC ilə əlaqə — ünvan, telefon, email və sorğu formu.",
      heroTitle: "Bizimlə Əlaqə",
      heroSubtitle: "Sualınızı bildirin, mütəxəssis komandamız sizinlə əlaqə saxlasın",
    },
    news: {
      title: "Xəbərlər",
      description:
        "Premium Qiymətləndirmə MMC-nin son xəbərləri və bazarla bağlı analitik məqalələri.",
      heroTitle: "Xəbərlər",
      heroSubtitle: "Şirkətimizin son xəbərləri və bazarla bağlı analitik məqalələr",
    },
  },
};

const ru: SiteContent = {
  nav: {
    home: "Главная",
    services: "Услуги",
    about: "О нас",
    news: "Новости",
    contact: "Контакты",
    calculator: "Калькулятор",
    cta: "Заказать",
  },
  hero: {
    eyebrow: "Профессиональные услуги оценки",
    title: "PREMIUM ОЦЕНКА",
    subtitle:
      "Точная, надёжная и быстрая оценка недвижимости, бизнеса и активов",
    ctaPrimary: "Заказать",
    ctaSecondary: "Наши услуги",
    scrollHint: "Прокрутите вниз",
  },
  stats: [
    { value: 5, suffix: "+", label: "Лет опыта" },
    { value: 200, suffix: "+", label: "Клиентов" },
    { value: 350, suffix: "+", label: "Проектов" },
    { value: 5, suffix: "", label: "Направлений услуг" },
  ],
  servicesSection: {
    eyebrow: "Наши услуги",
    title: "Направления Оценки",
    subtitle:
      "Предлагаем широкий спектр услуг оценки по международным стандартам",
    cta: "Подробнее",
  },
  services: [
    {
      id: "daşınmaz-əmlak",
      icon: "home",
      title: "Оценка недвижимости",
      shortDesc: "Определение рыночной стоимости квартир, домов, земли и коммерческих объектов",
      longDesc:
        "Определяем рыночную стоимость квартир, частных домов, земельных участков и коммерческих объектов на основе международных стандартов оценки. Надёжный отчёт для банковского кредита, купли-продажи, аренды и юридических процессов.",
      bullets: [
        "Квартиры и жилые помещения",
        "Частные дома и виллы",
        "Земельные участки",
        "Офисы, склады и коммерческие объекты",
        "Залоговая оценка для банковского кредита",
      ],
    },
    {
      id: "daşınar-əmlak",
      icon: "truck",
      title: "Оценка движимого имущества",
      shortDesc: "Экспертиза стоимости оборудования, транспорта и техники",
      longDesc:
        "Оцениваем текущую рыночную стоимость производственного оборудования, транспортных средств, спецтехники и других движимых активов с учётом технического состояния, амортизации и рыночных показателей.",
      bullets: [
        "Производственное и промышленное оборудование",
        "Легковой и грузовой транспорт",
        "Спецтехника и механизмы",
        "Офисная техника и оборудование",
        "Оценка для страхования и лизинга",
      ],
    },
    {
      id: "biznes",
      icon: "briefcase",
      title: "Оценка бизнеса и предприятий",
      shortDesc: "Определение полной рыночной стоимости компании и структуры долей",
      longDesc:
        "Оцениваем рыночную стоимость действующих предприятий, долей и бизнес-проектов на основе финансового анализа, потенциала доходности и отраслевых показателей. Поддержка при слияниях, продаже и инвестиционных решениях.",
      bullets: [
        "Полная рыночная стоимость компании",
        "Стоимость доли и уставного капитала",
        "Сделки слияния и поглощения",
        "Оценка инвестиционных проектов",
        "Экспертиза для финансовой отчётности",
      ],
    },
    {
      id: "zərər-risk",
      icon: "shield-alert",
      title: "Оценка ущерба и рисков",
      shortDesc: "Экспертное заключение для страховых и судебных случаев",
      longDesc:
        "Документируем размер ущерба при страховых случаях, судебных спорах и конфликтных ситуациях с помощью независимого экспертного заключения. Отчёты принимаются судебными и государственными органами.",
      bullets: [
        "Расчёт ущерба по страховым случаям",
        "Судебно-экономическая экспертиза",
        "Оценка спорного имущества",
        "Анализ и отчётность по рискам",
        "Официальное заключение для госорганов",
      ],
    },
    {
      id: "qeyri-maddi",
      icon: "gem",
      title: "Оценка нематериальных активов",
      shortDesc: "Анализ стоимости интеллектуальной собственности, бренда и ценных бумаг",
      longDesc:
        "Определяем рыночную стоимость нематериальных активов — прав интеллектуальной собственности, торговой марки, бренда, долей и ценных бумаг — по международной методологии.",
      bullets: [
        "Интеллектуальная собственность и патенты",
        "Стоимость бренда и торговой марки",
        "Акции и ценные бумаги",
        "Лицензионные и договорные права",
        "Оценка гудвилла",
      ],
    },
  ],
  process: {
    eyebrow: "Как это работает",
    title: "Процесс оценки",
    subtitle: "Простой, прозрачный и понятный процесс из 4 шагов",
    steps: [
      {
        title: "Заявка",
        desc: "Заполните форму или свяжитесь с нами по телефону/WhatsApp",
        time: "5 минут",
      },
      {
        title: "Осмотр и экспертиза",
        desc: "Наш специалист проводит осмотр объекта в назначенное время",
        time: "1-2 дня",
      },
      {
        title: "Подготовка отчёта",
        desc: "На основе собранных данных составляется отчёт об оценке",
        time: "2-3 дня",
      },
      {
        title: "Передача результата",
        desc: "Вам передаётся официальный отчёт с печатью",
        time: "1 день",
      },
    ],
  },
  whyUs: {
    eyebrow: "Почему мы",
    title: "Причины выбрать нас",
    subtitle: "Предлагаем клиентам высокое качество и надёжность",
    items: [
      { title: "Быстрое исполнение", desc: "Минимальные сроки от заявки до результата" },
      { title: "Прозрачная цена", desc: "Без скрытых затрат, цена согласовывается заранее" },
      { title: "Международная методология", desc: "Соответствие глобальным стандартам оценки" },
      { title: "Аккредитованные специалисты", desc: "Сертифицированные и опытные эксперты" },
      { title: "Индивидуальный подход", desc: "Особое внимание к каждому проекту" },
      { title: "Услуги по всему Азербайджану", desc: "Экспертиза в Баку и регионах" },
    ],
  },
  team: {
    eyebrow: "Наша команда",
    title: "Познакомьтесь с нашей командой",
    subtitle:
      "Опытные специалисты в каждой области предоставляют вам максимально точную и надёжную услугу",
    members: [
      // imageUrl: set to "/images/team/<slug>.jpg" when photo is ready
      { id: "edalat-shirinov",       name: "Ədalət Şirinov",       role: "Директор / Основатель",        imageUrl: null },
      { id: "samira-rahimova",       name: "Samirə Rəhimova",      role: "Заместитель директора",        imageUrl: null },
      { id: "faqan-safaraliyev",     name: "Fəqan Səfərəliyev",    role: "Главный оценщик",              imageUrl: null },
      { id: "nahid-ibrahim",         name: "Nahid İbrahim",         role: "Главный бухгалтер",            imageUrl: null },
      { id: "sahin-allahverdiyev",   name: "Şahin Allahverdiyev",  role: "Помощник оценщика",            imageUrl: null },
      { id: "baxtiyar-shirinov",     name: "Bəxtiyar Şirinov",     role: "Помощник оценщика",            imageUrl: null },
      
      { id: "aysel-rahimova",        name: "Aysel Rəhimova",       role: "Офис-менеджер",                imageUrl: null },
    ],
  },
  newsSection: {
    eyebrow: "Новости",
    title: "Последние новости и аналитика",
    subtitle: "Последние новости компании и аналитические статьи о рынке",
    cta: "Смотреть все",
    readMore: "Читать далее",
  },
  // TODO: client will provide real article content later — currently placeholder data
  news: [
    {
      slug: "dasinmaz-emlak-bazarinda-qiymet-dinamikasi",
      date: "2026-05-12",
      title: "Динамика цен на рынке недвижимости",
      excerpt:
        "Краткий обзор изменений цен на рынке недвижимости Баку за последний квартал.",
      body: [
        "В последние месяцы на рынке недвижимости Баку наблюдается заметная динамика как по спросу, так и по ценовым показателям. В жилом сегменте цены остаются в целом стабильными, тогда как в коммерческой недвижимости региональные различия усиливаются.",
        "При оценке крайне важен правильный анализ рыночных тенденций. Наши специалисты оценивают каждый объект на основе детального изучения рынка и предоставляют клиентам отчёт, отражающий реальную рыночную стоимость.",
        "Это placeholder-статья — реальная рыночная аналитика и статистические данные будут добавлены позже.",
      ],
    },
    {
      slug: "biznes-qiymetlendirilmesinde-beynelxalq-standartlar",
      date: "2026-04-28",
      title: "Международные стандарты в оценке бизнеса",
      excerpt:
        "Краткая информация о применении стандартов IVS и IFRS в процессах оценки бизнеса.",
      body: [
        "Международные стандарты оценки (IVS) и Международные стандарты финансовой отчётности (IFRS) являются основной гарантией надёжности в сфере оценки бизнеса.",
        "Соответствие этим стандартам обеспечивает признание отчётов об оценке как на местном, так и на международном уровне. Наша команда руководствуется этой методологией во всех проектах.",
        "Это placeholder-статья — подробный аналитический материал по теме будет добавлен позже.",
      ],
    },
    {
      slug: "premium-qiymetlendirme-yeni-xidmet-saheni-teqdim-edir",
      date: "2026-04-10",
      title: "Premium Qiymətləndirmə представляет новое направление услуг",
      excerpt:
        "Наша компания работает над новым направлением, чтобы предложить клиентам более широкий спектр услуг.",
      body: [
        "Компания Premium Qiymətləndirmə MMC постоянно расширяет спектр услуг, чтобы соответствовать растущим потребностям клиентов.",
        "Подробная информация о новом направлении услуг будет официально объявлена в ближайшее время. Команда сейчас завершает финальную подготовку в этом направлении.",
        "Это placeholder-статья — официальное объявление и детали услуги будут добавлены позже.",
      ],
    },
  ],
  about: {
    eyebrow: "О нас",
    title: "Оценка, основанная на доверии",
    paragraph:
      "Premium Qiymətləndirmə MMC — профессиональная команда, специализирующаяся на точной оценке недвижимости, бизнеса и активов. Наша цель — предоставить каждому клиенту прозрачный, быстрый результат, соответствующий международным стандартам.",
    cta: "Узнать больше",
  },
  ctaBanner: {
    title: "Хотите узнать стоимость вашей недвижимости или бизнеса?",
    subtitle: "Наша команда специалистов свяжется с вами в течение 24 часов",
    cta: "Отправить заявку",
  },
  contact: {
    eyebrow: "Контакты",
    title: "Свяжитесь с нами",
    subtitle: "Есть вопрос? Заполните форму, мы свяжемся с вами в ближайшее время",
    addressLabel: "Адрес",
    phoneLabel: "Телефон",
    emailLabel: "Email",
    hoursLabel: "Часы работы",
    hoursValue: "Пн – Пт: 09:00 – 18:00",
    form: {
      name: "Имя Фамилия",
      namePlaceholder: "Введите имя и фамилию",
      phone: "Телефон",
      phonePlaceholder: "+994 XX XXX XX XX",
      email: "Email",
      emailPlaceholder: "email@example.com",
      service: "Тип услуги",
      servicePlaceholder: "Выберите услугу",
      message: "Сообщение",
      messagePlaceholder: "Кратко опишите ваш запрос...",
      submitWhatsapp: "Отправить через WhatsApp",
      submitEmail: "Отправить по Email",
      successToast: "Открывается WhatsApp...",
      errorRequired: "Это поле обязательно для заполнения",
    },
  },
  footer: {
    tagline: "Точные, надёжные и быстрые услуги оценки.",
    quickLinksTitle: "Быстрые ссылки",
    servicesTitle: "Услуги",
    contactTitle: "Контакты",
    rights: "© 2026 Premium Qiymətləndirmə MMC. Все права защищены.",
  },
  pages: {
    services: {
      title: "Услуги",
      description:
        "Услуги Premium Qiymətləndirmə MMC по оценке недвижимости, движимого имущества, бизнеса, рисков и нематериальных активов.",
      heroTitle: "Наши услуги",
      heroSubtitle: "Широкий спектр решений по оценке, соответствующих международным стандартам",
    },
    about: {
      title: "О нас",
      description:
        "О компании Premium Qiymətləndirmə MMC — миссия, ценности и профессиональная команда.",
      heroTitle: "О нас",
      heroSubtitle: "Опыт оценки, построенный на доверии и точности",
      missionTitle: "Наша миссия",
      mission:
        "Помогать клиентам определять реальную стоимость их имущества и активов прозрачно, объективно и в соответствии с международными стандартами.",
      visionTitle: "Наше видение",
      vision:
        "Стать символом надёжности и профессионализма в секторе оценки в Азербайджане.",
      valuesTitle: "Наши ценности",
      values: [
        { title: "Объективность", desc: "Каждая оценка беспристрастна и основана на фактах" },
        { title: "Прозрачность", desc: "Наш процесс и ценовая политика полностью открыты" },
        { title: "Профессионализм", desc: "Сертифицированные эксперты и современная методология" },
        { title: "Скорость", desc: "Мы ценим ваше время и оптимизируем процесс" },
      ],
    },
    contact: {
      title: "Контакты",
      description:
        "Связь с Premium Qiymətləndirmə MMC — адрес, телефон, email и форма заявки.",
      heroTitle: "Связаться с нами",
      heroSubtitle: "Сообщите свой вопрос, наша команда специалистов свяжется с вами",
    },
    news: {
      title: "Новости",
      description:
        "Последние новости Premium Qiymətləndirmə MMC и аналитические статьи о рынке.",
      heroTitle: "Новости",
      heroSubtitle: "Последние новости компании и аналитические статьи о рынке",
    },
  },
};

export const content: Record<Locale, SiteContent> = { az, ru };

export function getContent(locale: Locale) {
  return content[locale];
}
