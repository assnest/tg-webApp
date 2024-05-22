/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './loadButton.module.css'
interface IButton {
	label: string
	disabled: boolean
	loaded: boolean
	onClick: (e: any) => void
}

export function LoadButton({ label, disabled, loaded, onClick }: IButton) {
	return (
		<button
			onClick={(e) => {
				if (disabled) return
				onClick(e)
			}}
			style={{ color: disabled ? 'rgba(255,255,255,0.5)' : '#fff' }}
			className={styles.btn + ` ${loaded ? styles.loaded : ""}`}
		>
			{label}
		</button>
	)
}
