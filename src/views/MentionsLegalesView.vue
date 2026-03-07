<template>
  <div>
    <PageHero
      minimal
      title="Mentions légales"
      subtitle="Informations légales relatives au site Jardyzen."
    />

    <section class="section section--light" aria-labelledby="mentions-titre">
      <div class="container legal-content">
        <h2 id="mentions-titre" class="visually-hidden">Contenu des mentions légales</h2>

        <div class="legal-block">
          <h3 class="legal-title">1. Éditeur du site</h3>
          <p>Le site est édité par :</p>
          <div class="legal-info-box">
            <p><strong>Raison sociale :</strong> SAS JARDYZEN</p>
            <p><strong>Forme juridique :</strong> Société par Actions Simplifiée</p>
            <p><strong>Capital social :</strong> 1 000,00 €</p>
            <p><strong>Siège social :</strong> Paradou, France</p>
            <p><strong>SIRET :</strong> 952 092 880 000 30</p>
            <p><strong>Email :</strong> <a href="mailto:fredlecoqyzen@gmail.com" class="legal-link">fredlecoqyzen@gmail.com</a></p>
            <p><strong>Téléphone :</strong> <a href="tel:+33685753060" class="legal-link">06 85 75 30 60</a></p>
          </div>
        </div>

        <div class="legal-block">
          <h3 class="legal-title">2. Directeur de la publication</h3>
          <p>Le directeur de la publication est : <strong>Frédéric Lecoq</strong>.</p>
        </div>

        <div class="legal-block">
          <h3 class="legal-title">3. Hébergement</h3>
          <p>Le site est hébergé par :</p>
          <div class="legal-info-box">
            <p><strong>Société :</strong> Vercel Inc.</p>
            <p><strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, USA</p>
            <p><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" class="legal-link">vercel.com</a></p>
          </div>
        </div>

        <div class="legal-block">
          <h3 class="legal-title">4. Propriété intellectuelle</h3>
          <p>
            L’ensemble des contenus de ce site (textes, images, vidéos, logo, charte graphique, etc.) est la propriété exclusive de <strong>SAS JARDYZEN</strong>, sauf mention contraire. Toute reproduction, représentation, diffusion, modification ou exploitation de ces contenus, sans autorisation préalable, est strictement interdite et pourra faire l’objet de poursuites judiciaires.
          </p>
        </div>

        <div class="legal-block">
          <h3 class="legal-title">5. Données personnelles</h3>
          <p>
            Pour toute information relative à la collecte et au traitement de vos données personnelles, nous vous invitons à consulter notre
            <RouterLink to="/politique-confidentialite" class="legal-link">Politique de confidentialité</RouterLink>.
          </p>
        </div>

        <div class="legal-block">
          <h3 class="legal-title">6. Cookies</h3>
          <p>
            Ce site n’utilise pas de cookies de traçage ni de cookies publicitaires.
          </p>
        </div>

        <div class="legal-block">
          <h3 class="legal-title">7. Loi applicable</h3>
          <p>
            Les présentes mentions légales sont régies par le droit français. Tout litige relatif à l’utilisation du site sera de la compétence exclusive des tribunaux français.
          </p>
        </div>

        <p class="legal-update">Dernière mise à jour : {{ lastUpdate }}</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import PageHero from '@/components/ui/PageHero.vue'

const lastUpdate = new Date().toLocaleDateString('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})
</script>

<style scoped>
.section--light {
  background-color: var(--color-bg);
}

.legal-content {
  max-width: 720px;
  margin-inline: auto;
}

.legal-block {
  margin-bottom: var(--space-8);
}

.legal-title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-primary);
  margin: 0 0 var(--space-4);
}

.legal-block > p {
  font-size: var(--text-base);
  color: var(--color-text);
  line-height: var(--leading-relaxed);
  margin: 0 0 var(--space-3);
}

.legal-info-box {
  background-color: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  padding: var(--space-6);
  margin-top: var(--space-3);
}

.legal-info-box p {
  font-size: var(--text-base);
  color: var(--color-text);
  line-height: var(--leading-relaxed);
  margin: 0 0 var(--space-2);
}

.legal-info-box p:last-child {
  margin-bottom: 0;
}

.legal-link {
  color: var(--color-primary);
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.legal-link:hover {
  color: var(--color-primary-light);
}

.legal-update {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin-top: var(--space-12);
  margin-bottom: 0;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}
</style>
