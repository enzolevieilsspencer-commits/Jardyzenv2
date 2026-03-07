<template>
  <div>
    <PageHero
      minimal
      title="Contact"
      subtitle="Parlez-moi de votre projet. Je vous réponds sous 48h et me déplace chez vous gratuitement."
    />

    <section class="section section--light" aria-labelledby="contact-titre">
      <div class="container contact-grid">
        <!-- ─── Formulaire ────────────────────────────── -->
        <div class="form-wrapper">
          <h2 id="contact-titre" class="form-titre">Votre demande de devis</h2>
          <p class="form-sous-titre">
            Remplissez ce formulaire et je vous recontacte sous 48h pour
            planifier une visite gratuite.
          </p>

          <form
            class="contact-form"
            novalidate
            @submit.prevent="submitForm"
            aria-label="Formulaire de demande de devis"
          >
            <!-- Statut succès -->
            <div
              v-if="status === 'success'"
              class="form-alert form-alert--success"
              role="alert"
              aria-live="polite"
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
                <circle cx="12" cy="12" r="10" />
                <polyline points="9 12 11.5 14.5 15.5 9.5" />
              </svg>
              <div>
                <strong>Demande envoyée !</strong>
                <p>Nous vous répondrons dans les 48h. À très bientôt !</p>
              </div>
            </div>

            <!-- Statut erreur -->
            <div
              v-if="status === 'error'"
              class="form-alert form-alert--error"
              role="alert"
              aria-live="polite"
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
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <div>
                <strong>Une erreur s'est produite.</strong>
                <p>Veuillez réessayer ou nous appeler directement.</p>
              </div>
            </div>

            <template v-if="status !== 'success'">
              <!-- Ligne Nom + Email -->
              <div class="form-row">
                <div class="form-field">
                  <label for="contact-nom" class="form-label">
                    Nom complet
                    <span class="form-required" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-nom"
                    v-model="form.nom"
                    type="text"
                    name="nom"
                    class="form-input"
                    :class="{ 'form-input--error': errors.nom }"
                    autocomplete="name"
                    required
                    aria-required="true"
                    :aria-invalid="!!errors.nom"
                    aria-describedby="contact-nom-error"
                    @blur="validateField('nom')"
                  />
                  <p
                    v-if="errors.nom"
                    id="contact-nom-error"
                    class="form-error"
                    role="alert"
                  >
                    {{ errors.nom }}
                  </p>
                </div>

                <div class="form-field">
                  <label for="contact-email" class="form-label">
                    Adresse email
                    <span class="form-required" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-email"
                    v-model="form.email"
                    type="email"
                    name="email"
                    class="form-input"
                    :class="{ 'form-input--error': errors.email }"
                    autocomplete="email"
                    required
                    aria-required="true"
                    :aria-invalid="!!errors.email"
                    aria-describedby="contact-email-error"
                    @blur="validateField('email')"
                  />
                  <p
                    v-if="errors.email"
                    id="contact-email-error"
                    class="form-error"
                    role="alert"
                  >
                    {{ errors.email }}
                  </p>
                </div>
              </div>

              <!-- Téléphone + Type de projet -->
              <div class="form-row">
                <div class="form-field">
                  <label for="contact-telephone" class="form-label">
                    Téléphone
                  </label>
                  <input
                    id="contact-telephone"
                    v-model="form.telephone"
                    type="tel"
                    name="telephone"
                    class="form-input"
                    autocomplete="tel"
                  />
                </div>

                <div class="form-field">
                  <label for="contact-type-projet" class="form-label">
                    Type de projet
                    <span class="form-required" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="contact-type-projet"
                    v-model="form.type_projet"
                    name="type_projet"
                    class="form-input form-select"
                    :class="{ 'form-input--error': errors.type_projet }"
                    required
                    aria-required="true"
                    :aria-invalid="!!errors.type_projet"
                    aria-describedby="contact-type-projet-error"
                    @blur="validateField('type_projet')"
                  >
                    <option value="" disabled>Sélectionnez...</option>
                    <option
                      v-for="option in typesProjet"
                      :key="option"
                      :value="option"
                    >
                      {{ option }}
                    </option>
                  </select>
                  <p
                    v-if="errors.type_projet"
                    id="contact-type-projet-error"
                    class="form-error"
                    role="alert"
                  >
                    {{ errors.type_projet }}
                  </p>
                </div>
              </div>

              <!-- Message -->
              <div class="form-field">
                <label for="contact-message" class="form-label">
                  Votre message
                  <span class="form-required" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  v-model="form.message"
                  name="message"
                  rows="5"
                  class="form-input form-textarea"
                  :class="{ 'form-input--error': errors.message }"
                  required
                  aria-required="true"
                  :aria-invalid="!!errors.message"
                  aria-describedby="contact-message-error"
                  @blur="validateField('message')"
                ></textarea>
                <p
                  v-if="errors.message"
                  id="contact-message-error"
                  class="form-error"
                  role="alert"
                >
                  {{ errors.message }}
                </p>
              </div>

              <p class="form-mention">
                <span aria-hidden="true">*</span> Champs obligatoires. Vos
                données sont traitées uniquement pour répondre à votre demande.
              </p>

              <button
                type="submit"
                class="btn btn--submit"
                :disabled="status === 'loading'"
                :aria-busy="(status === 'loading').toString()"
              >
                <svg
                  v-if="status === 'loading'"
                  class="btn__spinner"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                  />
                </svg>
                <template v-else>
                  Envoyer ma demande
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    aria-hidden="true"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </template>
              </button>
            </template>
          </form>
        </div>

        <!-- ─── Informations de contact ──────────────── -->
        <aside class="contact-infos" aria-label="Informations de contact">
          <div class="contact-infos__card">
            <h3 class="contact-infos__titre">Coordonnées</h3>
            <address class="contact-infos__address">
              <ul role="list" class="contact-infos__list">
                <li class="contact-infos__item">
                  <div class="contact-infos__icon" aria-hidden="true">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.93 5.93l1.28-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p class="contact-infos__label">Téléphone</p>
                    <a
                      href="tel:+33685753060"
                      class="contact-infos__value contact-infos__link"
                    >
                      06 85 75 30 60
                    </a>
                  </div>
                </li>
                <li class="contact-infos__item">
                  <div class="contact-infos__icon" aria-hidden="true">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                      />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <p class="contact-infos__label">Email</p>
                    <a
                      href="mailto:fredlecoqyzen@gmail.com"
                      class="contact-infos__value contact-infos__link"
                    >
                      fredlecoqyzen@gmail.com
                    </a>
                  </div>
                </li>
                <li class="contact-infos__item">
                  <div class="contact-infos__icon" aria-hidden="true">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                      />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p class="contact-infos__label">Adresse</p>
                    <p class="contact-infos__value">
                      Paradou, France
                    </p>
                  </div>
                </li>
              </ul>
            </address>
          </div>

          <!-- Engagements -->
          <div class="engagements">
            <h3 class="engagements__titre">Nos engagements</h3>
            <ul role="list" class="engagements__list">
              <li
                v-for="engagement in engagements"
                :key="engagement"
                class="engagements__item"
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
                {{ engagement }}
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>

    <!-- ─── Carte ──────────────────────────────────────── -->
    <section class="map-section" aria-label="Notre localisation sur la carte">
      <iframe
        title="Localisation de Jardyzen dans les Alpilles"
        src="https://www.openstreetmap.org/export/embed.html?bbox=4.74%2C43.70%2C4.84%2C43.75&layer=mapnik&marker=43.7214%2C4.7878"
        width="100%"
        height="400"
        style="border: 0"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  </div>
</template>

<script setup>
import PageHero from "@/components/ui/PageHero.vue";
import { useContactForm } from "@/composables/useContactForm.js";

const { form, errors, status, validateField, submitForm } = useContactForm();

const typesProjet = [
  "Création de jardin",
  "Entretien de jardin",
  "Terrasse & allée",
  "Arrosage automatique",
  "Élagage & abattage",
  "Autre",
];

const engagements = [
  "Réponse sous 48h",
  "Visite et devis 100% gratuits",
  "Sans engagement",
  "Déplacement dans un rayon de 40 km",
  "Assurance décennale incluse",
];
</script>

<style scoped>
/* ─── Sections ────────────────────────────────────── */
.section {
  padding-block: var(--space-24);
}
.section.section--light:first-of-type {
  padding-top: var(--space-2);
}
.section--light {
  background-color: var(--color-bg);
}

/* ─── Grille contact ──────────────────────────────── */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
  align-items: start;
}

/* ─── Formulaire ──────────────────────────────────── */
.form-titre {
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--space-3);
}

.form-sous-titre {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-6);
}

.form-wrapper {
  background-color: var(--color-white);
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-md);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-label {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text);
}

.form-required {
  color: var(--color-error);
  margin-left: 2px;
}

.form-input {
  padding: var(--space-3) var(--space-4);
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius-md);
  font-size: var(--text-base);
  color: var(--color-text);
  background-color: var(--color-white);
  transition:
    border-color var(--transition-base),
    box-shadow var(--transition-base);
  width: 100%;
  min-height: 48px;
}

.form-input::placeholder {
  color: var(--color-text-muted);
  opacity: 0.8;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(45, 74, 45, 0.12);
}

.form-input--error {
  border-color: var(--color-error);
}

.form-input--error:focus {
  box-shadow: 0 0 0 3px rgba(198, 40, 40, 0.12);
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B6B6B' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-4) center;
  padding-right: var(--space-10);
  cursor: pointer;
}

.form-textarea {
  resize: vertical;
  min-height: 140px;
  padding: var(--space-4);
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius-md);
}

.form-error {
  font-size: var(--text-sm);
  color: var(--color-error);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.form-mention {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
}

.btn--submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-8);
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-primary-light) 100%
  );
  color: var(--color-white);
  border: none;
  border-radius: var(--border-radius-full);
  font-size: var(--text-base);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-base);
  align-self: flex-start;
}

.btn--submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn--submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn__spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Alertes */
.form-alert {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-6);
  border-radius: var(--border-radius-lg);
  border: 1px solid;
}

.form-alert--success {
  background-color: #e8f5e9;
  border-color: #a5d6a7;
  color: var(--color-success);
}

.form-alert--error {
  background-color: #ffebee;
  border-color: #ef9a9a;
  color: var(--color-error);
}

.form-alert strong {
  display: block;
  font-weight: 600;
  margin-bottom: var(--space-1);
}
.form-alert p {
  font-size: var(--text-sm);
}

/* ─── Infos de contact ────────────────────────────── */
.contact-infos__card {
  padding: var(--space-8);
  background-color: var(--color-bg);
  border-radius: var(--border-radius-xl);
  border: 1px solid var(--color-border);
  margin-bottom: var(--space-6);
}

.contact-infos__titre {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--space-6);
}

.contact-infos__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.contact-infos__item {
  display: flex;
  gap: var(--space-4);
  align-items: flex-start;
}

.contact-infos__icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background-color: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--border-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-infos__label {
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: var(--space-1);
}

.contact-infos__value {
  font-size: var(--text-base);
  color: var(--color-text);
  line-height: var(--leading-relaxed);
}

.contact-infos__link {
  color: var(--color-primary);
  font-weight: 500;
  transition: color var(--transition-base);
}
.contact-infos__link:hover {
  color: var(--color-secondary);
}

/* ─── Engagements ─────────────────────────────────── */
.engagements {
  padding: var(--space-8);
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-primary-light) 100%
  );
  border-radius: var(--border-radius-xl);
}

.engagements__titre {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-white);
  margin-bottom: 0;
  padding-bottom: var(--space-2);
}

.engagements__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding-top: var(--space-8);
  margin-top: 0;
}

.engagements__item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.9);
}

.engagements__item svg {
  flex-shrink: 0;
  color: var(--color-accent-light);
}

/* ─── Carte ───────────────────────────────────────── */
.map-section {
  height: 400px;
  overflow: hidden;
}

.map-section iframe {
  display: block;
  width: 100%;
  height: 100%;
}

/* ─── Responsive ──────────────────────────────────── */
@media (min-width: 480px) {
  .form-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .contact-grid {
    grid-template-columns: 3fr 2fr;
  }
}
</style>
