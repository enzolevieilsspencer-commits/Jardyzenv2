<template>
  <div>
    <!-- ─── HERO ──────────────────────────────────────── -->
    <section class="hero" id="accueil" aria-labelledby="hero-titre">
      <img
        src="/img/anthony-fomin-Apips1tJsXo-unsplash.jpg"
        alt=""
        class="hero__bg"
        width="1920"
        height="1280"
        aria-hidden="true"
        loading="eager"
        fetchpriority="high"
        decoding="async"
      />
      <div class="hero__overlay" aria-hidden="true"></div>
      <div class="container hero__content">
        <h1 id="hero-titre" class="hero__title">
          Créateurs de jardins<br />
          <em>d'exception</em>
        </h1>
        <p class="hero__subtitle">
          De la conception à l'entretien, nous donnons vie à vos espaces verts.
          Terrasses, jardins, arrosage automatique — tout pour un extérieur dont
          vous serez fiers.
        </p>
        <div class="hero__actions">
          <RouterLink to="/contact" class="btn btn--primary btn--lg">
            Demander un devis gratuit
          </RouterLink>
          <RouterLink to="/realisations" class="btn btn--ghost btn--lg">
            Voir nos réalisations
          </RouterLink>
        </div>
        <div class="hero__stats">
          <div v-for="stat in stats" :key="stat.value" class="hero__stat">
            <strong class="hero__stat-value">{{ stat.value }}</strong>
            <span class="hero__stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
      <a
        href="#services"
        class="hero__scroll-cta"
        aria-label="Défiler vers les services"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </a>
    </section>

    <!-- ─── SERVICES ──────────────────────────────────── -->
    <section
      id="services"
      class="section section--light"
      aria-labelledby="services-titre"
    >
      <div class="container">
        <header class="section-header" ref="servicesRef">
          <p class="section-eyebrow">Ce que nous faisons</p>
          <h2 id="services-titre" class="section-title">Nos expertises</h2>
          <p class="section-desc">
            Du jardin de création à l'entretien régulier, nous mettons notre
            savoir-faire au service de vos espaces extérieurs.
          </p>
        </header>

        <div class="services-carousel">
          <div class="services-carousel__viewport" ref="servicesCarouselRef">
            <ul
              class="services-grid"
              role="list"
              :style="{ transform: `translateX(${servicesOffset}px)` }"
            >
              <li
                v-for="(service, index) in marqueeServices"
                :key="`${service.id}-${index}`"
              >
                <article
                  class="service-card reveal"
                  :class="`reveal-delay-${index + 1}`"
                  :ref="(el) => setCardRef(el, index)"
                >
                  <div class="service-card__icon" aria-hidden="true">
                    <AppIcon
                      :name="service.icon"
                      :size="26"
                      :stroke-width="1.5"
                    />
                  </div>
                  <h3 class="service-card__title">{{ service.titre }}</h3>
                  <p class="service-card__desc">{{ service.description }}</p>
                  <RouterLink
                    :to="`/services#${service.slug}`"
                    class="service-card__link"
                    :aria-label="`En savoir plus sur ${service.titre}`"
                  >
                    En savoir plus
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      aria-hidden="true"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </RouterLink>
                </article>
              </li>
            </ul>
          </div>
        </div>

        <div class="section-cta">
          <RouterLink to="/services" class="btn btn--outline">
            Découvrir tous nos services
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ─── POURQUOI NOUS ──────────────────────────────── -->
    <section class="section section--dark" aria-labelledby="avantages-titre">
      <div class="container">
        <div class="avantages-grid">
          <div class="avantages-content reveal" ref="avantagesRef">
            <p class="section-eyebrow section-eyebrow--light">
              Pourquoi nous choisir
            </p>
            <h2 id="avantages-titre" class="section-title section-title--light">
              Plus de 10 ans d'expertise<br />à votre service
            </h2>
            <p class="section-desc section-desc--light">
              Nous accompagnons particuliers et professionnels dans la création
              et l'entretien de leurs espaces verts dans les Alpilles et en
              Provence.
            </p>
            <RouterLink to="/a-propos" class="btn btn--accent">
              Notre histoire
            </RouterLink>
          </div>
          <ul class="avantages-list" role="list">
            <li
              v-for="(avantage, index) in avantages"
              :key="avantage.titre"
              class="avantage-item reveal"
              :class="`reveal-delay-${index + 1}`"
            >
              <div class="avantage-item__icon" aria-hidden="true">
                <AppIcon :name="avantage.icon" :size="26" :stroke-width="1.5" />
              </div>
              <div>
                <h3 class="avantage-item__title">{{ avantage.titre }}</h3>
                <p class="avantage-item__desc">{{ avantage.description }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ─── RÉALISATIONS ──────────────────────────────── -->
    <section
      class="section section--light"
      aria-labelledby="realisations-titre"
    >
      <div class="container">
        <header class="section-header">
          <p class="section-eyebrow">Notre portfolio</p>
          <h2 id="realisations-titre" class="section-title">
            Quelques réalisations
          </h2>
          <p class="section-desc">
            Chaque projet est unique. Voici un aperçu de nos dernières
            créations.
          </p>
        </header>

        <ul class="realisations-grid" role="list">
          <li
            v-for="(realisation, index) in recentRealisations"
            :key="realisation.id"
            class="realisation-card reveal"
            :class="`reveal-delay-${index + 1}`"
          >
            <article>
              <figure class="realisation-card__figure">
                <img
                  :src="index === 0 ? '/img/gazon.jpg' : realisation.src"
                  :alt="realisation.alt"
                  :width="realisation.width"
                  :height="realisation.height"
                  loading="lazy"
                  decoding="async"
                  :class="[
                    'realisation-card__img',
                    {
                      'realisation-card__img--tall':
                        realisation.height > realisation.width,
                    },
                  ]"
                />
                <figcaption class="realisation-card__caption">
                  <span class="realisation-card__tag">{{
                    realisation.categorieLabel
                  }}</span>
                  <h3 class="realisation-card__title">
                    {{ realisation.titre }}
                  </h3>
                  <p class="realisation-card__lieu">{{ realisation.lieu }}</p>
                </figcaption>
              </figure>
            </article>
          </li>
        </ul>

        <div class="section-cta">
          <RouterLink to="/realisations" class="btn btn--outline">
            Voir toutes nos réalisations
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ─── TÉMOIGNAGES ────────────────────────────────── -->
    <TemoignagesCarousel />

    <!-- ─── CTA FINAL ──────────────────────────────────── -->
    <section class="section cta-section" aria-labelledby="cta-titre">
      <div class="container cta-section__inner">
        <div class="cta-section__text reveal" ref="ctaRef">
          <h2 id="cta-titre" class="cta-section__title">
            Votre jardin de rêve<br />commence ici
          </h2>
          <p class="cta-section__desc">
            Contactez-nous pour une visite gratuite et un devis personnalisé.<br />
            Réponse sous 48h.
          </p>
        </div>
        <RouterLink to="/contact" class="btn btn--primary btn--xl">
          Demander mon devis gratuit
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { services } from "@/data/services.js";
import { realisations } from "@/data/realisations.js";
import TemoignagesCarousel from "@/components/ui/TemoignagesCarousel.vue";
import AppIcon from "@/components/ui/AppIcon.vue";

const featuredServices = services.filter((service) =>
  [
    "creation-jardins",
    "entretien-jardins",
    "terrasses-allees",
    "elagage-abattage",
  ].includes(service.slug),
);
const marqueeServices = computed(() => [
  ...featuredServices,
  ...featuredServices,
]);
const recentRealisations = realisations.slice(0, 3);

const stats = [
  { value: "+10", label: "ans d'expérience" },
  { value: "98%", label: "clients satisfaits" },
  { value: "40km", label: "autour des Alpilles" },
];

const avantages = [
  {
    icon: "palette",
    titre: "Conception personnalisée",
    description:
      "Chaque projet commence par une écoute approfondie de vos envies et contraintes.",
  },
  {
    icon: "leaf",
    titre: "Végétaux de qualité",
    description:
      "Nous sélectionnons des plantes adaptées à votre sol, exposition et style de vie.",
  },
  {
    icon: "clock",
    titre: "Délais respectés",
    description:
      "Planning établi en amont, respect des engagements pris sur chaque chantier.",
  },
  {
    icon: "refresh",
    titre: "Suivi après livraison",
    description:
      "Conseils d'entretien et service après-vente réactif.",
  },
];

// Scroll reveal pour les cartes
const cardRefs = ref([]);
let observers = [];

const setCardRef = (el, index) => {
  if (el) cardRefs.value[index] = el;
};

const servicesRef = ref(null);
const servicesCarouselRef = ref(null);
const avantagesRef = ref(null);
const ctaRef = ref(null);

const observeElement = (el) => {
  if (!el) return;
  const obs = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        obs.unobserve(entry.target);
      }
    },
    { threshold: 0.1 },
  );
  obs.observe(el);
  observers.push(obs);
};

const servicesOffset = ref(0);
let servicesAnimationId;
let lastServicesTimestamp = 0;
const SERVICES_SPEED = 40; // px/s

const animateServices = (timestamp) => {
  if (!lastServicesTimestamp) lastServicesTimestamp = timestamp;
  const delta = (timestamp - lastServicesTimestamp) / 1000;
  lastServicesTimestamp = timestamp;

  const viewport = servicesCarouselRef.value;
  if (!viewport) {
    servicesAnimationId = requestAnimationFrame(animateServices);
    return;
  }
  const track = viewport.querySelector(".services-grid");
  if (!track) {
    servicesAnimationId = requestAnimationFrame(animateServices);
    return;
  }

  const singleWidth = track.scrollWidth / 2 || 0;
  servicesOffset.value -= SERVICES_SPEED * delta;
  if (-servicesOffset.value >= singleWidth) {
    servicesOffset.value += singleWidth;
  }

  servicesAnimationId = requestAnimationFrame(animateServices);
};

onMounted(() => {
  observeElement(servicesRef.value);
  observeElement(avantagesRef.value);
  observeElement(ctaRef.value);
  cardRefs.value.forEach(observeElement);
  document.querySelectorAll(".reveal").forEach(observeElement);

  servicesAnimationId = requestAnimationFrame(animateServices);
});

onBeforeUnmount(() => {
  observers.forEach((obs) => obs.disconnect());
  if (servicesAnimationId) cancelAnimationFrame(servicesAnimationId);
});
</script>

<style scoped>
/* ─── Hero ────────────────────────────────────────── */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(26, 31, 26, 0.55) 0%,
    rgba(45, 74, 45, 0.4) 50%,
    rgba(26, 31, 26, 0.45) 100%
  );
}

.hero__content {
  position: relative;
  z-index: 1;
  padding-block: var(--space-32) var(--space-24);
  max-width: 760px;
}

@media (min-width: 1024px) {
  .hero__content {
    margin-left: 4vw;
  }
}

.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: var(--space-4);
}

.hero__eyebrow::before {
  content: "";
  display: block;
  width: 32px;
  height: 1px;
  background-color: var(--color-accent);
}

.hero__title {
  font-size: var(--text-5xl);
  font-weight: 700;
  color: var(--color-white);
  line-height: var(--leading-tight);
  margin-bottom: var(--space-6);
}

.hero__title em {
  font-style: italic;
  color: var(--color-accent-light);
}

.hero__subtitle {
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.85);
  line-height: var(--leading-relaxed);
  max-width: 580px;
  margin-bottom: var(--space-8);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-bottom: var(--space-12);
}

.hero__stats {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-8);
  padding-top: var(--space-8);
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  justify-content: center;
  text-align: center;
}

.hero__stat {
  display: flex;
  flex-direction: column;
}

.hero__stat-value {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--color-accent-light);
}

.hero__stat-label {
  font-size: var(--text-base);
  color: rgba(255, 255, 255, 0.65);
}

.hero__scroll-cta {
  position: absolute;
  bottom: var(--space-8);
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.6);
  animation: bounce 2s ease-in-out infinite;
  transition: color var(--transition-base);
}

.hero__scroll-cta:hover {
  color: var(--color-accent);
}

@keyframes bounce {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(8px);
  }
}

/* ─── Boutons ─────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-weight: 600;
  border-radius: var(--border-radius-full);
  transition: all var(--transition-base);
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.btn--primary {
  background-color: var(--color-accent);
  color: var(--color-primary-dark);
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-base);
}
.btn--primary:hover {
  background-color: var(--color-accent-light);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn--ghost {
  background-color: transparent;
  color: var(--color-white);
  border: 2px solid rgba(255, 255, 255, 0.5);
  padding: calc(var(--space-4) - 2px) var(--space-8);
  font-size: var(--text-base);
}
.btn--ghost:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: var(--color-white);
  transform: translateY(-2px);
}

.btn--outline {
  background-color: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  padding: calc(var(--space-3) - 2px) var(--space-8);
  font-size: var(--text-sm);
}
.btn--outline:hover {
  background-color: var(--color-primary);
  color: var(--color-white);
  transform: translateY(-2px);
}

.btn--accent {
  background-color: var(--color-accent);
  color: var(--color-primary-dark);
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-base);
}
.btn--accent:hover {
  background-color: var(--color-accent-light);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn--lg {
  padding: var(--space-4) var(--space-8);
}
.btn--xl {
  padding: var(--space-6) var(--space-12);
  font-size: var(--text-lg);
}

/* ─── Sections ────────────────────────────────────── */
.section {
  padding-block: var(--space-24);
}

.section--light {
  background-color: var(--color-white);
}
.section--cream {
  background-color: var(--color-bg);
}
.section--dark {
  background-color: var(--color-bg-dark);
}

.section-header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto var(--space-16);
}

.section-eyebrow {
  display: inline-block;
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-secondary);
  margin-bottom: var(--space-3);
}

.section-eyebrow--light {
  color: var(--color-secondary-light);
}

.section-title {
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--color-primary);
  line-height: var(--leading-snug);
  margin-bottom: var(--space-4);
}

.section-title--light {
  color: var(--color-white);
}

.section-desc {
  font-size: var(--text-lg);
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
}

.section-desc--light {
  color: rgba(255, 255, 255, 0.72);
}

.section-cta {
  text-align: center;
  margin-top: var(--space-12);
}

/* ─── Services carousel ───────────────────────────── */
.services-carousel {
  position: relative;
  margin-inline: calc(-1 * var(--container-padding));
  padding-inline: var(--container-padding);
}

.services-carousel::before,
.services-carousel::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80px;
  pointer-events: none;
  z-index: 1;
}

.services-carousel::before {
  left: 0;
  background: linear-gradient(to right, var(--color-white), transparent);
}

.services-carousel::after {
  right: 0;
  background: linear-gradient(to left, var(--color-white), transparent);
}

.services-carousel__viewport {
  overflow-x: auto;
  padding-bottom: var(--space-2);
  scroll-snap-type: x mandatory;
}

.services-carousel__viewport::-webkit-scrollbar {
  display: none;
}

.services-grid {
  display: flex;
  gap: var(--space-6);
  padding-block: var(--space-2);
  min-width: max-content;
  align-items: stretch;
}

.service-card {
  padding: var(--space-8);
  background-color: var(--color-bg);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-border);
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base),
    border-color var(--transition-base);
  min-width: 260px;
  max-width: 320px;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-secondary-light);
}

.service-card__icon {
  width: 56px;
  height: 56px;
  background-color: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--border-radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-6);
  transition: background-color var(--transition-base);
}

.service-card:hover .service-card__icon {
  background-color: var(--color-accent);
  color: var(--color-primary-dark);
}

.services-carousel__btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius-full);
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: var(--shadow-md);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  transition:
    background-color var(--transition-base),
    transform var(--transition-base),
    box-shadow var(--transition-base);
}

.services-carousel__btn:hover {
  background-color: var(--color-accent-light);
  transform: translateY(-50%) translateY(-1px);
  box-shadow: var(--shadow-lg);
}

.services-carousel__btn--prev {
  left: 0;
  transform: translateY(-50%) translateX(-50%);
}

.services-carousel__btn--next {
  right: 0;
  transform: translateY(-50%) translateX(50%);
}

.services-carousel__viewport,
.services-grid,
.service-card {
  pointer-events: none;
  user-select: none;
  -webkit-user-select: none;
}

@media (max-width: 767px) {
  .services-carousel__btn {
    display: none;
  }
}

.service-card__title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--space-3);
}

.service-card__desc {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-6);
  flex: 1 1 auto;
}

.service-card__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-primary);
  transition:
    gap var(--transition-base),
    color var(--transition-base);
}

.service-card__link:hover {
  gap: var(--space-3);
  color: var(--color-secondary);
}

/* ─── Avantages ───────────────────────────────────── */
.avantages-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-16);
  align-items: center;
}

.avantages-content .btn--accent {
  margin-top: var(--space-6);
}

.avantages-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.avantage-item {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-6);
  background-color: rgba(255, 255, 255, 0.06);
  border-radius: var(--border-radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.avantage-item__icon {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: var(--border-radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent);
}

.avantage-item__title {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-white);
  margin-bottom: var(--space-2);
}

.avantage-item__desc {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.65);
  line-height: var(--leading-relaxed);
}

/* ─── Réalisations grid ───────────────────────────── */
.realisations-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
}

.realisation-card {
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base);
  background-color: var(--color-white);
}

.realisation-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.realisation-card__img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  transition: transform var(--transition-slow);
  border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
}

.realisation-card__img--tall {
  object-fit: contain;
  background-color: var(--color-bg);
}

.realisation-card:hover .realisation-card__img {
  transform: scale(1.05);
}

.realisation-card__caption {
  padding: var(--space-5) var(--space-5) var(--space-6);
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-top: var(--space-3);
  align-items: center;
  text-align: center;
}

.realisation-card__tag {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  background-color: var(--color-accent);
  color: var(--color-primary-dark);
  font-size: var(--text-xs);
  font-weight: 600;
  border-radius: var(--border-radius-full);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: var(--space-2);
}

.realisation-card__title {
  font-size: var(--text-lg);
  font-weight: 600;
  margin-bottom: var(--space-1);
}

.realisation-card__lieu {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

/* ─── CTA section ─────────────────────────────────── */
.cta-section {
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-primary-light) 100%
  );
  padding-block: var(--space-24);
}

.cta-section__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-8);
}

.cta-section__title {
  font-size: var(--text-4xl);
  color: var(--color-white);
  line-height: var(--leading-snug);
}

.cta-section__desc {
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.8);
  line-height: var(--leading-relaxed);
}

/* ─── Responsive ──────────────────────────────────── */
@media (min-width: 480px) {
  .hero__title {
    font-size: var(--text-6xl);
  }
}

@media (min-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .realisations-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .avantages-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  .cta-section__inner {
    flex-direction: row;
    text-align: left;
    justify-content: space-between;
    align-items: center;
  }

  .cta-section__text {
    max-width: 560px;
  }
}
</style>
