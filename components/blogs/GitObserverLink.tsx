"use client";

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
      className={`text-blue-500 hover:text-blue-600 underline ${className || ""}`}
    >
      {children || href}
    </a>
  );
};

export default GitObserverLink;
