import type * as React from "react";
import { cn } from "#/lib/utils";

type ButtonVariant = "default" | "outline" | "ghost";
type ButtonSize = "default" | "sm" | "icon";

const variants: Record<ButtonVariant, string> = {
	default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
	outline:
		"border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
	ghost: "hover:bg-accent hover:text-accent-foreground",
};

const sizes: Record<ButtonSize, string> = {
	default: "h-9 px-4 py-2",
	sm: "h-8 rounded-md gap-1.5 px-3",
	icon: "size-9",
};

export function buttonVariants({
	variant = "default",
	size = "default",
	className,
}: {
	variant?: ButtonVariant;
	size?: ButtonSize;
	className?: string;
} = {}) {
	return cn(
		"inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
		variants[variant],
		sizes[size],
		className,
	);
}

export function Button({
	className,
	variant = "default",
	size = "default",
	...props
}: React.ComponentProps<"button"> & {
	variant?: ButtonVariant;
	size?: ButtonSize;
}) {
	return (
		<button
			data-slot="button"
			className={buttonVariants({ variant, size, className })}
			{...props}
		/>
	);
}
