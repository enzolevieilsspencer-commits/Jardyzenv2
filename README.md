# Jardyzen — Site Vitrine

Site vitrine multi-pages pour paysagiste, construit avec **Vue.js 3 + Vite + Vue Router**.  
Déploiement sur **Vercel** avec serverless function pour l'envoi d'emails via **Resend**.

## Stack technique

- **Framework** : Vue.js 3 (Composition API + `<script setup>`)
- **Bundler** : Vite 5
- **Router** : Vue Router 4 (5 pages)
- **Styles** : CSS pur avec custom properties (BEM)
- **Emailing** : Resend API (serverless function Vercel)
- **Déploiement** : Vercel

## Pages

| URL             | Description                                             |
| --------------- | ------------------------------------------------------- |
| `/`             | Accueil — Hero, services, réalisations, témoignages     |
| `/services`     | Détail des 5 services + processus + zone d'intervention |
| `/realisations` | Galerie filtrable avec lightbox accessible              |
| `/a-propos`     | Histoire, valeurs, Jardyzen, certifications             |
| `/contact`      | Formulaire de devis + coordonnées + carte               |

## Prérequis

- Node.js 18+
- npm 9+
- Compte [Resend](https://resend.com) avec domaine vérifié

## Installation

```bash
npm install
```

## Configuration des variables d'environnement

Copier `.env.example` en `.env` et remplir les valeurs :

```bash
cp .env.example .env
```

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
EMAIL_PAYSAGISTE=contact@votre-domaine.fr
EMAIL_EXPEDITEUR=noreply@votre-domaine.fr
```

> ⚠️ Ne pas préfixer ces variables avec `VITE_` — elles doivent rester côté serveur uniquement.

## Développement local

```bash
npm run dev
```

L'application est accessible sur `http://localhost:5173`.

> **Note** : Pour tester la serverless function d'email en local, utiliser Vercel CLI :
>
> ```bash
> npm install -g vercel
> vercel dev
> ```

## Build de production

```bash
npm run build
```

Les fichiers de production sont générés dans `/dist`.

## Déploiement sur Vercel

1. Connecter le repository à [Vercel](https://vercel.com)
2. Configurer les variables d'environnement dans le dashboard Vercel :
   - `RESEND_API_KEY`
   - `EMAIL_PAYSAGISTE`
   - `EMAIL_EXPEDITEUR`
3. Framework Preset : **Vite**
4. Build Command : `npm run build`
5. Output Directory : `dist`

Le fichier `vercel.json` gère automatiquement le routing SPA et les rewrites.

## Checklist avant déploiement en production

- [ ] Variables d'environnement configurées sur Vercel
- [ ] Domaine d'envoi vérifié dans le dashboard Resend (DNS SPF + DKIM)
- [ ] Remplacer toutes les images Unsplash par des photos réelles du client
- [ ] Mettre à jour les informations de contact (téléphone, adresse, email, SIRET)
- [ ] Mettre à jour les URLs dans `index.html` (canonical, og:url) et `router/index.js`
- [ ] Ajouter les vrais profils des membres d'Jardyzen dans `AProposView.vue`
- [ ] Vérifier le Schema.org dans `index.html`
- [ ] Tester le formulaire de contact en production
- [ ] Build sans warnings ni erreurs

## Personnalisation

### Palette de couleurs

Modifier les variables CSS dans `src/assets/styles/tokens.css` :

```css
--color-primary: #2d4a2d; /* Vert forêt */
--color-accent: #c8a96e; /* Doré naturel */
--color-bg: #f5f0e8; /* Crème */
```

### Données du site

- **Services** → `src/data/services.js`
- **Réalisations** → `src/data/realisations.js`
- **Témoignages** → `src/data/temoignages.js`

### Informations SEO par page

Modifier les `meta` de chaque route dans `src/router/index.js`.
