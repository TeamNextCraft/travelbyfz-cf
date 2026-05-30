import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe2, MapPinned, MoonStar } from "lucide-react";
import { useState } from "react";
import { buttonVariants } from "#/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";

export const Route = createFileRoute("/")({ component: Home });

const defaultImage =
	"https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1300&q=80";

const bookingOptions = [
	{
		title: "Hajj & Umrah",
		description: "Pilgrimage packages, visa support, Makkah and Madinah stays.",
		to: "/hajj-and-umrah",
		image:
			"https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=900&q=80",
		icon: MoonStar,
		label: "Religious travel",
	},
	{
		title: "Domestic Tours",
		description:
			"Local touring spots, weekend escapes, and custom group plans.",
		to: "/domestic",
		image:
			"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
		icon: MapPinned,
		label: "Local experiences",
	},
	{
		title: "International Trips",
		description:
			"Holiday packages, family trips, flights, hotels, and itineraries.",
		to: "/international",
		image:
			"https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80",
		icon: Globe2,
		label: "Global holidays",
	},
] as const;

function Home() {
	const [activeImage, setActiveImage] = useState(defaultImage);

	return (
		<main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
			<section className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-7xl items-center">
				<div className="grid w-full gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
					<div className="relative min-h-[420px] overflow-hidden rounded-lg border border-white/50 shadow-[0_24px_70px_rgba(23,58,64,0.18)]">
						{[
							defaultImage,
							...bookingOptions.map((option) => option.image),
						].map((image) => (
							<img
								key={image}
								src={image}
								alt=""
								className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
									activeImage === image ? "opacity-100" : "opacity-0"
								}`}
							/>
						))}
						<div className="absolute inset-0 bg-linear-to-t from-[#0f2f35]/90 via-[#0f2f35]/42 to-transparent" />
						<div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
							<p className="island-kicker text-white/78">Travel by FZ</p>
							<h1 className="display-title mt-3 max-w-xl text-4xl font-bold leading-tight sm:text-5xl">
								Choose the travel service you need today.
							</h1>
							<p className="mt-4 max-w-md text-sm leading-6 text-white/82 sm:text-base">
								A clearer starting point for pilgrims, local tourists, and
								holiday travellers without mixing every offer into one page.
							</p>
						</div>
					</div>

					<Card className="island-shell gap-0 rounded-lg bg-transparent p-4 sm:p-5">
						<CardHeader className="mb-4 flex flex-col justify-between gap-3 border-b border-[var(--line)] px-0 pb-4 sm:flex-row sm:items-end">
							<div>
								<p className="island-kicker">Start booking</p>
								<CardTitle className="display-title mt-2 text-3xl font-bold text-[var(--sea-ink)]">
									What are you looking for?
								</CardTitle>
							</div>
							<a
								href="tel:+919000000000"
								className={buttonVariants({
									variant: "outline",
									className:
										"w-fit bg-white/70 font-bold no-underline hover:bg-white",
								})}
							>
								Call now
							</a>
						</CardHeader>

						<CardContent className="grid gap-4 px-0 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
							{bookingOptions.map((option) => (
								<BookingCard
									key={option.to}
									option={option}
									onPreview={() => setActiveImage(option.image)}
									onPreviewEnd={() => setActiveImage(defaultImage)}
								/>
							))}
						</CardContent>
					</Card>
				</div>
			</section>
		</main>
	);
}

function BookingCard({
	option,
	onPreview,
	onPreviewEnd,
}: {
	option: (typeof bookingOptions)[number];
	onPreview: () => void;
	onPreviewEnd: () => void;
}) {
	const Icon = option.icon;

	return (
		<Link
			to={option.to}
			className="group block text-[var(--sea-ink)] no-underline"
			onMouseEnter={onPreview}
			onMouseLeave={onPreviewEnd}
			onFocus={onPreview}
			onBlur={onPreviewEnd}
		>
			<Card className="feature-card h-full gap-0 overflow-hidden rounded-lg border-[var(--line)] py-0">
				<div className="aspect-[16/10] overflow-hidden">
					<img
						src={option.image}
						alt=""
						className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
					/>
				</div>
				<CardContent className="p-4">
					<div className="mb-3 flex items-center justify-between gap-3">
						<span className="inline-flex items-center gap-2 text-xs font-bold uppercase text-[var(--palm)]">
							<Icon size={16} aria-hidden="true" />
							{option.label}
						</span>
						<ArrowRight
							size={18}
							className="shrink-0 transition group-hover:translate-x-1"
							aria-hidden="true"
						/>
					</div>
					<CardTitle className="text-xl font-extrabold">
						{option.title}
					</CardTitle>
					<CardDescription className="mt-2 leading-6 text-[var(--sea-ink-soft)]">
						{option.description}
					</CardDescription>
				</CardContent>
			</Card>
		</Link>
	);
}
