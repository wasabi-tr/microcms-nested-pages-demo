import type { CustomField } from '@/app/_types'

import Image from 'next/image'
import Link from 'next/link'
import {
	CardContent,
	CardFooter,
	CardHeader,
	Card as CardWrapper,
} from '../ui/card'

const Card = ({
	image,
	title,
	text,
	link,
}: Extract<CustomField, { fieldId: 'card' }>) => {
	return (
		<CardWrapper className='overflow-hidden '>
			<div className='aspect-video relative'>
				<Image src={image.url} alt='' layout='fill' objectFit='cover' />
			</div>

			<CardHeader>
				<h3 className='text-2xl font-bold'>{title}</h3>
			</CardHeader>
			<CardContent>
				<p className='text-gray-600 dark:text-gray-300'>{text}</p>
			</CardContent>
			{link && (
				<CardFooter>
					<Link
						href={link}
						className='text-blue-600 dark:text-blue-400 hover:underline'
					>
						詳しく見る
					</Link>
				</CardFooter>
			)}
		</CardWrapper>
	)
}

export default Card
