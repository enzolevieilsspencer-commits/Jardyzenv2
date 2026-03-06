<template>
  <div>
    <!-- ─── Services détaillés ────────────────────────── -->
    <section
      class="section section--light"
      aria-labelledby="services-detail-titre"
    >
      <div class="container">
        <h2 id="services-detail-titre" class="visually-hidden">
          Détail de mes services
        </h2>

        <ul class="services-list" role="list">
          <li
            v-for="(service, index) in services"
            :key="service.id"
            :id="service.slug"
            class="service-item reveal"
            :class="{ 'service-item--reverse': index % 2 !== 0 }"
          >
            <article class="service-item__inner">
              <figure
                :class="[
                  'service-item__visual',
                  {
                    'service-item__visual--elagage':
                      service.slug === 'elagage-abattage',
                  },
                ]"
              >
                <img
                  :src="service.imageUrl"
                  :alt="service.imageAlt"
                  width="800"
                  height="600"
                  loading="lazy"
                  class="service-item__img"
                />
              </figure>
              <div class="service-item__content">
                <span class="service-item__number" aria-hidden="true"
                  >0{{ service.id }}</span
                >
                <h3 class="service-item__title">{{ service.titre }}</h3>
                <p class="service-item__desc">
                  {{ service.descriptionLongue }}
                </p>
                <ul
                  class="service-item__avantages"
                  role="list"
                  :aria-label="`Avantages : ${service.titre}`"
                >
                  <li
                    v-for="avantage in service.avantages"
                    :key="avantage"
                    class="service-item__avantage"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {{ avantage }}
                  </li>
                </ul>
                <RouterLink to="/contact" class="btn btn--primary">
                  Demander un devis
                </RouterLink>
              </div>
            </article>
          </li>
        </ul>
      </div>
    </section>

    <!-- ─── Processus ─────────────────────────────────── -->
    <section class="section section--dark" aria-labelledby="processus-titre">
      <div class="container">
        <header class="section-header">
          <p class="section-eyebrow section-eyebrow--light">
            Comment ça marche
          </p>
          <h2 id="processus-titre" class="section-title section-title--light">
            Mon processus en 4 étapes
          </h2>
        </header>

        <ol class="processus-list" role="list">
          <li
            v-for="(etape, index) in processus"
            :key="etape.titre"
            class="processus-item reveal"
            :class="`reveal-delay-${index + 1}`"
          >
            <div class="processus-item__step" aria-hidden="true">
              {{ index + 1 }}
            </div>
            <div class="processus-item__connector" aria-hidden="true"></div>
            <div class="processus-item__content">
              <h3 class="processus-item__title">{{ etape.titre }}</h3>
              <p class="processus-item__desc">{{ etape.description }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- ─── Zone d'intervention ───────────────────────── -->
    <section class="section section--light" aria-labelledby="zone-titre">
      <div class="container zone-grid">
        <div class="zone-text">
          <p class="section-eyebrow">Où j'interviens</p>
          <h2 id="zone-titre" class="section-title">Zone d'intervention</h2>
          <p class="section-desc">
            J'interviens dans un rayon de 40 km autour des Alpilles,
            couvrant Saint-Rémy-de-Provence, Arles, Salon-de-Provence et les
            communes environnantes.
          </p>
          <ul class="zone-list" role="list" aria-label="Communes desservies">
            <li
              v-for="commune in communes"
              :key="commune"
              class="zone-list__item"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                />
              </svg>
              {{ commune }}
            </li>
          </ul>
        </div>
        <div class="zone-cta">
          <div class="zone-cta__card">
            <p class="zone-cta__question">Vous êtes hors zone ?</p>
            <p class="zone-cta__desc">
              Contactez-moi quand même, j'étudie toutes les demandes selon
              mes disponibilités.
            </p>
            <RouterLink to="/contact" class="btn btn--primary">
              Me contacter
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { services } from "@/data/services.js";

const processus = [
  {
    titre: "Prise de contact & visite",
    description:
      "Je planifie une visite sur place pour comprendre votre projet, vos envies et les contraintes du terrain. Gratuit et sans engagement.",
  },
  {
    titre: "Conception & devis",
    description:
      "J'élabore un plan personnalisé avec sélection végétale et vous soumets un devis détaillé sous 5 jours ouvrés.",
  },
  {
    titre: "Réalisation du chantier",
    description:
      "J'interviens selon le planning établi. Vous êtes informé de l'avancement à chaque étape clé.",
  },
  {
    titre: "Livraison & suivi",
    description:
      "Visite de réception du chantier avec vous, conseils d'entretien personnalisés et suivi à 3 mois pour garantir la reprise des végétaux.",
  },
];

const communes = [
  "Saint-Rémy-de-Provence",
  "Les Baux-de-Provence",
  "Maussane-les-Alpilles",
  "Eygalières",
  "Fontvieille",
  "Mouriès",
  "Aureille",
  "Orgon",
  "Eyguières",
  "Tarascon",
  "Arles",
  "Salon-de-Provence",
  "Châteaurenard",
  "Cavaillon",
  "Istres",
  "Miramas",
];

let observers = [];

const observeAll = () => {
  document.querySelectorAll(".reveal").forEach((el) => {
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
  });
};

onMounted(() => {
  observeAll();
});
onBeforeUnmount(() => {
  observers.forEach((o) => o.disconnect());
});
</script>

<style scoped>
/* ─── Boutons ─────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-weight: 600;
  border-radius: var(--border-radius-full);
  transition: all var(--transition-base);
  letter-spacing: 0.02em;
}

.btn--primary {
  background-color: var(--color-accent);
  color: var(--color-primary-dark);
  padding: var(--space-3) var(--space-8);
  font-size: var(--text-sm);
}
.btn--primary:hover {
  background-color: var(--color-accent-light);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* ─── Sections ────────────────────────────────────── */
.section {
  padding-block: var(--space-24);
}
.section--light {
  background-color: var(--color-bg);
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

.section-desc--small {
  font-size: var(--text-sm);
  margin-top: var(--space-3);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

/* ─── Services list ───────────────────────────────── */
.services-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-24);
}

.service-item__inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-12);
  align-items: center;
}

.service-item__visual {
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.service-item__img {
  width: 100%;
  height: 360px;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.service-item__visual--elagage .service-item__img {
  height: 440px;
  object-position: center top;
}

.service-item__visual:hover .service-item__img {
  transform: scale(1.03);
}

.service-item__number {
  display: block;
  font-family: var(--font-display);
  font-size: var(--text-5xl);
  font-weight: 700;
  color: var(--color-border);
  line-height: 1;
  margin-bottom: var(--space-2);
}

.service-item__title {
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--space-4);
}

.service-item__desc {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-6);
}

.service-item__avantages {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-8);
}

.service-item__avantage {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-sm);
  color: var(--color-text);
}

.service-item__avantage svg {
  flex-shrink: 0;
  color: var(--color-secondary);
}

/* ─── Processus ───────────────────────────────────── */
.processus-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
}

.processus-item {
  display: flex;
  gap: var(--space-6);
  align-items: flex-start;
}

.processus-item__step {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  background-color: var(--color-accent);
  color: var(--color-primary-dark);
  border-radius: var(--border-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 700;
}

.processus-item__connector {
  display: none;
}

.processus-item__title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-white);
  margin-bottom: var(--space-2);
}

.processus-item__desc {
  font-size: var(--text-base);
  color: rgba(255, 255, 255, 0.65);
  line-height: var(--leading-relaxed);
}

/* ─── Zone d'intervention ─────────────────────────── */
.zone-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-12);
}

.zone-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-2) var(--space-4);
  margin-top: var(--space-8);
}

.zone-list__item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.zone-list__item svg {
  color: var(--color-secondary);
  flex-shrink: 0;
}

.zone-cta__card {
  padding: var(--space-8);
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-primary-light) 100%
  );
  border-radius: var(--border-radius-xl);
  color: var(--color-white);
}

.zone-cta__question {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 600;
  margin-bottom: var(--space-3);
}

.zone-cta__desc {
  font-size: var(--text-base);
  color: rgba(255, 255, 255, 0.8);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-8);
}

/* ─── Responsive ──────────────────────────────────── */
@media (min-width: 768px) {
  .intro-grid {
    grid-template-columns: 1fr 1fr;
  }
  .zone-grid {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }

  .service-item__inner {
    grid-template-columns: 1fr 1fr;
  }

  .service-item--reverse .service-item__content {
    order: -1;
  }

  .processus-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .processus-list {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
