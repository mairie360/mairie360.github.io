'use client';

import { Layers, Zap, Lock } from 'lucide-react';

const solutions = [
	{
		icon: Layers,
		title: 'Socle numérique commun',
		description:
			'Une plateforme modulaire et interopérable qui s\'adapte aux besoins des communes.',
	},
	{
		icon: Zap,
		title: 'Automatisation des tâches',
		description:
			'Gagnez du temps en automatisant les processus répétitifs et concentrez-vous sur les missions à forte valeur ajoutée.',
	},
	{
		icon: Lock,
		title: 'Sécurisation & conformité',
		description:
			'Respect total du RGPD, RGAA et RGESN. Vos données sont sécurisées et votre mairie est en conformité avec les normes publiques.',
	},
];

export default function SolutionSection() {
	return (
		<section
			id="solution"
			className="py-20 md:py-32 bg-gradient-to-b from-[#E5E5E5]/30 to-white"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3F3F3F] mb-6">
						MAIRIE360, un socle numérique complet pour les mairies
					</h2>
					<p className="text-lg text-[#3F3F3F]/70 max-w-3xl mx-auto">
						MAIRIE360 est une plateforme modulaire, interopérable et sécurisée,
						adaptée aux besoins
						spécifiques des collectivités territoriales, quelle que soit leur
						taille.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{solutions.map((solution, index) => (
						<div
							key={index}
							className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100"
						>
							<div className="w-16 h-16 bg-gradient-to-br from-[#005AA3] to-[#2CA39D] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
								<solution.icon className="h-8 w-8 text-white" />
							</div>
							<h3 className="text-2xl font-bold text-[#3F3F3F] mb-4">
								{solution.title}
							</h3>
							<p className="text-[#3F3F3F]/70 leading-relaxed">
								{solution.description}
							</p>
						</div>
					))}
				</div>

				<div className="mt-16 bg-gradient-to-r from-[#005AA3] to-[#2CA39D] rounded-2xl p-8 md:p-12 text-white shadow-2xl">
					<div className="max-w-3xl mx-auto text-center">
						<h3 className="text-2xl md:text-3xl font-bold mb-4">
							Une solution pensée pour l'administration publique
						</h3>
						<p className="text-white/90 text-lg leading-relaxed">
							MAIRIE360 s'intègre parfaitement dans votre écosystème existant tout
							en apportant
							les fonctionnalités modernes indispensables : collaboration en temps
							réel,
							gestion documentaire centralisée, formation continue et communication
							unifiée.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
