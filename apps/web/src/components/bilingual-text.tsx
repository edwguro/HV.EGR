export function BilingualText({ en, es }: { en: string; es: string }) {
  return (
    <>
      <span lang="es">{es}</span>
      <span lang="en">{en}</span>
    </>
  );
}
