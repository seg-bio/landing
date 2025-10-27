export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-8">
      <h1 className="text-5xl font-bold text-[var(--color-text)]">seg.bio</h1>
      <p className="mt-6 text-lg text-[var(--color-muted)] max-w-2xl text-center">
        Intelligent agent for biomedical image segmentation
      </p>
      <a
        href="mailto:info@seg.bio"
        className="mt-10 rounded-xl bg-[var(--color-primary)] text-white px-6 py-3 transition hover:bg-[var(--color-primary-hover)]"
      >
        Get Early Access
      </a>
    </main>
  );
}
