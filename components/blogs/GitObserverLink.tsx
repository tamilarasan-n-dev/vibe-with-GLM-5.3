const GitObserverLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`repo-link ${className || ""}`}
    >
      <span>{children || href}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
};

export default GitObserverLink;
