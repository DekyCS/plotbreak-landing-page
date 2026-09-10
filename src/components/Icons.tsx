const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', viewBox: '0 0 24 24' } as const;

export function AppleLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.365 1.43c0 1.14-.417 2.2-1.25 3.17-1.004 1.15-2.22 1.82-3.53 1.71a3.5 3.5 0 0 1-.03-.44c0-1.1.48-2.27 1.33-3.22.42-.49.96-.9 1.61-1.22.65-.32 1.27-.5 1.85-.53.02.18.02.36.02.53zm3.89 16.23c-.36.83-.79 1.6-1.29 2.3-.68.96-1.24 1.63-1.67 2-.66.61-1.37.93-2.14.95-.55 0-1.21-.16-1.98-.47-.78-.32-1.49-.47-2.14-.47-.68 0-1.41.15-2.2.47-.79.32-1.43.48-1.92.5-.73.03-1.46-.3-2.17-.98-.47-.41-1.05-1.1-1.75-2.08-.75-1.05-1.36-2.27-1.84-3.66-.51-1.5-.77-2.96-.77-4.37 0-1.61.35-3 1.05-4.17a6.1 6.1 0 0 1 2.2-2.22 5.9 5.9 0 0 1 2.97-.84c.58 0 1.34.18 2.29.53.94.35 1.55.53 1.82.53.2 0 .88-.21 2.03-.62 1.09-.38 2.01-.54 2.76-.48 2.04.16 3.57.97 4.59 2.42-1.82 1.1-2.72 2.65-2.7 4.63.02 1.54.58 2.83 1.67 3.85.5.47 1.05.83 1.66 1.09-.13.38-.27.75-.42 1.1z" />
    </svg>
  );
}

export function Chevron(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path clipRule="evenodd" fillRule="evenodd" d="m5.645 9.566 1.13-1.132L12 13.66l5.224-5.225 1.132 1.132L12 15.92z" />
    </svg>
  );
}

export function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} aria-hidden="true" {...props}><path d="M9 6l6 6-6 6" /></svg>
  );
}

export function ArrowLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} aria-hidden="true" {...props}><path d="M15 6l-6 6 6 6" /></svg>
  );
}

const ICONS: Record<string, React.ReactNode> = {
  dice: <><path d="M12 2 3 7v10l9 5 9-5V7z" /><path d="M12 12 3 7M12 12l9-5M12 12v10" /></>,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z" />,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  fork: <><path d="M6 3v12" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" /></>,
  edit: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></>,
  image: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="m3 16 5-5 4 4 3-3 6 6" /><circle cx="16" cy="8" r="1.5" /></>,
};

export function Icon({ name, ...props }: { name: string } & React.SVGProps<SVGSVGElement>) {
  return <svg {...base} aria-hidden="true" {...props}>{ICONS[name]}</svg>;
}
