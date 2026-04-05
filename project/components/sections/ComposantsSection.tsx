'use client';

import { Mail, MessageCircle, FolderKanban, Calendar, FileText, GraduationCap } from 'lucide-react';

const composants = [
	{
		icon: Mail,
		title: 'Gestion des emails',
		description:
			'Centralisez les échanges professionnels avec une boîte mail dédiée et une gestion des notifications adaptée aux agents.',
		features: [
			'Gestion des emails professionnels',
			'Notifications configurables',
			'Archivage automatique',
			'Filtres et règles personnalisables',
		],
		color: 'from-blue-500 to-blue-600',
	},
	{
		icon: MessageCircle,
		title: 'Messagerie instantanée / chat',
		description:
			'Communication rapide via canaux et messages directs pour faciliter la coordination interne.',
		features: [
			'Canaux par service ou projet',
			'Messages directs et groupes',
		],
		color: 'from-green-500 to-green-600',
	},
	{
		icon: FolderKanban,
		title: 'Projets & dossiers',
		description: 'Suivi des projets municipaux avec tableaux, tâches et rapports d’avancement.',
		features: [
			'Tableaux kanban et listes',
			'Attribution de tâches',
			'Suivi des échéances',
			'Rapports d\'avancement',
		],
		color: 'from-purple-500 to-purple-600',
	},
	{
		icon: Calendar,
		title: 'Calendriers & plannings',
		description: 'Gérez les agendas partagés, planifiez les réunions et organisez les événements communaux en toute simplicité.',
		features: [
			'Agendas individuels et partagés',
			'Planification des réunions',
			'Vue mensuelle, hebdomadaire, journalière',
		],
		color: 'from-orange-500 to-orange-600',
	},
	{
		icon: FileText,
		title: 'Gestion des fichiers & documents',
		description: 'Organisez, stockez et consultez vos documents administratifs avec contrôle d\'accès et historique des versions adapté aux processus municipaux.',
		features: [
			'Stockage sécurisé',
			'Gestion des versions',
			'Droits d\'accès granulaires',
			'Recherche plein texte',
		],
		color: 'from-red-500 to-red-600',
	},
	{
		icon: GraduationCap,
		title: 'Plateforme d\'e-learning',
		description: 'Formez vos agents avec des modules adaptés, parcours personnalisés et suivi des compétences.',
		features: [
			'Parcours de formation',
			'Suivi des acquis',
			'Badge de formation',
		],
		color: 'from-teal-500 to-teal-600',
	},
];

export default function ComposantsSection() {
	return (
		<section id="composants" className="py-20 md:py-32 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3F3F3F] mb-6">
						Les composants de MAIRIE360
					</h2>
					<p className="text-lg text-[#3F3F3F]/70 max-w-3xl mx-auto">
						MAIRIE360 se compose de plusieurs modules complémentaires qui s'intègrent parfaitement
						pour créer un écosystème numérique complet et cohérent.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{composants.map((composant, index) => (
						<div
							key={index}
							className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-2xl transition-all hover:-translate-y-1"
						>
							<div className={`w-16 h-16 bg-gradient-to-br ${composant.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
								<composant.icon className="h-8 w-8 text-white" />
							</div>

							<h3 className="text-2xl font-bold text-[#3F3F3F] mb-3">
								{composant.title}
							</h3>

							<p className="text-[#3F3F3F]/70 mb-6 leading-relaxed">
								{composant.description}
							</p>

							<ul className="space-y-2">
								{composant.features.map((feature, idx) => (
									<li key={idx} className="flex items-start gap-2">
										<div className="w-1.5 h-1.5 bg-[#2CA39D] rounded-full mt-2 flex-shrink-0"></div>
										<span className="text-sm text-[#3F3F3F]/80">{feature}</span>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-12 bg-[#E5E5E5]/50 rounded-2xl p-8 text-center">
					<h3 className="text-xl font-bold text-[#3F3F3F] mb-3">
						Une plateforme modulaire et évolutive
					</h3>
					<p className="text-[#3F3F3F]/70 max-w-2xl mx-auto">
						Chaque composant peut être déployé indépendamment ou en combinaison avec les autres,
						 selon les besoins spécifiques de votre collectivité.
					</p>
				</div>
			</div>
		</section>
	);
}
