<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <RouterLink
          to="/"
          class="footer__logo"
          aria-label="Jardyzen – retour à l'accueil"
        >
          <img
            src="/img/logo.png"
            alt="Jardyzen"
            class="footer__logo-image"
            width="40"
            height="40"
          />
          <span class="footer__logo-text">Jardyzen</span>
        </RouterLink>
        <p class="footer__tagline">
          Jardyzen, votre partenaire jardin à Paradou et dans les Alpilles.
        </p>
        <div class="footer__socials">
          <a
            href="https://www.instagram.com/jardypaysagiste"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social-link"
            aria-label="Suivez-nous sur Instagram"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle
                cx="17.5"
                cy="6.5"
                r="1.5"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/jardypaysagiste"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social-link"
            aria-label="Suivez-nous sur Facebook"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
              />
            </svg>
          </a>
        </div>
      </div>

      <nav class="footer__nav" aria-label="Navigation du site">
        <h3 class="footer__nav-title">Navigation</h3>
        <ul role="list">
          <li v-for="link in mainLinks" :key="link.to">
            <RouterLink :to="link.to" class="footer__nav-link">{{
              link.label
            }}</RouterLink>
          </li>
        </ul>
      </nav>

      <nav class="footer__nav" aria-label="Nos services">
        <h3 class="footer__nav-title">Nos services</h3>
        <ul role="list">
          <li v-for="service in serviceLinks" :key="service.to">
            <RouterLink :to="service.to" class="footer__nav-link">{{
              service.label
            }}</RouterLink>
          </li>
        </ul>
      </nav>

      <address class="footer__contact">
        <h3 class="footer__nav-title">Contact</h3>
        <ul role="list" class="footer__contact-list">
          <li>
            <a href="#" class="footer__contact-link">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Paradou, France
            </a>
          </li>
          <li>
            <a
              href="mailto:fredlecoqyzen@gmail.com"
              class="footer__contact-link"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              fredlecoqyzen@gmail.com
            </a>
          </li>
          <li class="footer__address">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.93 5.93l1.28-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
              />
            </svg>
            06 85 75 30 60
          </li>
        </ul>
      </address>
    </div>

    <div class="footer__bottom">
      <div class="container footer__bottom-inner">
        <p class="footer__legal">
          © {{ currentYear }} Jardyzen — SIRET 952 092 880 000 30
        </p>

        <div class="footer__nexten">
          <span class="footer__legal-link"
            >Site propulsé par Nexten Studio</span
          >
          <a
            href="https://www.linkedin.com/in/enzo-spencer-bb1065372/"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social-link footer__social-link--nexten"
            aria-label="Nexten Studio sur LinkedIn"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.27 8.11H4.7V24H.27zM8.55 8.11h4.23v2.16h.06c.59-1.12 2.03-2.3 4.18-2.3 4.47 0 5.29 2.94 5.29 6.76V24h-4.43v-7.48c0-1.78-.03-4.07-2.48-4.07-2.48 0-2.86 1.94-2.86 3.95V24H8.55z"
              />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/nextenstudio_/"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social-link footer__social-link--nexten"
            aria-label="Nexten Studio sur Instagram"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle
                cx="17.5"
                cy="6.5"
                r="1.5"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </a>
        </div>

        <nav aria-label="Liens légaux">
          <ul class="footer__legal-links" role="list">
            <li><RouterLink to="/mentions-legales" class="footer__legal-link">Mentions légales</RouterLink></li>
            <li>
              <RouterLink to="/politique-confidentialite" class="footer__legal-link">Politique de confidentialité</RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();

const mainLinks = [
  { to: "/", label: "Accueil" },
  { to: "/services", label: "Services" },
  { to: "/realisations", label: "Réalisations" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact & Devis" },
];

const serviceLinks = [
  { to: "/services#creation-jardins", label: "Création de jardins" },
  { to: "/services#entretien-jardins", label: "Entretien de jardins" },
  { to: "/services#terrasses-allees", label: "Terrasses & allées" },
  { to: "/services#arrosage-automatique", label: "Arrosage automatique" },
  { to: "/services#elagage-abattage", label: "Élagage & abattage" },
];
</script>

<style scoped>
.footer {
  background-color: var(--color-bg-dark);
  color: rgba(255, 255, 255, 0.75);
}

.footer__inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-12);
  padding-block: var(--space-16);
}

/* Brand */
.footer__logo {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.footer__logo-image {
  display: block;
}

.footer__logo-text {
  font-family: var(--font-display);
  color: var(--color-white);
}

.footer__tagline {
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-6);
}

.footer__socials {
  display: flex;
  gap: var(--space-3);
}

.footer__social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--border-radius-md);
  color: rgba(255, 255, 255, 0.75);
  transition:
    border-color var(--transition-base),
    color var(--transition-base),
    background-color var(--transition-base);
}

.footer__social-link:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background-color: rgba(200, 169, 110, 0.1);
}

/* Nav */
.footer__nav-title {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-white);
  margin-bottom: var(--space-4);
}

.footer__nav li + li {
  margin-top: var(--space-2);
}

.footer__nav-link {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.65);
  transition: color var(--transition-base);
}

.footer__nav-link:hover {
  color: var(--color-accent);
}

/* Contact */
.footer__contact-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.footer__contact-link,
.footer__address {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.65);
  line-height: var(--leading-relaxed);
}

.footer__contact-link {
  transition: color var(--transition-base);
}

.footer__contact-link:hover {
  color: var(--color-accent);
}

.footer__contact-link svg,
.footer__address svg {
  flex-shrink: 0;
  margin-top: 3px;
  opacity: 0.6;
}

/* Bottom bar */
.footer__bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-block: var(--space-6);
}

.footer__bottom-inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  align-items: center;
}

.footer__legal {
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.4);
}

.footer__legal-links {
  display: flex;
  gap: var(--space-6);
}

.footer__nexten {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.footer__social-link--nexten {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  border-radius: 0;
  border: none;
  padding: 0;
  line-height: 0;
  color: rgba(255, 255, 255, 0.4);
}

.footer__social-link--nexten svg {
  display: block;
  width: 14px;
  height: 14px;
}

.footer__legal-link {
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.4);
  transition: color var(--transition-base);
}

.footer__legal-link:hover {
  color: rgba(255, 255, 255, 0.7);
}

/* ─── Responsive ──────────────────────────────────── */
@media (min-width: 768px) {
  .footer__inner {
    grid-template-columns: 2fr 1fr 1fr;
  }

  .footer__brand {
    grid-column: 1;
  }

  .footer__bottom-inner {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

@media (min-width: 1024px) {
  .footer__inner {
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
  }
}
</style>
