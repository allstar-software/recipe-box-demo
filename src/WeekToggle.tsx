export function WeekToggle({ inWeek, onToggle }: { inWeek: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      className={inWeek ? "week-toggle in-week" : "week-toggle"}
      aria-pressed={inWeek}
      onClick={onToggle}
    >
      {inWeek ? "✓ In my week · Remove" : "+ Add to my week"}
    </button>
  );
}
