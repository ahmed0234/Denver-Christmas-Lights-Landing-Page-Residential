import Image from "next/image";

/** Round badge logo used in the header and footer; size is set in CSS. */
export default function BrandLogo({ eager = false }: { eager?: boolean }) {
  return (
    <Image
      className="brand-logo"
      src="/NewLogo.png"
      alt=""
      width={64}
      height={64}
      sizes="64px"
      loading={eager ? "eager" : "lazy"}
    />
  );
}
