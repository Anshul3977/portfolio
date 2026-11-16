import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  urlLabel: string;
  priority?: boolean;
};

export function Safari({ src, alt, urlLabel, priority }: Props) {
  return (
    <figure className="overflow-hidden rounded-[11px] bg-[#161310]">
      <div className="flex items-center gap-3 border-b border-line px-3 py-2">
        <div className="flex shrink-0 gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <p className="min-w-0 flex-1 truncate rounded-md bg-background/70 px-3 py-1 text-center font-mono text-[11px] text-muted">
          {urlLabel}
        </p>
        <span className="hidden w-10 sm:block" aria-hidden="true" />
      </div>
      <div className="relative aspect-[16/10] bg-background">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 540px, 100vw"
          className="object-cover object-top"
          priority={priority}
        />
      </div>
    </figure>
  );
}
