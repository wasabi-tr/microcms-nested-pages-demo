export const dynamic = true
import type { Page } from '@/app/_types'
import { createClient, type MicroCMSQueries } from 'microcms-js-sdk'

if (!process.env.SERVICE_DOMAIN) {
	throw new Error('SERVICE_DOMAIN is not set')
}
if (!process.env.API_KEY) {
	throw new Error('API_KEY is not set')
}

export const client = createClient({
	serviceDomain: process.env.SERVICE_DOMAIN,
	apiKey: process.env.API_KEY,
})

export const getPage = async (contentId: string, queries?: MicroCMSQueries) => {
	const page = await client.getListDetail<Page>({
		endpoint: 'pages',
		contentId: contentId,
		queries,
	})
	return page
}

// 第一階層のページを取得
export const getParentPages = async () => {
	const { contents } = await client.getList<Page>({
		endpoint: 'pages',
		queries: { filters: 'parentPage[not_exists]', fields: 'id,title' },
	})
	return contents
}

// 子ページを取得。子のIdを渡せば孫のコンテンツも取得できる
export const getChildPages = async (parentId: string) => {
	const { contents } = await client.getList<Page>({
		endpoint: 'pages',
		queries: { filters: `parentPage[equals]${parentId}`, fields: 'id,title' },
	})
	return contents
}

export type PageInfo = {
	id: string
	title: string
	parentId?: string
	children: PageInfo[] | null
}
// 階層構造を再帰的に取得する関数
export const getAllPagePaths = async (
	contentId: string,
): Promise<PageInfo[] | null> => {
	const pages = await getChildPages(contentId)

	if (pages.length === 0) return null

	return await Promise.all(
		pages.map(async page => ({
			id: page.id,
			title: page.title,
			parentId: contentId,
			children: await getAllPagePaths(page.id),
		})),
	)
}
