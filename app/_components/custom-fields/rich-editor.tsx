import type { CustomField } from '@/app/_types'

const RichEditor = ({
	richEditor,
}: Extract<CustomField, { fieldId: 'richEditor' }>) => {
	return (
		<div className='container mx-auto max-w-[900px] '>
			<div
				className='prose max-w-none '
				dangerouslySetInnerHTML={{
					__html: richEditor,
				}}
			/>
		</div>
	)
}

export default RichEditor
