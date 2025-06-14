// lib/i18n.ts
import type { Project, Service } from '../types'; // Adjust path as necessary if types/index.ts is elsewhere

export type Locale = 'en' | 'de' | 'ur';

export const defaultLang: Locale = 'en';

// Making this self-contained by copying the ui object here.
// Consider if this should be imported or passed if it grows very large.
export const ui = {
  en: {
    'nav.software-and-design': 'Software + Design',
    'nav.about': 'About',
    'nav.work': 'Work',
    'nav.expertise': 'Expertise',
    'nav.lets-meet': 'Lets Meet',
    'nav.menu': 'Menu',
    'nav.close': 'Close',

    'about.about-the-company-text': 'About The Company',
    'about.about-otherdev': `We’ve been building on the internet since way before it was cool—WordPress sites in
            grade school, experimental apps late at night, side projects that made no money but
            brought all the joy. That spirit turned into Kabeer's Network, and eventually evolved
            into what we now call Other Dev—a creative technology studio where art and code collide.
            We’re not here to chase trends or grind 24/7. We believe life isn’t meant to be a to-do
            list. Our philosophy is simple: work with intention, create with feeling, and make space
            for rest and experimentation. Because that’s where the good stuff happens.`,
    'about.second-paragraph': `Our philosophy is simple: great work isn’t achieved through constant hustle alone; it
              requires balance, rest, and a space for creativity to breathe. We’re inspired by
              visionary designers and creatives—from Dieter Rams, whose work at Braun set the gold
              standard in design, toการ cultural impact of Virgil Abloh, and from local
              trailblazers like Zain Ahmed of Raastah and Shehzil Malik to the bold innovations of
              Kanye West. Their work reminds us that design is not just function—it’s about
              identity, expression, and building lasting culture. We understand that creativity
              thrives when given room to explore.
              <br />
              <br />
              There are times when inspiration fades and, instead of forcing productivity, we step back
              to nurture our creative spirit—whether by experimenting with new ideas or developing passion
              projects that reinvigorate our perspective. This balanced approach not only recharges us
              but also enhances the quality and innovation of our client work.
              <br />
              <br />
              At Other Dev, we’re more than a development studio. We’re a team dedicated to building
              intentional digital experiences with soul. Our commitment to thoughtful design, technical
              excellence, and well-being drives everything we do—ensuring that we create solutions that
              not only work seamlessly but also resonate deeply.`,
    'about.projects': 'Projects',

    'footer.subscribe-to-our-newsletter': 'Subscribe to our newsletter',
    'footer.mailing-address': 'Mailing Address',
    'footer.easter-egg': 'Powered by Imagination.',
    'footer.bottom-big-text': 'Lets Collaborate',
    'footer.bottom-all-rights-reserved': 'All rights reserved.',


    'skip-to-content': 'Skip to Content',
    'work.view-website': 'View Website',
    'work.view-code': 'View Code',
    'services.learn-more': 'Learn More',


    'expertise.heading': 'A boutique software studio based in <span class="allura">Karachi</span>, building end-to-end digital experiences for brands, startups, and creatives around the world.',
    'expertise.excerpt': `We’re Other Dev—a small, independent studio based in Karachi, working with clients across
          the world. We partner with startups, brands, and creatives to bring bold ideas to life
          through design, development, and end-to-end digital strategy.`,
    'expertise.second-paragraph': `Our specialty lies in crafting websites, apps, and visual identities that don’t just
            look good—they feel right. From the first spark of an idea to launch day and beyond, we
            offer hands-on support through every stage of the journey. Think of us as your creative
            and technical partner, not just another agency.`,
    'expertise.third-paragraph': `Our work is driven by craft, curiosity, and a deep respect for design and technology. No
            mass production. No soulless templates. Just intentional, high-quality work that feels
            built—not assembled. We’re selective with our projects because we give each one the care
            and energy it deserves. Whether it’s helping a brand tell its story online or building a
            startup’s MVP from scratch, we approach every project with high standards and a human
            touch.`,

  },
  de: {
    'nav.software-and-design': 'Software + Design',
    'nav.about': 'Über uns',
    'nav.work': 'Arbeit',
    'nav.expertise': 'Expertise',
    'nav.lets-meet': 'Lass uns treffen',
    'nav.menu': 'Menü',
    'nav.close': 'Schließen',

    'about.about-the-company-text': 'Über das Unternehmen',
    'about.about-otherdev': `Wir bauen schon seit langem im Internet, bevor es cool war – WordPress-Seiten in der Grundschule, experimentelle Apps spät in der Nacht, Nebenprojekte, die kein Geld einbrachten, aber jede Menge Freude. Dieser Geist wurde zu Kabeers Netzwerk und entwickelte sich schließlich zu dem, was wir heute Other Dev nennen – ein kreatives Technologiestudio, in dem Kunst und Code aufeinandertreffen. Wir sind nicht hier, um Trends zu jagen oder rund um die Uhr zu arbeiten. Wir glauben, dass das Leben keine To-Do-Liste sein soll. Unsere Philosophie ist einfach: mit Absicht arbeiten, mit Gefühl erschaffen und Raum für Ruhe und Experimente lassen. Denn dort passiert das Gute.`,
    'about.second-paragraph': `Unsere Philosophie ist einfach: Großartige Arbeit entsteht nicht allein durch ständiges Schuften; sie erfordert Balance, Ruhe und Raum, damit Kreativität atmen kann. Wir lassen uns von visionären Designern und Kreativen inspirieren – von Dieter Rams, dessen Arbeit bei Braun den Goldstandard im Design setzte, über den kulturellen Einfluss von Virgil Abloh bis hin zu lokalen Vorreitern wie Zain Ahmed von Raastah und Shehzil Malik sowie den mutigen Innovationen von Kanye West. Ihre Arbeit erinnert uns daran, dass Design nicht nur Funktion ist – es geht um Identität, Ausdruck und den Aufbau einer bleibenden Kultur. Wir verstehen, dass Kreativität erst dann aufblüht, wenn sie Raum zur Entfaltung hat.
              <br />
              <br />
              Es gibt Zeiten, in denen die Inspiration schwindet, und anstatt Produktivität zu erzwingen, treten wir einen Schritt zurück, um unseren kreativen Geist zu nähren – sei es durch das Experimentieren mit neuen Ideen oder die Entwicklung von Leidenschaftsprojekten, die unseren Blickwinkel neu beleben. Dieser ausgewogene Ansatz lädt uns nicht nur wieder auf, sondern verbessert auch die Qualität und Innovation unserer Kundenarbeit.
              <br />
              <br />
              Bei Other Dev sind wir mehr als ein Entwicklungsstudio. Wir sind ein Team, das sich dem Aufbau bewusster digitaler Erlebnisse mit Seele verschrieben hat. Unser Engagement für durchdachtes Design, technische Exzellenz und Wohlbefinden treibt alles an, was wir tun – und stellt sicher, dass wir Lösungen schaffen, die nicht nur nahtlos funktionieren, sondern auch tief berühren.`,
    'about.projects': 'Projekte',

    'footer.subscribe-to-our-newsletter': 'Abonnieren Sie unseren Newsletter',
    'footer.mailing-address': 'Postanschrift',
    'footer.easter-egg': 'Betrieben durch Vorstellungskraft.',
    'footer.bottom-big-text': 'Lass uns zusammenarbeiten',
    'footer.bottom-all-rights-reserved': 'Alle Rechte vorbehalten.',


    'skip-to-content': 'Zum Inhalt springen',
    'work.view-website': 'Website ansehen',
    'work.view-code': 'Code ansehen',
    'services.learn-more': 'Mehr erfahren',


    'expertise.heading': 'Ein Boutique-Software-Studio in <span class="allura">Karachi</span>, das End-to-End digitale Erlebnisse für Marken, Startups und Kreative auf der ganzen Welt entwickelt.',
    'expertise.excerpt': `Wir sind Other Dev – ein kleines, unabhängiges Studio in Karachi, das mit Kunden auf der ganzen Welt zusammenarbeitet. Wir kooperieren mit Startups, Marken und Kreativen, um mutige Ideen durch Design, Entwicklung und End-to-End-Digitalstrategie zum Leben zu erwecken.`,
    'expertise.second-paragraph': `Unsere Spezialität liegt darin, Websites, Apps und visuelle Identitäten zu gestalten, die nicht nur gut aussehen – sie fühlen sich auch richtig an. Vom ersten Funken einer Idee bis zum Launch und darüber hinaus bieten wir praktische Unterstützung in jeder Phase der Reise. Betrachten Sie uns als Ihren kreativen und technischen Partner, nicht nur als eine weitere Agentur.`,
    'expertise.third-paragraph': `Unsere Arbeit wird von Handwerk, Neugier und einem tiefen Respekt für Design und Technologie angetrieben. Keine Massenproduktion. Keine seelenlosen Vorlagen. Nur bewusste, hochwertige Arbeit, die sich gebaut – nicht zusammengesetzt – anfühlt. Wir sind selektiv mit unseren Projekten, weil wir jedem die Fürsorge und Energie geben, die es verdient. Ob wir einer Marke helfen, ihre Geschichte online zu erzählen, oder das MVP eines Startups von Grund auf neu aufbauen – wir gehen jedes Projekt mit hohen Standards und einer menschlichen Note an.`
  },
  ur: {
    'nav.software-and-design': 'سوفٹ ویئر + ڈیزائن',
    'nav.about': 'ہمارے بارے میں',
    'nav.work': 'کام',
    'nav.expertise': 'مہارت',
    'nav.lets-meet': 'ملتے ہیں',
    'nav.menu': 'مینو',
    'nav.close': 'بند کریں',

    'about.about-the-company-text': 'کمپنی کے بارے میں',
    'about.about-otherdev': `ہم انٹرنیٹ پر اس سے بہت پہلے سے کام کر رہے ہیں جب یہ مقبول بھی نہیں تھا—گریڈ اسکول میں ورڈپریس سائٹس، رات گئے تجرباتی ایپس، وہ سائیڈ پراجیکٹس جن سے پیسہ نہیں بنتا تھا لیکن خوشی ضرور ملتی تھی۔ یہی جذبہ کبیر کے نیٹ ورک میں بدلا، اور آخرکار اوٹھر ڈیو میں تبدیل ہو گیا—ایک تخلیقی ٹیکنالوجی اسٹوڈیو جہاں آرٹ اور کوڈ کا ملاپ ہوتا ہے۔ ہم یہاں ٹرینڈز کے پیچھے بھاگنے یا 24/7 کام کرنے نہیں آئے۔ ہمارا ماننا ہے کہ زندگی صرف ٹو-ڈو لسٹ نہیں ہے۔ ہمارا فلسفہ سادہ ہے: ارادے کے ساتھ کام کریں، جذبات کے ساتھ تخلیق کریں، اور آرام اور تجربے کے لیے جگہ بنائیں۔ کیونکہ اسی میں اچھی چیزیں چھپی ہوتی ہیں۔`,
    'about.second-paragraph': `ہمارا فلسفہ سادہ ہے: عظیم کام صرف مسلسل محنت سے حاصل نہیں ہوتا؛ اس کے لیے توازن، آرام، اور تخلیقی صلاحیتوں کو پھلنے پھولنے کا موقع درکار ہوتا ہے۔ ہم بصیرت رکھنے والے ڈیزائنرز اور تخلیق کاروں سے متاثر ہیں—ڈائٹر رامز، جنہوں نے براؤن میں ڈیزائن کا سنہری معیار قائم کیا، ورجل ابلو کے ثقافتی اثرات، اور مقامی راہنماؤں جیسے رعستہ کے زین احمد اور شہزیل ملک سے لے کر کانیے ویسٹ کے بے باک اختراعات تک۔ ان کے کام ہمیں یاد دلاتے ہیں کہ ڈیزائن صرف کام کرنے کے لیے نہیں ہے—یہ شناخت، اظہار، اور پائیدار ثقافت بنانے کے بارے میں ہے۔ ہم سمجھتے ہیں کہ تخلیقی صلاحیتیں اس وقت پروان چڑھتی ہیں جب انہیں کھوج کا موقع دیا جائے۔
              <br />
              <br />
              کبھی کبھی تخلیقی صلاحیتیں ماند پڑ جاتی ہیں، اور ہم زبردستی کام کرنے کے بجائے پیچھے ہٹ کر اپنی تخلیقی روح کو پروان چڑھاتے ہیں—خواہ نئے خیالات کے ساتھ تجربات کر کے یا پرجوش منصوبوں پر کام کر کے جو ہمارے نقطہ نظر کو نئی زندگی دیتے ہیں۔ یہ متوازن طریقہ نہ صرف ہمیں تازہ دم کرتا ہے بلکہ ہمارے کلائنٹ کے کام کی معیار اور اختراع کو بھی بڑھاتا ہے۔
              <br />
              <br />
              اوٹھر ڈیو میں، ہم صرف ایک ڈویلپمنٹ اسٹوڈیو سے زیادہ ہیں۔ ہم ایک ایسی ٹیم ہیں جو جاندار ڈیجیٹل تجربات بنانے کے لیے وقف ہے۔ ہمارا عزم، سوچ سمجھ کر ڈیزائن کرنا، تکنیکی مہارت، اور بہتری ہمارے ہر کام کی بنیاد ہے—یہ یقینی بناتے ہوئے کہ ہم ایسے حل تخلیق کریں جو نہ صرف بہترین طریقے سے کام کریں بلکہ گہرائی سے اثر بھی چھوڑیں۔`,
    'about.projects': 'منصوبے',

    'footer.subscribe-to-our-newsletter': 'ہمارے نیوز لیٹر کو سبسکرائب کریں',
    'footer.mailing-address': 'میلنگ ایڈریس',
    'footer.easter-egg': 'تخیل کی طاقت سے چلنے والا۔',
    'footer.bottom-big-text': 'آئیے مل کر کام کریں',
    'footer.bottom-all-rights-reserved': 'تمام حقوق محفوظ ہیں۔',


    'skip-to-content': 'مواد پر جائیں',
    'work.view-website': 'ویب سائٹ دیکھیں',
    'work.view-code': 'کوڈ دیکھیں',
    'services.learn-more': 'مزید جانیں',


    'expertise.heading': 'کراچی میں واقع ایک بوٹیک سوفٹ ویئر اسٹوڈیو، جو دنیا بھر کے برانڈز، اسٹارٹ اپس، اور تخلیق کاروں کے لیے اینڈ-ٹو-اینڈ ڈیجیٹل تجربات بناتی ہے۔',
    'expertise.excerpt': `ہم اوٹھر ڈیو ہیں—کراچی میں واقع ایک چھوٹا، آزاد اسٹوڈیو جو دنیا بھر کے کلائنٹس کے ساتھ کام کرتا ہے۔ ہم اسٹارٹ اپس، برانڈز، اور تخلیق کاروں کے ساتھ شراکت کرتے ہیں تاکہ ڈیزائن، ڈویلپمنٹ، اور اینڈ-ٹو-اینڈ ڈیجیٹل اسٹریٹیجی کے ذریعے بڑے خیالات کو حقیقت میں بدل سکیں۔`,
    'expertise.second-paragraph': `ہماری مہارت ویب سائٹس، ایپس، اور بصری شناختوں کو بنانے میں ہے جو صرف خوبصورت نہیں ہوتیں بلکہ درست محسوس ہوتی ہیں۔ خیال کے پہلے چنگاری سے لے کر لانچ کے دن اور اس کے بعد تک، ہم سفر کے ہر مرحلے میں عملی مدد فراہم کرتے ہیں۔ ہمیں اپنا تخلیقی اور تکنیکی پارٹنر سمجھیں، صرف ایک ایجنسی نہیں۔`,
    'expertise.third-paragraph': `ہمارا کام ہنر، تجسس، اور ڈیزائن اور ٹیکنالوجی کے لیے گہرے احترام سے چلتا ہے۔ نہ کوئی بڑے پیمانے پر پیداوار، نہ بے روح ٹیمپلیٹس۔ صرف ارادے کے ساتھ بنایا گیا، اعلیٰ معیار کا کام جو محسوس ہوتا ہے کہ اسے جوڑا نہیں گیا بلکہ بنایا گیا ہے۔ ہم اپنے منصوبوں کے ساتھ منتخب ہوتے ہیں کیونکہ ہم ہر ایک کو وہ توجہ اور توانائی دیتے ہیں جس کا وہ مستحق ہے۔ خواہ کسی برانڈ کی کہانی کو آن لائن بیان کرنے میں مدد ہو یا کسی اسٹارٹ اپ کا ایم وی پی صفر سے بنانا، ہم ہر منصوبے کو اعلیٰ معیار اور انسانی چھو کے ساتھ کرتے ہیں۔`
  },
} as const;

// Function to get translations with fallback to default language
export function getTranslation(locale: Locale, key: keyof typeof ui[typeof defaultLang]): string {
  // Assert that the key exists in the locale's UI translations or default language's UI translations
  // This provides type safety if ui[locale] could be incomplete, though `as const` on `ui` helps.
  // However, direct access with fallback is more concise here.
  return ui[locale][key] || ui[defaultLang][key];
}

// Function to get localized data (projects or services)
export async function getLocalizedData<T extends 'projects' | 'services'>(
  locale: Locale,
  dataType: T
): Promise<T extends 'projects' ? Project[] : Service[]> {
  // Construct the path to the JSON file
  // Assuming lib/ is at the root, and types/ is at the root.
  // And src/data/ is the location of the data files.
  const path = `../src/data/${locale}/${dataType}.json`;

  try {
    const dataModule = await import(path);
    // The default export of a JSON module is the JSON object itself.
    return dataModule.default as T extends 'projects' ? Project[] : Service[];
  } catch (error) {
    console.error(`Error loading data for locale ${locale}, type ${dataType}:`, error);
    // Fallback to default language if the requested locale's data fails to load
    if (locale !== defaultLang) {
      console.warn(`Attempting to load data for default language '${defaultLang}' as fallback.`);
      const fallbackPath = `../src/data/${defaultLang}/${dataType}.json`;
      try {
        const fallbackDataModule = await import(fallbackPath);
        return fallbackDataModule.default as T extends 'projects' ? Project[] : Service[];
      } catch (fallbackError) {
        console.error(`Error loading fallback data for locale ${defaultLang}, type ${dataType}:`, fallbackError);
        throw new Error(`Failed to load data for ${dataType} in ${locale} and fallback ${defaultLang}.`);
      }
    }
    throw new Error(`Failed to load data for ${dataType} in ${locale}.`);
  }
}
