import Link from 'next/link'

const Header = () => {
	return (
		<header className='bg-white shadow-sm sticky top-0 z-10'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center'>
				<div className='flex items-center'>
					<span className='ml-2 text-xl font-bold text-gray-900'>ロゴ</span>
				</div>
				<nav>
					<ul className='flex space-x-6'>
						<li>
							<Link
								href='#features'
								className='text-gray-600 hover:text-gray-900'
							>
								Features
							</Link>
						</li>
						<li>
							<Link
								href='#case-studies'
								className='text-gray-600 hover:text-gray-900'
							>
								Case Studies
							</Link>
						</li>
						<li>
							<Link href='#' className='text-gray-600 hover:text-gray-900'>
								Pricing
							</Link>
						</li>
						<li>
							<Link href='#' className='text-gray-600 hover:text-gray-900'>
								Contact
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}

export default Header
