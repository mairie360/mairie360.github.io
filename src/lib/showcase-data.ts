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

