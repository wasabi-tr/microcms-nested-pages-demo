import { Button } from '../ui/button'
/* ここもmicroCMSから取得してもいいかも */
const Cta = () => {
	return (
		<section className='bg-blue-600 text-white py-20'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
				<h2 className='text-3xl font-bold mb-4'>
					まずは、無料で試してみましょう。
				</h2>
				<p className='text-xl mb-8'>
					microCMSは無料ではじめられます。
					ご不明な点はお気軽にお問い合わせください。
				</p>
				<Button size='lg' className='bg-white text-blue-600 hover:bg-gray-100'>
					無料で始める
				</Button>
			</div>
		</section>
	)
}

export default Cta
