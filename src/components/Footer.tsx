import React from 'react'

import logo from '../assets/logo.png'

const ArrowIcon = () => (
	<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='h-5 w-5'>
		<path d='M5 12h14M13 6l6 6-6 6' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
)

const Footer: React.FC = () => {
	const currentYear = new Date().getFullYear()

	return (
		<footer className='overflow-hidden bg-[#edf3e9] pt-16 text-[#173d19]'>
			<div className='content_container'>
				<div className='grid gap-12 border-b border-[#cbdac7] pb-14 md:grid-cols-2 xl:grid-cols-[1.4fr_0.7fr_0.9fr]'>
					<div>
						<a href='#top' className='inline-flex items-center gap-5'>
							<span className='flex h-20 w-20 items-center justify-center rounded-full bg-white p-2 shadow-[0_8px_24px_rgba(33,72,32,0.08)]'>
								<img src={logo} alt='Vilanda' className='h-full w-full object-contain' />
							</span>
							<span>
								<span className='block text-3xl font-semibold'>Vilanda</span>
								<span className='text-sm text-[#6b796a]'>Рослини для саду</span>
							</span>
						</a>
						<p className='mt-7 max-w-lg text-lg leading-relaxed text-[#5e6d5d]'>
							Допомагаємо обрати здорові рослини з наявного асортименту та ділимося простими
							порадами з посадки й догляду.
						</p>
					</div>

					<nav aria-label='Навігація у футері'>
						<p className='mb-5 text-sm font-bold uppercase tracking-[0.16em] text-[#7b9277]'>Навігація</p>
						<ul className='space-y-4 text-lg font-medium'>
							<li><a href='#catalog' className='transition hover:text-[#72966d]'>Каталог рослин</a></li>
							<li><a href='#delivery' className='transition hover:text-[#72966d]'>Як ми працюємо</a></li>
							<li><a href='#contacts' className='transition hover:text-[#72966d]'>Зворотний зв’язок</a></li>
						</ul>
					</nav>

					<div>
						<p className='mb-5 text-sm font-bold uppercase tracking-[0.16em] text-[#7b9277]'>Контакти</p>
						<a href='tel:+380679017962' className='text-xl font-semibold transition hover:text-[#72966d]'>
							+38 067 901 79 62
						</a>
						<p className='mt-3 leading-relaxed text-[#687668]'>
							Щодня з 09:00 до 19:00
							<br />
							Самовивіз за домовленістю
						</p>
						<a
							href='#contacts'
							className='mt-6 inline-flex items-center gap-3 rounded-full bg-[#173d19] px-6 py-3.5 font-semibold text-white transition hover:bg-[#2e5e27]'
						>
							Написати нам
							<ArrowIcon />
						</a>
					</div>
				</div>

				<div className='flex flex-col gap-4 py-7 text-sm text-[#758274] md:flex-row md:items-center md:justify-between'>
					<p>© {currentYear} Vilanda. Усі права захищені.</p>
					<p>Вирощено з турботою про ваш сад</p>
				</div>

				<div aria-hidden='true' className='select-none overflow-hidden'>
					<p className='translate-y-[18%] whitespace-nowrap text-center text-[20vw] font-bold uppercase leading-[0.72] tracking-[-0.07em] text-[#d6e4d1]'>
						Vilanda
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
