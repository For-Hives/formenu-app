// 'use client'
// import { createContext, useContext, useEffect, useState } from 'react'
//
// const CartContext = createContext()
//
// function CartProvider({ children }) {
// 	const [itemsInCart, setItemsInCart] = useState([])
// 	const [isLoading, setIsLoading] = useState(true)
//
// 	// click on minus button, decrease the quantity of the item, if quantity === 1, remove the item from the cart
// 	const decreaseQuantity = item => {
// 		const newItemsInCart = itemsInCart.map(itemInCart => {
// 			if (itemInCart.id === item.id) {
// 				if (itemInCart?.quantity === 1) {
// 					return null // use null to easily clean up later
// 				}
// 				return {
// 					...itemInCart,
// 					quantity: itemInCart?.quantity - 1,
// 				}
// 			}
// 			return itemInCart
// 		})
//
// 		const cleanedItemsInCart = cleanData(newItemsInCart) // use cleanData function
//
// 		setItemsInCart(cleanedItemsInCart)
// 		localStorage.setItem('itemsInCart', JSON.stringify(cleanedItemsInCart))
// 	}
//
// 	// click on plus button, increase the quantity of the item
// 	const increaseQuantity = item => {
// 		const newItemsInCart = itemsInCart.map(itemInCart => {
// 			if (itemInCart.id === item.id) {
// 				return {
// 					...itemInCart,
// 					quantity: itemInCart?.quantity + 1,
// 				}
// 			}
// 			return itemInCart
// 		})
//
// 		const cleanedItemsInCart = cleanData(newItemsInCart) // use cleanData function
//
// 		setItemsInCart(cleanedItemsInCart)
// 		localStorage.setItem('itemsInCart', JSON.stringify(cleanedItemsInCart))
// 	}
//
// 	//     add an item to the cart
// 	const addItem = item => {
// 		// check if the item is already in the cart, if it is, increase the quantity
// 		const itemInCart = itemsInCart.find(itemInCart => itemInCart.id === item.id)
// 		if (itemInCart) {
// 			const newItemsInCart = itemsInCart.map(itemInCart => {
// 				if (itemInCart.id === item.id) {
// 					return {
// 						...itemInCart,
// 						quantity: itemInCart?.quantity + 1,
// 					}
// 				}
// 				return itemInCart
// 			})
// 			setItemsInCart(newItemsInCart)
// 			localStorage.setItem('itemsInCart', JSON.stringify(newItemsInCart))
// 			return
// 		}
// 		// if the item is not in the cart, add it
// 		const newItemsInCart = [...itemsInCart, item]
// 		setItemsInCart(newItemsInCart)
// 		localStorage.setItem('itemsInCart', JSON.stringify(newItemsInCart))
// 	}
//
// 	// clear the cart
// 	const resetCart = () => {
// 		setItemsInCart([])
// 		localStorage.setItem('itemsInCart', JSON.stringify([]))
// 	}
//
// 	const cleanData = data => {
// 		if (!data || !data.length) return []
// 		return data.filter(
// 			item => item && (typeof item !== 'string' || item.trim() !== '')
// 		)
// 	}
//
// 	// get items in cart from local storage (and clear the values that are not valid)
// 	const getItemsInCart = () => {
// 		// Get the value from local storage if it exists
// 		const value = localStorage.getItem('itemsInCart')
// 		let valueParsed = JSON.parse(value)
// 		// Use the cleanData function
// 		valueParsed = cleanData(valueParsed)
// 		localStorage.setItem('itemsInCart', JSON.stringify(valueParsed))
// 		valueParsed !== '' && valueParsed?.length && setItemsInCart(valueParsed)
// 	}
//
// 	// count the number of items in the cart (length of the array + quantity of each item)
// 	const countItemsInCart = () => {
// 		let count = 0
// 		itemsInCart.forEach(item => {
// 			count += item?.quantity
// 		})
// 		return count
// 	}
//
// 	// execute getItemsInCart on load
// 	useEffect(() => {
// 		getItemsInCart()
// 		setIsLoading(false)
// 	}, [])
//
// 	return (
// 		<CartContext.Provider
// 			value={{
// 				itemsInCart,
// 				addItem,
// 				resetCart,
// 				getItemsInCart,
// 				isLoading,
// 				countItemsInCart,
// 				decreaseQuantity,
// 				increaseQuantity,
// 			}}
// 		>
// 			{children}
// 		</CartContext.Provider>
// 	)
// }
//
// export function useCart() {
// 	const context = useContext(CartContext)
// 	if (context === undefined) {
// 		throw new Error('useCart must be used within a CartProvider')
// 	}
// 	return context
// }
