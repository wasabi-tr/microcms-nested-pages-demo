export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { client } from './_libs/microcms'
import type { Page } from './_types'

export default async function Home() {
	const allPagePaths = await generateAllPaths()
	const tree = buildTree(allPagePaths)

	return (
		<div className='container mx-auto my-8'>
			<LinkList tree={tree} />
		</div>
	)
}

const generateAllPaths = async (
	parentId?: string,
	basePath: string[] = [],
): Promise<{ slug: string[] }[]> => {
	const { contents } = await client.getList<Page>({
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

const buildTree = (routes: { slug: string[] }[]) => {
	const tree: Record<string, any> = {}

	for (const { slug } of routes) {
		let current = tree
		for (const part of slug) {
			if (!current[part]) {
				current[part] = {}
			}
			current = current[part]
		}
	}

	return tree
}

// 再帰的にリンクリストをレンダリングするコンポーネント
const LinkList: React.FC<{
	tree: Record<string, any>
	parentSlug?: string
	depth?: number
}> = ({ tree, parentSlug = '', depth = 0 }) => {
	return (
		<ul>
			{Object.keys(tree).map(key => {
				const currentSlug = `${parentSlug}/${key}`.replace(/\/+/g, '/') // スラッシュを正規化
				return (
					<li key={key} className={`ml-${depth * 4} py-1`}>
						<Link className='text-blue-500 hover:underline' href={currentSlug}>
							{key}
						</Link>
						{Object.keys(tree[key]).length > 0 && (
							<LinkList
								tree={tree[key]}
								parentSlug={currentSlug}
								depth={depth + 1}
							/>
						)}
					</li>
				)
			})}
		</ul>
	)
}
