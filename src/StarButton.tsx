export function StarButton({
  title,
  starred,
  onToggle,
}: {
  title: string;
  starred: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className="star"
      aria-pressed={starred}
      aria-label={`Favourite: ${title}`}
      onClick={onToggle}
    >
      <span aria-hidden="true">{starred ? "★" : "☆"}</span>
    </button>
  );
}
