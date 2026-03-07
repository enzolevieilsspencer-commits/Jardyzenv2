<template>
  <div>
    <PageHero
      minimal
      title="Politique de confidentialité"
      subtitle="Comment Jardyzen traite vos données personnelles."
    />

    <section class="section section--light" aria-labelledby="confidentialite-titre">
      <div class="container legal-content">
        <h2 id="confidentialite-titre" class="visually-hidden">Politique de confidentialité</h2>

        <div class="legal-block">
          <h3 class="legal-title">1. Responsable du traitement</h3>
          <p>
            Les données personnelles collectées sur ce site sont traitées par :
          </p>
          <p>
            <strong>Jardyzen</strong><br />
            Paradou, France<br />
            SIRET : 952 092 880 000 30<br />
            Email : <a href="mailto:fredlecoqyzen@gmail.com" class="legal-link">fredlecoqyzen@gmail.com</a><br />
            Téléphone : 06 85 75 30 60
          </p>
        </div>

        <div class="legal-block">
          <h3 class="legal-title">2. Données collectées</h3>
          <p>
            Dans le cadre du formulaire de contact et des demandes de devis, nous sommes susceptibles de collecter :
          </p>
          <ul class="legal-list">
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone</li>
            <li>Type de projet et message (description de votre demande)</li>
          </ul>
          <p>
            Ces données sont fournies volontairement par vous lors de l’envoi du formulaire.
          </p>
        </div>

        <div class="legal-block">
          <h3 class="legal-title">3. Finalités du traitement</h3>
          <p>
            Vos données sont utilisées uniquement pour :
          </p>
          <ul class="legal-list">
            <li>Répondre à vos demandes de devis ou d’information</li>
            <li>Vous recontacter pour planifier une visite ou un chantier</li>
            <li>Gérer la relation client dans le cadre de nos prestations de paysagisme</li>
          </ul>
        </div>

        <div class="legal-block">
          <h3 class="legal-title">4. Base légale et durée de conservation</h3>
          <p>
            Le traitement repose sur votre consentement (envoi du formulaire) et sur l’exécution de mesures précontractuelles ou contractuelles. Les données sont conservées pendant la durée nécessaire à la relation commerciale, puis pour une durée conforme aux obligations légales et comptables (en général jusqu’à 3 ans après le dernier contact, sauf obligation plus longue).
          </p>
        </div>

        <div class="legal-block">
          <h3 class="legal-title">5. Vos droits (RGPD)</h3>
          <p>
            Conformément au Règlement général sur la protection des données (RGPD) et à la loi « Informatique et Libertés », vous disposez des droits suivants :
          </p>
          <ul class="legal-list">
            <li><strong>Droit d’accès</strong> : obtenir la confirmation que des données vous concernant sont traitées et en obtenir une copie</li>
            <li><strong>Droit de rectification</strong> : faire corriger des données inexactes ou incomplètes</li>
            <li><strong>Droit à l’effacement</strong> : demander la suppression de vos données dans les limites prévues par la loi</li>
            <li><strong>Droit à la limitation du traitement</strong> : demander la suspension du traitement dans certains cas</li>
            <li><strong>Droit d’opposition</strong> : vous opposer au traitement de vos données pour des motifs légitimes</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à <a href="mailto:fredlecoqyzen@gmail.com" class="legal-link">fredlecoqyzen@gmail.com</a>. Vous avez également le droit d’introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" class="legal-link">www.cnil.fr</a>).
          </p>
        </div>

        <div class="legal-block">
          <h3 class="legal-title">6. Sécurité et destinataires</h3>
          <p>
            Les données sont traitées de manière confidentielle et ne sont pas cédées à des tiers à des fins commerciales. Elles peuvent être transmises aux prestataires techniques (hébergement, envoi d’emails) dans le cadre strict du fonctionnement du site et du traitement de vos demandes.
          </p>
        </div>

        <div class="legal-block">
          <h3 class="legal-title">7. Cookies</h3>
          <p>
            Ce site peut utiliser des cookies techniques nécessaires à son fonctionnement (par exemple session, préférences). Aucun cookie publicitaire ou de traçage tiers n’est utilisé sans votre consentement. Vous pouvez configurer votre navigateur pour refuser les cookies non essentiels.
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

.legal-block p {
  font-size: var(--text-base);
  color: var(--color-text);
  line-height: var(--leading-relaxed);
  margin: 0 0 var(--space-3);
}

.legal-list {
  margin: var(--space-3) 0;
  padding-left: var(--space-6);
  font-size: var(--text-base);
  color: var(--color-text);
  line-height: var(--leading-relaxed);
}

.legal-list li {
  margin-bottom: var(--space-2);
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
