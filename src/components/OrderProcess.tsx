import React from 'react'

const benefits = [
	{
		title: 'Допоможемо з вибором',
		description:
			'Розкажіть, де плануєте висадити рослину — порадимо варіанти під ваші умови та бюджет.',
		icon: (
			<svg className='h-full w-full' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8'>
				<path
					d='M12 21v-8m0 0c0-4.5 2.5-7 7-7 0 4.5-2.5 7-7 7Zm0 3c0-4-2.3-6-6-6 0 4 2.3 6 6 6Z'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
		),
	},
	{
		title: 'Зручний самовивіз',
		description:
			'Заздалегідь підготуємо замовлення та домовимося про час, щоб вам не довелося чекати.',
		icon: (
			<svg className='h-full w-full' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8'>
				<path
					d='M4 10h16M6 10v9h12v-9M5 10l1.5-5h11L19 10M9 5v5m6-5v5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
		),
	},
]

const steps = [
	{
		number: '01',
		title: 'Напишіть або зателефонуйте',
		description: 'Розкажіть, які рослини шукаєте, або надішліть фото місця для озеленення.',
	},
	{
		number: '02',
		title: 'Підберемо з наявного',
		description: 'Покажемо актуальні варіанти, підкажемо особливості та допоможемо визначитися.',
	},
	{
		number: '03',
		title: 'Зарезервуємо рослини',
		description: 'Відкладемо обрані позиції та підготуємо їх до узгодженого часу.',
	},
	{
		number: '04',
		title: 'Заберіть замовлення',
		description: 'Передамо рослини й розповімо, як правильно висадити та доглядати за ними.',
	},
]

const ArrowIcon = () => (
	<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='h-5 w-5'>
		<path d='M5 12h14M13 6l6 6-6 6' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
)

const OrderProcess: React.FC = () => {
	return (
		<section id='delivery' className='overflow-hidden bg-[#173d19] py-24 text-white'>
			<div className='content_container'>
				<div className='relative mb-14 border-b border-white/15 pb-14 text-center'>
					<span className='mb-6 inline-flex rounded-full border border-[#fff3ad]/40 bg-[#fff3ad]/10 px-5 py-2 text-sm font-bold uppercase tracking-[0.18em] text-[#fff3ad]'>
						Як це працює
					</span>
					<h2 className='mx-auto max-w-4xl text-4xl font-semibold leading-tight md:text-6xl'>
						Чотири прості кроки
						<span className='block font-normal italic text-[#cfe3c8]'>до рослин у вашому саду</span>
					</h2>
					<p className='mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/65'>
						Без складних форм і довгого оформлення. Особисто допоможемо обрати рослини з того, що є
						в наявності.
					</p>
				</div>

				<div className='mb-6 grid gap-4 lg:grid-cols-2'>
					{benefits.map((benefit, index) => (
						<article
							key={benefit.title}
							className={`relative flex min-h-[200px] items-start gap-6 overflow-hidden rounded-[28px] p-7 md:p-9 ${
								index === 0
									? 'bg-[#dfeeda] text-[#173d19]'
									: 'border border-white/15 bg-white/5 text-white'
							}`}
						>
							<div
								className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
									index === 0
										? 'bg-white/60 text-[#2e5e27]'
										: 'bg-[#fff3ad] text-[#173d19]'
								}`}
							>
								<div className='h-7 w-7 shrink-0'>{benefit.icon}</div>
							</div>
							<div>
								<h3 className='mb-3 text-2xl font-semibold'>{benefit.title}</h3>
								<p
									className={`max-w-xl leading-relaxed ${
										index === 0 ? 'text-[#536653]' : 'text-white/65'
									}`}
								>
									{benefit.description}
								</p>
							</div>
						</article>
					))}
				</div>

				<div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
					{steps.map((step, index) => (
						<article
							key={step.number}
							className='group relative flex min-h-[310px] flex-col overflow-hidden rounded-[26px] bg-[#f7f8f3] p-7 text-[#173d19] transition duration-300 hover:-translate-y-1 hover:bg-white'
						>
							<span className='absolute -right-2 -top-8 text-[112px] font-bold leading-none text-[#e4ebdf] transition duration-300 group-hover:text-[#dce8d6]'>
								{step.number}
							</span>
							<div className='relative mb-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#173d19] text-sm font-bold text-[#fff3ad]'>
								{index + 1}
							</div>
							<h3 className='relative mb-3 mt-14 text-xl font-semibold'>{step.title}</h3>
							<p className='leading-relaxed text-[#687368]'>{step.description}</p>
							{index < steps.length - 1 && (
								<div className='mt-6 hidden justify-end xl:flex'>
									<span className='text-[#8da588] transition group-hover:translate-x-1 group-hover:text-[#2e5e27]'>
										<ArrowIcon />
									</span>
								</div>
							)}
						</article>
					))}
				</div>

				<div className='mt-6 flex flex-col items-center justify-between gap-6 rounded-[26px] border border-[#fff3ad]/30 bg-[#fff3ad] p-7 text-center text-[#173d19] md:flex-row md:p-9 md:text-left'>
					<div>
						<p className='mb-1 text-xl font-semibold'>Не знаєте назву рослини?</p>
						<p className='text-[#536653]'>
							Надішліть фото — спробуємо знайти схожий варіант серед наявних.
						</p>
					</div>
					<a
						href='tel:+380679017962'
						className='inline-flex min-w-fit items-center justify-center gap-3 rounded-full bg-[#173d19] px-7 py-4 font-semibold text-white transition hover:bg-[#2e5e27]'
					>
						Зв’язатися з нами
						<ArrowIcon />
					</a>
				</div>
			</div>
		</section>
	)
}

export default OrderProcess
