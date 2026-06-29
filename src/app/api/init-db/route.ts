/**
 * One-time database initialization endpoint.
 * GET /api/init-db  (protected by ADMIN_PASSWORD)
 *
 * Creates tables (idempotent — safe to run multiple times) and seeds
 * the districts table with Baku district data.
 * Does NOT seed news_posts or contact_submissions.
 */
import { isAdminRequest } from "@/lib/admin-auth";
import { getSql } from "@/lib/db";

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const sql = getSql();

  try {
    // Districts
    await sql`
      CREATE TABLE IF NOT EXISTS districts (
        id            TEXT PRIMARY KEY,
        label_az      TEXT NOT NULL,
        label_ru      TEXT NOT NULL,
        price_per_sqm INTEGER NOT NULL,
        updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    // Contact form submissions
    await sql`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id           SERIAL PRIMARY KEY,
        name         TEXT NOT NULL,
        phone        TEXT NOT NULL,
        email        TEXT,
        service      TEXT,
        message      TEXT,
        locale       TEXT NOT NULL DEFAULT 'az',
        submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    // News posts
    await sql`
      CREATE TABLE IF NOT EXISTS news_posts (
        id           SERIAL PRIMARY KEY,
        slug         TEXT UNIQUE NOT NULL,
        title_az     TEXT NOT NULL,
        title_ru     TEXT NOT NULL,
        excerpt_az   TEXT NOT NULL,
        excerpt_ru   TEXT NOT NULL,
        body_az      TEXT NOT NULL,
        body_ru      TEXT NOT NULL,
        published_at DATE NOT NULL,
        created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    // Seed districts (ON CONFLICT = safe to re-run)
    await sql`
      INSERT INTO districts (id, label_az, label_ru, price_per_sqm) VALUES
        ('nasimi',    'Nəsimi',    'Насими',    1700),
        ('sabail',    'Səbail',    'Сабаил',    1900),
        ('narimanov', 'Nərimanov', 'Нариманов', 1350),
        ('xetai',     'Xətai',     'Хатаи',     1200),
        ('binagadi',  'Binəqədi',  'Бинагади',   950),
        ('surakhani', 'Suraxanı',  'Сураханы',   850)
      ON CONFLICT (id) DO NOTHING
    `;

    // Seed news posts (ON CONFLICT = safe to re-run)
    await sql`
      INSERT INTO news_posts (slug, title_az, title_ru, excerpt_az, excerpt_ru, body_az, body_ru, published_at) VALUES
      (
        'bakida-dasinmaz-emlak-bazarinda-2026-ci-ilde-olculu-artim',
        'Bakıda daşınmaz əmlak bazarında 2026-cı ildə ölçülü artım',
        'Bakıda daşınmaz əmlak bazarında 2026-cı ildə ölçülü artım',
        'Azərbaycan Qiymətləndiricilər Cəmiyyətinin məlumatına görə, 2026-cı ilin birinci rübündə Bakıda mənzil qiymətləri artmaqda davam edib, lakin əvvəlki illərlə müqayisədə daha ölçülü templə.',
        'Azərbaycan Qiymətləndiricilər Cəmiyyətinin məlumatına görə, 2026-cı ilin birinci rübündə Bakıda mənzil qiymətləri artmaqda davam edib, lakin əvvəlki illərlə müqayisədə daha ölçülü templə.',
        'Azərbaycan Qiymətləndiricilər Cəmiyyətinin məlumatına görə, 2026-cı ilin birinci rübündə Bakıda mənzil qiymətləri artmaqda davam edib, lakin əvvəlki illərlə müqayisədə daha ölçülü templə. Yeni tikili mənzillərdə artım dekabr ayı ilə müqayisədə təxminən 3,6%, ikinci əl bazarında isə təxminən 2,4% olub.' || E'\n\n' || 'Ekspertlər proqnozlaşdırır ki, il ərzində yeni tikililərdə ümumi artım 11–16%, ikinci əl bazarında isə 6–8% təşkil edə bilər. Ən nəzərəçarpan artım Səbail, Nəsimi və Yasamal rayonlarında qeydə alınıb.',
        'Azərbaycan Qiymətləndiricilər Cəmiyyətinin məlumatına görə, 2026-cı ilin birinci rübündə Bakıda mənzil qiymətləri artmaqda davam edib, lakin əvvəlki illərlə müqayisədə daha ölçülü templə. Yeni tikili mənzillərdə artım dekabr ayı ilə müqayisədə təxminən 3,6%, ikinci əl bazarında isə təxminən 2,4% olub.' || E'\n\n' || 'Ekspertlər proqnozlaşdırır ki, il ərzində yeni tikililərdə ümumi artım 11–16%, ikinci əl bazarında isə 6–8% təşkil edə bilər. Ən nəzərəçarpan artım Səbail, Nəsimi və Yasamal rayonlarında qeydə alınıb.',
        '2026-04-15'
      ),
      (
        'bakinin-rayonlari-uzre-emlak-qiymetlerinde-liderler',
        'Bakının rayonları üzrə əmlak qiymətlərində liderlər',
        'Bakının rayonları üzrə əmlak qiymətlərində liderlər',
        'Bazar məlumatlarına əsasən, Bakıda ən yüksək daşınmaz əmlak qiymətləri Səbail, Nəsimi və Yasamal rayonlarında, eləcə də şəhərin tarixi hissəsində saxlanılır.',
        'Bazar məlumatlarına əsasən, Bakıda ən yüksək daşınmaz əmlak qiymətləri Səbail, Nəsimi və Yasamal rayonlarında, eləcə də şəhərin tarixi hissəsində saxlanılır.',
        'Bazar məlumatlarına əsasən, Bakıda ən yüksək daşınmaz əmlak qiymətləri Səbail, Nəsimi və Yasamal rayonlarında, eləcə də şəhərin tarixi hissəsində saxlanılır. Eyni zamanda, Xətai, Binəqədi və Suraxanı rayonlarında nisbətən əlçatan təkliflər tapmaq mümkündür — bu rayonlar aşağı giriş həddi və orta müddətli perspektivdə dəyər artımı potensialı ilə alıcıları cəlb edir.' || E'\n\n' || 'Ev almaq üçün rayon seçərkən təkcə cari kvadratmetr qiymətini deyil, sosial və nəqliyyat infrastrukturunun inkişaf səviyyəsini də nəzərə almaq vacibdir.',
        'Bazar məlumatlarına əsasən, Bakıda ən yüksək daşınmaz əmlak qiymətləri Səbail, Nəsimi və Yasamal rayonlarında, eləcə də şəhərin tarixi hissəsində saxlanılır. Eyni zamanda, Xətai, Binəqədi və Suraxanı rayonlarında nisbətən əlçatan təkliflər tapmaq mümkündür — bu rayonlar aşağı giriş həddi və orta müddətli perspektivdə dəyər artımı potensialı ilə alıcıları cəlb edir.' || E'\n\n' || 'Ev almaq üçün rayon seçərkən təkcə cari kvadratmetr qiymətini deyil, sosial və nəqliyyat infrastrukturunun inkişaf səviyyəsini də nəzərə almaq vacibdir.',
        '2026-05-10'
      ),
      (
        'xarici-alicilarin-azerbaycan-emlakina-maragi-artmaqda-davam-edir',
        'Xarici alıcıların Azərbaycan əmlakına marağı artmaqda davam edir',
        'Xarici alıcıların Azərbaycan əmlakına marağı artmaqda davam edir',
        '2026-cı ildə xarici alıcıların Azərbaycanın, ilk növbədə Bakı və sahil rayonlarının daşınmaz əmlak bazarına marağı nəzərəçarpan dərəcədə artıb.',
        '2026-cı ildə xarici alıcıların Azərbaycanın, ilk növbədə Bakı və sahil rayonlarının daşınmaz əmlak bazarına marağı nəzərəçarpan dərəcədə artıb.',
        '2026-cı ildə xarici alıcıların Azərbaycanın, ilk növbədə Bakı və sahil rayonlarının daşınmaz əmlak bazarına marağı nəzərəçarpan dərəcədə artıb. Cəlbediciliyin əsas amilləri arasında bazarın nisbi sabitliyi, regionun digər ölkələri ilə müqayisədə daha yumşaq kreditləşmə şərtləri və fərdi investorlar üçün əlçatan giriş həddi qeyd olunur.' || E'\n\n' || 'Ekspertlər bildirir ki, Bakı ətrafındaki sahil zonası və inkişaf edən kənd ərazilər ən yüksək artım potensialına malikdir.',
        '2026-cı ildə xarici alıcıların Azərbaycanın, ilk növbədə Bakı və sahil rayonlarının daşınmaz əmlak bazarına marağı nəzərəçarpan dərəcədə artıb. Cəlbediciliyin əsas amilləri arasında bazarın nisbi sabitliyi, regionun digər ölkələri ilə müqayisədə daha yumşaq kreditləşmə şərtləri və fərdi investorlar üçün əlçatan giriş həddi qeyd olunur.' || E'\n\n' || 'Ekspertlər bildirir ki, Bakı ətrafındaki sahil zonası və inkişaf edən kənd ərazilər ən yüksək artım potensialına malikdir.',
        '2026-04-08'
      ),
      (
        'alqi-satqidan-evvel-emlakin-qiymetlendirilmesine-duzgun-yanasma',
        'Alqı-satqıdan əvvəl əmlakın qiymətləndirilməsinə düzgün yanaşma',
        'Alqı-satqıdan əvvəl əmlakın qiymətləndirilməsinə düzgün yanaşma',
        'Əmlak əməliyyatından əvvəl obyektin təxmini bazar dəyərini bilmək vacibdir — bu, satışda ucuz qiymətə razılaşmaqdan və ya alışda artıq ödəməkdən qaçmağa kömək edir.',
        'Əmlak əməliyyatından əvvəl obyektin təxmini bazar dəyərini bilmək vacibdir — bu, satışda ucuz qiymətə razılaşmaqdan və ya alışda artıq ödəməkdən qaçmağa kömək edir.',
        'Əmlak əməliyyatından əvvəl obyektin təxmini bazar dəyərini bilmək vacibdir — bu, satışda ucuz qiymətə razılaşmaqdan və ya alışda artıq ödəməkdən qaçmağa kömək edir. İlkin oriyentir saytımızdaki onlayn kalkulyator vasitəsilə əldə edilə bilər, o, sahəni, rayonu, vəziyyəti və əmlak növünü nəzərə alır.' || E'\n\n' || 'Bununla belə, qeyd etmək lazımdır ki, hüquqi qüvvəyə malik rəsmi qiymətləndirməni — bank, notarius və ya məhkəmə üçün — yalnız Qiymətləndiricilər Palatasının üzvü olan sertifikatlı qiymətləndirici həyata keçirə bilər. Rəsmi qiymətləndirmə hesabatına ehtiyacınız varsa, saytda hesablamadan sonra bizimlə WhatsApp vasitəsilə əlaqə saxlaya bilərsiniz.',
        'Əmlak əməliyyatından əvvəl obyektin təxmini bazar dəyərini bilmək vacibdir — bu, satışda ucuz qiymətə razılaşmaqdan və ya alışda artıq ödəməkdən qaçmağa kömək edir. İlkin oriyentir saytımızdaki onlayn kalkulyator vasitəsilə əldə edilə bilər, o, sahəni, rayonu, vəziyyəti və əmlak növünü nəzərə alır.' || E'\n\n' || 'Bununla belə, qeyd etmək lazımdır ki, hüquqi qüvvəyə malik rəsmi qiymətləndirməni — bank, notarius və ya məhkəmə üçün — yalnız Qiymətləndiricilər Palatasının üzvü olan sertifikatlı qiymətləndirici həyata keçirə bilər. Rəsmi qiymətləndirmə hesabatına ehtiyacınız varsa, saytda hesablamadan sonra bizimlə WhatsApp vasitəsilə əlaqə saxlaya bilərsiniz.',
        '2026-06-20'
      )
      ON CONFLICT (slug) DO NOTHING
    `;

    return Response.json({
      ok: true,
      message: "Tables created, districts and news seeded. Run once — idempotent.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
