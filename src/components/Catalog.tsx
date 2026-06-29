import React, { useRef, useState } from 'react'

import { formatPrice } from '../data/products'
import { useProducts } from '../hooks/useProducts'

const categories = [
	'Кімнатні рослини',
	'Садові рослини',
	'Декоративні кущі',
	'Хвойні рослини',
	'Плодові рослини',
	'Сезонні рослини',
]

const ArrowIcon = ({ reverse = false }: { reverse?: boolean }) => (
	<svg
		aria-hidden='true'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		className={`h-5 w-5 ${reverse ? 'rotate-180' : ''}`}
	>
		<path d='M5 12h14M13 6l6 6-6 6' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
)

const Catalog: React.FC = () => {
	const sliderRef = useRef<HTMLDivElement>(null)
	const [canGoNext, setCanGoNext] = useState(true)
	const { products } = useProducts()

	const moveSlider = (direction: -1 | 1) => {
		const slider = sliderRef.current
		const card = slider?.children[0] as HTMLElement | undefined
		if (!slider || !card) return

		const gap = 24
		const maxScroll = slider.scrollWidth - slider.clientWidth

		if (direction === 1 && !canGoNext) {
			slider.scrollTo({ left: 0, behavior: 'smooth' })
			return
		}

		if (direction === -1 && slider.scrollLeft <= 2) {
			slider.scrollTo({ left: maxScroll, behavior: 'smooth' })
			return
		}

		slider.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: 'smooth' })
	}

	const handleScroll = () => {
		const slider = sliderRef.current
		if (!slider) return

		const maxScroll = slider.scrollWidth - slider.clientWidth
		setCanGoNext(slider.scrollLeft < maxScroll - 2)
	}

	return (
		<section id='catalog'>
			<div className='mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
				<div>
					<p className='mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#6f8d69]'>
						Обирають найчастіше
					</p>
					<h2 className='max-w-3xl text-4xl font-semibold leading-tight text-[#173d19] md:text-6xl'>
						Популярні рослини для вашого простору
					</h2>
				</div>
				<div className='flex flex-col items-start gap-6 lg:items-end'>
					<p className='max-w-lg text-lg leading-relaxed text-[#647064]'>
						Добірка рослин, які мають найбільший попит цього сезону.
					</p>
					<div className='flex gap-3'>
						<button
							type='button'
							onClick={() => moveSlider(-1)}
							aria-label='Попередні товари'
							className='flex h-12 w-12 items-center justify-center rounded-full border border-[#cbdac7] text-[#2e5e27] transition hover:bg-[#edf3e9]'
						>
							<ArrowIcon reverse />
						</button>
						<button
							type='button'
							onClick={() => moveSlider(1)}
							aria-label='Наступні товари'
							className='flex h-12 w-12 items-center justify-center rounded-full bg-[#2e5e27] text-white transition hover:bg-[#173d19]'
						>
							<ArrowIcon />
						</button>
					</div>
				</div>
			</div>

			<div
				ref={sliderRef}
				onScroll={handleScroll}
				className='catalog-slider flex snap-x snap-mandatory gap-6 overflow-x-auto pb-5'
			>
				{products.map((product) => (
					<a
						key={product.id}
						href={`/product/${product.id}`}
						aria-label={`Переглянути ${product.name}`}
						className='group w-[82%] shrink-0 snap-start overflow-hidden rounded-[28px] border border-[#e2e9df] bg-white shadow-[0_12px_40px_rgba(33,72,32,0.08)] sm:w-[calc(50%-12px)] xl:w-[calc(25%-18px)]'
					>
						<div className='relative h-[275px] sm:h-[340px] overflow-hidden bg-[#e7eee3]'>
							<img
								src={product.image}
								alt={product.name}
								loading='lazy'
								className='h-full w-full object-cover transition duration-500 group-hover:scale-105'
							/>
							{product.badge && (
								<span className={`absolute left-5 top-5 rounded-full px-4 py-2 text-sm font-semibold ${product.badgeClass ?? ''}`}>
									{product.badge}
								</span>
							)}
						</div>
						<div className='p-6'>
							<p className='mb-2 text-sm font-medium text-[#788478]'>{product.category}</p>
							<h3 className='mb-6 min-h-[64px] text-2xl font-semibold text-[#173d19]'>{product.name}</h3>
							<div className='flex items-center justify-between gap-4'>
								<p className='text-xl font-bold text-[#2e5e27]'>від {formatPrice(product.price)}</p>
								<span
									aria-hidden='true'
									className='flex h-12 w-12 items-center justify-center rounded-full bg-[#2e5e27] text-white transition hover:bg-[#fff3ad] hover:text-[#2e5e27]'
								>
									<ArrowIcon />
								</span>
							</div>
						</div>
					</a>
				))}
			</div>

			<div className='mt-10 rounded-[30px] bg-[#edf3e9] p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8'>
				<div>
					<p className='mb-2 text-xl font-semibold text-[#173d19]'>У каталозі також знайдете:</p>
					<ul className='flex flex-wrap gap-x-5 gap-y-2 text-[#657364]'>
						{categories.map((category) => (
							<li key={category} className='flex items-center gap-2'>
								<span className='h-1.5 w-1.5 rounded-full bg-[#72966d]' />
								{category}
							</li>
						))}
					</ul>
				</div>
				<a
					href='/catalog'
					className='mt-6 flex min-w-fit items-center duration-300 transition-all justify-center gap-3 rounded-full bg-[#2e5e27] px-8 py-5 sm:text-lg font-semibold text-white shadow-btn hover:bg-[#fff3ad] hover:text-[#2e5e27] md:mt-0'
				>
					 Весь каталог
					<ArrowIcon />
				</a>
			</div>
		</section>
	)
}

export default Catalog
