<template>
  <div>
    <!-- ─── Titre + Portfolio grille ───────────────────── -->
    <section class="section section--light" aria-labelledby="galerie-titre">
      <div class="container">
        <h1 id="galerie-titre" class="page-title">Réalisations</h1>
        <p class="page-subtitle">Découvrez les projets réalisés dans les Alpilles et en Provence — chaque jardin raconte une histoire unique.</p>

        <ul class="portfolio-grid" role="list">
          <li
            v-for="realisation in realisations"
            :key="realisation.id"
            class="portfolio-item"
          >
            <article
              class="portfolio-card"
              :class="{
                'portfolio-card--toggle': realisation.srcHover,
                'portfolio-card--show-after': realisation.srcHover && !!showAfterIds[realisation.id]
              }"
            >
              <figure class="portfolio-card__figure">
                <div
                  v-if="realisation.srcHover"
                  class="portfolio-card__img-wrap portfolio-card__img-wrap--clickable"
                  role="button"
                  tabindex="0"
                  aria-label="Gauche : avant, droite : après"
                  @click="onImageClick($event, realisation.id)"
                  @keydown.enter.prevent="onImageKeydown($event, realisation.id)"
                >
                  <img
                    :src="realisation.src"
                    :alt="realisation.alt"
                    :width="realisation.width"
                    :height="realisation.height"
                    loading="lazy"
                    class="portfolio-card__img"
                  />
                  <img
                    :src="realisation.srcHover"
                    :alt="realisation.altHover || realisation.alt"
                    :width="realisation.width"
                    :height="realisation.height"
                    class="portfolio-card__img portfolio-card__img--hover"
                    :aria-hidden="!showAfterIds[realisation.id]"
                  />
                </div>
                <div v-else class="portfolio-card__img-wrap">
                  <img
                    :src="realisation.src"
                    :alt="realisation.alt"
                    :width="realisation.width"
                    :height="realisation.height"
                    loading="lazy"
                    class="portfolio-card__img"
                  />
                </div>
                <figcaption class="portfolio-card__caption">
                  <div class="portfolio-card__caption-text">
                    <span class="portfolio-card__tag">{{ realisation.categorieLabel }}</span>
                    <h3 class="portfolio-card__title">{{ realisation.titre }}</h3>
                    <p class="portfolio-card__meta">{{ realisation.lieu }} · {{ realisation.annee }}</p>
                  </div>
                  <div
                    v-if="realisation.srcHover"
                    class="portfolio-card__toggle"
                    role="group"
                    aria-label="Avant ou après"
                  >
                    <button
                      type="button"
                      class="portfolio-card__toggle-btn"
                      :class="{ 'portfolio-card__toggle-btn--active': !showAfterIds[realisation.id] }"
                      @click.stop.prevent="setShowAfter(realisation.id, false)"
                    >
                      Avant
                    </button>
                    <button
                      type="button"
                      class="portfolio-card__toggle-btn"
                      :class="{ 'portfolio-card__toggle-btn--active': !!showAfterIds[realisation.id] }"
                      @click.stop.prevent="setShowAfter(realisation.id, true)"
                    >
                      Après
                    </button>
                  </div>
                </figcaption>
              </figure>
            </article>
          </li>
        </ul>
      </div>
    </section>

    <!-- ─── CTA ───────────────────────────────────────── -->
    <section class="section cta-section" aria-labelledby="cta-titre">
      <div class="container cta-inner">
        <h2 id="cta-titre" class="cta-title">Votre projet mérite<br />d'être réalisé</h2>
        <p class="cta-desc">
          Chaque jardin est unique. Contactez-moi pour discuter de votre projet
          et obtenir votre devis personnalisé.
        </p>
        <RouterLink to="/contact" class="btn btn--primary btn--lg">
          Démarrer mon projet
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { realisations } from '@/data/realisations.js'

// Pour chaque réalisation avec srcHover : true = afficher "après", false/absent = afficher "avant"
const showAfterIds = reactive({})

function onImageClick(event, id) {
  const el = event.currentTarget
  if (!el || !el.offsetWidth) return
  const isRight = event.offsetX > el.offsetWidth / 2
  setShowAfter(id, isRight)
}

function onImageKeydown(event, id) {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    setShowAfter(id, false)
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    setShowAfter(id, true)
  }
}

function setShowAfter(id, showAfter) {
  if (showAfter) {
    showAfterIds[id] = true
  } else {
    delete showAfterIds[id]
  }
}
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

.btn--lg { padding: var(--space-4) var(--space-10); }

.page-title {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--color-primary);
  text-align: center;
  margin: 0 0 var(--space-3);
  line-height: var(--leading-tight);
}
.page-subtitle {
  text-align: center;
  font-size: var(--text-lg);
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
  max-width: 640px;
  margin: 0 auto var(--space-12);
}
@media (min-width: 768px) {
  .page-title { font-size: var(--text-5xl); }
}

/* ─── Section ─────────────────────────────────────── */
.section { padding-block: var(--space-24); }
.section--light { background-color: var(--color-bg); }

/* ─── Portfolio grille ────────────────────────────── */
.portfolio-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
  list-style: none;
  padding: 0;
  margin: 0;
}

.portfolio-item {
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  background-color: var(--color-bg);
  box-shadow: var(--shadow-md);
  transition: box-shadow var(--transition-base);
}

.portfolio-item:hover {
  box-shadow: var(--shadow-lg);
}

.portfolio-card {
  display: block;
  height: 100%;
}

.portfolio-card__figure {
  position: relative;
  margin: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.portfolio-card__img-wrap {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.portfolio-card__img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.portfolio-card__img--contain {
  object-fit: contain;
  background-color: var(--color-bg);
}

.portfolio-card__img--hover {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity var(--transition-base);
  pointer-events: none;
}

.portfolio-card--show-after .portfolio-card__img--hover {
  opacity: 1;
}

.portfolio-card--show-after .portfolio-card__img-wrap > .portfolio-card__img:first-child {
  opacity: 0;
}

/* Sur mobile : seul le toggle contrôle l’image (pas le :hover qui reste “collé” au tap) */
@media (max-width: 1023px) {
  .portfolio-card .portfolio-card__img--hover {
    opacity: 0;
  }
  .portfolio-card.portfolio-card--show-after .portfolio-card__img--hover {
    opacity: 1;
  }
  .portfolio-card.portfolio-card--show-after .portfolio-card__img-wrap > .portfolio-card__img:first-child {
    opacity: 0;
  }
}

@media (min-width: 1024px) {
  .portfolio-card:hover .portfolio-card__img--hover,
  .portfolio-card:focus-within .portfolio-card__img--hover {
    opacity: 1;
  }
}

.portfolio-card__img-wrap--clickable {
  cursor: pointer;
}

.portfolio-card__caption {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-white);
  border-top: 1px solid var(--color-border);
  margin: 0;
}

.portfolio-card__caption-text {
  flex: 1;
  min-width: 0;
}

.portfolio-card__toggle {
  display: flex;
  flex-shrink: 0;
  background-color: var(--color-border);
  border-radius: var(--border-radius-full);
  padding: 2px;
  gap: 0;
}
@media (min-width: 1024px) {
  .portfolio-card__toggle {
    display: none;
  }
}

.portfolio-card__toggle-btn {
  padding: var(--space-1) var(--space-3);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted);
  background: none;
  border: none;
  border-radius: var(--border-radius-full);
  cursor: pointer;
  transition: background-color var(--transition-fast), color var(--transition-fast);
}
.portfolio-card__toggle-btn:hover {
  color: var(--color-text);
}
.portfolio-card__toggle-btn--active {
  background-color: var(--color-white);
  color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.portfolio-card__tag {
  display: inline-block;
  padding: 2px var(--space-2);
  background-color: var(--color-primary);
  color: var(--color-white);
  font-size: 0.65rem;
  font-weight: 700;
  border-radius: var(--border-radius-full);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: var(--space-2);
}

.portfolio-card__title {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-primary);
  margin: 0 0 var(--space-1);
  line-height: var(--leading-snug);
}

.portfolio-card__meta {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin: 0;
}

/* ─── CTA ─────────────────────────────────────────── */
.cta-section {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  padding-block: var(--space-24);
}

.cta-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-6);
}

.cta-title {
  font-size: var(--text-4xl);
  color: var(--color-white);
}

.cta-desc {
  font-size: var(--text-lg);
  color: rgba(255,255,255,.80);
  line-height: var(--leading-relaxed);
  max-width: 520px;
}

/* ─── Responsive ──────────────────────────────────── */
@media (min-width: 640px) {
  .portfolio-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);
  }
  .portfolio-card__img-wrap,
  .portfolio-card__img { height: 220px; }
}

@media (min-width: 768px) {
  .portfolio-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-6);
  }
  .portfolio-card__img-wrap,
  .portfolio-card__img { height: 280px; }
}

@media (min-width: 1024px) {
  .portfolio-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-8);
  }
  .portfolio-card__img-wrap,
  .portfolio-card__img { height: 360px; }
}
</style>
