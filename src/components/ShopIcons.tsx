export const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
	<svg viewBox='0 0 24 24' fill={filled ? 'currentColor' : 'none'} stroke='currentColor' strokeWidth='1.8' className='h-5 w-5'>
		<path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
)

export const BagIcon = () => (
	<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' className='h-5 w-5'>
		<path d='M6 8h12l1 12H5L6 8Zm3 0V6a3 3 0 0 1 6 0v2' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
)

export const SearchIcon = () => (
	<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' className='h-5 w-5'>
		<circle cx='11' cy='11' r='7' />
		<path d='m20 20-4-4' strokeLinecap='round' />
	</svg>
)

export const CloseIcon = () => (
	<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='h-5 w-5'>
		<path d='m6 6 12 12M18 6 6 18' strokeLinecap='round' />
	</svg>
)
