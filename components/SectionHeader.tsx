import { ReactNode } from 'react';

interface SectionHeaderProps {
  overline?: string;
  title: string | ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
  titleClassName?: string;
}

function renderTitle(title: string | ReactNode): ReactNode {
  if (typeof title !== 'string') return title;
  // Split on <br/>, <br />, or <br> to render safe line breaks
  const parts = title.split(/<br\s*\/?>/i);
  if (parts.length === 1) return title;
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

export function SectionHeader({
  overline,
  title,
  subtitle,
  align = 'left',
  light = false,
  titleClassName = '',
}: SectionHeaderProps) {
  const center = align === 'center';
  const titleColor = light ? 'text-cream' : 'text-text-dark';
  const subtitleColor = light ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={`flex flex-col gap-3 ${center ? 'items-center text-center' : 'items-start text-left'}`}>
      {overline && (
        <div className={`flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
          {/* Gold accent line */}
          <div className="w-8 h-px bg-gold flex-shrink-0" />
          <span className="overline-label">{overline}</span>
        </div>
      )}

      <h2
        className={`font-display text-3xl md:text-4xl lg:text-5xl font-600 leading-tight ${titleColor} ${titleClassName}`}
      >
        {renderTitle(title)}
      </h2>

      {subtitle && (
        <p
          className={`font-body text-lg md:text-xl leading-relaxed max-w-2xl ${subtitleColor} ${center ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
