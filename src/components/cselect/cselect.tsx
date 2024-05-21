import { useState } from 'react'
import styles from './cselect.module.css'
import { BiChevronDown } from 'react-icons/bi'

export interface SelectOption {
	label: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	value: any
}
export interface SelectProps {
	nameSelect: string
	options: SelectOption[]
	value: SelectOption
	onChange: (value: SelectOption | undefined) => void
}

export function CSelect({ value, nameSelect, onChange, options }: SelectProps) {
	const [isOpen, setOpen] = useState(false)

	function selectOption(option: SelectOption) {
		onChange(option)
	}
	return (
		<div onBlur={() => setOpen(false)} onClick={() => setOpen(prev => !prev)} tabIndex={0} className={styles.container}>
			<span className={styles.legend}>{nameSelect}</span>
			<span className={styles.value}>{value.label}</span>
			<div className={styles.divider}></div>
			<BiChevronDown className={styles.caret + ` ${isOpen ? styles.show : ""}`}/>
			<ul className={`${styles.options} ${ isOpen ? styles.show : ""}`}>
				{options.map((option) => (
					<li onClick={e => {
						e.stopPropagation()
						setOpen(false)
						selectOption(option)
					}} key={option.label} className={styles.option}>{option.label}</li>
				))}
			</ul>
		</div>
	)
}
