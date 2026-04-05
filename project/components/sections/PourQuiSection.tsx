'use client';

import { Building, TrendingUp, Users } from 'lucide-react';

const cibles = [
	{
		icon: Building,
		title: 'Petites et moyennes communes',
		description:
			'Adaptée aux mairies de toutes tailles, avec des modules évolutifs selon vos besoins.',
	},
	{
		icon: TrendingUp,
		title: 'Collectivités en transition numérique',
		description:
			'Pour les mairies qui souhaitent moderniser leurs outils et passer au cloud sans bouleverser leur organisation.',
	},
	{
		icon: Users,
		title: 'Équipes recherchant la collaboration',
		description:
			'Destiné aux services municipaux qui veulent améliorer leur communication interne et leur efficacité collective.',
	},
];

export default function PourQuiSection() {
	return (
		<section className="py-20 md:py-32 bg-gradient-to-b from-[#E5E5E5]/30 to-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3F3F3F] mb-6">
						Pour quelles mairies ?
					</h2>
					<p className="text-lg text-[#3F3F3F]/70 max-w-3xl mx-auto">
						MAIRIE360 a été conçu pour répondre aux besoins spécifiques des
						collectivités territoriales françaises, quelle que soit leur taille.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{cibles.map((cible, index) => (
						<div
							key={index}
							className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100"
						>
							<div className="w-16 h-16 bg-gradient-to-br from-[#005AA3] to-[#2CA39D] rounded-full flex items-center justify-center mb-6 shadow-lg">
								<cible.icon className="h-8 w-8 text-white" />
							</div>
							<h3 className="text-2xl font-bold text-[#3F3F3F] mb-4">
								{cible.title}
							</h3>
							<p className="text-[#3F3F3F]/70 leading-relaxed">
								{cible.description}
							</p>
						</div>
					))}
				</div>

				<div className="mt-16 bg-gradient-to-r from-[#005AA3] to-[#2CA39D] rounded-2xl p-8 md:p-12 text-white shadow-2xl">
					<div className="max-w-4xl mx-auto">
						<h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
							Une solution qui grandit avec vous
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center md:text-left">
							<div>
								<h4 className="font-semibold mb-2 text-lg">Évolutivité</h4>
								<p className="text-white/90 text-sm">
									Commencez avec les modules essentiels et ajoutez-en au fur et
									à mesure de l'évolution de vos besoins.
								</p>
							</div>
							<div>
								<h4 className="font-semibold mb-2 text-lg">Accessibilité</h4>
								<p className="text-white/90 text-sm">
									Conçue pour être intuitive et accessible, la plateforme
									facilite l'adoption par l'ensemble des agents.
								</p>
							</div>
							<div>
								<h4 className="font-semibold mb-2 text-lg">Support local</h4>
								<p className="text-white/90 text-sm">
									Une équipe francophone qui comprend les spécificités de
									l'administration française et ses contraintes.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
