export type Product = {
	id: number
	name: string
	category: string
	categoryId?: number
	price: number
	badge?: string
	badgeClass?: string
	image: string
	images?: string[]
	description: string
	light: 'Сонце' | 'Напівтінь' | 'Тінь'
	container?: string
	winterHardiness?: string
	inStock?: boolean
	isActive?: boolean
	sortOrder?: number
}

export const products: Product[] = [
	{
		id: 1,
		name: 'Гортензія волотиста',
		category: 'Декоративні кущі',
		price: 450,
		badge: 'Хіт продажу',
		badgeClass: 'bg-[#fff3ad] text-[#244f22]',
		image: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&w=900&q=85',
		description: 'Пишне тривале цвітіння та добра зимостійкість.',
		light: 'Напівтінь',
	},
	{
		id: 2,
		name: 'Ялівець Blue Arrow',
		category: 'Хвойні рослини',
		price: 380,
		badge: 'Рекомендуємо',
		badgeClass: 'bg-[#dcebd7] text-[#244f22]',
		image: 'https://images.unsplash.com/photo-1604762512526-b7ce049b5764?auto=format&fit=crop&w=900&q=85',
		description: 'Струнка блакитна хвоя для акцентів і живих огорож.',
		light: 'Сонце',
	},
	{
		id: 3,
		name: 'Троянда флорибунда',
		category: 'Садові рослини',
		price: 290,
		badge: 'Популярне',
		badgeClass: 'bg-[#f7dfdf] text-[#713d3d]',
		image: 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=900&q=85',
		description: 'Рясне хвилеподібне цвітіння протягом усього літа.',
		light: 'Сонце',
	},
	{
		id: 4,
		name: 'Лаванда вузьколиста',
		category: 'Сезонні рослини',
		price: 160,
		badge: 'Вибір сезону',
		badgeClass: 'bg-[#e7dff4] text-[#55406f]',
		image: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=900&q=85',
		description: 'Ароматна, невибаглива та приваблює запилювачів.',
		light: 'Сонце',
	},
	{
		id: 5,
		name: 'Туя Smaragd',
		category: 'Хвойні рослини',
		price: 320,
		badge: 'Хіт продажу',
		badgeClass: 'bg-[#fff3ad] text-[#244f22]',
		image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=900&q=85',
		description: 'Щільна крона, насичений колір і простий догляд.',
		light: 'Сонце',
	},
	{
		id: 6,
		name: 'Самшит вічнозелений',
		category: 'Декоративні кущі',
		price: 240,
		badge: 'Рекомендуємо',
		badgeClass: 'bg-[#dcebd7] text-[#244f22]',
		image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=900&q=85',
		description: 'Добре тримає форму та підходить для бордюрів.',
		light: 'Напівтінь',
	},
	{
		id: 7,
		name: 'Півонія молочноквіткова',
		category: 'Садові рослини',
		price: 350,
		badge: 'Популярне',
		badgeClass: 'bg-[#f7dfdf] text-[#713d3d]',
		image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=900&q=85',
		description: 'Великі ароматні квіти й десятиліття на одному місці.',
		light: 'Сонце',
	},
	{
		id: 8,
		name: 'Барбарис Тунберга',
		category: 'Декоративні кущі',
		price: 220,
		badge: 'Вибір сезону',
		badgeClass: 'bg-[#e7dff4] text-[#55406f]',
		image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=85',
		description: 'Яскраве листя для кольорових акцентів у саду.',
		light: 'Сонце',
	},
	{
		id: 9,
		name: 'Яблуня декоративна',
		category: 'Плодові рослини',
		price: 520,
		badge: 'Хіт продажу',
		badgeClass: 'bg-[#fff3ad] text-[#244f22]',
		image: 'https://images.unsplash.com/photo-1523528283115-9bf9b1699245?auto=format&fit=crop&w=900&q=85',
		description: 'Весняне цвітіння та декоративні плоди восени.',
		light: 'Сонце',
	},
	{
		id: 10,
		name: 'Хоста Blue Angel',
		category: 'Багаторічні рослини',
		price: 180,
		badge: 'Рекомендуємо',
		badgeClass: 'bg-[#dcebd7] text-[#244f22]',
		image: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=900&q=85',
		description: 'Велике сизе листя для затінених куточків.',
		light: 'Тінь',
	},
	{
		id: 11,
		name: 'Спірея японська',
		category: 'Декоративні кущі',
		price: 210,
		badge: 'Популярне',
		badgeClass: 'bg-[#f7dfdf] text-[#713d3d]',
		image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=900&q=85',
		description: 'Компактний кущ із ніжним літнім цвітінням.',
		light: 'Сонце',
	},
	{
		id: 12,
		name: 'Клематис Jackmanii',
		category: 'В’юнкі рослини',
		price: 270,
		badge: 'Вибір сезону',
		badgeClass: 'bg-[#e7dff4] text-[#55406f]',
		image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=85',
		description: 'Рясно квітуча ліана для пергол, арок і парканів.',
		light: 'Напівтінь',
	},
]

export const getProductCategories = (items: Product[]) => ['Усі рослини', ...Array.from(new Set(items.map((product) => product.category)))]

export const productCategories = getProductCategories(products)

export const formatPrice = (price: number) => `${price.toLocaleString('uk-UA')} ₴`
