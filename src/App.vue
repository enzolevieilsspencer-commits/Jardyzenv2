<template>
  <div id="layout">
    <NavBar />
    <main id="main-content">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <FooterSection />
  </div>
</template>

<script setup>
import NavBar from '@/components/layout/NavBar.vue'
import FooterSection from '@/components/layout/FooterSection.vue'
</script>

<style>
/* ─── Reset ──────────────────────────────────────── */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  color: var(--color-text);
  background-color: var(--color-bg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img,
video {
  max-width: 100%;
  height: auto;
  display: block;
}

ul,
ol {
  list-style: none;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  cursor: pointer;
  font-family: inherit;
  border: none;
  background: none;
}

input,
textarea,
select {
  font-family: inherit;
  font-size: inherit;
}

/* ─── Utilitaires globaux ─────────────────────────── */
.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-padding);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* ─── Animations scroll reveal ───────────────────── */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity var(--transition-slow), transform var(--transition-slow);
}

.reveal.is-revealed {
  opacity: 1;
  transform: translateY(0);
}

.reveal-delay-1 { transition-delay: 100ms; }
.reveal-delay-2 { transition-delay: 200ms; }
.reveal-delay-3 { transition-delay: 300ms; }
.reveal-delay-4 { transition-delay: 400ms; }
.reveal-delay-5 { transition-delay: 500ms; }

/* ─── Transitions de page ─────────────────────────── */
.page-enter-active,
.page-leave-active {
  transition: opacity 300ms ease, transform 300ms ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ─── Layout principal ────────────────────────────── */
#layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#main-content {
  flex: 1;
  padding-top: var(--nav-height);
}

/* ─── Typographie globale ─────────────────────────── */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  line-height: var(--leading-tight);
  color: var(--color-text);
}

/* ─── Focus visible ───────────────────────────────── */
:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: var(--border-radius-sm);
}
</style>
