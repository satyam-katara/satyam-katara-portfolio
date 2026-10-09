import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/** Restrained glassmorphism card. */
export function GlassCard({ children, className, ...rest }: GlassCardProps) {
  return (
    <div className={cn("glass rounded-2xl p-6", className)} {...rest}>
      {children}
    </div>
  );
}
