import React, { useRef, useState } from 'react'

const reviews = [
	{ name: 'Олена', place: 'Київська область', text: 'Допомогли підібрати рослини для сонячної ділянки. Усе пояснили просто, без нав’язування. Гортензії прижилися чудово!', plant: 'Гортензії та лаванда' },
	{ name: 'Андрій', place: 'Біла Церква', text: 'Замовлення підготували до мого приїзду, забрав без очікування. Рослини міцні, коренева система хороша.', plant: 'Туї Smaragd' },
	{ name: 'Наталія', place: 'Фастів', text: 'Надіслала фото клумби й отримала кілька варіантів на різний бюджет. Дуже зручно, коли сама не знаєш назв.', plant: 'Спірея та хости' },
	{ name: 'Ірина', place: 'Васильків', text: 'Брала троянди навесні. Підказали, як посадити й чим підживити. Влітку вже гарно квітнули.', plant: 'Троянди флорибунда' },
	{ name: 'Максим', place: 'Обухів', text: 'Все чесно: показали, що є в наявності, скинули актуальні фото і зарезервували до вихідних.', plant: 'Ялівець і самшит' },
	{ name: 'Вікторія', place: 'Боярка', text: 'Сподобався особистий підхід. Порадили невибагливі рослини, бо я тільки починаю займатися садом.', plant: 'Лаванда та барбарис' },
	{ name: 'Сергій', place: 'Київ', text: 'Купував рослини для невеликої живої огорожі. Допомогли порахувати кількість і дали рекомендації щодо відстані.', plant: 'Самшит' },
	{ name: 'Тетяна', place: 'Гатне', text: 'Рослини виглядали навіть краще, ніж на фото. Окреме спасибі за детальні поради після покупки.', plant: 'Півонії' },
	{ name: 'Марина', place: 'Ірпінь', text: 'Шукала щось красиве для затіненої частини саду. Хости підійшли ідеально — уже дали нове листя.', plant: 'Хости Blue Angel' },
	{ name: 'Олексій', place: 'Буча', text: 'Швидко домовилися, швидко забрав. Без зайвої бюрократії, усе по-людськи.', plant: 'Хвойні рослини' },
	{ name: 'Людмила', place: 'Кагарлик', text: 'Дуже гарні саджанці й уважне ставлення. Допомогли обрати сорти, які добре почуватимуться на нашому ґрунті.', plant: 'Плодові рослини' },
	{ name: 'Дарина', place: 'Київська область', text: 'Хотіла додати кольору біля тераси. Підібрали чудове поєднання, результатом задоволена на всі сто.', plant: 'Барбарис і лаванда' },
	{ name: 'Юрій', place: 'Українка', text: 'Приємно, що можна отримати нормальну консультацію, а не просто купити горщик і далі розбиратися самому.', plant: 'Клематис' },
	{ name: 'Анна', place: 'Петропавлівська Борщагівка', text: 'Зарезервували останні потрібні мені рослини й зачекали до вечора. Усе добре перенесло дорогу.', plant: 'Декоративні кущі' },
	{ name: 'Світлана', place: 'Хотів', text: 'Повертаюся вже вдруге. Рослини здорові, ціни зрозумілі, завжди можна запитати пораду щодо догляду.', plant: 'Садові багаторічники' },
]

const ArrowIcon = ({ reverse = false }: { reverse?: boolean }) => (
	<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className={`h-5 w-5 ${reverse ? 'rotate-180' : ''}`}>
		<path d='M5 12h14M13 6l6 6-6 6' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
)

const Reviews: React.FC = () => {
	const sliderRef = useRef<HTMLDivElement>(null)
	const [canGoNext, setCanGoNext] = useState(true)

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
		<section className='bg-[#f4f1e8] py-24'>
			<div className='content_container'>
				<div className='mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between'>
					<div>
						<p className='mb-4 inline-flex rounded-full bg-white px-5 py-2 text-sm font-bold uppercase tracking-[0.18em] text-[#6f8d69]'>
							Відгуки покупців
						</p>
						<h2 className='max-w-3xl text-4xl font-semibold leading-tight text-[#173d19] md:text-6xl'>
							Рослини ростуть —
							<span className='block italic text-[#668562]'>довіра залишається</span>
						</h2>
					</div>
					<div className='flex items-center gap-3'>
						<button
							type='button'
							onClick={() => moveSlider(-1)}
							aria-label='Попередній відгук'
							className='flex h-14 w-14 items-center justify-center rounded-full border border-[#bdcbb8] text-[#2e5e27] transition hover:bg-white'
						>
							<ArrowIcon reverse />
						</button>
						<button
							type='button'
							onClick={() => moveSlider(1)}
							aria-label='Наступний відгук'
							className='flex h-14 w-14 items-center justify-center rounded-full bg-[#173d19] text-white transition hover:bg-[#2e5e27]'
						>
							<ArrowIcon />
						</button>
					</div>
				</div>

				<div
					ref={sliderRef}
					onScroll={handleScroll}
					className='reviews-slider flex snap-x snap-mandatory gap-6 overflow-x-auto pb-5'
				>
					{reviews.map((review, index) => (
						<article
							key={`${review.name}-${index}`}
							className='flex min-h-[360px] w-[88%] shrink-0 snap-start flex-col rounded-[28px] bg-white p-7 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] md:p-9'
						>
							<div className='mb-8 flex items-center justify-between'>
								<div className='flex gap-1 text-[#d6a92f]' aria-label='Оцінка 5 із 5'>
									{Array.from({ length: 5 }).map((_, star) => (
										<span key={star} aria-hidden='true'>★</span>
									))}
								</div>
								<span className='text-5xl font-serif leading-none text-[#dce8d7]'>“</span>
							</div>
							<p className='text-lg leading-relaxed text-[#425142]'>{review.text}</p>
							<div className='mt-auto border-t border-[#e5ebe2] pt-6'>
								<p className='mb-4 text-sm font-semibold text-[#6f8d69]'>{review.plant}</p>
								<div className='flex items-center gap-4'>
									<div className='flex h-12 w-12 items-center justify-center rounded-full bg-[#dfeeda] text-lg font-bold text-[#2e5e27]'>
										{review.name.charAt(0)}
									</div>
									<div>
										<p className='font-semibold text-[#173d19]'>{review.name}</p>
										<p className='text-sm text-[#7a8579]'>{review.place}</p>
									</div>
								</div>
							</div>
						</article>
					))}
				</div>

			</div>
		</section>
	)
}

export default Reviews
