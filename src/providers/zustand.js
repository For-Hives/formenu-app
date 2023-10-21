import { create } from 'zustand'

export const useCartStore = create(set => ({
	itemsInCart: [],
	isLoading: true,

	decreaseQuantity: item => {
		set(state => ({
			itemsInCart: state.itemsInCart.map(itemInCart => {
				if (itemInCart.id === item.id) {
					if (itemInCart?.quantity === 1) {
						return null
					}
					return {
						...itemInCart,
						quantity: itemInCart?.quantity - 1,
					}
				}
				return itemInCart
			}),
		}))
		// localStorage.setItem('itemsInCart', JSON.stringify(cleanedItemsInCart));
	},

	increaseQuantity: item => {
		set(state => ({
			itemsInCart: state.itemsInCart.map(itemInCart => {
				if (itemInCart.id === item.id) {
					return {
						...itemInCart,
						quantity: itemInCart?.quantity + 1,
					}
				}
				return itemInCart
			}),
		}))
		// localStorage.setItem('itemsInCart', JSON.stringify(cleanedItemsInCart));
	},

	addItem: item => {
		const itemInCart = set(state =>
			state.itemsInCart.find(itemInCart => itemInCart.id === item.id)
		)
		if (itemInCart) {
			set(state => ({
				itemsInCart: state.itemsInCart.map(itemInCart => {
					if (itemInCart.id === item.id) {
						return {
							...itemInCart,
							quantity: itemInCart?.quantity + 1,
						}
					}
					return itemInCart
				}),
			}))
			// localStorage.setItem('itemsInCart', JSON.stringify(newItemsInCart));
			return
		}
		set(state => ({
			itemsInCart: [...state.itemsInCart, item],
		}))
		// localStorage.setItem('itemsInCart', JSON.stringify(newItemsInCart));
	},

	resetCart: () => {
		set({ itemsInCart: [] })
		// localStorage.setItem('itemsInCart', JSON.stringify([]));
	},

	cleanData: data => {
		if (!data || !data.length) return []
		return data.filter(
			item => item && (typeof item !== 'string' || item.trim() !== '')
		)
	},

	getItemsInCart: () => {
		// Get the value from local storage if it exists
		const value = localStorage.getItem('itemsInCart')
		let valueParsed = JSON.parse(value)
		// Use the cleanData function
		valueParsed = cleanData(valueParsed)
		// localStorage.setItem('itemsInCart', JSON.stringify(valueParsed));
		valueParsed !== '' &&
			valueParsed?.length &&
			set({ itemsInCart: valueParsed })
	},

	countItemsInCart: () => {
		return itemsInCart.reduce((count, item) => count + item?.quantity, 0)
	},
}))

export const useStore = create(set => ({
	isFilterModalClosed: true,
	selectedDiet: 'default',
	selectedAllergens: [],

	setSelectedDiet: diet => {
		set({ selectedDiet: diet })
	},

	toggleAllergen: key => {
		set(state => ({
			selectedAllergens: state.selectedAllergens.includes(key)
				? state.selectedAllergens.filter(item => item !== key)
				: [...state.selectedAllergens, key],
		}))
	},

	toggleFilterModal: () => {
		set(state => ({
			isFilterModalClosed: !state.isFilterModalClosed,
		}))
	},

	resetFilter: () => {
		set({
			selectedDiet: 'default',
			selectedAllergens: [],
		})
	},

	checkDiet: dish => {
		switch (selectedDiet) {
			case 'default':
			case 'omnivore':
				return true
			case 'vegetarian':
				return dish?.is_vegetarian
			case 'vegan':
				return dish?.is_vegan
			default:
				return false
		}
	},

	checkAllergens: dish => {
		if (selectedAllergens.length === 0) {
			return true
		} else {
			return selectedAllergens.every(allergen => {
				// This line checks if the allergen exists and if its value is truthy
				return dish?.allergens[allergen]
			})
		}
	},
}))
