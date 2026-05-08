interface SectionLabelProps {
    children: React.ReactNode;
  }
  
  export const SectionLabel = ({ children }: SectionLabelProps) => {
    return <p className="text-label mb-3">{children}</p>;
  };