import { create } from 'zustand'

export const useStore = create(set => ({
	isFilterModalClosed: true,
	selectedDiet: 'default',
	selectedAllergens: [],
	lastDietCheck: null,
	lastAllergensCheck: null,

	setSelectedDiet: diet => {
		set({ selectedDiet: diet })
	},

	toggleAllergen: key => {
		set(state => {
			const selectedAllergens = state.selectedAllergens.includes(key)
				? state.selectedAllergens.filter(item => item !== key)
				: [...state.selectedAllergens, key]

			return { selectedAllergens }
		})
	},

	toggleFilterModal: () => {
		set(state => ({
			isFilterModalClosed: !state.isFilterModalClosed,
		}))
	},

	resetFilter: () => {
		set({
			isFilterModalClosed: true,
			selectedDiet: 'default',
			selectedAllergens: [],
		})
	},

	checkDiet: (dish, diet) => {
		switch (diet) {
			case 'default':
			case 'omnivore':
				return true
			case 'vegetarian':
				return dish.is_vegetarian
			case 'vegan':
				return dish.is_vegan
			default:
				return true
		}
	},

	checkAllergens: (dish, selectedAllergens) => {
		if (selectedAllergens?.length === 0) return true
		return !selectedAllergens.some(allergen => dish?.allergens[allergen])
	},

	// to trigger useEffect in DishesList and so on
	updateLastDietCheck: () => set(state => ({ lastDietCheck: Date.now() })),
	updateLastAllergensCheck: () =>
		set(state => ({ lastAllergensCheck: Date.now() })),
}))
