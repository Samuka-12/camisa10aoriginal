import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { CartSheet } from "./CartSheet"; // Importe o componente que criamos
import { useCart } from "@/contexts/CartContext";

export function Navbar() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { totalItems } = useCart(); // Para mostrar o número de itens no ícone

    return (
        <nav className="flex justify-between items-center p-4 bg-background border-b">
            <h1 className="font-bold text-xl">Darkbunny Garimpos</h1>

            {/* BOTÃO QUE ABRE O CARRINHO */}
            <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2"
            >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                        {totalItems}
                    </span>
                )}
            </button>

            {/* O COMPONENTE DO CARRINHO PROPRIAMENTE DITO */}
            <CartSheet
                open={isCartOpen}
                onOpenChange={setIsCartOpen}
            />
        </nav>
    );
}