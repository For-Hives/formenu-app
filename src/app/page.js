import Image from 'next/image'
import Link from 'next/link'
import { createSlug } from '@/app/utils/utils'

async function getData() {
	let res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/categories?populate=deep&filters[depth][$eq]=0&sort=order`,
		{
			method: 'GET',
			headers: {
				// 	token
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
			},
		}
	)

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data')
	}

	return res.json()
}

export default async function Page() {
	const data = await getData()

	return (
		<>
			<div className={'container-menus'}>
				{data?.data?.map((record, index) => {
					return (
						<Link
							className={'btn-alt-primary'}
							key={record.id}
							href={`/${record.id}`}
						>
							<Image
								src={'/icons/menu_icon.svg'}
								width={20}
								height={20}
								alt={'icon menu'}
								className={'h-auto w-auto'}
							/>
							<span className={'font-medium'}>{record.attributes.name}</span>
						</Link>
					)
				})}
			</div>
		</>
	)
}
