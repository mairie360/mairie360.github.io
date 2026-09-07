import type { IconName } from "@/components/icons";

export const modules: {
  id: IconName;
  label: string;
  title: string;
  description: string;
  benefits: string[];
  development?: boolean;
}[] = [
  {
    id: "dashboard",
    label: "Tableau de bord",
    title: "Gardez une vue d’ensemble sur votre activité.",
    description:
      "Vos projets, vos tâches et vos prochains événements réunis dans une synthèse personnalisée pour organiser votre journée.",
    benefits: [
      "Retrouver les projets et les tâches en attente",
      "Consulter les prochains rendez-vous",
      "Accéder rapidement aux autres modules",
    ],
  },
  {
    id: "projects",
    label: "Projets",
    title: "Faites avancer les projets de votre commune.",
    description:
      "Un objectif partagé, des responsabilités claires et une équipe qui avance dans la même direction.",
    benefits: [
      "Répartir les tâches et les responsabilités",
      "Suivre les échéances et les priorités",
      "Garder le fil des échanges",
    ],
  },
  {
    id: "calendar",
    label: "Calendrier",
    title: "Un même agenda pour mieux se coordonner.",
    description:
      "Réunions, événements et temps forts : partagez une vision du planning entre les services de votre collectivité.",
    benefits: [
      "Organiser les rendez-vous des équipes",
      "Retrouver les événements par service",
      "Coordonner les validations et les échéances",
    ],
  },
  {
    id: "messages",
    label: "Messagerie",
    title: "Les bonnes informations, au bon endroit.",
    description:
      "Des échanges directs et des conversations de groupe pour faire circuler l’information et rapprocher les services.",
    benefits: [
      "Échanger avec vos collègues",
      "Réunir les équipes dans une conversation",
      "Retrouver l’historique des échanges",
    ],
  },
  {
    id: "learning",
    label: "Formations",
    title: "Apprendre, partager, progresser ensemble.",
    description:
      "Des parcours et des ressources réunis dans un espace de formation pour accompagner la montée en compétences des équipes.",
    benefits: [
      "Consulter les cours et leurs ressources",
      "Avancer à son rythme, chapitre par chapitre",
      "Suivre sa progression dans les parcours",
    ],
    development: true,
  },
];

export const roles = [
  {
    id: "agents",
    label: "Agents municipaux",
    title: "Le collectif commence au quotidien.",
    description:
      "Retrouvez vos tâches, vos rendez-vous et vos échanges. Un même point d’entrée pour contribuer aux projets de votre mairie.",
    keywords: ["S’organiser", "Échanger", "Avancer"],
  },
  {
    id: "managers",
    label: "Chefs de service",
    title: "Une vision claire pour guider les équipes.",
    description:
      "Coordonnez les projets de votre service, répartissez les responsabilités et suivez les priorités. Gardez une vue d’ensemble sur le travail collectif.",
    keywords: ["Coordonner", "Prioriser", "Accompagner"],
  },
  {
    id: "elected",
    label: "Élus",
    title: "Prendre du recul, garder le cap.",
    description:
      "Suivez les projets municipaux et les temps forts de la collectivité. Une vue d’ensemble pour éclairer les décisions et accompagner l’action des services.",
    keywords: ["Consulter", "Décider", "Accompagner"],
  },
  {
    id: "administrators",
    label: "Administrateurs",
    title: "Un cadre commun pour chaque équipe.",
    description:
      "Gérez les utilisateurs et leurs rôles pour donner à chacun un accès adapté à ses responsabilités dans la collectivité.",
    keywords: ["Administrer", "Organiser", "Paramétrer"],
  },
];
