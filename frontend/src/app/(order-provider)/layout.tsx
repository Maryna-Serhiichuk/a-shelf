import { ShoppingProvider } from "@/components/CartLayout/components/ShoppingProvider";

export default function ShoppingLayout({ children }: { children: React.ReactNode }) {
    return <ShoppingProvider>
        {children}
    </ShoppingProvider>
}