import type {
	MicroCMSContentId,
	MicroCMSDate,
	MicroCMSImage,
} from 'microcms-js-sdk'

export type HtmlInput = {
	fieldId: 'html'
	htmlEditor: string
}

export type RichEditor = {
	fieldId: 'richEditor'
	richEditor: string
}

export type TopPage = {
	fieldId: 'topPage'
	mvImage: MicroCMSImage // Image URL
	mvHeading: string
	mvLead: string
	featureHeading: string
	featureList: Array<{
		fieldId: 'topPageFeatures'
		title: string
		body: string
	}>
	caseHeading: string
	caseDescription: string
	caseList: Case[]
}

export type Case = {
	title: string
	eyecatch: MicroCMSImage
	body: string
	description: string
} & MicroCMSContentId &
	MicroCMSDate

export type ImageTextBlock = {
	fieldId: 'imageTextBlock'
	image: MicroCMSImage
	heading: string
	text: string
	imageRight: boolean
}
export type Card = {
	fieldId: 'card'
	image: MicroCMSImage
	title: string
	text: string
	link?: string
}
export type GridCard = {
	fieldId: 'gridCard'
	cards: Card[]
}

export type CustomField =
	| HtmlInput
	| RichEditor
	| TopPage
	| ImageTextBlock
	| Card
	| GridCard

export type Page = {
	title: string
	body: CustomField[]
	parentPage: string
	description: string
	ogpImage: MicroCMSImage
} & MicroCMSContentId &
	MicroCMSDate
