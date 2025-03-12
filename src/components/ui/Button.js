export function Button({ children, onClick }) {
    return (
        <button onClick={onClick} style={{ padding: "10px", background: "blue", color: "white", border: "none", borderRadius: "5px" }}>
            {children}
        </button>
    );
}