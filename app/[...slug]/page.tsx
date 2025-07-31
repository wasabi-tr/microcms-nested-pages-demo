export const dynamic = 'force-dynamic'
import { notFound } from 'next/navigation'
import {
	GridCard,
	HTML,
	ImageTextBlock,
	RichEditor,
	TopPage,
} from '../_components/custom-fields'
import { client } from '../_libs/microcms'
import type { Page as PageData } from '../_types'

export async function generateStaticParams() {
	const paths = await generateAllPaths()
	return paths
}

export default async function Page({
	params,
}: { params: Promise<{ slug: string[] }> }) {
	const { slug } = await params
	const contents = await getPageBySlug(slug)

	if (!contents) return notFound()

	return (
		<div className='space-y-4 pt-4 pb-12'>
			{contents.layout.map((field, index) => {
				switch (field.fieldId) {
					case 'richEditor':
						return <RichEditor key={index} {...field} />
					case 'imageTextBlock':
						return <ImageTextBlock key={index} {...field} />
					case 'gridCard':
						return <GridCard key={index} {...field} />
					case 'topPage':
						return <TopPage key={index} {...field} />
					case 'html':
						return <HTML key={index} {...field} />
					default:
						return <div key={index}>Unknown field</div>
				}
			})}
		</div>
	)
}

/**
 * 再帰的にページ構造を辿り、すべてのパスを生成する関数
 *
 * @param parentId - 親ページのコンテンツID（undefinedの場合はトップレベルのページを取得）
 * @param basePath - 現在の階層に至るまでのスラッグ配列（初回呼び出し時は空配列を指定）
 * @returns 再帰的に生成されたすべてのパスの配列（{ slug: string[] }形式）
 */
const generateAllPaths = async (
	parentId?: string,
	basePath: string[] = [],
): Promise<{ slug: string[] }[]> => {
	const { contents } = await client.getList<PageData>({
		endpoint: 'pages',
		queries: {
			filters: parentId ? `parent[equals]${parentId}` : 'parent[not_exists]',
			fields: 'id,slug',
		},
	})

	if (contents.length === 0) return []

	const paths: { slug: string[] }[] = []

	for (const page of contents) {
		const currentPath = [...basePath, page.slug]
		paths.push({ slug: currentPath })

		const childPaths = await generateAllPaths(
			page.id,
			currentPath,
		) /* 再帰呼び出し */
		paths.push(...childPaths)
	}

	return paths
}

/**
 * スラッグの配列に一致するページを取得する関数
 *
 * @param paths - スラッグの配列
 * @param currentIndex - 再帰呼び出し時のカウンタ（初回呼び出し時は0を指定）
 * @returns 一致するページのコンテンツデータ（見つからない場合はnull）
 */
const getPageBySlug = async (
	paths: string[],
	currentIndex = 0,
): Promise<PageData | null> => {
	if (currentIndex >= paths.length) return null

	const { contents } = await client.getList<PageData>({
		endpoint: 'pages',
		queries: { filters: `slug[equals]${paths[currentIndex]}`, depth: 2 },
	})

	const matchedPage = contents.find(
		page => currentIndex === 0 || page.parent?.slug === paths[currentIndex - 1],
	)

	if (matchedPage) {
		if (currentIndex === paths.length - 1) return matchedPage

		return await getPageBySlug(paths, currentIndex + 1)
	}

	return null
}
