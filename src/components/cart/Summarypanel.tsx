interface Props {
    children: React.ReactNode;
  }
  
  export const SummaryPanel = ({ children }: Props) => {
    return (
      <div style={{
        paddingTop: "40px",
        paddingBottom: "40px",
        paddingLeft: "40px",
        paddingRight: "40px",
        backgroundColor: "var(--color-bg-surface)",
        borderLeft: "0.5px solid var(--color-border)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}>
        {children}
      </div>
    );
  };