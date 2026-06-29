import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import type { Session } from '@supabase/supabase-js'

import logo from '../assets/logo.png'
import { formatPrice } from '../data/products'
import type { Product } from '../data/products'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import {
	deleteProduct,
	fetchAdminProducts,
	fetchCategories,
	saveCategory,
	saveProduct,
} from '../services/products'
import type { Category, ProductFormValues } from '../services/products'

const emptyForm = (categoryId = 0): ProductFormValues => ({
	name: '',
	categoryId,
	price: 0,
	badge: '',
	badgeClass: 'bg-[#dcebd7] text-[#244f22]',
	image: '',
	description: '',
	light: 'Сонце',
	container: 'C3-C5',
	winterHardiness: 'Висока',
	inStock: true,
	isActive: true,
	sortOrder: 100,
})

const toFormValues = (product: Product, categoryId: number): ProductFormValues => ({
	name: product.name,
	categoryId: product.categoryId ?? categoryId,
	price: product.price,
	badge: product.badge ?? '',
	badgeClass: product.badgeClass ?? '',
	image: product.image,
	description: product.description,
	light: product.light,
	container: product.container ?? 'C3-C5',
	winterHardiness: product.winterHardiness ?? 'Висока',
	inStock: product.inStock ?? true,
	isActive: product.isActive ?? true,
	sortOrder: product.sortOrder ?? 100,
})

const fieldClass = 'w-full rounded-2xl border border-[#d6e0d2] bg-white px-4 py-3 outline-none focus:border-[#8da588]'

const AdminPage = () => {
	const [session, setSession] = useState<Session | null>(null)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [products, setProducts] = useState<Product[]>([])
	const [categories, setCategories] = useState<Category[]>([])
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
	const [form, setForm] = useState<ProductFormValues>(() => emptyForm())
	const [categoryName, setCategoryName] = useState('')
	const [message, setMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const firstCategoryId = categories[0]?.id ?? 0
	const sortedProducts = useMemo(() => [...products].sort((a, b) => (a.sortOrder ?? a.id) - (b.sortOrder ?? b.id)), [products])

	useEffect(() => {
		if (!supabase) return

		supabase.auth.getSession().then(({ data }) => setSession(data.session))
		const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession))
		return () => data.subscription.unsubscribe()
	}, [])

	useEffect(() => {
		if (session) void loadData()
	}, [session])

	useEffect(() => {
		if (!form.categoryId && firstCategoryId) setForm((current) => ({ ...current, categoryId: firstCategoryId }))
	}, [firstCategoryId, form.categoryId])

	const loadData = async () => {
		setIsLoading(true)
		setMessage('')
		try {
			const [nextProducts, nextCategories] = await Promise.all([fetchAdminProducts(), fetchCategories()])
			setProducts(nextProducts)
			setCategories(nextCategories)
		} catch (error) {
			setMessage(error instanceof Error ? error.message : 'Не вдалося завантажити дані.')
		} finally {
			setIsLoading(false)
		}
	}

	const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!supabase) return

		setIsLoading(true)
		setMessage('')
		const { error } = await supabase.auth.signInWithPassword({ email, password })
		setIsLoading(false)
		if (error) setMessage(error.message)
	}

	const handleLogout = async () => {
		if (!supabase) return
		await supabase.auth.signOut()
		setProducts([])
		setCategories([])
	}

	const editProduct = (product: Product) => {
		setSelectedProduct(product)
		setForm(toFormValues(product, firstCategoryId))
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const resetForm = () => {
		setSelectedProduct(null)
		setForm(emptyForm(firstCategoryId))
	}

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setIsLoading(true)
		setMessage('')
		try {
			await saveProduct(form, selectedProduct?.id)
			setMessage(selectedProduct ? 'Товар оновлено.' : 'Товар додано.')
			resetForm()
			await loadData()
		} catch (error) {
			setMessage(error instanceof Error ? error.message : 'Не вдалося зберегти товар.')
		} finally {
			setIsLoading(false)
		}
	}

	const handleDelete = async (product: Product) => {
		if (!window.confirm(`Видалити "${product.name}"?`)) return

		setIsLoading(true)
		setMessage('')
		try {
			await deleteProduct(product.id)
			if (selectedProduct?.id === product.id) resetForm()
			setMessage('Товар видалено.')
			await loadData()
		} catch (error) {
			setMessage(error instanceof Error ? error.message : 'Не вдалося видалити товар.')
		} finally {
			setIsLoading(false)
		}
	}

	const handleCategorySubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!categoryName.trim()) return

		setIsLoading(true)
		setMessage('')
		try {
			await saveCategory(categoryName.trim())
			setCategoryName('')
			setMessage('Категорію додано.')
			await loadData()
		} catch (error) {
			setMessage(error instanceof Error ? error.message : 'Не вдалося додати категорію.')
		} finally {
			setIsLoading(false)
		}
	}

	if (!isSupabaseConfigured) {
		return (
			<div className='min-h-screen bg-[#f7f8f3] px-5 py-20 text-[#173d19]'>
				<div className='mx-auto max-w-2xl rounded-[30px] bg-white p-8 shadow-[0_20px_70px_rgba(33,72,32,0.08)]'>
					<h1 className='text-4xl font-semibold'>Supabase ще не підключено</h1>
					<p className='mt-4 leading-relaxed text-[#647064]'>
						Створіть файл .env на основі .env.example і додайте VITE_SUPABASE_URL та VITE_SUPABASE_ANON_KEY.
					</p>
				</div>
			</div>
		)
	}

	if (!session) {
		return (
			<div className='flex min-h-screen items-center justify-center bg-[#f7f8f3] px-5 text-[#173d19]'>
				<form onSubmit={handleLogin} className='w-full max-w-md rounded-[30px] bg-white p-8 shadow-[0_20px_70px_rgba(33,72,32,0.08)]'>
					<img src={logo} alt='Vilanda' className='mb-8 h-16 w-16 object-contain' />
					<h1 className='text-4xl font-semibold'>Адмінка</h1>
					<p className='mt-3 text-[#647064]'>Увійдіть через користувача Supabase Auth, доданого до admin_users.</p>
					<div className='mt-8 space-y-3'>
						<input value={email} onChange={(event) => setEmail(event.target.value)} type='email' required placeholder='Email' className={fieldClass} />
						<input value={password} onChange={(event) => setPassword(event.target.value)} type='password' required placeholder='Пароль' className={fieldClass} />
					</div>
					{message && <p className='mt-4 rounded-2xl bg-[#fff3ad] px-4 py-3 text-sm'>{message}</p>}
					<button type='submit' disabled={isLoading} className='mt-6 w-full rounded-full bg-[#173d19] px-6 py-4 font-semibold text-white transition hover:bg-[#2e5e27] disabled:opacity-60'>
						{isLoading ? 'Зачекайте...' : 'Увійти'}
					</button>
				</form>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-[#f7f8f3] text-[#173d19]'>
			<header className='border-b border-[#dfe6db] bg-white'>
				<div className='content_container flex h-24 items-center justify-between gap-4'>
					<a href='/catalog' className='flex items-center gap-3'>
						<img src={logo} alt='Vilanda' className='h-14 w-14 object-contain' />
						<span>
							<span className='block text-xl font-semibold'>Vilanda Admin</span>
							<span className='text-xs text-[#6b796a]'>Товари та категорії</span>
						</span>
					</a>
					<button type='button' onClick={handleLogout} className='rounded-full bg-[#edf3e9] px-5 py-3 font-semibold'>Вийти</button>
				</div>
			</header>

			<main className='content_container py-10'>
				{message && <p className='mb-6 rounded-2xl bg-[#fff3ad] px-5 py-4 text-sm font-semibold'>{message}</p>}

				<div className='grid gap-8 xl:grid-cols-[440px_minmax(0,1fr)]'>
					<div className='space-y-5'>
						<form onSubmit={handleSubmit} className='rounded-[28px] bg-white p-6 shadow-[0_14px_50px_rgba(33,72,32,0.08)]'>
							<div className='mb-6 flex items-center justify-between gap-4'>
								<h1 className='text-3xl font-semibold'>{selectedProduct ? 'Редагувати товар' : 'Новий товар'}</h1>
								{selectedProduct && <button type='button' onClick={resetForm} className='text-sm font-semibold text-[#2e5e27]'>Очистити</button>}
							</div>

							<div className='space-y-3'>
								<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required placeholder='Назва' className={fieldClass} />
								<select value={form.categoryId} onChange={(event) => setForm({ ...form, categoryId: Number(event.target.value) })} required className={fieldClass}>
									<option value={0} disabled>Категорія</option>
									{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
								</select>
								<input value={form.price} onChange={(event) => setForm({ ...form, price: Number(event.target.value) })} required type='number' min='0' placeholder='Ціна' className={fieldClass} />
								<input value={form.image} onChange={(event) => setForm({ ...form, image: event.target.value })} required placeholder='URL фото' className={fieldClass} />
								<textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} required rows={3} placeholder='Опис' className={fieldClass} />
								<div className='grid gap-3 sm:grid-cols-2'>
									<select value={form.light} onChange={(event) => setForm({ ...form, light: event.target.value as Product['light'] })} className={fieldClass}>
										<option>Сонце</option>
										<option>Напівтінь</option>
										<option>Тінь</option>
									</select>
									<input value={form.container} onChange={(event) => setForm({ ...form, container: event.target.value })} placeholder='Контейнер' className={fieldClass} />
								</div>
								<input value={form.winterHardiness} onChange={(event) => setForm({ ...form, winterHardiness: event.target.value })} placeholder='Зимостійкість' className={fieldClass} />
								<div className='grid gap-3 sm:grid-cols-2'>
									<input value={form.badge} onChange={(event) => setForm({ ...form, badge: event.target.value })} placeholder='Бейдж' className={fieldClass} />
									<input value={form.badgeClass} onChange={(event) => setForm({ ...form, badgeClass: event.target.value })} placeholder='CSS бейджа' className={fieldClass} />
								</div>
								<input value={form.sortOrder} onChange={(event) => setForm({ ...form, sortOrder: Number(event.target.value) })} type='number' placeholder='Порядок' className={fieldClass} />
								<div className='flex flex-wrap gap-4 text-sm font-semibold'>
									<label className='flex items-center gap-2'><input type='checkbox' checked={form.inStock} onChange={(event) => setForm({ ...form, inStock: event.target.checked })} /> У наявності</label>
									<label className='flex items-center gap-2'><input type='checkbox' checked={form.isActive} onChange={(event) => setForm({ ...form, isActive: event.target.checked })} /> Показувати</label>
								</div>
							</div>

							<button type='submit' disabled={isLoading || !form.categoryId} className='mt-6 w-full rounded-full bg-[#173d19] px-6 py-4 font-semibold text-white transition hover:bg-[#2e5e27] disabled:opacity-60'>
								{isLoading ? 'Зберігаємо...' : selectedProduct ? 'Зберегти зміни' : 'Додати товар'}
							</button>
						</form>

						<form onSubmit={handleCategorySubmit} className='rounded-[28px] bg-white p-6 shadow-[0_14px_50px_rgba(33,72,32,0.08)]'>
							<h2 className='text-2xl font-semibold'>Категорії</h2>
							<div className='mt-4 flex gap-2'>
								<input value={categoryName} onChange={(event) => setCategoryName(event.target.value)} placeholder='Нова категорія' className={fieldClass} />
								<button type='submit' className='rounded-full bg-[#173d19] px-5 font-semibold text-white'>+</button>
							</div>
							<div className='mt-4 flex flex-wrap gap-2'>
								{categories.map((category) => <span key={category.id} className='rounded-full bg-[#edf3e9] px-3 py-1.5 text-sm'>{category.name}</span>)}
							</div>
						</form>
					</div>

					<section className='min-w-0'>
						<div className='mb-5 flex items-center justify-between'>
							<h2 className='text-3xl font-semibold'>Товари</h2>
							<button type='button' onClick={loadData} className='rounded-full bg-white px-5 py-3 font-semibold'>{isLoading ? 'Оновлюємо...' : 'Оновити'}</button>
						</div>
						<div className='grid gap-4'>
							{sortedProducts.map((product) => (
								<article key={product.id} className='grid gap-4 rounded-[24px] bg-white p-4 shadow-[0_12px_40px_rgba(33,72,32,0.06)] sm:grid-cols-[112px_minmax(0,1fr)_auto] sm:items-center'>
									<img src={product.image} alt={product.name} className='h-28 w-full rounded-[18px] object-cover sm:w-28' />
									<div className='min-w-0'>
										<div className='flex flex-wrap items-center gap-2'>
											<p className='text-xs font-bold uppercase tracking-[0.12em] text-[#789174]'>{product.category}</p>
											{product.isActive === false && <span className='rounded-full bg-[#f7dfdf] px-2 py-1 text-xs font-semibold text-[#713d3d]'>Приховано</span>}
										</div>
										<h3 className='mt-1 truncate text-xl font-semibold'>{product.name}</h3>
										<p className='mt-1 text-sm text-[#647064]'>{formatPrice(product.price)} · {product.light}</p>
									</div>
									<div className='flex gap-2'>
										<button type='button' onClick={() => editProduct(product)} className='rounded-full bg-[#edf3e9] px-4 py-3 text-sm font-semibold'>Редагувати</button>
										<button type='button' onClick={() => void handleDelete(product)} className='rounded-full bg-[#f7dfdf] px-4 py-3 text-sm font-semibold text-[#713d3d]'>Видалити</button>
									</div>
								</article>
							))}
						</div>
					</section>
				</div>
			</main>
		</div>
	)
}

export default AdminPage
