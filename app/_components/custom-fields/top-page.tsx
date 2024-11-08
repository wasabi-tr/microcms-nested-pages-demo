import type { CustomField } from '@/app/_types'
import Image from 'next/image'
import { Button } from '../ui/button'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const TopPage = ({
	mvImage,
	mvHeading,
	mvLead,
	featureHeading,
	featureList,
	caseHeading,
	caseDescription,
	caseList,
}: Extract<CustomField, { fieldId: 'topPage' }>) => {
	return (
		<div className='min-h-screen flex flex-col bg-gray-50'>
			<main className='flex-grow'>
				{/* Hero Section */}
				<section className='bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center'>
						<div className='md:w-1/2 mb-10 md:mb-0'>
							<h1 className='text-4xl md:text-5xl font-bold mb-6'>
								{mvHeading}
							</h1>
							<p className='text-xl mb-8'>{mvLead}</p>
							<div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'>
								<Button
									size='lg'
									className='bg-white text-blue-600 hover:bg-gray-100'
								>
									チュートリアルを始める
								</Button>
								<Button
									size='lg'
									variant='outline'
									className='bg-transparent border-white text-white hover:bg-white hover:text-blue-600'
								>
									無料トライアルを開始する
								</Button>
							</div>
						</div>
						<div className='md:w-1/2'>
							<Image
								src={mvImage.url}
								alt='SaaS Dashboard'
								width={600}
								height={400}
								className='rounded-lg shadow-2xl'
							/>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section id='features' className='py-20'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
						<h2 className='text-3xl font-bold text-center mb-12'>
							{featureHeading}
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
							{featureList.map((feature, index) => (
								<div
									key={index}
									className='bg-white p-6 rounded-lg shadow-md flex items-start'
								>
									<CheckCircle className='text-green-500 mr-4 flex-shrink-0' />
									<div>
										<h3 className='text-xl font-semibold mb-2'>
											{feature.title}
										</h3>
										<p className='text-gray-600'>{feature.body}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Case Studies Section */}
				<section id='case-studies' className='bg-gray-100 py-20'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
						<h2 className='text-3xl font-bold text-center mb-12'>
							{caseHeading}
						</h2>
						{/* <p className='text-xl mb-8  text-center'>{caseDescription}</p> */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
							{caseList.map(item => (
								<Link
									href={`/case/${item.id}`}
									key={item.id}
									className='bg-white overflow-hidden rounded-lg shadow-md'
								>
									<div className='aspect-video relative'>
										<Image
											src={item.eyecatch.url}
											alt=''
											layout='fill'
											objectFit='cover'
										/>
									</div>
									<div className='p-6'>
										<h3 className='text-xl font-semibold mb-2'>{item.title}</h3>
										<p className='text-gray-600 mb-4'>{item.description}</p>
									</div>
								</Link>
							))}
						</div>
						<div className='text-center mt-12'>
							<Button size='lg' className='bg-blue-600 hover:bg-blue-700'>
								詳しく見る <ArrowRight className='ml-2' />
							</Button>
						</div>
					</div>
				</section>
			</main>
		</div>
	)
}

export default TopPage
