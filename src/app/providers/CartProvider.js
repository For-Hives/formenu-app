'use client'
import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
	const [itemsInCart, setItemsInCart] = useState([])

	//     add an item to the cart
	const addItem = item => {
		const newItemsInCart = [...itemsInCart, item]
		setItemsInCart(newItemsInCart)
		localStorage.setItem('itemsInCart', JSON.stringify(newItemsInCart))
	}

	// clear the cart
	const resetCart = () => {
		setItemsInCart([])
		localStorage.setItem('itemsInCart', JSON.stringify([]))
	}

	return (
		<CartContext.Provider value={{ itemsInCart, addItem, resetCart }}>
			{children}
		</CartContext.Provider>
	)
}

export function useCart() {
	const context = useContext(CartContext)
	if (context === undefined) {
		throw new Error('useCart must be used within a CartProvider')
	}
	return context
}
