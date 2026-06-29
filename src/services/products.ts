import { products as fallbackProducts } from '../data/products'
import type { Product } from '../data/products'
import { supabase } from '../lib/supabase'

type ProductRow = {
	id: number
	name: string
	category: string
	category_id?: number
	price: number
	badge: string | null
	badge_class: string | null
	image: string
	description: string
	light: Product['light']
	container: string | null
	winter_hardiness: string | null
	in_stock: boolean
	is_active: boolean
	sort_order: number
}

export type Category = {
	id: number
	name: string
	sortOrder: number
}

export type ProductFormValues = {
	name: string
	categoryId: number
	price: number
	badge: string
	badgeClass: string
	image: string
	description: string
	light: Product['light']
	container: string
	winterHardiness: string
	inStock: boolean
	isActive: boolean
	sortOrder: number
}

const toProduct = (row: ProductRow): Product => ({
	id: row.id,
	name: row.name,
	category: row.category,
	categoryId: row.category_id,
	price: row.price,
	badge: row.badge ?? undefined,
	badgeClass: row.badge_class ?? undefined,
	image: row.image,
	description: row.description,
	light: row.light,
	container: row.container ?? undefined,
	winterHardiness: row.winter_hardiness ?? undefined,
	inStock: row.in_stock,
	isActive: row.is_active,
	sortOrder: row.sort_order,
})

export const fetchProducts = async () => {
	if (!supabase) return fallbackProducts

	const { data, error } = await supabase
		.from('catalog_products')
		.select('*')
		.eq('is_active', true)
		.order('sort_order', { ascending: true })
		.order('id', { ascending: true })

	if (error) {
		console.warn('Failed to fetch products from Supabase, using fallback data.', error)
		return fallbackProducts
	}

	return (data as ProductRow[]).map(toProduct)
}

export const fetchAdminProducts = async () => {
	if (!supabase) return fallbackProducts

	const { data, error } = await supabase
		.from('catalog_products')
		.select('*')
		.order('sort_order', { ascending: true })
		.order('id', { ascending: true })

	if (error) throw error
	return (data as ProductRow[]).map(toProduct)
}

export const fetchCategories = async (): Promise<Category[]> => {
	if (!supabase) {
		return Array.from(new Set(fallbackProducts.map((product) => product.category))).map((name, index) => ({
			id: index + 1,
			name,
			sortOrder: (index + 1) * 10,
		}))
	}

	const { data, error } = await supabase
		.from('categories')
		.select('id, name, sort_order')
		.order('sort_order', { ascending: true })
		.order('name', { ascending: true })

	if (error) throw error
	return data.map((category) => ({
		id: category.id,
		name: category.name,
		sortOrder: category.sort_order,
	}))
}

export const saveProduct = async (values: ProductFormValues, productId?: number) => {
	if (!supabase) throw new Error('Supabase is not configured.')

	const payload = {
		name: values.name,
		category_id: values.categoryId,
		price: values.price,
		badge: values.badge || null,
		badge_class: values.badgeClass || null,
		image_url: values.image,
		description: values.description,
		light: values.light,
		container: values.container,
		winter_hardiness: values.winterHardiness,
		in_stock: values.inStock,
		is_active: values.isActive,
		sort_order: values.sortOrder,
	}

	const query = productId
		? supabase.from('products').update(payload).eq('id', productId)
		: supabase.from('products').insert(payload)

	const { error } = await query
	if (error) throw error
}

export const deleteProduct = async (productId: number) => {
	if (!supabase) throw new Error('Supabase is not configured.')

	const { error } = await supabase.from('products').delete().eq('id', productId)
	if (error) throw error
}

export const saveCategory = async (name: string) => {
	if (!supabase) throw new Error('Supabase is not configured.')

	const { error } = await supabase.from('categories').insert({ name })
	if (error) throw error
}
