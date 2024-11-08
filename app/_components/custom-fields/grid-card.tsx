import type { CustomField } from '@/app/_types'
import Card from './card'

const GridCard = ({ cards }: Extract<CustomField, { fieldId: 'gridCard' }>) => {
	return (
		<div className='container mx-auto grid grid-cols-auto-fit-[300px] gap-6 py-8'>
			{cards.map((card, index) => (
				<Card key={index} {...card} />
			))}
		</div>
	)
}

export default GridCard
