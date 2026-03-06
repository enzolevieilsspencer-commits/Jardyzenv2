<template>
  <section
    class="page-hero"
    :class="{ 'page-hero--minimal': minimal }"
    :style="minimal ? undefined : heroStyle"
    aria-labelledby="page-hero-titre"
  >
    <div v-if="!minimal" class="page-hero__overlay" aria-hidden="true"></div>
    <div class="container page-hero__content">
      <h1 id="page-hero-titre" class="page-hero__title">{{ title }}</h1>
      <p v-if="subtitle" class="page-hero__subtitle">{{ subtitle }}</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=80'
  },
  minimal: {
    type: Boolean,
    default: false
  }
})

const heroStyle = computed(() => ({
  backgroundImage: `url('${props.imageUrl}')`
}))
</script>

<style scoped>
.page-hero {
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding-block: var(--space-24) var(--space-16);
  display: flex;
  align-items: flex-end;
  min-height: 320px;
}

.page-hero--minimal {
  min-height: 0;
  align-items: center;
  justify-content: center;
  padding-block: var(--space-16) var(--space-12);
  background-color: var(--color-bg);
  background-image: none;
}

.page-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(26, 31, 26, 0.55) 0%,
    rgba(26, 31, 26, 0.70) 100%
  );
}

.page-hero__content {
  position: relative;
  z-index: 1;
}

.page-hero--minimal .page-hero__content {
  text-align: center;
  max-width: 720px;
  margin-inline: auto;
}

.page-hero__title {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--color-white);
  line-height: var(--leading-tight);
  max-width: 640px;
}

.page-hero--minimal .page-hero__title {
  color: var(--color-primary);
  max-width: none;
}

.page-hero__subtitle {
  margin-top: var(--space-4);
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.80);
  max-width: 560px;
  line-height: var(--leading-relaxed);
}

.page-hero--minimal .page-hero__subtitle {
  color: var(--color-text-muted);
  max-width: none;
  margin-inline: auto;
}

@media (min-width: 768px) {
  .page-hero {
    min-height: 380px;
    padding-block: var(--space-32) var(--space-16);
  }

  .page-hero--minimal {
    padding-block: var(--space-20) var(--space-16);
  }

  .page-hero__title {
    font-size: var(--text-5xl);
  }
}
</style>
