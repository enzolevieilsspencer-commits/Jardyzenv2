<template>
  <section class="section section--cream" aria-labelledby="temoignages-titre">
    <div class="container">
      <!-- Header -->
      <header class="section-header">
        <p class="section-eyebrow">Ce que disent nos clients</p>
        <h2 id="temoignages-titre" class="section-title">
          Ils nous font confiance
        </h2>
      </header>

      <!-- Carousel -->
      <div
        class="carousel"
        @mouseenter="pauseAutoplay"
        @mouseleave="resumeAutoplay"
        @focusin="pauseAutoplay"
        @focusout="resumeAutoplay"
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
      >
        <!-- Barre de progression autoplay -->
        <div class="carousel__progress" aria-hidden="true">
          <div
            class="carousel__progress-bar"
            :key="`pb-${progressKey}`"
            :class="{ 'is-playing': isPlaying }"
          ></div>
        </div>

        <!-- Viewport -->
        <div class="carousel__viewport" ref="viewportRef">
          <ul
            class="carousel__track"
            :style="{
              transform: `translateX(${offsetPx}px)`,
              transition: isAnimating
                ? `transform ${TRANSITION_MS}ms cubic-bezier(.4,0,.2,1)`
                : 'none',
            }"
            role="list"
            :aria-live="isPlaying ? 'off' : 'polite'"
          >
            <li
              v-for="(t, i) in temoignages"
              :key="t.id"
              class="carousel__slide"
              :style="{ width: `${slideWidthPx}px` }"
              :aria-hidden="!isSlideVisible(i)"
            >
              <article class="t-card">
                <!-- Guillemet décoratif -->
                <span class="t-card__quote-mark" aria-hidden="true">"</span>

                <!-- Étoiles -->
                <div
                  class="t-card__stars"
                  :aria-label="`${t.note} étoiles sur 5`"
                >
                  <svg
                    v-for="n in 5"
                    :key="n"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    :fill="n <= t.note ? 'currentColor' : 'none'"
                    stroke="currentColor"
                    stroke-width="1.5"
                    aria-hidden="true"
                  >
                    <polygon
                      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                    />
                  </svg>
                </div>

                <!-- Texte -->
                <blockquote class="t-card__text">
                  <p>{{ t.texte }}</p>
                </blockquote>

                <!-- Auteur -->
                <footer class="t-card__footer">
                  <div
                    class="t-card__avatar"
                    :style="{ backgroundColor: getAvatarColor(t.nom) }"
                    aria-hidden="true"
                  >
                    {{ getInitials(t.nom) }}
                  </div>
                  <div class="t-card__author">
                    <cite class="t-card__nom">{{ t.nom }}</cite>
                    <span class="t-card__meta"
                      >{{ t.localite }} · {{ t.projet }}</span
                    >
                  </div>
                  <div
                    class="t-card__date"
                    :title="`Avis du ${formatDate(t.date)}`"
                  >
                    <span class="t-card__date-text">{{
                      formatDate(t.date)
                    }}</span>
                  </div>
                </footer>
              </article>
            </li>
          </ul>
        </div>

        <!-- Contrôles -->
        <div class="carousel__controls">
          <button
            class="carousel__btn carousel__btn--prev"
            @click="prev"
            aria-label="Avis précédent"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div
            class="carousel__dots"
            role="tablist"
            aria-label="Sélectionner un groupe d'avis"
          >
            <button
              v-for="(_, i) in totalPages"
              :key="i"
              class="carousel__dot"
              :class="{ 'carousel__dot--active': currentPage === i }"
              role="tab"
              :aria-selected="(currentPage === i).toString()"
              :aria-label="`Aller au groupe d'avis ${i + 1} sur ${totalPages}`"
              @click="goToPage(i)"
            ></button>
          </div>

          <button
            class="carousel__btn carousel__btn--next"
            @click="next"
            aria-label="Avis suivant"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { temoignages } from "@/data/temoignages.js";

const AUTOPLAY_DELAY = 5000;
const TRANSITION_MS = 420;
const GAP_PX = 24;

const viewportRef = ref(null);
const currentIndex = ref(0);
const visibleCount = ref(3);
const viewportWidth = ref(0);
const isPlaying = ref(true);
const isAnimating = ref(true);
const progressKey = ref(0);

let autoplayTimer = null;
let resizeObserver = null;
let touchStartX = 0;

// ─── Dimensions ───────────────────────────────────────
const slideWidthPx = computed(() => {
  if (!viewportWidth.value) return 300;
  return (
    (viewportWidth.value - (visibleCount.value - 1) * GAP_PX) /
    visibleCount.value
  );
});

const offsetPx = computed(() => {
  return -(currentIndex.value * (slideWidthPx.value + GAP_PX));
});

const maxIndex = computed(() =>
  Math.max(0, temoignages.length - visibleCount.value),
);

const totalPages = computed(() =>
  Math.ceil(temoignages.length / visibleCount.value),
);

const currentPage = computed(() =>
  Math.min(
    Math.floor(currentIndex.value / visibleCount.value),
    totalPages.value - 1,
  ),
);

// ─── Navigation ────────────────────────────────────────
const isSlideVisible = (i) =>
  i >= currentIndex.value && i < currentIndex.value + visibleCount.value;

const goToIndex = (index) => {
  currentIndex.value = Math.max(0, Math.min(index, maxIndex.value));
  progressKey.value++;
};

const next = () => {
  goToIndex(currentIndex.value >= maxIndex.value ? 0 : currentIndex.value + 1);
};

const prev = () => {
  goToIndex(currentIndex.value <= 0 ? maxIndex.value : currentIndex.value - 1);
};

const goToPage = (pageIndex) => {
  goToIndex(Math.min(pageIndex * visibleCount.value, maxIndex.value));
};

// ─── Autoplay ──────────────────────────────────────────
const startAutoplay = () => {
  clearInterval(autoplayTimer);
  autoplayTimer = setInterval(next, AUTOPLAY_DELAY);
};

const pauseAutoplay = () => {
  isPlaying.value = false;
  clearInterval(autoplayTimer);
};

const resumeAutoplay = () => {
  isPlaying.value = true;
  progressKey.value++;
  startAutoplay();
};

// ─── Touch swipe désactivé : seul l'autoplay et les contrôles pilotent ───
const onTouchStart = () => {};

const onTouchEnd = () => {};

// ─── Responsive & resize ───────────────────────────────
const getVisibleCount = () => {
  const w = window.innerWidth;
  if (w >= 1024) return 3;
  if (w >= 640) return 2;
  return 1;
};

const updateLayout = (width) => {
  isAnimating.value = false;
  viewportWidth.value = width;
  const newVisible = getVisibleCount();
  visibleCount.value = newVisible;
  if (currentIndex.value > maxIndex.value) {
    currentIndex.value = Math.max(0, maxIndex.value);
  }
  requestAnimationFrame(() => {
    isAnimating.value = true;
  });
};

// ─── Utilitaires carte ─────────────────────────────────
const AVATAR_COLORS = [
  "#2D4A2D",
  "#5B7A5B",
  "#8B7355",
  "#4A6B7A",
  "#7A5B8B",
  "#6B7A3A",
  "#8B4A4A",
];

const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const getAvatarColor = (name) =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
  });
};

// ─── Lifecycle ─────────────────────────────────────────
onMounted(() => {
  resizeObserver = new ResizeObserver(([entry]) => {
    updateLayout(entry.contentRect.width);
  });

  if (viewportRef.value) {
    resizeObserver.observe(viewportRef.value);
    updateLayout(viewportRef.value.offsetWidth);
  }

  startAutoplay();
});

onBeforeUnmount(() => {
  clearInterval(autoplayTimer);
  resizeObserver?.disconnect();
});
</script>

<style scoped>
/* ─── Section ─────────────────────────────────────────── */
.section {
  padding-block: var(--space-24);
}
.section--cream {
  background-color: var(--color-bg);
}

/* ─── Header ──────────────────────────────────────────── */
.section-header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto var(--space-12);
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

/* ─── Carousel wrapper ────────────────────────────────── */
.carousel {
  position: relative;
}

/* ─── Progress bar ────────────────────────────────────── */
.carousel__progress {
  height: 3px;
  background-color: var(--color-border);
  border-radius: var(--border-radius-full);
  overflow: hidden;
  margin-bottom: var(--space-6);
}

.carousel__progress-bar {
  height: 100%;
  width: 0;
  background: linear-gradient(
    90deg,
    var(--color-secondary),
    var(--color-accent)
  );
  border-radius: var(--border-radius-full);
}

.carousel__progress-bar.is-playing {
  animation: progress-fill 5s linear forwards;
}

@keyframes progress-fill {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

/* ─── Viewport & track ────────────────────────────────── */
.carousel__viewport {
  overflow: hidden;
  border-radius: var(--border-radius-lg);
}

.carousel__track {
  display: flex;
  gap: 24px;
  will-change: transform;
}

.carousel__slide {
  flex-shrink: 0;
  list-style: none;
}

/* Aucun scroll / swipe sur le contenu du carrousel, l'autoplay pilote seul */
.carousel__viewport,
.carousel__track,
.carousel__slide,
.t-card {
  pointer-events: none;
  user-select: none;
  -webkit-user-select: none;
}

/* ─── Carte témoignage ────────────────────────────────── */
.t-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: var(--space-8);
  background-color: var(--color-white);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition:
    box-shadow var(--transition-base),
    transform var(--transition-base);
}

.t-card:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-3px);
}

/* Guillemet décoratif */
.t-card__quote-mark {
  position: absolute;
  top: var(--space-4);
  right: var(--space-6);
  font-family: var(--font-display);
  font-size: 7rem;
  line-height: 1;
  color: var(--color-bg-alt);
  pointer-events: none;
  user-select: none;
  leading-trim: both;
}

/* Étoiles */
.t-card__stars {
  display: flex;
  gap: 2px;
  color: var(--color-accent);
  margin-bottom: var(--space-4);
  position: relative;
  z-index: 1;
}

/* Texte */
.t-card__text {
  flex: 1;
  font-size: var(--text-base);
  color: var(--color-text);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-6);
  position: relative;
  z-index: 1;
  font-style: italic;
}

.t-card__text p::before {
  content: "«\00a0";
  color: var(--color-accent);
  font-style: normal;
  font-weight: 600;
}

.t-card__text p::after {
  content: "\00a0»";
  color: var(--color-accent);
  font-style: normal;
  font-weight: 600;
}

/* Footer auteur */
.t-card__footer {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding-top: var(--space-5);
  border-top: 1px solid var(--color-border);
  position: relative;
  z-index: 1;
}

.t-card__avatar {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: var(--border-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-white);
  letter-spacing: 0.05em;
}

.t-card__author {
  flex: 1;
  min-width: 0;
}

.t-card__nom {
  display: block;
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-primary);
  font-style: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.t-card__meta {
  display: block;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.t-card__date {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.t-card__date-text {
  font-size: 0.65rem;
  color: var(--color-text-muted);
  white-space: nowrap;
}

/* ─── Contrôles ───────────────────────────────────────── */
.carousel__controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  margin-top: var(--space-8);
}

.carousel__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--border-radius-full);
  border: 2px solid var(--color-border);
  background-color: var(--color-white);
  color: var(--color-primary);
  cursor: pointer;
  transition: all var(--transition-base);
  flex-shrink: 0;
}

.carousel__btn:hover {
  border-color: var(--color-primary);
  background-color: var(--color-primary);
  color: var(--color-white);
  transform: scale(1.08);
}

/* Dots */
.carousel__dots {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.carousel__dot {
  width: 8px;
  height: 8px;
  border-radius: var(--border-radius-full);
  background-color: var(--color-border);
  border: none;
  cursor: pointer;
  transition:
    background-color var(--transition-base),
    transform var(--transition-base),
    width var(--transition-base);
  padding: 0;
}

.carousel__dot--active {
  background-color: var(--color-primary);
  width: 24px;
  border-radius: var(--border-radius-full);
}
</style>
