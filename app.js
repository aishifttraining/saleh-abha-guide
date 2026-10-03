/* Sirius Abha — local-only interactions and bilingual content */
(() => {
  "use strict";

  const UI_KEY = "sirius-abha-ui-v1";
  const PLAN_KEY = "sirius-abha-planner-v1";
  const storage = {
    get(key) { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Private-browser storage can be unavailable. */ } },
    remove(key) { try { localStorage.removeItem(key); } catch { /* No-op when unavailable. */ } }
  };

  const english = {
    skip: "Skip to content", drawerEyebrow: "YOUR ABHA COMPANION", navHome: "Discover Abha", navPlanning: "Trip Planning", navAttractions: "Tourist Attractions",
    themeLabel: "Appearance", themeLight: "Light mode", themeDark: "Dark mode", languageLabel: "Language", drawerNote: "Made for slow, memorable journeys through the highlands.",
    homeKicker: "SOUTHERN HIGHLANDS · SAUDI ARABIA", homeTitle: "A softer side of Saudi.", homeText: "Abha is the capital of the Asir Region in the Kingdom of Saudi Arabia and one of the most prominent cultural and tourist centers in the Sarawat Mountains. It is situated at a high altitude that grants it a mild climate, making it a primary destination for those seeking nature and cool weather.", planTrip: "Plan your journey ↗", exploreNature: "Explore the landscape", natureKicker: "01 · ABHA'S NATURE", natureTitle: "Where clouds take the trail.", natureText: "Abha's nature is characterized by a unique geography that combines majestic mountain peaks, dense green slopes, and flowing plains. Situated at a high altitude, the city enjoys a mild climate and rich vegetation dominated by ancient juniper trees, alongside the constant fog and clouds that blanket its highlands.", natureLink: "Find natural escapes →", heritageKicker: "02 · HERITAGE & ARCHITECTURE", heritageTitle: "Stories built in stone.", heritageText: "The traditional architecture in Abha and the Asir region stands out as one of the most significant and distinctive architectural identities in the Arabian Peninsula. This architecture primarily relies on total harmony with the surrounding mountainous environment and changeable climate, utilizing local natural resources (stone, mud, and juniper wood) to achieve the highest standards of durability and thermal insulation.", heritageLink: "Explore local heritage ↗", footerTagline: "Follow the mountain light.",
    planningKicker: "SIRIUS TRIP PLANNING", planningTitle: "Make Abha feel like yours.", planningIntro: "Choose your travel rhythm and Sirius will shape a simple mountain-day outline around it. Your choices stay only in this browser.", stepOne: "01 · YOUR PREFERENCES", preferencesTitle: "Who is travelling?", travelerLabel: "Number of travellers", travelerHint: "Choose between 1 and 12 people.", personaLabel: "Your travel style", personaHint: "Select one or more styles that sound like your group.", personaAdventurer: "Adventurers", personaAdventurerDesc: "Trails, viewpoints, fresh air", personaHeritage: "Cultural & Heritage Explorers", personaHeritageDesc: "Craft, stories, old villages", personaLifestyle: "Lifestyle & Urban", personaLifestyleDesc: "Art, cafés, city strolls", personaFamily: "Family & Kid-Friendly", personaFamilyDesc: "Easy moments together", tailorButton: "Tailor my visit ↗", loadExample: "Load example", clearPlan: "Clear saved plan", yourOutline: "YOUR OUTLINE", outlineTitle: "A day with room to wander.", packingLabel: "BRING ALONG", stepTwo: "02 · FIND YOUR SEASON", seasonTitle: "When will you be there?", seasonIntro: "Choose a month for seasonal planning advice — not a live weather forecast.", seasonalAdvice: "SEASONAL PLANNING ADVICE", seasonPlace: "A fitting stop",
    attractionsKicker: "A CURATED ABHA", attractionsTitle: "Places worth taking your time.", attractionsIntro: "Follow mountain air, meaningful craft, and unhurried tables. Each stop is a doorway into the rhythm of Abha.", browseKicker: "BROWSE BY MOOD", browseTitle: "Choose your kind of day.", plannerPrompt: "Need a route? Plan it →", filterAll: "All places", filterRestaurant: "Restaurants", filterCafe: "Cafes", filterNature: "Natural Attractions", filterHeritage: "Heritage Sites", emptyAttractions: "No places match this category yet. Choose another mood.",
    validationTravelers: "Enter a group size from 1 to 12.", validationPersonas: "Choose at least one travel style to tailor your day.", saved: "Your private visit outline has been saved in this browser.", exampleLoaded: "The built-in example is ready to explore.", cleared: "The saved plan was cleared; the built-in example is showing again.", menuOpen: "Open navigation menu", menuClose: "Close navigation menu", decreaseTravelers: "Decrease number of travellers", increaseTravelers: "Increase number of travellers", filterLabel: "Filter attractions", mapsLink: "Open {name} in Google Maps (opens in a new tab)", mapsNote: "Open in Google Maps ↗", titleHome: "Sirius | Discover Abha", titlePlanning: "Sirius | Plan your Abha trip", titleAttractions: "Sirius | Abha attractions"
  };

  const arabic = {
    skip: "انتقل إلى المحتوى", drawerEyebrow: "دليلك في أبها", navHome: "اكتشف أبها", navPlanning: "خطط لرحلتك", navAttractions: "المعالم السياحية",
    themeLabel: "المظهر", themeLight: "الوضع الفاتح", themeDark: "الوضع الداكن", languageLabel: "اللغة", drawerNote: "لرحلات هادئة لا تُنسى عبر المرتفعات.",
    homeKicker: "المرتفعات الجنوبية · المملكة العربية السعودية", homeTitle: "وجهٌ أكثر لطفاً للسعودية.", homeText: "أبها هي عاصمة منطقة عسير في المملكة العربية السعودية وأحد أبرز المراكز الثقافية والسياحية في جبال السروات. تقع على ارتفاع عالٍ يمنحها مناخاً معتدلاً، ما يجعلها وجهة رئيسية للباحثين عن الطبيعة والطقس اللطيف.", planTrip: "خطط لرحلتك ↗", exploreNature: "اكتشف المشهد الطبيعي", natureKicker: "٠١ · طبيعة أبها", natureTitle: "حيث تسلك الغيوم الدرب.", natureText: "تتميّز طبيعة أبها بجغرافيا فريدة تجمع بين القمم الجبلية المهيبة والمنحدرات الخضراء الكثيفة والسهول الممتدة. تقع المدينة على ارتفاع عالٍ، فتتمتع بمناخ معتدل وغطاء نباتي غني تهيمن عليه أشجار العرعر العتيقة، إلى جانب الضباب والغيوم المستمرة التي تكسو مرتفعاتها.", natureLink: "اكتشف ملاذات الطبيعة ←", heritageKicker: "٠٢ · التراث والعمارة", heritageTitle: "حكايات بُنيت من الحجر.", heritageText: "تُعد العمارة التقليدية في أبها ومنطقة عسير من أبرز الهويات المعمارية وأكثرها تميّزاً في شبه الجزيرة العربية. وتعتمد هذه العمارة أساساً على الانسجام التام مع البيئة الجبلية المحيطة والمناخ المتغيّر، مستخدمةً الموارد الطبيعية المحلية من الحجر والطين وخشب العرعر لتحقيق أعلى معايير المتانة والعزل الحراري.", heritageLink: "استكشف التراث المحلي ↗", footerTagline: "اتبع ضوء الجبل.",
    planningKicker: "تخطيط رحلة سيريوس", planningTitle: "اجعل أبها قريبة منك.", planningIntro: "اختر إيقاع رحلتك وسيرسم سيريوس برنامج يوم بسيطاً يناسبك. اختياراتك تبقى في هذا المتصفح فقط.", stepOne: "٠١ · تفضيلاتك", preferencesTitle: "من المسافر؟", travelerLabel: "عدد المسافرين", travelerHint: "اختر من شخص واحد إلى ١٢ شخصاً.", personaLabel: "أسلوب رحلتك", personaHint: "اختر أسلوباً واحداً أو أكثر يناسب مجموعتك.", personaAdventurer: "المغامرون", personaAdventurerDesc: "مسارات وإطلالات وهواء نقي", personaHeritage: "مستكشفو الثقافة والتراث", personaHeritageDesc: "حِرف وحكايات وقرى قديمة", personaLifestyle: "أسلوب الحياة والمدينة", personaLifestyleDesc: "فن ومقاهٍ ونزهات المدينة", personaFamily: "العائلات والأطفال", personaFamilyDesc: "لحظات سهلة معاً", tailorButton: "صمّم زيارتي ↗", loadExample: "حمّل المثال", clearPlan: "امسح الخطة المحفوظة", yourOutline: "خطتك", outlineTitle: "يوم يترك لك مجالاً للتجوال.", packingLabel: "اصطحب معك", stepTwo: "٠٢ · اختر موسماً", seasonTitle: "متى ستكون هنا؟", seasonIntro: "اختر شهراً للحصول على نصائح موسمية للتخطيط، وليست توقعات جوية مباشرة.", seasonalAdvice: "نصيحة موسمية للتخطيط", seasonPlace: "محطة مناسبة",
    attractionsKicker: "أبها منتقاة بعناية", attractionsTitle: "أماكن تستحق أن تمنحها وقتك.", attractionsIntro: "اتبع هواء الجبل والحِرف الملهمة والمقاهي الهادئة. كل محطة بابٌ لإيقاع أبها.", browseKicker: "تصفّح حسب مزاجك", browseTitle: "اختر نوع يومك.", plannerPrompt: "تحتاج مساراً؟ خطط له ←", filterAll: "كل الأماكن", filterRestaurant: "المطاعم", filterCafe: "المقاهي", filterNature: "المعالم الطبيعية", filterHeritage: "المواقع التراثية", emptyAttractions: "لا توجد أماكن في هذه الفئة الآن. اختر فئة أخرى.",
    validationTravelers: "أدخل عدداً من ١ إلى ١٢ مسافراً.", validationPersonas: "اختر أسلوب سفر واحداً على الأقل لتخصيص يومك.", saved: "تم حفظ برنامج زيارتك الخاص في هذا المتصفح.", exampleLoaded: "المثال المدمج جاهز للاستكشاف.", cleared: "تم مسح الخطة المحفوظة، ويظهر المثال المدمج مجدداً.", menuOpen: "افتح قائمة التنقل", menuClose: "أغلق قائمة التنقل", decreaseTravelers: "خفّض عدد المسافرين", increaseTravelers: "زد عدد المسافرين", filterLabel: "تصفية المعالم", mapsLink: "افتح {name} في خرائط Google (يفتح في علامة تبويب جديدة)", mapsNote: "افتح في خرائط Google ↗", titleHome: "سيريوس | اكتشف أبها", titlePlanning: "سيريوس | خطط لرحلتك إلى أبها", titleAttractions: "سيريوس | معالم أبها السياحية"
  };

  let ui = storage.get(UI_KEY) || { theme: "light", lang: "en" };
  if (!["light", "dark"].includes(ui.theme)) ui.theme = "light";
  if (!["en", "ar"].includes(ui.lang)) ui.lang = "en";
  const page = document.documentElement.dataset.page || "home";
  const copy = () => ui.lang === "ar" ? arabic : english;
  const getLocalized = value => value[ui.lang === "ar" ? "ar" : "en"];

  function applyPreferences() {
    const t = copy();
    document.documentElement.dataset.theme = ui.theme;
    document.documentElement.lang = ui.lang === "ar" ? "ar" : "en";
    document.documentElement.dir = ui.lang === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(node => { if (t[node.dataset.i18n]) node.textContent = t[node.dataset.i18n]; });
    document.querySelectorAll("[data-i18n-aria-label]").forEach(node => { const label = t[node.dataset.i18nAriaLabel]; if (label) node.setAttribute("aria-label", label); });
    document.querySelectorAll(".brand").forEach(link => link.setAttribute("aria-label", ui.lang === "ar" ? "سيريوس — الصفحة الرئيسية لأبها" : "Sirius — Abha home"));
    const themeButton = document.querySelector(".theme-toggle");
    if (themeButton) { themeButton.setAttribute("aria-pressed", String(ui.theme === "dark")); themeButton.title = ui.theme === "dark" ? t.themeLight : t.themeDark; }
    const languageButton = document.querySelector(".language-toggle");
    if (languageButton) { languageButton.textContent = ui.lang === "ar" ? "English" : "العربية"; languageButton.setAttribute("aria-pressed", String(ui.lang === "ar")); }
    document.querySelectorAll(".menu-toggle").forEach(button => button.setAttribute("aria-label", t.menuOpen));
    document.querySelectorAll(".drawer-close").forEach(button => button.setAttribute("aria-label", t.menuClose));
    document.querySelectorAll(".number-step").forEach(button => button.setAttribute("aria-label", Number(button.dataset.step) < 0 ? t.decreaseTravelers : t.increaseTravelers));
    document.querySelectorAll(".filter-bar").forEach(group => group.setAttribute("aria-label", t.filterLabel));
    const titleKeys = { home: "titleHome", planning: "titlePlanning", attractions: "titleAttractions" };
    document.title = t[titleKeys[page]] || document.title;
  }

  function saveUi() { storage.set(UI_KEY, ui); }

  function setDrawer(open) {
    const drawer = document.querySelector(".drawer");
    const scrim = document.querySelector(".drawer-scrim");
    const toggle = document.querySelector(".menu-toggle");
    if (!drawer || !scrim || !toggle) return;
    drawer.classList.toggle("is-open", open);
    scrim.classList.toggle("is-visible", open);
    drawer.setAttribute("aria-hidden", String(!open));
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("drawer-open", open);
    if (open) { drawer.querySelector("a, button")?.focus(); } else { toggle.focus(); }
  }

  function initNavigation() {
    const toggle = document.querySelector(".menu-toggle");
    const close = document.querySelector(".drawer-close");
    const scrim = document.querySelector(".drawer-scrim");
    const drawer = document.querySelector(".drawer");
    if (!toggle || !close || !scrim || !drawer) return;
    toggle.addEventListener("click", () => setDrawer(true));
    close.addEventListener("click", () => setDrawer(false));
    scrim.addEventListener("click", () => setDrawer(false));
    drawer.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setDrawer(false)));
    document.addEventListener("keydown", event => {
      if (!drawer.classList.contains("is-open")) return;
      if (event.key === "Escape") { event.preventDefault(); setDrawer(false); return; }
      if (event.key !== "Tab") return;
      const focusables = [...drawer.querySelectorAll("a, button:not([disabled])")];
      const first = focusables[0]; const last = focusables.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    document.querySelector(".theme-toggle")?.addEventListener("click", () => { ui.theme = ui.theme === "dark" ? "light" : "dark"; saveUi(); applyPreferences(); renderDynamic(); });
    document.querySelector(".language-toggle")?.addEventListener("click", () => { ui.lang = ui.lang === "ar" ? "en" : "ar"; saveUi(); applyPreferences(); renderDynamic(); });
  }

  const monthData = [
    { en: ["January", "Cool highland days reward a relaxed outdoor plan; take a warm layer for the evening.", "Al Soodah viewpoints"], ar: ["يناير", "تكافئك أيام المرتفعات الباردة بخطة هادئة في الهواء الطلق؛ خذ طبقة دافئة للمساء.", "إطلالات السودة"] },
    { en: ["February", "Expect crisp air and occasional cloud cover. Keep a flexible viewpoint stop in your day.", "Aseer National Park"], ar: ["فبراير", "توقع هواءً منعشاً وسحباً متفرقة. اترك مساحة مرنة لتوقف عند إطلالة.", "منتزه عسير الوطني"] },
    { en: ["March", "A gentle month for walking and outdoor cafés. Start your higher-elevation stops early.", "Al Muftaha Cultural and Art Village"], ar: ["مارس", "شهر لطيف للمشي والمقاهي الخارجية. ابدأ محطات المرتفعات مبكراً.", "قرية المفتاحة الثقافية والفنية"] },
    { en: ["April", "Spring calls for trails and gardens. Pack light sun protection with a comfortable walking layer.", "Al Soodah Mountains"], ar: ["أبريل", "الربيع يدعو للمسارات والحدائق. خذ حماية خفيفة من الشمس وطبقة مريحة للمشي.", "جبال السودة"] },
    { en: ["May", "Plan your open-air moments for morning and golden hour, then linger over a cool local table.", "Abha city gardens"], ar: ["مايو", "خطط للحظاتك في الهواء الطلق صباحاً وعند الغروب، ثم استمتع بطاولة محلية هادئة.", "حدائق مدينة أبها"] },
    { en: ["June", "Abha's milder highland feeling makes room for long views. Bring a light layer for breezy ridges.", "Al Soodah Mountains"], ar: ["يونيو", "أجواء أبها المرتفعة الأكثر اعتدالاً تفسح المجال للإطلالات الطويلة. خذ طبقة خفيفة للقمم العليلة.", "جبال السودة"] },
    { en: ["July", "A popular time for highland air. Start early and leave room for mist to reshape your route.", "Rijal Almaa Heritage Village"], ar: ["يوليو", "وقت محبوب لهواء المرتفعات. ابدأ مبكراً واترك مجالاً للضباب ليعيد تشكيل مسارك.", "قرية رجال ألمع التراثية"] },
    { en: ["August", "Cloudy scenes and lively streets invite an unhurried itinerary. Keep rain-ready layers nearby.", "Al Muftaha Cultural and Art Village"], ar: ["أغسطس", "المشاهد الغائمة والشوارع النابضة تدعو لبرنامج هادئ. أبقِ طبقات جاهزة للمطر قريبة.", "قرية المفتاحة الثقافية والفنية"] },
    { en: ["September", "A lovely bridge to autumn: build in a scenic pause, then explore culture at an easy pace.", "Rijal Almaa Heritage Village"], ar: ["سبتمبر", "جسر جميل نحو الخريف: أضف استراحة ذات منظر، ثم استكشف الثقافة بإيقاع هادئ.", "قرية رجال ألمع التراثية"] },
    { en: ["October", "Clearer light suits photography and gentle walks. Bring a layer as afternoon turns to evening.", "Al Dhabab Walkway"], ar: ["أكتوبر", "الضوء الأكثر صفاءً يناسب التصوير والمشي الهادئ. خذ طبقة مع تحوّل العصر إلى مساء.", "ممشى الضباب"] },
    { en: ["November", "Cooler evenings make warm cafés especially inviting after a heritage or nature stop.", "A local Asiri coffee stop"], ar: ["نوفمبر", "الأمسيات الأبرد تجعل المقاهي الدافئة جذابة بعد محطة تراثية أو طبيعية.", "محطة قهوة عسيرية محلية"] },
    { en: ["December", "Choose a flexible, slow day: mountain views, warm drinks and a well-timed sunset.", "Al Soodah Mountains"], ar: ["ديسمبر", "اختر يوماً مرناً وهادئاً: إطلالات جبلية ومشروبات دافئة وغروباً في موعد جيد.", "جبال السودة"] }
  ];

  const plannerContent = {
    adventurer: { en: ["Cloudline start", "Begin with a misty ridge or forest trail while the air is freshest."], ar: ["بداية بين الغيوم", "ابدأ عند قمة ضبابية أو مسار غابة بينما الهواء في أصفى حالاته."] },
    heritage: { en: ["Stone and story", "Give a heritage village time for its patterned architecture and quiet details."], ar: ["الحجر والحكاية", "امنح قرية تراثية وقتاً لعمارتها المزخرفة وتفاصيلها الهادئة."] },
    lifestyle: { en: ["A city-side pause", "Pair an arts district stroll with an unhurried coffee or local bite."], ar: ["استراحة في المدينة", "اجمع بين نزهة في حي فني وقهوة أو وجبة محلية بهدوء."] },
    family: { en: ["Together, outside", "Keep the pace easy with a scenic park stop and time to simply play."], ar: ["معاً في الخارج", "اجعل الإيقاع سهلاً مع توقف في حديقة خلابة ووقت للعب ببساطة."] },
    default: { en: ["A gentle arrival", "Start with a leafy city walk and let the weather guide your next stop."], ar: ["وصول هادئ", "ابدأ بنزهة في المدينة الخضراء ودع الطقس يرشدك إلى محطتك التالية."] }
  };

  let selectedMonth = new Date().getMonth();
  function plannerStateFromForm() {
    const form = document.querySelector("#planner-form");
    if (!form) return null;
    return { travelers: Number(form.travelers.value), personas: [...document.querySelectorAll(".persona-card[aria-pressed='true']")].map(card => card.dataset.persona), month: selectedMonth };
  }
  function localPlannerState() { return storage.get(PLAN_KEY) || window.SIRIUS_SAMPLE_DATA || { travelers: 2, personas: ["adventurer", "heritage"], month: new Date().getMonth() }; }
  function applyPlannerState(state) {
    const input = document.querySelector("#traveler-count");
    if (!input) return;
    input.value = state.travelers || 2;
    document.querySelectorAll(".persona-card").forEach(card => card.setAttribute("aria-pressed", String((state.personas || []).includes(card.dataset.persona))));
    selectedMonth = Number.isInteger(state.month) && state.month >= 0 && state.month < 12 ? state.month : new Date().getMonth();
  }
  function renderPlanner() {
    const form = document.querySelector("#planner-form");
    if (!form) return;
    const state = plannerStateFromForm();
    const summary = document.querySelector("#plan-summary");
    const list = document.querySelector("#itinerary-list");
    const packing = document.querySelector("#packing-note");
    if (!state || !summary || !list || !packing) return;
    const countText = ui.lang === "ar" ? `${state.travelers || 2} مسافرين` : `${state.travelers || 2} ${state.travelers === 1 ? "traveller" : "travellers"}`;
    summary.textContent = ui.lang === "ar" ? `برنامج قابل للتعديل لـ ${countText}، مصمم على مهل من أجل أبها.` : `A flexible outline for ${countText}, shaped for an unhurried Abha day.`;
    const choices = state.personas.length ? state.personas : ["default"];
    const timeLabels = ui.lang === "ar" ? ["صباح", "بعد الظهر", "مساء"] : ["Morning", "Afternoon", "Evening"];
    const stops = choices.slice(0, 2).map(key => plannerContent[key]);
    stops.push({ en: ["Make space for the view", "Finish where the light and the day's rhythm tell you to linger."], ar: ["اترك مساحة للإطلالة", "اختم حيث يدعوك الضوء وإيقاع اليوم للبقاء قليلاً."] });
    list.innerHTML = stops.map((stop, index) => { const item = getLocalized(stop); return `<li><b>${timeLabels[index] || timeLabels.at(-1)}</b><div><strong>${item[0]}</strong><span>${item[1]}</span></div></li>`; }).join("");
    const season = getLocalized(monthData[selectedMonth]);
    packing.textContent = ui.lang === "ar" ? `طبقة مريحة للمشي، ماء، ومرونة لخطة تتكيف مع ${season[0]}.` : `A comfortable walking layer, water, and room to adapt your plan in ${season[0]}.`;
  }
  function renderMonths() {
    const selector = document.querySelector("#month-selector");
    if (!selector) return;
    const locale = ui.lang === "ar" ? "ar-SA" : "en-US";
    selector.innerHTML = monthData.map((_, index) => {
      const label = new Intl.DateTimeFormat(locale, { month: "short" }).format(new Date(2026, index, 1));
      return `<button type="button" data-month="${index}" aria-pressed="${index === selectedMonth}">${label}</button>`;
    }).join("");
    selector.querySelectorAll("button").forEach(button => button.addEventListener("click", () => { selectedMonth = Number(button.dataset.month); renderMonths(); renderSeason(); renderPlanner(); }));
  }
  function renderSeason() {
    const card = document.querySelector("#season-card");
    if (!card) return;
    const details = getLocalized(monthData[selectedMonth]);
    document.querySelector("#season-heading").textContent = details[0];
    document.querySelector("#season-description").textContent = details[1];
    document.querySelector("#season-place").textContent = details[2];
  }
  function setStatus(key) { const node = document.querySelector("#form-status"); if (node) node.textContent = copy()[key]; }
  function initPlanner() {
    const form = document.querySelector("#planner-form");
    if (!form) return;
    applyPlannerState(localPlannerState());
    document.querySelectorAll(".persona-card").forEach(card => card.addEventListener("click", () => { card.setAttribute("aria-pressed", String(card.getAttribute("aria-pressed") !== "true")); document.querySelector("#persona-error").textContent = ""; renderPlanner(); }));
    document.querySelectorAll(".number-step").forEach(button => button.addEventListener("click", () => {
      const input = document.querySelector("#traveler-count"); const next = Math.max(1, Math.min(12, Number(input.value || 1) + Number(button.dataset.step))); input.value = next; document.querySelector("#traveler-error").textContent = ""; renderPlanner();
    }));
    document.querySelector("#traveler-count").addEventListener("input", renderPlanner);
    form.addEventListener("submit", event => {
      event.preventDefault(); const state = plannerStateFromForm(); let valid = true;
      const travelersError = document.querySelector("#traveler-error"); const personaError = document.querySelector("#persona-error");
      travelersError.textContent = ""; personaError.textContent = "";
      if (!Number.isInteger(state.travelers) || state.travelers < 1 || state.travelers > 12) { travelersError.textContent = copy().validationTravelers; document.querySelector("#traveler-count").focus(); valid = false; }
      if (!state.personas.length) { personaError.textContent = copy().validationPersonas; if (valid) document.querySelector(".persona-card").focus(); valid = false; }
      if (!valid) return;
      storage.set(PLAN_KEY, state); setStatus("saved"); renderPlanner();
    });
    document.querySelector(".load-example").addEventListener("click", () => { applyPlannerState(window.SIRIUS_SAMPLE_DATA || { travelers: 3, personas: ["adventurer", "heritage"], month: new Date().getMonth() }); renderDynamic(); setStatus("exampleLoaded"); });
    document.querySelector(".clear-plan").addEventListener("click", () => { storage.remove(PLAN_KEY); applyPlannerState(window.SIRIUS_SAMPLE_DATA || { travelers: 2, personas: ["adventurer"], month: new Date().getMonth() }); renderDynamic(); setStatus("cleared"); });
    renderMonths(); renderSeason(); renderPlanner();
  }

  const categoryCopy = {
    restaurant: { en: "Restaurant", ar: "مطعم" }, cafe: { en: "Cafe", ar: "مقهى" }, nature: { en: "Natural attraction", ar: "معلم طبيعي" }, heritage: { en: "Heritage site", ar: "موقع تراثي" }
  };
  const attraction = (category, enName, arName, enDescription, arDescription, enFit, arFit) => ({ category, en: [enName, enDescription, enFit], ar: [arName, arDescription, arFit] });
  const attractions = [
    attraction("restaurant", "Bab Al Turath", "باب التراث", "A local dining stop for a relaxed meal after a day in the highlands.", "محطة طعام محلية لوجبة هادئة بعد يوم في المرتفعات.", "Local dining", "طعام محلي"),
    attraction("restaurant", "Jouri Elite", "جوري إيليت", "A polished table to slow down over a shared Abha evening.", "طاولة أنيقة لتمضي أمسية أبها المشتركة على مهل.", "Evening meal", "وجبة مسائية"),
    attraction("restaurant", "Mehrani Restaurant", "مطعم مهراني", "A warm, flavour-led stop for a satisfying city meal.", "محطة دافئة وغنية بالنكهات لوجبة مدينة مُرضية.", "Food lovers", "لعشاق الطعام"),
    attraction("restaurant", "Giorno", "جيورنو", "An easy-going place to pause between city walks and mountain plans.", "مكان مريح للاستراحة بين نزهات المدينة وخطط الجبل.", "City break", "استراحة في المدينة"),
    attraction("restaurant", "Meshraq", "مشراق", "A considered dining choice for a lingering table with company.", "خيار طعام مدروس لطاولة تطول مع الرفقة.", "Friends & groups", "الأصدقاء والمجموعات"),
    attraction("restaurant", "Fayn Al Diafa", "فين الضيافة", "A welcoming stop for a simple shared meal in Abha.", "محطة مضيافة لوجبة مشتركة وبسيطة في أبها.", "Families", "العائلات"),
    attraction("restaurant", "Lemon", "ليمون", "A bright, casual restaurant option for an unhurried meal.", "خيار مطعم لطيف وبسيط لوجبة بلا استعجال.", "Casual dining", "طعام غير رسمي"),
    attraction("cafe", "RARA", "رارا", "A calm café pause to reset the rhythm of your city day.", "استراحة مقهى هادئة تعيد ضبط إيقاع يومك في المدينة.", "Coffee pause", "استراحة قهوة"),
    attraction("cafe", "HEZ Bakery Cafe", "مقهى ومخبز هيز", "A bakery-café stop for something warm before or after a walk.", "محطة مخبز ومقهى لشيء دافئ قبل المشي أو بعده.", "Morning stop", "محطة صباحية"),
    attraction("cafe", "The Neighbours House", "بيت الجيران", "A welcoming café setting for an easy conversation and a drink.", "أجواء مقهى ودودة لحديث هادئ ومشروب.", "Slow afternoons", "أمسيات هادئة"),
    attraction("cafe", "Fog Cafe", "مقهى فوغ", "A fitting coffee stop when mountain weather turns soft and misty.", "محطة قهوة مناسبة حين يصبح طقس الجبل لطيفاً وضبابياً.", "Cloudy days", "أيام ضبابية"),
    attraction("cafe", "OTL", "أو تي إل", "A contemporary café pause in the flow of an Abha day.", "استراحة مقهى عصرية في سياق يومك في أبها.", "Lifestyle route", "مسار أسلوب الحياة"),
    attraction("cafe", "ONCE", "ونس", "An inviting place to linger over a drink after nearby exploring.", "مكان جذاب لإطالة الجلوس مع مشروب بعد الاستكشاف القريب.", "Unhurried time", "وقت بلا استعجال"),
    attraction("cafe", "Bee You", "بي يو", "A friendly café choice for a low-key city-side break.", "خيار مقهى ودود لاستراحة هادئة داخل المدينة.", "Easy break", "استراحة سهلة"),
    attraction("cafe", "Lavish", "لافيش", "A polished café moment to add to an artful or urban afternoon.", "لحظة مقهى أنيقة تضيفها إلى ظهيرة فنية أو حضرية.", "Urban afternoons", "ظهيرات المدينة"),
    attraction("cafe", "Jadilah", "جديلة", "A characterful coffee stop for a quieter table and a local pause.", "محطة قهوة ذات طابع خاص لطاولة أهدأ واستراحة محلية.", "Quiet table", "طاولة هادئة"),
    attraction("cafe", "Camel Step", "كامِل ستيب", "A simple stop to carry the café ritual into your route.", "محطة بسيطة تضيف طقس القهوة إلى مسارك.", "On the go", "أثناء التنقل"),
    attraction("cafe", "Be Together", "بي توغيذر", "A comfortable choice for friends and family to meet between plans.", "خيار مريح لالتقاء الأصدقاء والعائلة بين المحطات.", "Shared time", "وقت مشترك"),
    attraction("cafe", "Kaya Cafe", "كايا كافيه", "A relaxed local café pause when you want to slow the itinerary.", "استراحة مقهى محلية هادئة حين ترغب في إبطاء برنامجك.", "Relaxed route", "مسار هادئ"),
    attraction("cafe", "ACES", "إيسز", "A lively coffee option to fold into an urban Abha wander.", "خيار قهوة نابض تضيفه إلى جولة حضرية في أبها.", "City wander", "جولة مدينة"),
    attraction("cafe", "Brew Theory", "برو ثيوري", "A coffee-focused stop for a considered cup during your day.", "محطة قهوة متخصصة لفنجان مُعتنى به خلال يومك.", "Coffee lovers", "لعشاق القهوة"),
    attraction("nature", "Al Soodah Mountains", "جبال السودة", "High peaks, juniper slopes, and open viewpoints shape one of the region's essential escapes.", "قمم شاهقة ومنحدرات عرعر وإطلالات مفتوحة تشكل أحد أهم ملاذات المنطقة.", "Mountain air", "هواء الجبل"),
    attraction("nature", "Aseer National Park", "منتزه عسير الوطني", "A broad landscape of forest and mountain terrain for a trail-paced day outdoors.", "مشهد واسع من الغابات والتضاريس الجبلية ليوم خارجي بإيقاع المسارات.", "Nature seekers", "محبو الطبيعة"),
    attraction("nature", "Al Sahab Park", "منتزه السحاب", "A cloud-level stop for sweeping highland views and a gentle pause.", "محطة على مستوى الغيوم لإطلالات مرتفعات واسعة واستراحة لطيفة.", "Viewpoints", "الإطلالات"),
    attraction("nature", "Al Dhabab Walkway", "ممشى الضباب", "A scenic promenade to take slowly as Abha's misty atmosphere shifts around you.", "ممشى خلاب تسير فيه بهدوء بينما تتبدل أجواء أبها الضبابية من حولك.", "Gentle walks", "نزهات هادئة"),
    attraction("nature", "Abu Kheal Park", "حديقة أبو خيال", "A green city-side park for an easy outdoor moment with the group.", "حديقة خضراء داخل المدينة للحظة خارجية سهلة مع المجموعة.", "Families", "العائلات"),
    attraction("heritage", "Rijal Almaa Heritage Village", "قرية رجال ألمع التراثية", "Stone houses and layered mountain history make this a defining heritage journey.", "بيوت حجرية وتاريخ جبلي متراكم يجعلانها رحلة تراثية مميزة.", "Heritage explorers", "مستكشفو التراث"),
    attraction("heritage", "Al Muftaha Cultural and Art Village", "قرية المفتاحة الثقافية والفنية", "Colour, art, and cultural expression create an inspiring Abha city walk.", "اللون والفن والتعبير الثقافي تصنع نزهة ملهمة في مدينة أبها.", "Art & culture", "الفن والثقافة"),
    attraction("heritage", "Shamsah Ottoman Castle", "قلعة شمسان العثمانية", "A historic landmark for visitors drawn to Abha's layered architectural story.", "معلم تاريخي لزوار تناديهم حكاية أبها المعمارية متعددة الطبقات.", "Architecture", "العمارة"),
    attraction("heritage", "Bin Hamsan Heritage Village", "قرية بن حمسان التراثية", "A heritage setting that brings regional architecture and memory into view.", "موقع تراثي يُظهر عمارة المنطقة وذاكرتها.", "Regional stories", "حكايات المنطقة"),
    attraction("heritage", "Al Abo Sarrah Palaces", "قصور آل أبو سراح", "A distinctive heritage destination for a closer look at local historic character.", "وجهة تراثية مميزة لإلقاء نظرة أقرب على الطابع التاريخي المحلي.", "Historic character", "طابع تاريخي")
  ];

  let currentFilter = "all";
  function mapUrl(name) {
    const url = new URL("https://www.google.com/maps/search/");
    url.searchParams.set("api", "1");
    url.searchParams.set("query", `${name} Abha, Saudi Arabia`);
    return url.href;
  }
  function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]); }
  function renderAttractions() {
    const grid = document.querySelector("#attraction-grid");
    if (!grid) return;
    const visible = attractions.filter(item => currentFilter === "all" || item.category === currentFilter);
    const t = copy();
    grid.innerHTML = visible.map((item, index) => {
      const [name, description, fit] = getLocalized(item);
      const category = getLocalized(categoryCopy[item.category]);
      const ariaLabel = t.mapsLink.replace("{name}", name);
      return `<article class="attraction-card reveal-card" data-category="${item.category}" style="--reveal-delay:${Math.min(index * 38, 228)}ms"><a class="attraction-link" href="${mapUrl(item.en[0])}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(ariaLabel)}"><span class="attraction-preview" aria-hidden="true"></span><p class="card-category">${escapeHtml(category)}</p><h3>${escapeHtml(name)}</h3><p>${escapeHtml(description)}</p><span class="card-fit">${escapeHtml(fit)}</span><span class="maps-link-note">${escapeHtml(t.mapsNote)}</span></a></article>`;
    }).join("");
    document.querySelector("#empty-state").hidden = visible.length > 0;
    initReveals(grid.querySelectorAll(".reveal-card"));
  }
  function initAttractions() {
    const filters = document.querySelectorAll(".filter-button");
    if (!filters.length) return;
    const hashCategory = decodeURIComponent(location.hash.replace("#", "")).toLowerCase();
    if (["restaurant", "cafe", "nature", "heritage"].includes(hashCategory)) currentFilter = hashCategory;
    filters.forEach(button => button.addEventListener("click", () => {
      currentFilter = button.dataset.filter;
      filters.forEach(item => { const active = item === button; item.classList.toggle("active", active); item.setAttribute("aria-pressed", String(active)); });
      renderAttractions();
    }));
    filters.forEach(button => { const active = button.dataset.filter === currentFilter; button.classList.toggle("active", active); button.setAttribute("aria-pressed", String(active)); });
    renderAttractions();
  }

  const reduceMotionQuery = matchMedia("(prefers-reduced-motion: reduce)");
  let revealObserver;
  function showReveals(scope) {
    const items = scope ? [...scope] : [...document.querySelectorAll(".reveal, .reveal-section, .reveal-card")];
    items.forEach(item => item.classList.add("is-visible"));
  }
  function initReveals(scope) {
    const items = scope ? [...scope] : [...document.querySelectorAll(".reveal, .reveal-section")];
    if (!items.length) return;
    if (!("IntersectionObserver" in window) || reduceMotionQuery.matches) { showReveals(items); return; }
    document.documentElement.classList.add("js-ready");
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); revealObserver.unobserve(entry.target); }
      }), { threshold: .12 });
    }
    items.forEach(item => revealObserver.observe(item));
  }
  reduceMotionQuery.addEventListener?.("change", event => {
    if (event.matches) { revealObserver?.disconnect(); showReveals(); }
    else { initReveals(); }
  });
  function renderDynamic() {
    if (page === "planning") { renderMonths(); renderSeason(); renderPlanner(); }
    if (page === "attractions") renderAttractions();
  }

  applyPreferences();
  initNavigation();
  initPlanner();
  initAttractions();
  initReveals();
})();
