import { Lock, Shield, Server, Star } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "Datos seguros",
    description: "Cifrado SSL y GDPR"
  },
  {
    icon: Lock,
    title: "Acceso privado",
    description: "Tu información solo tuya"
  },
  {
    icon: Server,
    title: "Uptime 99.9%",
    description: "Servidores confiables"
  },
  {
    icon: Star,
    title: "Soporte 24/7",
    description: "Siempre disponibles"
  }
];

export function TrustBadges() {
  return (
    <section className="mt-16 border-t border-borderBrand py-10">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {badges.map((badge) => (
          <div key={badge.title} className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <badge.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-ink">{badge.title}</p>
              <p className="text-sm text-secondary">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}