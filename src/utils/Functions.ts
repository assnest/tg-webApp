
export function convertTime(seconds: number) {
	const weeks = Math.floor(seconds / (7 * 24 * 3600))
	seconds -= weeks * (7 * 24 * 3600)
	const days = Math.floor(seconds / (24 * 3600))
	seconds -= days * (24 * 3600)
	const hours = Math.floor(seconds / 3600)
	seconds -= hours * 3600
	const minutes = Math.floor(seconds / 60)
	const remainingSeconds = Math.floor(seconds % 60)

	let result = ''

	if (weeks > 0) {
		result += `${fword(weeks, 'недел', 'я', 'и', 'и')} `
	}
	if (days > 0) {
		result += `${fword(days, '', 'день', 'дней', 'дня')} `
	}
	if (hours > 0) {
		result += `${fword(hours, 'час', '', 'ов', 'а')} `
	}
	if (minutes > 0) {
		result += `${fword(minutes, 'минут', 'а', '', 'ы')} `
	}
	if (remainingSeconds > 0) {
		result += `${fword(remainingSeconds, 'секунд', 'а', '', 'ы')} `
	}

	return {text: result.trim(), hours, minutes, weeks, days}
}
export function fword(num: number, word: string, singularEnding: string, pluralEnding: string, genitiveEnding: string) {
	let suffix = ''

	if (num % 10 === 1 && num % 100 !== 11) {
		suffix = singularEnding
	} else if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) {
		suffix = genitiveEnding
	} else {
		suffix = pluralEnding
	}

	return num + ' ' + word + suffix
}