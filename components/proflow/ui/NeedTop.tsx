export default function NeedTop() {
  return (
    <>
      {/* Material grain — sells the "physical panel" feel across the whole page */}
      <div className="bg-noise pointer-events-none fixed inset-0 z-0" />

      {/* Single light source, consistent with every panel's top-left highlight */}
      <div className="pointer-events-none fixed left-1/2 top-[-10%] z-0 h-150 w-150 -translate-x-1/2 rounded-full bg-cyan-400/8 blur-[160px]" />
      <div className="pointer-events-none fixed bottom-[-10%] right-[-10%] z-0 h-120 w-120 rounded-full bg-cyan-400/5 blur-[160px]" />
    </>
  );
}
