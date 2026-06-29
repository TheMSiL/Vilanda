/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

type Cart = Record<number, number>

type ShopContextValue = {
	cart: Cart
	favorites: number[]
	cartCount: number
	addToCart: (productId: number) => void
	changeQuantity: (productId: number, quantity: number) => void
	removeFromCart: (productId: number) => void
	toggleFavorite: (productId: number) => void
	clearCart: () => void
}

const ShopContext = createContext<ShopContextValue | null>(null)

const readStorage = <T,>(key: string, fallback: T): T => {
	try {
		const saved = localStorage.getItem(key)
		return saved ? JSON.parse(saved) as T : fallback
	} catch {
		return fallback
	}
}

export const ShopProvider = ({ children }: { children: ReactNode }) => {
	const [cart, setCart] = useState<Cart>(() => readStorage('vilanda-cart', {}))
	const [favorites, setFavorites] = useState<number[]>(() => readStorage('vilanda-favorites', []))

	useEffect(() => localStorage.setItem('vilanda-cart', JSON.stringify(cart)), [cart])
	useEffect(() => localStorage.setItem('vilanda-favorites', JSON.stringify(favorites)), [favorites])

	const value = useMemo<ShopContextValue>(() => ({
		cart,
		favorites,
		cartCount: Object.values(cart).reduce((total, quantity) => total + quantity, 0),
		addToCart: (productId) => setCart((current) => ({
			...current,
			[productId]: (current[productId] ?? 0) + 1,
		})),
		changeQuantity: (productId, quantity) => setCart((current) => {
			if (quantity <= 0) {
				const next = { ...current }
				delete next[productId]
				return next
			}
			return { ...current, [productId]: quantity }
		}),
		removeFromCart: (productId) => setCart((current) => {
			const next = { ...current }
			delete next[productId]
			return next
		}),
		toggleFavorite: (productId) => setFavorites((current) => (
			current.includes(productId)
				? current.filter((id) => id !== productId)
				: [...current, productId]
		)),
		clearCart: () => setCart({}),
	}), [cart, favorites])

	return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export const useShop = () => {
	const context = useContext(ShopContext)
	if (!context) throw new Error('useShop must be used inside ShopProvider')
	return context
}
