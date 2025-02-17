const Header = () => {
	return (
		<header className='bg-white shadow-sm sticky top-0 z-10'>
			<div className='container  mx-auto py-4 flex justify-between items-center'>
				<div className='flex items-center'>
					<span className='ml-2 text-xl font-bold text-gray-900'>ロゴ</span>
				</div>
				<nav>
					<ul className='flex space-x-6'>
						<li>
							<a href='#feature' className='text-gray-600 hover:text-gray-900'>
								機能
							</a>
						</li>

						<li>
							<a href='#pricing' className='text-gray-600 hover:text-gray-900'>
								料金プラン
							</a>
						</li>
						<li>
							<a href='#contact' className='text-gray-600 hover:text-gray-900'>
								お問い合わせ
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}

export default Header
