import Header from "@/components/header";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-dvw h-dvh overflow-hidden animate-fadeInUp">
      <div className="w-full h-24">
        <Header />
      </div>
      <div className="w-full h-[calc(100%-6rem)]">{children}</div>
    </section>
  );
}
