import { useState } from 'react'

import logo from '../assets/logo.png'
import { useShop } from '../context/ShopContext'
import { formatPrice } from '../data/products'
import { useProducts } from '../hooks/useProducts'
import { BagIcon, HeartIcon } from './ShopIcons'

const ArrowIcon = ({ reverse = false }: { reverse?: boolean }) => (
	<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className={`h-5 w-5 ${reverse ? 'rotate-180' : ''}`}>
		<path d='M5 12h14M13 6l6 6-6 6' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
)

const ProductPage = ({ productId }: { productId: number }) => {
	const { products, isLoading } = useProducts()
	const product = products.find((item) => item.id === productId)
	const { cart, favorites, cartCount, changeQuantity, toggleFavorite } = useShop()
	const [quantity, setQuantity] = useState(1)

	if (isLoading && !product) {
		return (
			<div className='flex min-h-screen flex-col items-center justify-center bg-[#f7f8f3] px-5 text-center text-[#173d19]'>
				<p className='text-sm font-bold uppercase tracking-[0.18em] text-[#789174]'>Vilanda</p>
				<h1 className='mt-4 text-4xl font-semibold'>Завантажуємо рослину...</h1>
			</div>
		)
	}

	if (!product) {
		return (
			<div className='flex min-h-screen flex-col items-center justify-center bg-[#f7f8f3] px-5 text-center text-[#173d19]'>
				<p className='text-sm font-bold uppercase tracking-[0.18em] text-[#789174]'>Vilanda</p>
				<h1 className='mt-4 text-4xl font-semibold'>Рослину не знайдено</h1>
				<a href='/catalog' className='mt-8 rounded-full bg-[#173d19] px-7 py-4 font-semibold text-white'>Повернутися до каталогу</a>
			</div>
		)
	}

	const isFavorite = favorites.includes(product.id)
	const inCart = cart[product.id] ?? 0
	const relatedProducts = products
		.filter((item) => item.id !== product.id && item.category === product.category)
		.concat(products.filter((item) => item.id !== product.id && item.category !== product.category))
		.slice(0, 3)

	const addSelectedQuantity = () => {
		changeQuantity(product.id, inCart + quantity)
	}

	return (
		<div className='min-h-screen bg-[#f7f8f3] text-[#173d19]'>
			<header className='sticky top-0 z-40 border-b border-[#dfe6db] bg-[#f7f8f3]/90 backdrop-blur-xl'>
				<div className='content_container flex h-24 items-center justify-between gap-4'>
					<a href='/' className='flex items-center gap-3'>
						<span className='flex h-14 w-14 items-center justify-center rounded-full bg-white p-1.5 shadow-[0_8px_24px_rgba(33,72,32,0.08)]'>
							<img src={logo} alt='Vilanda' className='h-full w-full object-contain' />
						</span>
						<span className='hidden sm:block'>
							<span className='block text-xl font-semibold'>Vilanda</span>
							<span className='text-xs text-[#6b796a]'>Рослини для саду</span>
						</span>
					</a>
					<div className='flex items-center gap-2 sm:gap-3'>
						<a href='/catalog' className='hidden rounded-full px-5 py-3 text-sm font-semibold transition hover:bg-white sm:block'>Каталог</a>
						<a href='/catalog' className='flex h-12 items-center gap-2 rounded-full bg-[#173d19] px-4 font-semibold text-white sm:px-5'>
							<BagIcon />
							<span className='hidden sm:inline'>Моя збірка</span>
							{cartCount > 0 && <span className='flex h-6 min-w-6 items-center justify-center rounded-full bg-[#fff3ad] px-1.5 text-xs font-bold text-[#173d19]'>{cartCount}</span>}
						</a>
					</div>
				</div>
			</header>

			<main>
				<section className='py-7 md:py-12'>
					<div className='content_container'>
						<nav className='mb-7 flex items-center gap-2 text-sm text-[#7b877a]' aria-label='Хлібні крихти'>
							<a href='/catalog' className='transition hover:text-[#173d19]'>Каталог</a>
							<span>/</span>
							<span>{product.category}</span>
						</nav>

						<div className='grid gap-8 lg:grid-cols-[1.05fr_0.95fr] xl:gap-14'>
							<div className='relative min-h-[480px] overflow-hidden rounded-[32px] bg-[#e4ebe1] lg:min-h-[680px]'>
								<img src={product.image} alt={product.name} className='absolute inset-0 h-full w-full object-cover' />
								{product.badge && <span className={`absolute left-5 top-5 rounded-full px-4 py-2 text-sm font-semibold ${product.badgeClass}`}>{product.badge}</span>}
								<button
									type='button'
									onClick={() => toggleFavorite(product.id)}
									aria-label={isFavorite ? 'Прибрати з обраного' : 'Додати в обране'}
									className={`absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full shadow-sm transition ${
										isFavorite ? 'bg-[#fff3ad]' : 'bg-white/90 hover:bg-white'
									}`}
								>
									<HeartIcon filled={isFavorite} />
								</button>
							</div>

							<div className='flex flex-col lg:py-4'>
								<p className='text-sm font-bold uppercase tracking-[0.16em] text-[#789174]'>{product.category}</p>
								<h1 className='mt-4 text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl'>{product.name}</h1>
								<p className='mt-5 max-w-xl text-lg leading-relaxed text-[#647064]'>{product.description}</p>

								<div className='mt-8 grid grid-cols-2 gap-3'>
									<div className='rounded-[22px] bg-white p-5'>
										<p className='text-xs font-bold uppercase tracking-[0.12em] text-[#899487]'>Освітлення</p>
										<p className='mt-2 text-lg font-semibold'>{product.light}</p>
									</div>
									<div className='rounded-[22px] bg-white p-5'>
										<p className='text-xs font-bold uppercase tracking-[0.12em] text-[#899487]'>Зимостійкість</p>
										<p className='mt-2 text-lg font-semibold'>Висока</p>
									</div>
									<div className='rounded-[22px] bg-white p-5'>
										<p className='text-xs font-bold uppercase tracking-[0.12em] text-[#899487]'>Контейнер</p>
										<p className='mt-2 text-lg font-semibold'>C3–C5</p>
									</div>
									<div className='rounded-[22px] bg-white p-5'>
										<p className='text-xs font-bold uppercase tracking-[0.12em] text-[#899487]'>Стан</p>
										<p className='mt-2 text-lg font-semibold text-[#2e5e27]'>У наявності</p>
									</div>
								</div>

								<div className='mt-auto pt-9'>
									<div className='flex items-end justify-between gap-5 border-t border-[#dbe3d7] pt-7'>
										<div>
											<p className='text-sm text-[#788478]'>ціна від</p>
											<p className='mt-1 text-4xl font-bold text-[#2e5e27]'>{formatPrice(product.price)}</p>
										</div>
										<div className='flex items-center rounded-full bg-white p-1.5'>
											<button type='button' onClick={() => setQuantity((current) => Math.max(1, current - 1))} className='flex h-10 w-10 items-center justify-center rounded-full text-xl transition hover:bg-[#edf3e9]'>−</button>
											<span className='min-w-10 text-center font-semibold'>{quantity}</span>
											<button type='button' onClick={() => setQuantity((current) => current + 1)} className='flex h-10 w-10 items-center justify-center rounded-full text-xl transition hover:bg-[#edf3e9]'>+</button>
										</div>
									</div>
									<button type='button' onClick={addSelectedQuantity} className='mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-[#173d19] px-7 py-5 text-lg font-semibold text-white transition hover:bg-[#2e5e27]'>
										<BagIcon />
										{inCart ? `Додати ще · у збірці ${inCart}` : 'Додати до збірки'}
									</button>
									<p className='mt-4 text-center text-sm leading-relaxed text-[#7b877a]'>Фінальну ціну та розмір рослини підтвердимо перед замовленням.</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className='bg-[#173d19] py-16 text-white md:py-20'>
					<div className='content_container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20'>
						<div>
							<p className='text-sm font-bold uppercase tracking-[0.18em] text-[#fff3ad]'>Про рослину</p>
							<h2 className='mt-4 text-4xl font-semibold leading-tight md:text-5xl'>Добре приживається.<br /><span className='font-normal italic text-[#cfe3c8]'>Легко доглядати.</span></h2>
						</div>
						<div className='grid gap-px overflow-hidden rounded-[28px] bg-white/15 sm:grid-cols-3'>
							{[
								['Посадка', 'Підготуйте яму вдвічі ширшу за контейнер і добре пролийте після посадки.'],
								['Полив', 'У перший сезон підтримуйте помірну вологість ґрунту без застою води.'],
								['Порада', 'Замульчуйте пристовбурне коло — це збереже вологу та захистить коріння.'],
							].map(([title, text]) => (
								<article key={title} className='bg-[#214a23] p-6 md:p-8'>
									<p className='font-semibold text-[#fff3ad]'>{title}</p>
									<p className='mt-4 leading-relaxed text-white/65'>{text}</p>
								</article>
							))}
						</div>
					</div>
				</section>

				<section className='py-16 md:py-24'>
					<div className='content_container'>
						<div className='mb-9 flex items-end justify-between gap-6'>
							<div>
								<p className='text-sm font-bold uppercase tracking-[0.16em] text-[#789174]'>Може сподобатися</p>
								<h2 className='mt-3 text-3xl font-semibold md:text-5xl'>Ще кілька рослин</h2>
							</div>
							<a href='/catalog' className='hidden items-center gap-3 font-semibold text-[#2e5e27] sm:flex'>Весь каталог <ArrowIcon /></a>
						</div>
						<div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
							{relatedProducts.map((item) => (
								<a key={item.id} href={`/product/${item.id}`} className='group overflow-hidden rounded-[26px] bg-white'>
									<div className='h-64 overflow-hidden bg-[#e7eee3]'>
										<img src={item.image} alt={item.name} loading='lazy' className='h-full w-full object-cover transition duration-500 group-hover:scale-105' />
									</div>
									<div className='flex items-center justify-between gap-4 p-5'>
										<div>
											<p className='text-xs text-[#788478]'>{item.category}</p>
											<h3 className='mt-1 text-lg font-semibold'>{item.name}</h3>
										</div>
										<span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#edf3e9] text-[#2e5e27] transition group-hover:bg-[#173d19] group-hover:text-white'><ArrowIcon /></span>
									</div>
								</a>
							))}
						</div>
					</div>
				</section>
			</main>

			<footer className='border-t border-[#dfe6db] py-8'>
				<div className='content_container flex items-center justify-between gap-5 text-sm text-[#758274]'>
					<a href='/catalog' className='flex items-center gap-2 font-semibold text-[#173d19]'><ArrowIcon reverse /> Назад до каталогу</a>
					<p>© {new Date().getFullYear()} Vilanda</p>
				</div>
			</footer>
		</div>
	)
}

export default ProductPage
