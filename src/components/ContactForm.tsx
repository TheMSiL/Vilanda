import React, { useState } from 'react'
import type { FormEvent } from 'react'

const ArrowIcon = () => (
	<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='h-5 w-5'>
		<path d='M5 12h14M13 6l6 6-6 6' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
)

const ContactForm: React.FC = () => {
	const [isSent, setIsSent] = useState(false)

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setIsSent(true)
		event.currentTarget.reset()
	}

	return (
		<section id='contacts' className='bg-white py-24'>
			<div className='content_container'>
				<div className='overflow-hidden rounded-[36px] bg-[#dfeeda] lg:grid lg:grid-cols-[0.9fr_1.1fr]'>
					<div className='relative flex min-h-[520px] flex-col justify-between overflow-hidden bg-[#173d19] p-8 text-white md:p-12 lg:p-14'>
						<div className='absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10' />
						<div className='absolute -right-10 -top-10 h-52 w-52 rounded-full border border-[#fff3ad]/20' />

						<div className='relative'>
							<p className='mb-5 text-sm font-bold uppercase tracking-[0.18em] text-[#fff3ad]'>
								Залишайтеся на зв’язку
							</p>
							<h2 className='max-w-xl text-4xl font-semibold leading-tight md:text-6xl'>
								Є запитання?
								<span className='block font-normal italic text-[#cfe3c8]'>Напишіть нам</span>
							</h2>
							<p className='mt-6 max-w-lg text-lg leading-relaxed text-white/65'>
								Підкажемо щодо наявності, догляду або вибору рослин. Залиште контакти — зв’яжемося з
								вами найближчим часом.
							</p>
						</div>

						<div className='relative mt-12 space-y-5'>
							<a href='tel:+380679017962' className='group flex items-center gap-4'>
								<span className='flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[#fff3ad]'>
									<svg className='h-5 w-5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8'>
										<path d='M7 4H4.5A1.5 1.5 0 0 0 3 5.5C3 14.06 9.94 21 18.5 21a1.5 1.5 0 0 0 1.5-1.5V17l-4-1-1.1 2.2a13.2 13.2 0 0 1-9.1-9.1L8 8l-1-4Z' strokeLinecap='round' strokeLinejoin='round' />
									</svg>
								</span>
								<div>
									<p className='text-sm text-white/50'>Телефон</p>
									<p className='text-lg font-semibold transition group-hover:text-[#fff3ad]'>+38 067 901 79 62</p>
								</div>
							</a>
							<p className='pl-16 text-sm leading-relaxed text-white/45'>
								Відповідаємо щодня з 09:00 до 19:00
							</p>
						</div>
					</div>

					<div className='p-8 md:p-12 lg:p-14'>
						{isSent ? (
							<div className='flex h-full min-h-[440px] flex-col items-center justify-center text-center'>
								<div className='mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#173d19] text-[#fff3ad]'>
									<svg className='h-9 w-9' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
										<path d='m5 12 4 4L19 6' strokeLinecap='round' strokeLinejoin='round' />
									</svg>
								</div>
								<h3 className='mb-3 text-3xl font-semibold text-[#173d19]'>Дякуємо за повідомлення!</h3>
								<p className='max-w-md text-lg leading-relaxed text-[#60705e]'>
									Форму заповнено. Після підключення сервера повідомлення надходитимуть власнику сайту.
								</p>
								<button
									type='button'
									onClick={() => setIsSent(false)}
									className='mt-8 rounded-full border border-[#9eb398] px-6 py-3 font-semibold text-[#2e5e27] transition hover:bg-white'
								>
									Надіслати ще одне
								</button>
							</div>
						) : (
							<form onSubmit={handleSubmit}>
								<div className='mb-10'>
									<p className='mb-2 text-sm font-bold uppercase tracking-[0.16em] text-[#6f8d69]'>
										Форма зворотного зв’язку
									</p>
									<h3 className='text-3xl font-semibold text-[#173d19]'>Як із вами зв’язатися?</h3>
								</div>

								<div className='grid gap-6 sm:grid-cols-2'>
									<label className='block'>
										<span className='mb-2 block text-sm font-semibold text-[#425142]'>Ваше ім’я</span>
										<input
											type='text'
											name='name'
											required
											placeholder='Наприклад, Олена'
											className='w-full rounded-2xl border border-transparent bg-white px-5 py-4 text-[#173d19] outline-none transition placeholder:text-[#98a397] focus:border-[#72966d]'
										/>
									</label>
									<label className='block'>
										<span className='mb-2 block text-sm font-semibold text-[#425142]'>Номер телефону</span>
										<input
											type='tel'
											name='phone'
											required
											placeholder='+38 0__ ___ __ __'
											className='w-full rounded-2xl border border-transparent bg-white px-5 py-4 text-[#173d19] outline-none transition placeholder:text-[#98a397] focus:border-[#72966d]'
										/>
									</label>
								</div>

								<fieldset className='mt-6'>
									<legend className='mb-3 text-sm font-semibold text-[#425142]'>Зручний спосіб зв’язку</legend>
									<div className='flex flex-wrap gap-3'>
										{['Телефон', 'Viber', 'Telegram'].map((method, index) => (
											<label key={method} className='cursor-pointer'>
												<input
													type='radio'
													name='contactMethod'
													value={method}
													defaultChecked={index === 0}
													className='peer sr-only'
												/>
												<span className='inline-flex rounded-full border border-[#b9cbb4] px-5 py-2.5 text-sm font-semibold text-[#536653] transition peer-checked:border-[#173d19] peer-checked:bg-[#173d19] peer-checked:text-white'>
													{method}
												</span>
											</label>
										))}
									</div>
								</fieldset>

								<label className='mt-6 block'>
									<span className='mb-2 block text-sm font-semibold text-[#425142]'>Ваше повідомлення</span>
									<textarea
										name='message'
										rows={5}
										placeholder='Напишіть, що вас цікавить'
										className='w-full resize-none rounded-2xl border border-transparent bg-white px-5 py-4 text-[#173d19] outline-none transition placeholder:text-[#98a397] focus:border-[#72966d]'
									/>
								</label>

								<button
									type='submit'
									className='mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-[#2e5e27] px-7 py-5 text-lg font-semibold text-white transition hover:bg-[#173d19]'
								>
										Надіслати <span className='sm:block hidden'>повідомлення</span>
									<ArrowIcon />
								</button>
								<p className='mt-4 text-center text-xs leading-relaxed text-[#738071]'>
									Натискаючи кнопку, ви погоджуєтесь на обробку контактних даних.
								</p>
							</form>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}

export default ContactForm
