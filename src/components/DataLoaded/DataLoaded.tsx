import { AxiosResponse } from 'axios'
import ThemeInfo from '../ThemeInfo/ThemeInfo'
import UserData from '../UserData/UserData'
import styles from './DataLoaded.module.css'
import { FaApple, FaLock, FaThumbtack, FaUnlock } from 'react-icons/fa6'
import { useState } from 'react'

interface IDataUser {
	username: string
	countThemes: number
	avgClosingTime: number
}

interface IData {
	themes: {
		type: string
		value: number
	}[]
	users: IDataUser[]
}
interface Props {
	data: AxiosResponse
}
const DataLoaded = ({ data }: Props) => {
	const [themesInfoVisible, setVisible] = useState(false)
	const forumsData = data?.data
	const themes = forumsData.themes
	const users: IDataUser[] = forumsData.users
	const content: IData = {
		themes: [
			{ type: 'pin', value: themes.pinned.length || 0 },
			{ type: 'close', value: themes.closed.length || 0 },
			{ type: 'open', value: themes.open.length || 0 },
		],
		users: users.sort((a, b) => b.countThemes - a.countThemes),
	}
	return (
		<div className={styles.container}>
			{content.themes.map((v, index) => {
				let IconComponent
				switch (v.type) {
					case 'pin':
						IconComponent = FaThumbtack
						break
					case 'close':
						IconComponent = FaLock
						break
					case 'open':
						IconComponent = FaUnlock
						break
					default:
						IconComponent = FaApple
				}
				return (
					<ThemeInfo
						key={index}
						Icon={IconComponent}
						value={v.value}
						onClick={() => {
							setVisible((prev) => !prev)
						}}
					/>
				)
			})}
			{themesInfoVisible && <div className={styles['themes-info']}>asdasd</div>}
			{content.users.map((v, index) => (
				<UserData key={index} username={v.username} countThemes={v.countThemes} avgClosingTime={v.avgClosingTime} avatar="" />
			))}
		</div>
	)
}

export default DataLoaded
