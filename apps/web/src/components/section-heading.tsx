import { BilingualText } from './bilingual-text';

interface SectionHeadingProps {
  description?: string;
  descriptionEn?: string;
  eyebrow: string;
  eyebrowEn?: string;
  title: string;
  titleEn?: string;
}

export function SectionHeading({
  description,
  descriptionEn,
  eyebrow,
  eyebrowEn,
  title,
  titleEn,
}: SectionHeadingProps) {
  return (
    <div className="border-accent max-w-3xl border-l-2 pl-4 sm:pl-5">
      <p className="text-accent mb-2 font-mono text-[0.68rem] font-bold tracking-[0.18em] uppercase">
        <BilingualText en={eyebrowEn ?? eyebrow} es={eyebrow} />
      </p>
      <h2 className="text-xl font-extrabold tracking-[-0.025em] text-balance sm:text-2xl">
        <BilingualText en={titleEn ?? title} es={title} />
      </h2>
      {description ? (
        <p className="text-muted-foreground mt-2.5 max-w-2xl text-sm leading-6">
          <BilingualText en={descriptionEn ?? description} es={description} />
        </p>
      ) : null}
    </div>
  );
}
