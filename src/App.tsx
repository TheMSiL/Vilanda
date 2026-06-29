import React from 'react'

import Hero from './components/Hero'
import Catalog from './components/Catalog'
import AdminPage from './components/AdminPage'
import CatalogPage from './components/CatalogPage'
import ProductPage from './components/ProductPage'
import OrderProcess from './components/OrderProcess'
import Reviews from './components/Reviews'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import { ShopProvider } from './context/ShopContext'

const App: React.FC = () => {
	const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
	const isAdminPage = pathname === '/admin'
	const isCatalogPage = pathname === '/catalog'
	const productMatch = pathname.match(/^\/product\/(\d+)$/)

	return (
		<ShopProvider>
			{isAdminPage ? <AdminPage /> : productMatch ? <ProductPage productId={Number(productMatch[1])} /> : isCatalogPage ? <CatalogPage /> : (
				<div className='wrapper'>
					<Hero />
					<div className="content_container py-24">
						<Catalog />
					</div>
					<OrderProcess />
					<Reviews />
					<ContactForm />
					<Footer />
				</div>
			)}
		</ShopProvider>
	)
}

export default App
