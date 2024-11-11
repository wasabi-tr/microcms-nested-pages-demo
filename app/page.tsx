export const dynamic = 'force-dynamic'

import Link from 'next/link'
import {
	getAllPagePaths,
	getParentPages,
	type PageInfo,
} from './_libs/microcms'

export default async function Home() {
	const parentPages = await getParentPages()
	const allPagePaths = await Promise.all(
		parentPages.map(async parent => ({
			id: parent.id,
			title: parent.title,
			children: await getAllPagePaths(parent.id),
		})),
	)
	// console.log(JSON.stringify(allPagePaths, null, 2))

	return (
		<div>
			{allPagePaths.map(page => (
				<PageLinks key={page.id} page={page} />
			))}
		</div>
	)
}

// 再帰的にページリンクを表示するコンポーネント
function PageLinks({
	page,
	currentPath = '',
	depth = 0,
}: { page: PageInfo; currentPath?: string; depth?: number }) {
	const pagePath = `${currentPath}/${page.id}`

	const indentClass =
		['ml-0', 'ml-8', 'ml-16', 'ml-20', 'ml-28'][depth] || 'ml-24'

	return (
		<div className={indentClass}>
			<div>
				<Link href={pagePath} className='text-blue-500 hover:underline '>
					{page.title}
				</Link>
			</div>
			<div>
				{page.children?.map(child => (
					<PageLinks
						key={child.id}
						page={child}
						currentPath={pagePath}
						depth={depth + 1}
					/>
				))}
			</div>
		</div>
	)
}
