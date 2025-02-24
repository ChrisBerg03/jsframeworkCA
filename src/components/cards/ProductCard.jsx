export function Card({ children, bgColor = "blue", title = "card" }) {
    return (
        <div style={{ backgroundColor: bgColor, color: "white" }}>
            <h2 className="text-3xl font-bold">{title}</h2>
            {children}
        </div>
    );
}
