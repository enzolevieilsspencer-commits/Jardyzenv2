<template>
  <header class="navbar" :class="{ 'navbar--scrolled': isScrolled }">
    <div class="container navbar__inner">
      <RouterLink to="/" class="navbar__logo" aria-label="Jardyzen – retour à l'accueil">
        <img
          src="/img/logo.png"
          alt="Jardyzen"
          class="navbar__logo-image"
          width="32"
          height="32"
        />
        <span class="navbar__logo-text">
          Jardyzen
        </span>
      </RouterLink>

      <nav class="navbar__nav" aria-label="Navigation principale" :id="menuId">
        <ul class="navbar__links" role="list">
          <li v-for="link in navLinks" :key="link.to">
            <RouterLink
              :to="link.to"
              class="navbar__link"
              :aria-current="isActive(link.to) ? 'page' : undefined"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <button
        class="navbar__burger"
        :aria-expanded="menuOpen.toString()"
        :aria-controls="menuId"
        aria-label="Ouvrir le menu de navigation"
        @click="toggleMenu"
      >
        <span class="navbar__burger-bar" aria-hidden="true"></span>
        <span class="navbar__burger-bar" aria-hidden="true"></span>
        <span class="navbar__burger-bar" aria-hidden="true"></span>
      </button>
    </div>

    <!-- Menu mobile -->
    <Transition name="slide-down">
      <div v-if="menuOpen" class="navbar__mobile-menu" role="dialog" aria-label="Menu de navigation mobile">
        <nav aria-label="Navigation principale mobile">
          <ul class="navbar__mobile-links" role="list">
            <li v-for="link in navLinks" :key="link.to">
              <RouterLink
                :to="link.to"
                class="navbar__mobile-link"
                :aria-current="isActive(link.to) ? 'page' : undefined"
                @click="closeMenu"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const menuOpen = ref(false)
const isScrolled = ref(false)
const menuId = 'main-navigation'

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/services', label: 'Services' },
  { to: '/realisations', label: 'Réalisations' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' }
]

const isActive = (path) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

const toggleMenu = () => { menuOpen.value = !menuOpen.value }
const closeMenu = () => { menuOpen.value = false }

const handleScroll = () => { isScrolled.value = window.scrollY > 50 }

const handleKeydown = (e) => {
  if (e.key === 'Escape' && menuOpen.value) closeMenu()
}

const handleClickOutside = (e) => {
  if (menuOpen.value && !e.target.closest('.navbar')) closeMenu()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--nav-height);
  background-color: var(--color-white);
  box-shadow: var(--shadow-md);
  transition: box-shadow var(--transition-base);
}

.navbar--scrolled {
  box-shadow: var(--shadow-lg);
}

.navbar__inner {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: var(--space-4);
  height: 100%;
}

/* Logo */
.navbar__logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-shrink: 0;
  margin-left: -40px;
}

@media (max-width: 767px) {
  .navbar__logo {
    margin-left: 0;
  }
}

.navbar__logo-image {
  display: block;
  width: 32px;
  height: 32px;
}

.navbar__logo-icon {
  display: flex;
  align-items: center;
  color: var(--color-accent);
  transition: color var(--transition-base);
}

.navbar--scrolled .navbar__logo-icon {
  color: var(--color-primary);
}

.navbar__logo-text {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  color: var(--color-primary);
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: color var(--transition-base);
}

/* Nav desktop */
.navbar__nav {
  display: none;
  justify-content: center;
  justify-self: center;
  margin-left: -100px;
}

.navbar__links {
  display: flex;
  align-items: center;
  gap: var(--space-12);
  justify-content: center;
}

.navbar__link {
  font-size: var(--text-sm);
  font-weight: 500;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  position: relative;
  padding-block: var(--space-2);
  transition: color var(--transition-base);
}

.navbar__link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--color-accent);
  transform: scaleX(0);
  transition: transform var(--transition-base);
  transform-origin: left;
}

.navbar__link:hover,
.navbar__link[aria-current='page'] {
  color: var(--color-primary);
}

.navbar__link:hover::after,
.navbar__link[aria-current='page']::after {
  transform: scaleX(1);
}

/* CTA desktop */
.navbar__cta {
  display: none;
  flex-shrink: 0;
}

/* Bouton */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--border-radius-full);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: background-color var(--transition-base), color var(--transition-base), transform var(--transition-fast), box-shadow var(--transition-base);
}

.btn--primary {
  background-color: var(--color-accent);
  color: var(--color-primary-dark);
}

.btn--primary:hover {
  background-color: var(--color-accent-light);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/* Burger */
.navbar__burger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  padding: var(--space-2);
  border-radius: var(--border-radius-sm);
  justify-self: end;
}

.navbar__burger-bar {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--color-primary);
  border-radius: 2px;
  transition: background-color var(--transition-base);
}

/* Menu mobile */
.navbar__mobile-menu {
  position: absolute;
  top: var(--nav-height);
  left: 0;
  right: 0;
  background-color: var(--color-white);
  box-shadow: var(--shadow-lg);
  padding: var(--space-6) var(--space-6) var(--space-8);
}

.navbar__mobile-links {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.navbar__mobile-link {
  display: block;
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-lg);
  font-weight: 500;
  color: var(--color-text);
  border-radius: var(--border-radius-md);
  transition: background-color var(--transition-fast), color var(--transition-fast);
}

.navbar__mobile-link:hover,
.navbar__mobile-link[aria-current='page'] {
  background-color: var(--color-bg-alt);
  color: var(--color-primary);
}

.navbar__mobile-cta {
  margin-top: var(--space-4);
  width: 100%;
  padding: var(--space-4);
  font-size: var(--text-base);
}

/* Transition menu */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: opacity var(--transition-base), transform var(--transition-base);
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

/* ─── Responsive ──────────────────────────────────── */
@media (min-width: 768px) {
  .navbar__nav {
    display: flex;
  }

  .navbar__cta {
    display: inline-flex;
  }

  .navbar__burger {
    display: none;
  }

  .navbar__mobile-menu {
    display: none;
  }
}
</style>
