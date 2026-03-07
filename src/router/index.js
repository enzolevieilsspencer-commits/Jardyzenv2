import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/AccueilView.vue"),
    meta: {
      title: "Jardyzen – Création & Entretien de Jardins dans les Alpilles",
      description:
        "Jardyzen, expert en création de jardins, entretien, terrasses et arrosage automatique dans les Alpilles et en Provence. Devis gratuit sous 48h.",
      canonical: "https://jardyzen.fr/",
    },
  },
  {
    path: "/services",
    component: () => import("../views/ServicesView.vue"),
    meta: {
      title: "Nos Services – Jardyzen Alpilles Provence",
      description:
        "Création de jardins, entretien, terrasses & allées, arrosage automatique, élagage. Découvrez tous nos services de paysagisme dans les Alpilles.",
      canonical: "https://jardyzen.fr/services",
    },
  },
  {
    path: "/realisations",
    component: () => import("../views/RealisationsView.vue"),
    meta: {
      title: "Nos Réalisations – Jardyzen Alpilles",
      description:
        "Galerie de nos projets réalisés dans les Alpilles et en Provence : jardins contemporains, terrasses, espaces verts. Jardyzen, 15 ans d'expérience.",
      canonical: "https://jardyzen.fr/realisations",
    },
  },
  {
    path: "/a-propos",
    component: () => import("../views/AProposView.vue"),
    meta: {
      title: "À Propos – Jardyzen Alpilles Provence",
      description:
        "Découvrez l'histoire, les valeurs et l'Jardyzen de Jardyzen, votre expert jardins dans les Alpilles et en Provence depuis 15 ans.",
      canonical: "https://jardyzen.fr/a-propos",
    },
  },
  {
    path: "/contact",
    component: () => import("../views/ContactView.vue"),
    meta: {
      title: "Contact & Devis Gratuit – Jardyzen Alpilles",
      description:
        "Contactez Jardyzen pour un devis gratuit. Réponse sous 48h pour tous vos projets de jardins, terrasses et entretien dans les Alpilles.",
      canonical: "https://jardyzen.fr/contact",
    },
  },
  {
    path: "/mentions-legales",
    component: () => import("../views/MentionsLegalesView.vue"),
    meta: {
      title: "Mentions légales – Jardyzen",
      description: "Mentions légales du site Jardyzen, paysagiste à Paradou et dans les Alpilles.",
      canonical: "https://jardyzen.fr/mentions-legales",
    },
  },
  {
    path: "/politique-confidentialite",
    component: () => import("../views/PolitiqueConfidentialiteView.vue"),
    meta: {
      title: "Politique de confidentialité – Jardyzen",
      description: "Politique de confidentialité et protection des données personnelles – Jardyzen.",
      canonical: "https://jardyzen.fr/politique-confidentialite",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: "smooth" };
    return { top: 0, behavior: "smooth" };
  },
});

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && to.meta.description) {
    metaDesc.setAttribute("content", to.meta.description);
  }
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical && to.meta.canonical) {
    canonical.setAttribute("href", to.meta.canonical);
  }
});

export default router;
