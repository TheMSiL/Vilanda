import React, { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'

import logo from '../assets/logo.png'
import { useShop } from '../context/ShopContext'
import { formatPrice, getProductCategories } from '../data/products'
import { useProducts } from '../hooks/useProducts'
import { BagIcon, CloseIcon, HeartIcon, SearchIcon } from './ShopIcons'

const ArrowIcon = () => (
	<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='h-5 w-5'>
		<path d='M5 12h14M13 6l6 6-6 6' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
)

const sortOptions = [
	{ value: 'popular', label: 'Спочатку популярні' },
	{ value: 'cheap', label: 'Спочатку дешевші' },
	{ value: 'expensive', label: 'Спочатку дорожчі' },
]

const SortSelect = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
	const [isOpen, setIsOpen] = useState(false)
	const selectRef = useRef<HTMLDivElement>(null)
	const selected = sortOptions.find((option) => option.value === value) ?? sortOptions[0]

	useEffect(() => {
		const closeOnOutsideClick = (event: MouseEvent) => {
			if (!selectRef.current?.contains(event.target as Node)) setIsOpen(false)
		}
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setIsOpen(false)
		}
		document.addEventListener('mousedown', closeOnOutsideClick)
		document.addEventListener('keydown', closeOnEscape)
		return () => {
			document.removeEventListener('mousedown', closeOnOutsideClick)
			document.removeEventListener('keydown', closeOnEscape)
		}
	}, [])

	return (
		<div ref={selectRef} className='relative z-20 sm:min-w-[230px]'>
			<button
				type='button'
				onClick={() => setIsOpen((current) => !current)}
				aria-haspopup='listbox'
				aria-expanded={isOpen}
				className={`flex w-full items-center justify-between gap-4 rounded-full border bg-white py-3 pl-5 pr-5 text-left text-sm font-semibold text-[#536653] transition ${
					isOpen ? 'border-[#8da588] shadow-[0_10px_30px_rgba(33,72,32,0.1)]' : 'border-[#d6e0d2]'
				}`}
			>
				<span>{selected.label}</span>
				<svg
					aria-hidden='true'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					className={`h-4 w-4 shrink-0 transition duration-200 ${isOpen ? 'rotate-180' : ''}`}
				>
					<path d='m7 10 5 5 5-5' strokeLinecap='round' strokeLinejoin='round' />
				</svg>
			</button>
			<div
				className={`absolute left-0 right-0 top-[calc(100%+8px)] origin-top rounded-[22px] border border-[#e0e7dd] bg-white p-2 shadow-[0_18px_50px_rgba(33,72,32,0.14)] transition duration-200 ${
					isOpen ? 'visible translate-y-0 scale-100 opacity-100' : 'invisible -translate-y-2 scale-95 opacity-0'
				}`}
			>
				<div role='listbox' aria-label='Сортування товарів'>
					{sortOptions.map((option) => (
						<button
							key={option.value}
							type='button'
							role='option'
							aria-selected={option.value === value}
							onClick={() => {
								onChange(option.value)
								setIsOpen(false)
							}}
							className={`flex w-full items-center justify-between rounded-[15px] px-4 py-3 text-left text-sm font-semibold transition ${
								option.value === value
									? 'bg-[#edf3e9] text-[#173d19]'
									: 'text-[#637062] hover:bg-[#f7f8f3] hover:text-[#173d19]'
							}`}
						>
							{option.label}
							{option.value === value && (
								<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='h-4 w-4 text-[#2e5e27]'>
									<path d='m5 12 4 4L19 6' strokeLinecap='round' strokeLinejoin='round' />
								</svg>
							)}
						</button>
					))}
				</div>
			</div>
		</div>
	)
}

const CatalogPage: React.FC = () => {
	const { cart, favorites, cartCount, addToCart, changeQuantity, removeFromCart, toggleFavorite, clearCart } = useShop()
	const { products, isLoading } = useProducts()
	const [category, setCategory] = useState('Усі рослини')
	const [query, setQuery] = useState('')
	const [sort, setSort] = useState('popular')
	const [favoritesOnly, setFavoritesOnly] = useState(false)
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [isOrderSent, setIsOrderSent] = useState(false)

	const filteredProducts = useMemo(() => {
		const normalizedQuery = query.trim().toLocaleLowerCase('uk')
		const result = products.filter((product) => {
			const matchesCategory = category === 'Усі рослини' || product.category === category
			const matchesQuery = !normalizedQuery
				|| `${product.name} ${product.category}`.toLocaleLowerCase('uk').includes(normalizedQuery)
			const matchesFavorites = !favoritesOnly || favorites.includes(product.id)
			return matchesCategory && matchesQuery && matchesFavorites
		})

		return [...result].sort((a, b) => {
			if (sort === 'cheap') return a.price - b.price
			if (sort === 'expensive') return b.price - a.price
			return a.id - b.id
		})
	}, [category, favorites, favoritesOnly, query, sort])

	const cartItems = products.filter((product) => cart[product.id])
	const cartTotal = cartItems.reduce((sum, product) => sum + product.price * cart[product.id], 0)
	const productCategories = useMemo(() => getProductCategories(products), [products])
	const heroPlants = products.length >= 10 ? products : []

	const handleOrder = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setIsOrderSent(true)
	}

	return (
		<div className='min-h-screen bg-[#f7f8f3] text-[#173d19]'>
			<header className='sticky top-0 z-40 border-b border-[#dfe6db] bg-[#f7f8f3]/90 backdrop-blur-xl'>
				<div className='content_container flex h-24 items-center justify-between gap-4'>
					<a href='/' className='flex items-center gap-3' aria-label='Vilanda — головна'>
						<span className='flex h-14 w-14 items-center justify-center rounded-full bg-white p-1.5 shadow-[0_8px_24px_rgba(33,72,32,0.08)]'>
							<img src={logo} alt='Vilanda' className='h-full w-full object-contain' />
						</span>
						<span className='hidden sm:block'>
							<span className='block text-xl font-semibold'>Vilanda</span>
							<span className='text-xs text-[#6b796a]'>Рослини для саду</span>
						</span>
					</a>

					<div className='flex items-center gap-2 sm:gap-3'>
						<a href='/#delivery' className='hidden rounded-full px-5 py-3 text-sm font-semibold transition hover:bg-white lg:block'>
							Як ми працюємо
						</a>
						<button
							type='button'
							onClick={() => setFavoritesOnly((current) => !current)}
							className={`relative flex h-12 items-center gap-2 rounded-full px-4 font-semibold transition sm:px-5 ${
								favoritesOnly ? 'bg-[#fff3ad]' : 'bg-white hover:bg-[#edf3e9]'
							}`}
						>
							<HeartIcon filled={favoritesOnly} />
							<span className='hidden sm:inline'>Обране</span>
							{favorites.length > 0 && <span className='text-sm'>{favorites.length}</span>}
						</button>
						<button
							type='button'
							onClick={() => setIsCartOpen(true)}
							className='relative flex h-12 items-center gap-2 rounded-full bg-[#173d19] px-4 font-semibold text-white transition hover:bg-[#2e5e27] sm:px-5'
						>
							<BagIcon />
							<span className='hidden sm:inline'>Моя збірка</span>
							{cartCount > 0 && (
								<span className='flex h-6 min-w-6 items-center justify-center rounded-full bg-[#fff3ad] px-1.5 text-xs font-bold text-[#173d19]'>
									{cartCount}
								</span>
							)}
						</button>
					</div>
				</div>
			</header>

			<main>
				<section className='overflow-hidden bg-[#173d19] py-16 text-white md:py-24'>
					<div className='content_container relative'>
						<div className='grid gap-10 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-center xl:grid-cols-[minmax(0,1fr)_500px]'>
							<div>
								<p className='mb-5 text-sm font-bold uppercase tracking-[0.18em] text-[#fff3ad]'>Каталог Vilanda</p>
								<h1 className='max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.035em] md:text-7xl'>
									Зберіть сад, у якому
									<span className='block font-normal italic text-[#cfe3c8]'>хочеться залишитися</span>
								</h1>
							</div>

							<div className='pointer-events-none relative mx-auto hidden h-[360px] w-full max-w-[500px] lg:block'>
								<div className='absolute right-0 top-2 h-72 w-72 overflow-hidden rounded-full border border-white/20 bg-white/5 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.18)]'>
									<img src={(heroPlants[0] ?? products[0])?.image} alt='' className='h-full w-full rounded-full object-cover' />
								</div>
								<div className='absolute bottom-0 left-3 h-48 w-48 overflow-hidden rounded-[42px] border border-white/20 bg-white/5 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.16)]'>
									<img src={(heroPlants[3] ?? products[0])?.image} alt='' className='h-full w-full rounded-[34px] object-cover' />
								</div>
								<div className='absolute bottom-10 right-14 h-36 w-36 overflow-hidden rounded-full border-8 border-[#173d19] bg-[#cfe3c8] shadow-[0_22px_60px_rgba(0,0,0,0.2)]'>
									<img src={(heroPlants[9] ?? products[0])?.image} alt='' className='h-full w-full object-cover' />
								</div>
								<div className='absolute left-24 top-10 h-24 w-24 overflow-hidden rounded-[32px] border p-1.5 border-white/20 shadow-[0_18px_45px_rgba(0,0,0,0.18)] rotate-[-8deg]'>
									<img src={(heroPlants[7] ?? products[0])?.image} alt='' className='h-full w-full object-cover rounded-[32px]' />
								</div>
								<div className='absolute right-6 top-0 h-6 w-6 rounded-full bg-[#fff3ad]' />
							</div>
						</div>

						<div className='relative left-1/2 mt-9 w-screen -translate-x-1/2 border-t border-white/15' />
						<div className='pt-7'>
							<p className='max-w-2xl text-lg leading-relaxed text-white/65'>
								Додавайте рослини до збірки, змінюйте кількість і залишайте коментар. Ми перевіримо
								наявність та допоможемо скоригувати комплект.
							</p>
						</div>
					</div>
				</section>

				<section className='py-12 md:py-16'>
					<div className='content_container'>
						<div className='catalog-slider mb-5 flex gap-2 overflow-x-auto pb-1 xl:hidden'>
							{productCategories.map((item) => (
								<button
									key={item}
									type='button'
									onClick={() => setCategory(item)}
									className={`shrink-0 rounded-full border px-5 py-3 text-sm font-semibold transition ${
										category === item
											? 'border-[#173d19] bg-[#173d19] text-white'
											: 'border-[#d6e0d2] bg-white text-[#536653] hover:border-[#8da588]'
									}`}
								>
									{item}
								</button>
							))}
						</div>

						<div className='mb-8 flex flex-col gap-3 sm:flex-row sm:justify-end'>
							<label className='flex min-w-0 items-center gap-3 rounded-full border border-[#d6e0d2] bg-white px-5 py-3 sm:min-w-[300px]'>
								<SearchIcon />
								<input
									value={query}
									onChange={(event) => setQuery(event.target.value)}
									placeholder='Пошук рослини'
									className='min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#8b978a]'
								/>
							</label>
							<SortSelect value={sort} onChange={setSort} />
						</div>

						<div className='xl:grid xl:grid-cols-[220px_minmax(0,1fr)] xl:gap-8'>
							<aside className='hidden xl:block'>
								<div className='sticky top-32 rounded-[26px] border border-[#e0e7dd] bg-white p-3'>
									<p className='px-3 pb-3 pt-2 text-xs font-bold uppercase tracking-[0.16em] text-[#789174]'>
										Категорії
									</p>
									<div className='space-y-1'>
								{productCategories.map((item) => (
									<button
										key={item}
										type='button'
										onClick={() => setCategory(item)}
												className={`flex w-full items-center justify-between gap-3 rounded-[15px] px-3 py-3 text-left text-sm font-semibold transition ${
											category === item
														? 'bg-[#173d19] text-white'
														: 'text-[#536653] hover:bg-[#edf3e9] hover:text-[#173d19]'
										}`}
									>
										{item}
												<span className={`h-1.5 w-1.5 shrink-0 rounded-full ${category === item ? 'bg-[#fff3ad]' : 'bg-[#cbdac7]'}`} />
									</button>
								))}
									</div>
							</div>
							</aside>

							<div className='min-w-0'>
						<div className='mb-6 flex items-center justify-between'>
							<p className='text-sm text-[#788478]'>
								{isLoading ? 'Завантажуємо каталог...' : <>Знайдено: <span className='font-semibold text-[#173d19]'>{filteredProducts.length}</span></>}
							</p>
							{favoritesOnly && (
								<button type='button' onClick={() => setFavoritesOnly(false)} className='text-sm font-semibold text-[#2e5e27] underline underline-offset-4'>
									Показати всі
								</button>
							)}
						</div>

						{filteredProducts.length > 0 ? (
									<div className='grid gap-5 sm:grid-cols-2 2xl:grid-cols-3'>
								{filteredProducts.map((product) => {
									const isFavorite = favorites.includes(product.id)
									const quantity = cart[product.id] ?? 0
									return (
										<article key={product.id} className='group overflow-hidden rounded-[28px] border border-[#e0e7dd] bg-white shadow-[0_12px_40px_rgba(33,72,32,0.06)]'>
											<div className='relative h-[300px] overflow-hidden bg-[#e7eee3]'>
												<a href={`/product/${product.id}`} aria-label={`Переглянути ${product.name}`} className='block h-full'>
													<img src={product.image} alt={product.name} className='h-full w-full object-cover transition duration-500 group-hover:scale-105' />
												</a>
												{product.badge && (
													<span className={`absolute left-4 top-4 rounded-full px-4 py-2 text-xs font-semibold ${product.badgeClass}`}>
														{product.badge}
													</span>
												)}
												<button
													type='button'
													onClick={() => toggleFavorite(product.id)}
													aria-label={isFavorite ? 'Прибрати з обраного' : 'Додати в обране'}
													className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full shadow-sm transition ${
														isFavorite ? 'bg-[#fff3ad] text-[#173d19]' : 'bg-white/90 text-[#536653] hover:text-[#173d19]'
													}`}
												>
													<HeartIcon filled={isFavorite} />
												</button>
												<span className='absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#536653] backdrop-blur'>
													{product.light}
												</span>
											</div>
											<div className='p-6'>
												<p className='mb-2 text-sm font-medium text-[#788478]'>{product.category}</p>
												<h2 className='text-2xl font-semibold'>
													<a href={`/product/${product.id}`} className='transition hover:text-[#668562]'>{product.name}</a>
												</h2>
												<p className='mt-3 min-h-[48px] text-sm leading-relaxed text-[#6c786b]'>{product.description}</p>
												<div className='mt-6 flex items-center justify-between gap-4 border-t border-[#e8ede5] pt-5'>
													<div>
														<p className='text-xs text-[#8b978a]'>ціна від</p>
														<p className='text-xl font-bold text-[#2e5e27]'>{formatPrice(product.price)}</p>
													</div>
													<button
														type='button'
														onClick={() => addToCart(product.id)}
														className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
															quantity
																? 'bg-[#dfeeda] text-[#173d19]'
																: 'bg-[#173d19] text-white hover:bg-[#2e5e27]'
														}`}
													>
														<BagIcon />
														{quantity ? `У збірці · ${quantity}` : 'Додати'}
													</button>
												</div>
											</div>
										</article>
									)
								})}
							</div>
						) : (
							<div className='rounded-[30px] bg-[#edf3e9] px-6 py-20 text-center'>
								<div className='mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#72966d]'>
									<HeartIcon />
								</div>
								<h2 className='text-2xl font-semibold'>Поки тут тихо</h2>
								<p className='mt-2 text-[#687668]'>Спробуйте іншу категорію або додайте рослини до обраного.</p>
							</div>
						)}
							</div>
						</div>
					</div>
				</section>
			</main>

			<footer className='border-t border-[#dfe6db] py-8'>
				<div className='content_container flex flex-col gap-3 text-sm text-[#758274] sm:flex-row sm:items-center sm:justify-between'>
					<p>© {new Date().getFullYear()} Vilanda</p>
					<a href='tel:+380679017962' className='font-semibold text-[#173d19]'>+38 067 901 79 62</a>
				</div>
			</footer>

			<div className={`fixed inset-0 z-50 transition ${isCartOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!isCartOpen}>
				<button
					type='button'
					onClick={() => setIsCartOpen(false)}
					aria-label='Закрити збірку'
					className={`absolute inset-0 bg-[#0d2410]/50 backdrop-blur-sm transition ${isCartOpen ? 'opacity-100' : 'opacity-0'}`}
				/>
				<aside className={`absolute right-0 top-0 flex h-full w-full max-w-[620px] flex-col bg-[#f7f8f3] shadow-2xl transition duration-500 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
					<div className='flex items-center justify-between border-b border-[#dfe6db] px-5 py-5 sm:px-8'>
						<div>
							<p className='text-sm font-semibold uppercase tracking-[0.15em] text-[#789174]'>Ваш майбутній сад</p>
							<h2 className='mt-1 text-3xl font-semibold'>Моя збірка</h2>
						</div>
						<button type='button' onClick={() => setIsCartOpen(false)} className='flex h-12 w-12 items-center justify-center rounded-full bg-white'>
							<CloseIcon />
						</button>
					</div>

					{isOrderSent ? (
						<div className='flex flex-1 flex-col items-center justify-center px-8 text-center'>
							<div className='mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#173d19] text-[#fff3ad]'>
								<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='h-9 w-9'>
									<path d='m5 12 4 4L19 6' strokeLinecap='round' strokeLinejoin='round' />
								</svg>
							</div>
							<h3 className='text-3xl font-semibold'>Збірку сформовано</h3>
							<p className='mt-3 max-w-md leading-relaxed text-[#687668]'>
								Ми зв’яжемося з вами, уточнимо наявність, розміри рослин і фінальну вартість.
							</p>
							<button type='button' onClick={() => { clearCart(); setIsOrderSent(false); setIsCartOpen(false) }} className='mt-8 rounded-full bg-[#173d19] px-7 py-4 font-semibold text-white'>
								Повернутися до каталогу
							</button>
						</div>
					) : cartItems.length > 0 ? (
						<>
							<div className='catalog-slider flex-1 space-y-4 overflow-y-auto px-5 py-6 sm:px-8'>
								{cartItems.map((product) => (
									<article key={product.id} className='flex gap-4 rounded-[22px] bg-white p-3 sm:p-4'>
										<img src={product.image} alt='' className='h-24 w-20 shrink-0 rounded-[16px] object-cover sm:h-28 sm:w-24' />
										<div className='min-w-0 flex-1 py-1'>
											<div className='flex items-start justify-between gap-3'>
												<div>
													<p className='text-xs text-[#788478]'>{product.category}</p>
													<h3 className='mt-1 font-semibold sm:text-lg'>{product.name}</h3>
												</div>
												<button type='button' onClick={() => removeFromCart(product.id)} aria-label='Видалити' className='text-[#8b978a] hover:text-[#173d19]'>
													<CloseIcon />
												</button>
											</div>
											<div className='mt-4 flex items-center justify-between gap-3'>
												<div className='flex items-center rounded-full bg-[#edf3e9] p-1'>
													<button type='button' onClick={() => changeQuantity(product.id, cart[product.id] - 1)} className='h-8 w-8 rounded-full text-lg'>−</button>
													<span className='min-w-8 text-center text-sm font-semibold'>{cart[product.id]}</span>
													<button type='button' onClick={() => changeQuantity(product.id, cart[product.id] + 1)} className='h-8 w-8 rounded-full text-lg'>+</button>
												</div>
												<p className='font-bold text-[#2e5e27]'>{formatPrice(product.price * cart[product.id])}</p>
											</div>
										</div>
									</article>
								))}
							</div>

							<form onSubmit={handleOrder} className='border-t border-[#dfe6db] bg-white px-5 py-5 sm:px-8'>
								<div className='mb-4 flex items-end justify-between'>
									<div>
										<p className='text-sm text-[#788478]'>{cartCount} рослин у збірці</p>
										<p className='text-xs text-[#9aa499]'>Орієнтовна сума</p>
									</div>
									<p className='text-3xl font-bold'>{formatPrice(cartTotal)}</p>
								</div>
								<div className='grid gap-3 sm:grid-cols-2'>
									<input required name='name' placeholder='Ваше ім’я' className='rounded-2xl bg-[#f1f4ee] px-4 py-3.5 outline-none focus:ring-1 focus:ring-[#72966d]' />
									<input required name='phone' type='tel' placeholder='+38 0__ ___ __ __' className='rounded-2xl bg-[#f1f4ee] px-4 py-3.5 outline-none focus:ring-1 focus:ring-[#72966d]' />
								</div>
								<textarea name='comment' rows={2} placeholder='Коментар: розміри, дата, побажання' className='mt-3 w-full resize-none rounded-2xl bg-[#f1f4ee] px-4 py-3.5 outline-none focus:ring-1 focus:ring-[#72966d]' />
								<button type='submit' className='mt-3 flex w-full items-center justify-center gap-3 rounded-full bg-[#173d19] px-6 py-4 font-semibold text-white transition hover:bg-[#2e5e27]'>
									Сформувати заявку
									<ArrowIcon />
								</button>
							</form>
						</>
					) : (
						<div className='flex flex-1 flex-col items-center justify-center px-8 text-center'>
							<div className='mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#dfeeda] text-[#2e5e27]'><BagIcon /></div>
							<h3 className='text-3xl font-semibold'>Збірка порожня</h3>
							<p className='mt-3 max-w-sm leading-relaxed text-[#687668]'>Додавайте рослини — тут можна буде змінити кількість і залишити побажання.</p>
							<button type='button' onClick={() => setIsCartOpen(false)} className='mt-8 rounded-full bg-[#173d19] px-7 py-4 font-semibold text-white'>Обрати рослини</button>
						</div>
					)}
				</aside>
			</div>
		</div>
	)
}

export default CatalogPage
