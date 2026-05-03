interface Props {
    title: string;
    subtitle?: string;
    className?: string;
  }
  
  export const Title = ({ title, subtitle, className }: Props) => {
    return (
      <div className={`flex flex-col gap-1.5 ${className ?? ""}`}>
        <h1
          className="
            text-2xl sm:text-3xl md:text-[32px]
            font-medium
            tracking-[-0.025em]
            leading-[1.15]
            text-(--color-text-primary)
          "
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h1>
  
        {subtitle && (
          <p
            className="
              text-sm sm:text-base
              font-light
              text-(--color-text-secondary)
              leading-relaxed
              max-w-[65ch]
            "
          >
            {subtitle}
          </p>
        )}
      </div>
    );
  };