import type { CustomField } from '@/app/_types'

const RichEditor = ({
	richEditor,
}: Extract<CustomField, { fieldId: 'richEditor' }>) => {
	return (
		<div className='container mx-auto'>
			<div
				dangerouslySetInnerHTML={{
					__html: richEditor,
				}}
			/>
		</div>
	)
}

export default RichEditor
