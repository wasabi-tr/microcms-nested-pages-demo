import GridCard from '../_components/custom-fields/grid-card'
import HTMLTextarea from '../_components/custom-fields/html-textarea'
import ImageTextBlock from '../_components/custom-fields/image-text-block'
import RichEditor from '../_components/custom-fields/rich-editor'
import TopPage from '../_components/custom-fields/top-page'

import { getPage } from '../_libs/microcms'

export default async function Page({ params }: { params: { slug: string } }) {
	const { slug } = await params

	const contentId = slug[slug.length - 1]
	const page = await getPage(contentId)
	// console.log(page.body)

	return (
		<div className='bg-white overflow-hidden'>
			{page.body.map((field, index) => {
				switch (field.fieldId) {
					case 'html':
						return <HTMLTextarea key={index} {...field} />
					case 'richEditor':
						return <RichEditor key={index} {...field} />
					case 'topPage':
						return <TopPage key={index} {...field} />
					case 'imageTextBlock':
						return <ImageTextBlock key={index} {...field} />
					case 'gridCard':
						return <GridCard key={index} {...field} />
					default:
						return <div key={index}>Unknown field</div>
				}
			})}
		</div>
	)
}
