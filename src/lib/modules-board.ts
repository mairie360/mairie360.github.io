/**
 * "Sans / Avec Mairie360" board of the modules section.
 *
 * Data, positions and timings come from the reference prototype (Claude artifact
 * "Mairie360 — Site vitrine transition") and the Figma page "Animations — à implémenter".
 * This file stays free of imports so the node tests can load it on its own.
 */

/** Accent of each module, in board order (dashboard, projects, calendar, messages, workflows, learning). */
export const moduleColors = ["#3C4F76", "#3F9C8C", "#D08A4C", "#8E7BA0", "#C0607A", "#5E8F5A"] as const;

export const moduleNames = ["Tableau de bord", "Projets", "Calendrier", "Messagerie", "Workflows", "Formations"] as const;

/** Tools each module replaces and what it brings, shown in the legend under the board. */
export const moduleCards = [
  { tools: "Les post-it, le tableur de chacun", gain: "Projets, tâches et rendez-vous réunis dès la connexion." },
  { tools: "Le classeur bleu, la clé USB", gain: "Chaque projet suivi par toute l’équipe concernée." },
  { tools: "L’agenda papier, le Doodle, l’Outlook de chacun", gain: "Un agenda partagé et des salles réservables." },
  { tools: "WhatsApp perso, le fax", gain: "Des échanges par service, hébergés chez vous." },
  { tools: "Le parapheur, imprimer-signer-scanner", gain: "Des circuits de validation suivis de bout en bout." },
  { tools: "La procédure de 2011, « demande à Martine »", gain: "Des parcours en ligne pour chaque agent." },
] as const;

/** Top-left corner of each module tile on the 1080×720 board. */
export const tilePositions = [[234, 120], [474, 120], [714, 120], [234, 404], [474, 404], [714, 404]] as const;

/** Centre of each module tile: where its tools fly to when switching to "Avec Mairie360". */
export const tileCentres = [[300, 186], [540, 186], [780, 186], [300, 470], [540, 470], [780, 470]] as const;

export type BoardTool = {
  /** Kind of tool, shown in small capitals. */
  app: string;
  name: string;
  sub: string;
  /** Index of the module that replaces it. */
  module: number;
  /** Position on the 1080×720 board and resting rotation in degrees. */
  x: number;
  y: number;
  rotate: number;
  /** Task checked in the module once the tool is replaced. */
  task: string;
};

export const boardTools: BoardTool[] = [
  { app: "Papier", name: "Les post-it", sub: "Rappeler la DDT !!", module: 0, x: 40, y: 40, rotate: -2, task: "Rappeler la DDT" },
  { app: "Tableur", name: "Suivi perso", sub: "suivi_2026_v5_def.xlsx", module: 0, x: 250, y: 10, rotate: 1.2, task: "Suivi des dossiers" },
  { app: "Bureau 2", name: "Le classeur bleu", sub: "Emprunté par ?", module: 1, x: 470, y: 40, rotate: -1.2, task: "Dossier de la place à jour" },
  { app: "Clé USB", name: "PROJETS (E:)", sub: "Dernière copie : ???", module: 1, x: 690, y: 20, rotate: 1.6, task: "Fichiers du projet" },
  { app: "Accueil", name: "L’agenda papier", sub: "Salle réservée 2 fois", module: 2, x: 880, y: 60, rotate: -1.6, task: "Salle réservée jeudi" },
  { app: "Sondage", name: "Date du conseil", sub: "4 réponses sur 12", module: 2, x: 860, y: 220, rotate: 1.2, task: "Conseil : date fixée" },
  { app: "Messagerie", name: "Invitation", sub: "Conflit avec un autre RDV", module: 2, x: 600, y: 190, rotate: -0.8, task: "Invitation acceptée" },
  { app: "Groupe perso", name: "Groupe « Mairie »", sub: "87 messages non lus", module: 3, x: 60, y: 250, rotate: 1.6, task: "Canal services techniques" },
  { app: "Fax", name: "Fax reçu 14:02", sub: "Page 2 illisible", module: 3, x: 300, y: 230, rotate: -2.4, task: "Document reçu" },
  { app: "Parapheur", name: "Bon de commande", sub: "En attente : 3 semaines", module: 4, x: 150, y: 500, rotate: 1.2, task: "Bon de commande validé" },
  { app: "Scanner", name: "Imprimer, signer, scanner", sub: "scan_0042.pdf", module: 4, x: 420, y: 470, rotate: -1.2, task: "Signé en ligne" },
  { app: "Document", name: "Procédure.doc", sub: "Modifié en 2011", module: 5, x: 680, y: 500, rotate: 2, task: "Procédure à jour" },
  { app: "Oral", name: "« Demande à Martine »", sub: "Martine est en congés", module: 5, x: 890, y: 420, rotate: -1.6, task: "Parcours accueil" },
];

/** Phone board: [left %, top px, rotation deg] of each stacked tool. */
export const phoneSpots = [
  [2, 0, -7], [50, 4, 6], [24, 46, 3], [58, 62, -9], [0, 96, 8], [38, 118, -4], [56, 150, 10],
  [6, 182, -5], [30, 214, 7], [54, 246, -8], [2, 276, 4], [44, 306, -6], [20, 336, 9],
] as const;

/** Size of a tool card on the desktop board, used to find its centre. */
const toolWidth = 170;
const toolHalfHeight = 39;

/**
 * Lightens (factor > 0, towards white) or darkens (factor < 0, towards black) a #RRGGBB color,
 * exactly like the prototype does for the card backgrounds, borders and labels.
 */
export function tint(hex: string, factor: number): string {
  const channels = [1, 3, 5].map(index => parseInt(hex.slice(index, index + 2), 16));
  const mixed = channels.map(value => Math.round(factor >= 0 ? value + (255 - value) * factor : value * (1 + factor)));
  return `rgb(${mixed.join(",")})`;
}

/**
 * Delay of a tool card, in seconds: 30 ms × rank towards "Avec", and the reverse order,
 * faster (15 ms × (12 − rank)), towards "Sans".
 */
export function toolDelay(rank: number, withPlatform: boolean): number {
  return withPlatform ? rank * 0.03 : (boardTools.length - 1 - rank) * 0.015;
}

/** Translation that brings a tool card onto the centre of the module replacing it. */
export function toolOffset(tool: BoardTool): [number, number] {
  const [x, y] = tileCentres[tool.module];
  return [x - (tool.x + toolWidth / 2), y - (tool.y + toolHalfHeight)];
}

/** Delay of a checked task appearing in its module, in seconds (400 ms + 30 ms × rank). */
export function taskDelay(rank: number, withPlatform: boolean): number {
  return withPlatform ? 0.4 + rank * 0.03 : 0;
}

/** Text of the live legend under the board. */
export function boardHint(withPlatform: boolean, focused: number): { title: string; text: string } {
  if (focused < 0) {
    return withPlatform
      ? { title: "Cliquez sur un module", text: "pour voir ce qu’il remplace et ce qu’il apporte." }
      : { title: "Survolez un outil", text: "pour voir quel module le remplace." };
  }
  const card = moduleCards[focused];
  return withPlatform
    ? { title: `${moduleNames[focused]} :`, text: `${card.gain} Remplace : ${card.tools.toLowerCase()}.` }
    : { title: `${card.tools} → ${moduleNames[focused]}.`, text: card.gain };
}

/** Section heading and lead for each state of the board. */
export function boardCopy(withPlatform: boolean): { title: string; lead: string } {
  return withPlatform
    ? {
      title: "Six modules qui se parlent, dans un seul espace.",
      lead: "Un seul identifiant, des données partagées entre services, et plus rien à chercher.",
    }
    : {
      title: "Une journée en mairie, c’est souvent treize outils.",
      lead: "Chaque besoin a fini par avoir son outil, son fichier ou son bout de papier. Résultat : on cherche, on ressaisit, on relance.",
    };
}
