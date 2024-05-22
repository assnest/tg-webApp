import { AxiosResponse } from 'axios'
import ThemeInfo from '../ThemeInfo/ThemeInfo'
import UserData from '../UserData/UserData'
import styles from './DataLoaded.module.css'
import { FaApple, FaLock, FaThumbtack, FaUnlock } from 'react-icons/fa6'

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
	const forumsData = data?.data
	const themes = forumsData.themes
	const users: IDataUser[] = forumsData.users
	const content: IData = {
		themes: [
			{ type: 'pin', value: themes.pinned.length },
			{ type: 'close', value: themes.closed.length },
			{ type: 'open', value: themes.open.length },
		],
		users: users.sort((a,b) => b.countThemes - a.countThemes),
	}
	return (
		<div className={styles.wrapper}>
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
					return <ThemeInfo key={index} Icon={IconComponent} value={v.value} />
				})}
				{content.users.map((v, index) => (
					<UserData  key={index} username={v.username} countThemes={v.countThemes} avgClosingTime={v.avgClosingTime} avatar="" />
				))}
			</div>
		</div>
	)
}

export default DataLoaded
