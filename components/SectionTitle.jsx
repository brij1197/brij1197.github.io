export default function SectionTitle({ children }) {
  return (
    <h2>
      <span className="heading-slash" aria-hidden="true">
        /
      </span>
      {children}
    </h2>
  );
}
