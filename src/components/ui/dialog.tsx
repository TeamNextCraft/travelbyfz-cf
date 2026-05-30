import { X } from "lucide-react";
import type * as React from "react";
import { cn } from "#/lib/utils";
import { Button } from "./button";

export function Dialog({
	open,
	onOpenChange,
	children,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: React.ReactNode;
}) {
	if (!open) {
		return null;
	}

	return (
		<div
			data-slot="dialog"
			className="fixed inset-0 z-50 grid place-items-center p-4"
		>
			<button
				type="button"
				aria-label="Close dialog"
				className="absolute inset-0 bg-black/55 backdrop-blur-sm"
				onClick={() => onOpenChange(false)}
			/>
			<div className="relative z-10">{children}</div>
		</div>
	);
}

export function DialogContent({
	className,
	children,
	onClose,
}: React.ComponentProps<"div"> & { onClose: () => void }) {
	return (
		<div
			data-slot="dialog-content"
			role="dialog"
			aria-modal="true"
			className={cn(
				"bg-background text-foreground relative max-h-[min(92vh,760px)] w-full max-w-5xl overflow-y-auto rounded-lg border p-5 shadow-lg",
				className,
			)}
		>
			<Button
				type="button"
				variant="ghost"
				size="icon"
				className="absolute right-3 top-3"
				onClick={onClose}
				aria-label="Close"
			>
				<X aria-hidden="true" />
			</Button>
			{children}
		</div>
	);
}

export function DialogHeader({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-header"
			className={cn(
				"mb-5 grid gap-2 pr-10 text-center sm:text-left",
				className,
			)}
			{...props}
		/>
	);
}

export function DialogTitle({
	className,
	...props
}: React.ComponentProps<"h2">) {
	return (
		<h2
			data-slot="dialog-title"
			className={cn("text-lg font-semibold leading-none", className)}
			{...props}
		/>
	);
}

export function DialogDescription({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p
			data-slot="dialog-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}
