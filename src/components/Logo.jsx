export default function Logo({ variant = "wide", className }) {
  const isWide = variant === "wide";
  const defaultClass = isWide ? "h-10 w-auto object-contain" : "h-16 w-16 object-contain";
  return (
    <div className="flex items-center">
      <img
        src={isWide ? "/TW-logo2.png" : "/TW-logo.png"}
        alt="TirtaWatch Logo"
        className={className || defaultClass}
      />
    </div>
  );
}