import React, { useState } from 'react'

import logo from '../assets/logo.png'
import TelSvg from '../assets/svg/TelSvg'

const navigation = [
	{ label: 'Каталог', href: '#catalog' },
	{ label: 'Як ми працюємо', href: '#delivery' },
	{ label: 'Контакти', href: '#contacts' },
]

const Header: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const closeMenu = () => setIsMenuOpen(false)

	return (
		<header className='relative z-30 pt-4 sm:pt-5'>
			<div className='content_container'>
				<div className='flex items-center justify-between rounded-full border border-white/20 bg-black/10 px-3 py-3 backdrop-blur-md sm:px-4 lg:bg-black/5 lg:py-2'>
					<a
						href='#top'
						aria-label='Vilanda — на початок сторінки'
						className='flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white p-2 shadow-[0_8px_24px_rgba(0,0,0,0.08)] sm:h-20 sm:w-20 lg:h-[78px] lg:w-[78px]'
					>
						<img src={logo} alt='Vilanda' className='h-full w-full object-contain' />
					</a>

					<nav className='hidden flex-1 lg:block' aria-label='Основна навігація'>
						<ul className='flex items-center justify-center gap-8 xl:gap-12'>
							{navigation.map((item) => (
								<li key={item.href}>
									<a
										href={item.href}
										className='text-base font-semibold uppercase tracking-wide text-white transition hover:text-[#fff3ad] xl:text-lg'
									>
										{item.label}
									</a>
								</li>
							))}
						</ul>
					</nav>

					<div className='flex items-center gap-2 sm:gap-3'>
						<a
							href='tel:+380679017962'
							aria-label='Зателефонувати'
							className='flex h-12 w-12 items-center justify-center rounded-full border-2 border-white text-white transition hover:border-[#fff3ad] hover:text-[#fff3ad] sm:h-14 sm:w-14'
						>
							<TelSvg />
						</a>
						<a
							href='#contacts'
							className='hidden h-14 items-center justify-center rounded-full border-2 border-white px-6 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-[#fff3ad] hover:text-[#fff3ad] sm:flex lg:h-12 lg:px-6'
						>
							Написати
						</a>
						<button
							type='button'
							onClick={() => setIsMenuOpen((open) => !open)}
							aria-expanded={isMenuOpen}
							aria-controls='mobile-navigation'
							aria-label={isMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
							className='relative flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#173d19] lg:hidden'
						>
							<span className='relative block h-4 w-5'>
								<span
									className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition duration-300 ${
										isMenuOpen ? 'translate-y-[7px] rotate-45' : ''
									}`}
								/>
								<span
									className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition duration-300 ${
										isMenuOpen ? 'opacity-0' : ''
									}`}
								/>
								<span
									className={`absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-current transition duration-300 ${
										isMenuOpen ? '-translate-y-[7px] -rotate-45' : ''
									}`}
								/>
							</span>
						</button>
					</div>
				</div>

				<div
					id='mobile-navigation'
					className={`absolute left-[7.5%] right-[7.5%] top-[calc(100%+12px)] origin-top rounded-[26px] bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition duration-300 lg:hidden ${
						isMenuOpen
							? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
							: 'pointer-events-none -translate-y-3 scale-95 opacity-0'
					}`}
				>
					<nav aria-label='Мобільна навігація'>
						<ul>
							{navigation.map((item) => (
								<li key={item.href} className='border-b border-[#e4ebe1] last:border-0'>
									<a
										href={item.href}
										onClick={closeMenu}
										className='flex items-center justify-between py-4 text-lg font-semibold text-[#173d19]'
									>
										{item.label}
										<span aria-hidden='true'>↗</span>
									</a>
								</li>
							))}
						</ul>
					</nav>
					<a
						href='tel:+380679017962'
						onClick={closeMenu}
						className='mt-4 flex items-center justify-center rounded-full bg-[#2e5e27] px-6 py-4 font-semibold text-white'
					>
						+38 067 901 79 62
					</a>
				</div>
			</div>
		</header>
	)
}

export default Header
