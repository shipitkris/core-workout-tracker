export function Card({ children }) {
    return (
        <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px", margin: "10px" }}>
            {children}
        </div>
    );
}

// If your code requires CardContent, define and export it
export function CardContent({ children }) {
    return <div style={{ padding: "10px" }}>{children}</div>;
}