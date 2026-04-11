export default function Spinner({ size = 5 }: { size?: number }) {
  return (
    <div
      className={`w-${size} h-${size} border-2 border-current border-t-transparent rounded-full animate-spin`}
    />
  );
}
