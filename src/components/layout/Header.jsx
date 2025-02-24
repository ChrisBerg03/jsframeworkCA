import { Link } from "react-router-dom";

export function Header() {
    return (
        <header className="bg-amber-300 w-dvw h-10 flex flex-row justify-evenly items-center">
            <Link to="/" className="bg-red-400 p-1">
                Home
            </Link>
            <Link to="/contact" className="bg-blue-400 p-1">
                Contact page
            </Link>
            <Link to="/cart" className="bg-purple-400 p-1">
                <img
                    src="../src/assets/cart.svg"
                    alt=""
                    height={30}
                    width={30}
                />
            </Link>
        </header>
    );
}
