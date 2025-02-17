import { cn } from '@/app/_libs/utils'
import type { CustomField } from '@/app/_types'

import Image from 'next/image'

const ImageTextBlock = ({
	image,
	heading,
	text,
	imageRight,
}: Extract<CustomField, { fieldId: 'imageTextBlock' }>) => {
	return (
		<section className='container mx-auto py-8'>
			<div
				className={cn(
					'flex flex-col md:flex-row gap-8 md:gap-12',
					imageRight && 'md:flex-row-reverse',
				)}
			>
				<div className='w-full md:w-1/2'>
					<Image
						src={image.url}
						alt=''
						width={500}
						height={300}
						className='rounded-lg object-cover w-full h-auto'
					/>
				</div>
				<div className='w-full md:w-1/2 space-y-4'>
					<h2 className='text-3xl font-bold tracking-tighter '>{heading}</h2>
					<p>test</p>
					<p className='text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
						{text}
					</p>
				</div>
			</div>
		</section>
	)
}

export default ImageTextBlock
