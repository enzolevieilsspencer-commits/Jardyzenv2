<template>
  <div>
    <!-- ─── Histoire ───────────────────────────────────── -->
    <section class="section section--light" aria-labelledby="histoire-titre">
      <div class="container histoire-grid">
        <!-- Colonne gauche : texte + stats -->
        <div class="histoire-text reveal">
          <p class="section-eyebrow">À propos de Jardyzen</p>
          <h2 id="histoire-titre" class="section-title">
            Une entreprise du<br />cœur des Alpilles
          </h2>
          <p class="section-desc">
            Jardyzen est une entreprise de paysagisme implantée au cœur des
            Alpilles, à Paradou. Nous mettons notre expertise au service des
            particuliers et des professionnels pour créer et entretenir des
            espaces verts exceptionnels.
          </p>
          <p class="histoire-para">
            Jardyzen allie passion du végétal et savoir-faire technique pour
            transformer vos projets en réalité. Chaque jardin est unique et
            mérite une attention particulière adaptée à vos besoins et à votre
            environnement.
          </p>
          <p class="histoire-para">
            Que ce soit pour l'entretien régulier de vos espaces verts, la
            création de massifs fleuris, des travaux de terrassement ou
            l'élagage d'arbres, nous intervenons dans toute la région des
            Alpilles avec professionnalisme et respect de l'environnement.
          </p>

          <!-- Stats -->
          <div class="histoire-stats" role="list" aria-label="Chiffres clés">
            <div
              class="histoire-stat"
              role="listitem"
              v-for="stat in stats"
              :key="stat.label"
            >
              <strong class="histoire-stat__value">{{ stat.value }}</strong>
              <span class="histoire-stat__label">{{ stat.label }}</span>
            </div>
          </div>
        </div>

        <!-- Colonne droite : photo + engagement -->
        <div class="histoire-right reveal reveal-delay-2">
          <figure class="histoire-visual">
            <img
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80"
              alt="Mas provençal avec jardin paysagé dans les Alpilles, réalisé par Jardyzen"
              width="800"
              height="600"
              loading="lazy"
              class="histoire-img"
            />
          </figure>

          <!-- Carte engagement -->
          <div class="engagement-card" aria-labelledby="engagement-titre">
            <h3 id="engagement-titre" class="engagement-card__title">
              Notre engagement
            </h3>
            <ul class="engagement-card__list" role="list">
              <li
                v-for="item in engagements"
                :key="item"
                class="engagement-card__item"
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
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Valeurs ────────────────────────────────────── -->
    <section class="section section--cream" aria-labelledby="valeurs-titre">
      <div class="container">
        <header class="section-header">
          <p class="section-eyebrow">Ce qui nous guide</p>
          <h2 id="valeurs-titre" class="section-title">Nos valeurs</h2>
        </header>

        <ul class="valeurs-grid" role="list">
          <li
            v-for="(valeur, index) in valeurs"
            :key="valeur.titre"
            class="valeur-card reveal"
            :class="`reveal-delay-${index + 1}`"
          >
            <article>
              <div class="valeur-card__icon" aria-hidden="true">
                <AppIcon :name="valeur.icon" :size="28" :stroke-width="1.5" />
              </div>
              <h3 class="valeur-card__title">{{ valeur.titre }}</h3>
              <p class="valeur-card__desc">{{ valeur.description }}</p>
            </article>
          </li>
        </ul>
      </div>
    </section>

    <!-- ─── Certifications ────────────────────────────── -->
    <section class="section section--dark" aria-labelledby="certif-titre">
      <div class="container">
        <h2 id="certif-titre" class="certif-titre">
          Certifications & engagements
        </h2>
        <ul class="certif-grid" role="list">
          <li
            v-for="certif in certifications"
            :key="certif.titre"
            class="certif-item reveal"
          >
            <div class="certif-item__icon" aria-hidden="true">
              <AppIcon :name="certif.icon" :size="28" :stroke-width="1.5" />
            </div>
            <div>
              <h3 class="certif-item__title">{{ certif.titre }}</h3>
              <p class="certif-item__desc">{{ certif.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- ─── CTA ───────────────────────────────────────── -->
    <section class="section cta-section" aria-labelledby="cta-titre">
      <div class="container cta-inner">
        <div class="cta-text">
          <h2 id="cta-titre" class="cta-title">
            Prêt à transformer<br />votre jardin ?
          </h2>
          <p class="cta-desc">Rencontrons-nous autour de votre projet.</p>
        </div>
        <RouterLink to="/contact" class="btn btn--primary btn--lg">
          Demander un devis gratuit
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import AppIcon from "@/components/ui/AppIcon.vue";

const stats = [
  { value: "+10", label: "Ans d'expérience" },
  { value: "100%", label: "Clients satisfaits" },
];

const engagements = [
  "Respect des délais",
  "Travail soigné et professionnel",
  "Conseil personnalisé",
  "Matériel de qualité",
];

const valeurs = [
  {
    icon: "leaf",
    titre: "Passion du végétal",
    description:
      "Nous travaillons en harmonie avec la nature. Espèces locales provençales, techniques douces, pratiques respectueuses de l'environnement des Alpilles.",
  },
  {
    icon: "wrench",
    titre: "Savoir-faire technique",
    description:
      "La finition d'un dallage, la taille d'un arbuste, le raccord d'une bordure — chaque détail compte. Nous ne livrons que ce dont nous sommes fiers.",
  },
  {
    icon: "users",
    titre: "Conseil personnalisé",
    description:
      "Un projet réussi commence par une vraie écoute. Nous adaptons chaque solution à votre terrain, votre style de vie et votre budget. Zéro surprise.",
  },
  {
    icon: "map-pin",
    titre: "Ancrage Alpilles",
    description:
      "Paradou et les Alpilles, c'est notre territoire. Nous connaissons ses sols calcaires, son mistral, ses végétaux. Nous travaillons avec des fournisseurs locaux.",
  },
];

const certifications = [
  {
    icon: "award",
    titre: "RGE EcoJardin",
    description:
      "Reconnu Garant de l'Environnement pour la gestion écologique des espaces verts.",
  },
  {
    icon: "shield",
    titre: "Assurance décennale",
    description:
      "Garantie décennale sur tous nos travaux de construction (terrasses, structures, arrosage).",
  },
  {
    icon: "sprout",
    titre: "Garantie végétaux 2 ans",
    description:
      "Tous les végétaux que nous plantons sont garantis 2 ans. Si une plante ne reprend pas, on la remplace.",
  },
  {
    icon: "clipboard",
    titre: "Qualipaysage",
    description:
      "Membre du réseau Qualipaysage, gage de professionnalisme et de qualité reconnu nationalement.",
  },
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
  font-weight: 600;
  border-radius: var(--border-radius-full);
  transition: all var(--transition-base);
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
  box-shadow: var(--shadow-md);
}
.btn--lg {
  padding: var(--space-4) var(--space-10);
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

.section-title {
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--color-primary);
  line-height: var(--leading-snug);
  margin-bottom: var(--space-4);
}

.section-desc {
  font-size: var(--text-lg);
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
}

/* ─── Histoire ────────────────────────────────────── */
.histoire-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-12);
  align-items: start;
}

.histoire-right {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.histoire-visual {
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.histoire-img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: transform var(--transition-slow);
}

.histoire-visual:hover .histoire-img {
  transform: scale(1.03);
}

.histoire-para {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
  margin-top: var(--space-4);
}

/* Stats */
.histoire-stats {
  display: flex;
  gap: var(--space-4);
  margin-top: var(--space-8);
}

.histoire-stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-6) var(--space-4);
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  text-align: center;
}

.histoire-stat__value {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1;
}

.histoire-stat__label {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin-top: var(--space-2);
}

/* Engagement card */
.engagement-card {
  background-color: var(--color-bg-dark);
  border-radius: var(--border-radius-xl);
  padding: var(--space-8);
}

.engagement-card__title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-white);
  margin-bottom: var(--space-5);
}

.engagement-card__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.engagement-card__item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-base);
  color: rgba(255, 255, 255, 0.88);
}

.engagement-card__item svg {
  flex-shrink: 0;
  color: var(--color-accent);
}

/* ─── Valeurs ─────────────────────────────────────── */
.valeurs-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

.valeur-card {
  padding: var(--space-8);
  background-color: var(--color-white);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  transition:
    box-shadow var(--transition-base),
    transform var(--transition-base);
}

.valeur-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.valeur-card__icon {
  width: 52px;
  height: 52px;
  background-color: var(--color-bg-alt);
  border-radius: var(--border-radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  margin-bottom: var(--space-5);
  transition:
    background-color var(--transition-base),
    color var(--transition-base);
}

.valeur-card:hover .valeur-card__icon {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.valeur-card__title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--space-3);
}

.valeur-card__desc {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
}

/* ─── Certifications ──────────────────────────────── */
.certif-titre {
  font-size: var(--text-3xl);
  color: var(--color-white);
  text-align: center;
  margin-bottom: var(--space-12);
}

.certif-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

.certif-item {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-6);
  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius-lg);
}

.certif-item__icon {
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

.certif-item__title {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-white);
  margin-bottom: var(--space-2);
}

.certif-item__desc {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.65);
  line-height: var(--leading-relaxed);
}

/* ─── CTA ─────────────────────────────────────────── */
.cta-section {
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-primary-light) 100%
  );
  padding-block: var(--space-24);
}

.cta-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-8);
}

.cta-title {
  font-size: var(--text-4xl);
  color: var(--color-white);
}

.cta-desc {
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.8);
}

/* ─── Responsive ──────────────────────────────────── */
@media (min-width: 640px) {
  .histoire-stats {
    gap: var(--space-6);
  }
  .histoire-stat {
    padding: var(--space-8);
  }
}

@media (min-width: 768px) {
  .histoire-grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-16);
    align-items: start;
  }
  .histoire-img {
    height: 380px;
  }
  .valeurs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .equipe-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .certif-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .histoire-grid {
    grid-template-columns: 1fr 1.1fr;
  }
  .valeurs-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  .equipe-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .membre-card__inner {
    flex-direction: column;
    text-align: center;
  }

  .cta-inner {
    flex-direction: row;
    text-align: left;
    justify-content: space-between;
  }
}
</style>
