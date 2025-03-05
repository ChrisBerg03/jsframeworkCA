import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-amber-300 w-full h-16 flex items-center px-4 md:px-8 shadow-md">
            <div className="flex justify-between w-full max-w-7xl mx-auto">
                <Link to="/" className="text-lg font-bold">
                    ReactCA
                </Link>
                <nav className="hidden md:flex space-x-6">
                    <Link to="/" className="hover:text-amber-600">
                        Home
                    </Link>
                    <Link to="/contact" className="hover:text-amber-600">
                        Contact
                    </Link>
                    <Link to="/cart">
                        <img
                            src="/cart.svg"
                            alt="Cart"
                            height={30}
                            width={30}
                        />
                    </Link>
                </nav>

                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-amber-300 shadow-md flex flex-col items-center py-4 space-y-4 md:hidden">
                    <Link
                        to="/"
                        onClick={() => setIsOpen(false)}
                        className="hover:text-amber-600"
                    >
                        Home
                    </Link>
                    <Link
                        to="/contact"
                        onClick={() => setIsOpen(false)}
                        className="hover:text-amber-600"
                    >
                        Contact
                    </Link>
                    <Link to="/cart" onClick={() => setIsOpen(false)}>
                        <img
                            src="/cart.svg"
                            alt="Cart"
                            height={30}
                            width={30}
                        />
                    </Link>
                </div>
            )}
        </header>
    );
}
