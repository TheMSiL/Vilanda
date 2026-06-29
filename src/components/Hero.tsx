import React from 'react'

import Header from './Header'

const heroItems = [
	{ title: '200+', description: 'видів рослин' },
	{ title: '7+', description: 'років досвіду' },
	{ title: '150+', description: 'задоволених клієнтів' },
]

const ArrowIcon = () => (
	<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='h-5 w-5 sm:h-6 sm:w-6'>
		<path d='M5 12h14M13 6l6 6-6 6' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
)

const Hero: React.FC = () => {
	return (
		<section id='top' className='hero flex min-h-[760px] flex-col'>
			<Header />

			<div className='content_container flex flex-1 flex-col justify-between pb-10 pt-20 sm:pb-12 sm:pt-14 lg:justify-center lg:pb-10 lg:pt-12 xl:pt-16'>
				<div>
					<h1 className='max-w-[1380px] text-[clamp(3rem,6.3vw,7rem)] font-medium italic leading-[0.94] tracking-[-0.045em] text-white'>
						Підберіть <span className='text-[#fff3ad]'>ідеальні рослини</span> для вашого саду
					</h1>
					<p className='mt-8 max-w-2xl text-base leading-relaxed text-white/80 sm:text-xl lg:mt-9 lg:text-xl xl:text-2xl'>
						Допоможемо обрати здорові рослини з наявного асортименту та підкажемо, як правильно
						висадити й доглядати за ними.
					</p>
					<a
						href='#catalog'
						className='mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-[#2e5e27] px-7 py-5 text-base font-semibold text-white shadow-btn transition hover:bg-[#fff3ad] hover:text-[#2e5e27] sm:mt-8 sm:w-fit sm:min-w-[320px] sm:px-9 sm:text-xl lg:min-w-[360px]'
					>
						Обрати рослини
						<ArrowIcon />
					</a>
				</div>

				<div className='mt-8 lg:mt-10 lg:flex lg:justify-end'>
					<div className='grid w-full grid-cols-3 gap-2 overflow-hidden rounded-[24px] border border-white/20 bg-white/90 p-2 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-md sm:gap-0 sm:rounded-[30px] sm:p-0 lg:max-w-[720px] xl:max-w-[790px]'>
						{heroItems.map((item, index) => (
							<div
								key={item.title}
								className='relative min-w-0 rounded-[18px] p-3 text-[#164612] sm:rounded-none sm:px-6 sm:py-7 lg:px-7 xl:px-9'
							>
								{index < heroItems.length - 1 && (
									<span className='absolute bottom-[22%] right-0 top-[22%] hidden w-px bg-[#cad8c6] sm:block' />
								)}
								<p className='mb-1 text-2xl font-bold sm:mb-2 sm:text-4xl xl:text-5xl'>{item.title}</p>
								<p className='text-xs leading-snug text-[#536653] sm:text-sm xl:text-base'>{item.description}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero
