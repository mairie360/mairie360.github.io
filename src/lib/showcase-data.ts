import type { ModuleName, RoleName } from "@/components/icons";

/** One step of the "thirty years of municipal tools" timeline. */
export const eras = [
  {
    year: "1993",
    title: "Le Minitel",
    limits: [
      "Consultation payante à la minute",
      "Aucune démarche possible à distance",
      "En interne, tout reste sur papier",
    ],
  },
  {
    year: "1999",
    title: "Le premier site",
    limits: [
      "Une vitrine, mis à jour quand quelqu’un y pense",
      "Les dossiers restent dans le classeur bleu",
      "Un document à envoyer\u00a0? Le fax",
    ],
  },
  {
    year: "2008",
    title: "L’intranet",
    limits: [
      "Pièces jointes limitées à 2 Mo",
      "Un seul navigateur accepté",
      "Le même fichier en cinq versions",
    ],
  },
  {
    year: "2016",
    title: "Un logiciel par métier",
    limits: [
      "Sept logiciels, sept mots de passe",
      "Aucune donnée partagée entre services",
      "La même information ressaisie partout",
    ],
  },
] as const;

export const audiences: { id: RoleName; label: string; summary: string; description: string }[] = [
  {
    id: "agents",
    label: "Agents municipaux",
    summary: "Tout au même endroit",
    description: "Leurs tâches, leurs rendez-vous et leurs échanges au même endroit, dès la connexion.",
  },
  {
    id: "managers",
    label: "Chefs de service",
    summary: "Le suivi des équipes",
    description: "Une vue claire sur l’avancement des projets et les demandes en attente de validation.",
  },
  {
    id: "elected",
    label: "Élus",
    summary: "Les dossiers en un coup d’œil",
    description: "Les dossiers suivis, les décisions à prendre et l’agenda des commissions, sans courir après l’information.",
  },
  {
    id: "administrators",
    label: "Administrateurs",
    summary: "Comptes et droits",
    description: "Les comptes, les droits et les modules activés, gérés simplement pour toute la commune.",
  },
];

/** Modules of "La plateforme" (texts from the reference prototype). */
export const modules: {
  id: ModuleName;
  label: string;
  replaces: string;
  title: string;
  description: string;
  benefits: string[];
}[] = [
  {
    id: "dashboard",
    label: "Tableau de bord",
    replaces: "post-it, tableurs en plusieurs versions",
    title: "Toute la journée en un coup d’œil.",
    description:
      "Dès la connexion, chaque agent retrouve ses projets, ses tâches et ses prochains rendez-vous dans une synthèse personnalisée.",
    benefits: ["Projets et tâches en attente réunis", "Prochains rendez-vous visibles", "Accès direct aux autres modules"],
  },
  {
    id: "projects",
    label: "Projets",
    replaces: "classeurs et dossiers papier",
    title: "Des projets que toute l’équipe peut suivre.",
    description:
      "Du réaménagement d’une place à la fête de la commune, chaque projet a ses tâches, ses responsables et son avancement.",
    benefits: ["Tâches réparties entre les services", "Avancement visible par les élus", "Historique conservé"],
  },
  {
    id: "calendar",
    label: "Calendrier",
    replaces: "l’agenda papier de l’accueil",
    title: "Un agenda partagé par toute la mairie.",
    description: "Réunions, commissions et réservations de salles au même endroit, sans double réservation.",
    benefits: ["Salles municipales réservables", "Agendas d’équipe et personnels", "Invitations en un clic"],
  },
  {
    id: "messages",
    label: "Messagerie",
    replaces: "fax et chaînes de transferts",
    title: "Des échanges qui restent dans la mairie.",
    description:
      "Les conversations sont organisées par service et par projet, et restent accessibles à ceux qui en ont besoin.",
    benefits: ["Canaux par service ou projet", "Messages directs entre collègues", "Données hébergées sur votre instance"],
  },
  {
    id: "workflows",
    label: "Workflows",
    replaces: "le parapheur qui circule",
    title: "Des démarches qui avancent toutes seules.",
    description:
      "Les demandes répétitives suivent un circuit défini à l’avance : chacun sait ce qu’il doit valider, et quand.",
    benefits: ["Circuits de validation sur mesure", "Suivi de chaque demande", "Modifiables par vos agents formés"],
  },
  {
    id: "learning",
    label: "Formations",
    replaces: "la procédure photocopiée",
    title: "Chaque agent progresse à son rythme.",
    description:
      "Des parcours en ligne pour prendre en main la plateforme et monter en compétences, accessibles à tout moment.",
    benefits: ["Vidéos, guides et quiz", "Suivi de progression", "Nouveaux contenus régulièrement"],
  },
];

export const supportSteps = [
  {
    title: "On fait connaissance",
    description: "Un échange pour comprendre l’organisation de votre commune et vos priorités.",
  },
  {
    title: "Votre espace est installé",
    description: "Une instance dédiée à votre commune, avec les modules dont vous avez besoin.",
  },
  {
    title: "Vos équipes sont formées",
    description: "Des parcours en ligne et des sessions sur place pour que chacun soit à l’aise.",
  },
  {
    title: "La plateforme évolue avec vous",
    description: "De nouveaux modules et des mises à jour, à votre rythme et toujours annoncées.",
  },
];

export const socialLinks = {
  linkedin: "https://www.linkedin.com/company/145224827/",
  instagram: "https://www.instagram.com/mairie360/",
  github: "https://github.com/mairie360",
};
