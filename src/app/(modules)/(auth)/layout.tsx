export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full h-ful overflow-hidden">
      <div className="w-dvw h-dvh flex justify-center items-center">
        {children}
      </div>
    </section>
  );
}
