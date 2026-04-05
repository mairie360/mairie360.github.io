'use client';

import { Radio, Clock, ClipboardCheck, FolderOpen, BookOpen, Settings, Globe, ShieldCheck } from 'lucide-react';

const fonctionnalites = [
	{
		icon: Radio,
		title: 'Communication unifiée',
		description: 'Tous vos canaux de communication centralisés en un seul endroit',
	},
	{
		icon: Clock,
		title: 'Organisation du temps',
		description: 'Planification et synchronisation des agendas de toute l\'équipe',
	},
	{
		icon: ClipboardCheck,
		title: 'Suivi des dossiers',
		description: 'Gestion complète des projets et dossiers administratifs',
	},
	{
		icon: FolderOpen,
		title: 'Gestion documentaire',
		description: 'Stockage, partage et collaboration sur tous vos documents',
	},
	{
		icon: BookOpen,
		title: 'Formation continue',
		description: 'Plateforme d\'apprentissage pour développer les compétences',
	},
	{
		icon: Settings,
		title: 'Personnalisation',
		description: 'Adaptation selon la taille et les besoins de votre commune',
	},
	{
		icon: Globe,
		title: 'Interopérabilité',
		description: 'Intégration fluide avec vos systèmes existants',
	},
	{
		icon: ShieldCheck,
		title: 'Conformité & sécurité',
		description: 'Respect du RGPD, RGAA et autres normes publiques',
	},
];

export default function FonctionnalitesSection() {
	return (
		<section id="fonctionnalites" className="py-20 md:py-32 bg-gradient-to-b from-[#E5E5E5]/30 to-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3F3F3F] mb-6">
            Une suite d'outils pensée pour les agents de mairie
					</h2>
					<p className="text-lg text-[#3F3F3F]/70 max-w-3xl mx-auto">
            Des fonctionnalités complètes et intuitives pour simplifier le quotidien
            des équipes municipales et améliorer l'efficacité de votre collectivité.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{fonctionnalites.map((f, idx) => (
						<div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
							<div className="w-12 h-12 bg-gradient-to-br from-[#005AA3] to-[#2CA39D] rounded-xl flex items-center justify-center mb-4">
								<f.icon className="h-6 w-6 text-white" />
							</div>
							<h4 className="font-semibold text-[#3F3F3F] mb-2">{f.title}</h4>
							<p className="text-[#3F3F3F]/70 text-sm">{f.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
