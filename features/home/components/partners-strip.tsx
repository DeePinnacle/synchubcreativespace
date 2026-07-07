// Placeholder wordmarks — swap for real partner logos (via next/image) once
// assets are supplied. Kept as plain text for now to avoid shipping fake
// logo imagery.
const PARTNERS = ["Synchub", "Coilarate", "Deegrammer", "Coreplayer", "Programmer"];

export function PartnersStrip() {
  return (
    <div className="border-t border-neutral-100 bg-neutral-50/60 py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Our partners
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {PARTNERS.map((name) => (
            <span
              key={name}
              className="text-base font-semibold text-neutral-300 transition-colors hover:text-neutral-400"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}