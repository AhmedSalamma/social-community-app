import { Link } from "react-router-dom";
import {
  FiBell,
  FiCode,
  FiCompass,
  FiGlobe,
  FiHeadphones,
  FiShare2,
  FiShield,
  FiSmartphone,
  FiUsers,
} from "react-icons/fi";
import heroImg from "../../assets/hero.png";

const features = [
  {
    title: "مجتمعات متخصصة",
    text: "ادخل مجتمعات حسب اهتماماتك: برمجة، تصميم، ريادة أعمال، وغيرها.",
    icon: FiUsers,
  },
  {
    title: "نقاشات حقيقية",
    text: "شارك أفكارك، اطرح أسئلتك، وخد ردود من ناس عندها خبرة فعلية.",
    icon: FiGlobe,
  },
  {
    title: "تجربة تفاعلية",
    text: "تعليقات، إعجابات، ومتابعة المواضيع المهمة بسهولة داخل كل مجتمع.",
    icon: FiShield,
  },
];

const communities = [
  {
    title: "مجتمع المبرمجين العرب",
    text: "نقاشات حول البرمجة، المشاريع، وحل المشاكل التقنية اليومية.",
    icon: FiCode,
  },
  {
    title: "مجتمع مطوري الويب",
    text: "React، Laravel، Node.js، وأحدث تقنيات تطوير الويب.",
    icon: FiGlobe,
  },
  {
    title: "مجتمع الدعم والتطوير",
    text: "اسأل، شارك تجربتك، وخد نصائح من ناس زيك في نفس الرحلة.",
    icon: FiHeadphones,
  },
];

export default function LandingPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#f7f6ff] text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-[#fbfaff]/90 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-10">
          <Link to="/" className="text-xl font-bold text-indigo-600">
            سكون
          </Link>

          <div className="hidden items-center gap-10 text-sm font-medium text-slate-600 md:flex">
            <a href="#about" className="hover:text-indigo-600">
              عن المنصة
            </a>
            <a href="#communities" className="hover:text-indigo-600">
              المجتمعات
            </a>
            <a href="#privacy" className="hover:text-indigo-600">
              الخصوصية
            </a>
          </div>

          <div className="flex items-center gap-3">
            {localStorage.getItem("token") ? (
              <Link
                to="/home"
                className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
              >
                حسابي
              </Link>
            ) : (
              <Link
                to="/login"
                className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
              >
                إنضم إلينا
              </Link>
            )}
          </div>
        </nav>
      </header>

      <section className="relative overflow-hidden px-5 pb-24 pt-28 md:px-10 md:pb-36 md:pt-40">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(185,221,237,0.7),transparent_32%),radial-gradient(circle_at_85%_22%,rgba(210,207,255,0.7),transparent_34%)]" />
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/70 px-4 py-2 text-sm font-semibold text-indigo-600 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-indigo-600" />
            مساحة آمنة للتعبير الحر
          </div>

          <h1 className="text-balance text-5xl font-extrabold leading-tight text-slate-950 md:text-7xl">
            عالمك الحقيقي
            <span className="block bg-gradient-to-l from-sky-700 to-indigo-600 bg-clip-text text-transparent">
              مجتمعاتك الحقيقية
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-600">
            انضم إلى آلاف المستخدمين الذين يشاركون قصصهم وتجاربهم بكل حرية. في
            سكون، هويتك هي ما تشعر به، وليست اسمك أو صورتك.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/login"
              className="inline-flex h-14 min-w-44 items-center justify-center rounded-full bg-indigo-600 px-8 text-lg font-bold text-white shadow-xl shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
            >
              انضم الآن
            </Link>
            <Link
              to="/login"
              className="inline-flex h-14 min-w-56 items-center justify-center rounded-full border border-slate-300 bg-white/70 px-8 text-lg font-bold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
            >
              استكشف المجتمعات
            </Link>
          </div>
        </div>
      </section>

      <section id="about" className="px-5 pb-24 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {features.map(({ title, text, icon: Icon }) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <div className="mb-10 flex justify-end">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  <Icon size={28} />
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
              <p className="mt-4 leading-7 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="communities" className="bg-[#f1f2ff] px-5 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-4xl font-extrabold text-slate-950">
                المجتمعات الصاعدة
              </h2>
              <p className="mt-3 text-slate-600">
                اكتشف المساحات الأكثر نشاطا اليوم
              </p>
            </div>
            <Link to="/login" className="text-sm font-semibold text-indigo-600">
              عرض الكل
            </Link>
          </div>

          <div className="grid gap-7 lg:grid-cols-[1fr_1.05fr]">
            <div className="grid gap-7 sm:grid-cols-2">
              {communities.map(({ title, text, icon: Icon }) => (
                <article
                  key={title}
                  className="min-h-52 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
                >
                  {Icon ? (
                    <Icon className="mb-12 text-2xl text-indigo-600" />
                  ) : (
                    <div className="mb-12 flex items-center gap-1">
                      <span className="h-9 w-9 rounded-full bg-violet-100" />
                      <span className="h-9 w-9 rounded-full bg-sky-100" />
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs font-bold text-indigo-600 shadow-sm">
                        12+
                      </span>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-slate-950">{title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{text}</p>
                </article>
              ))}
            </div>

            <article className="relative min-h-[34rem] overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-md">
              <img
                src={heroImg}
                alt=""
                className="absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2 object-contain opacity-80"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_22%,rgba(99,102,241,0.25),transparent_30%),linear-gradient(180deg,rgba(15,23,42,0.1),rgba(247,246,255,0.94)_72%)]" />
              <div className="relative flex h-full flex-col justify-end p-8 md:p-10">
                <span className="mb-5 w-fit rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold text-white">
                  أكثر من ٨ آلاف عضو
                </span>
                <h3 className="text-4xl font-extrabold text-slate-950">
                  بوح الليالي
                </h3>
                <p className="mt-4 max-w-lg leading-8 text-slate-600">
                  مساحة للأفكار العميقة والخواطر التي لا تقال إلا في صمت الليل.
                </p>
                <Link
                  to="/login"
                  className="mt-7 w-fit rounded-full border border-indigo-200 bg-white/60 px-6 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-white"
                >
                  دخول المجتمع
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="privacy" className="px-5 py-24 md:px-10">
        <div className="mx-auto max-w-7xl rounded-3xl bg-gradient-to-l from-indigo-100 via-violet-100 to-sky-100 px-6 py-16 text-center md:px-12">
          <h2 className="text-4xl font-extrabold leading-tight text-slate-950 md:text-5xl">
            هل أنت مستعد لمشاركة قصتك؟
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            انضم إلى سكون اليوم واستمتع بتجربة اجتماعية مختلفة تماما. لا توجد
            شروط، لا توجد أحكام، فقط تواصل بشري حقيقي.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-8 md:flex-row">
            <Link
              to="/login"
              className="inline-flex h-14 items-center justify-center rounded-full bg-indigo-600 px-10 text-lg font-bold text-white shadow-xl shadow-indigo-200 transition hover:bg-indigo-700"
            >
              ابدأ الآن مجانا
            </Link>
            <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
              <FiSmartphone size={28} />
              <span>متاح على iOS و Android</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-5 py-12 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              سكون
            </Link>
            <p className="mt-2 text-sm text-slate-500">
              © 2026 سكون. الخصوصية أولا.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-indigo-600">
              عن المنصة
            </a>
            <a href="#privacy" className="hover:text-indigo-600">
              الشروط والأحكام
            </a>
            <a href="#privacy" className="hover:text-indigo-600">
              سياسة الخصوصية
            </a>
            <a
              href="mailto:hello@example.com"
              className="hover:text-indigo-600"
            >
              اتصل بنا
            </a>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              aria-label="تصفح عالمي"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 text-slate-700 transition hover:text-indigo-600"
            >
              <FiCompass size={18} />
            </button>
            <button
              type="button"
              aria-label="مشاركة"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 text-slate-700 transition hover:text-indigo-600"
            >
              <FiShare2 size={18} />
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
