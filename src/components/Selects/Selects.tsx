/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSelect, SelectOption } from "../cselect/cselect"
import styles from "./Selects.module.css"

interface SelectsProps {
	options: SelectOption[][]
	values: SelectOption[]
	onChanges: ((o: any) => void)[]
}
const Selects = ({ options, values, onChanges }: SelectsProps) => {
	return (
		<div className={styles.selects}>
			<div className={styles['cselect-wrapper']}>
				<CSelect nameSelect="Сервер" options={options[0]} value={values[0]} onChange={(o) => onChanges[0](o)} />
			</div>
			<div className={styles['cselect-wrapper']}>
				<CSelect nameSelect="Промежуток" options={options[1]} value={values[1]} onChange={(o) => onChanges[1](o)} />
			</div>
			<div className={styles['cselect-wrapper']}>
				<CSelect nameSelect="Раздел" options={options[2]} value={values[2]} onChange={(o) => onChanges[2](o)} />
			</div>
		</div>
	)
}

export default Selects
