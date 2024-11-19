import type { CustomField } from '@/app/_types'

const HTML = ({ htmlEditor }: Extract<CustomField, { fieldId: 'html' }>) => {
	return (
		<div className='container mx-auto '>
			<div dangerouslySetInnerHTML={{ __html: htmlEditor }} />
		</div>
	)
}

export default HTML
