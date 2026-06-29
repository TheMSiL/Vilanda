import { useEffect, useState } from 'react'

import type { Product } from '../data/products'
import { products as fallbackProducts } from '../data/products'
import { fetchProducts } from '../services/products'

export const useProducts = () => {
	const [products, setProducts] = useState<Product[]>(fallbackProducts)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		let isMounted = true

		fetchProducts()
			.then((items) => {
				if (isMounted) setProducts(items)
			})
			.catch((error) => {
				console.warn('Failed to load products.', error)
			})
			.finally(() => {
				if (isMounted) setIsLoading(false)
			})

		return () => {
			isMounted = false
		}
	}, [])

	return { products, isLoading }
}
