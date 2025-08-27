/**
 * Formats a number, string, or float according to a specific locale.
 * If the number is a whole number or ends with .00, the last two decimal digits are not displayed.
 *
 * @param value - The number, string, or float to format.
 * @param locale - The locale to format the number in (default is 'en-US').
 * @param removeTrailingZeros - Whether to remove trailing '.00' (default is true).
 * @returns The formatted number as a string.
 */
export function priceFormatNumber(
	value: number | string,
	removeTrailingZeros: boolean = true,
	locale: string = "en-US",
): string {
	let numberValue: number;

	if (typeof value === "string") {
		numberValue = parseFloat(value);
	} else {
		numberValue = value;
	}

	const options: Intl.NumberFormatOptions = {
		minimumFractionDigits: removeTrailingZeros ? 0 : 2,
		maximumFractionDigits: 2,
	};

	const formattedNumber = new Intl.NumberFormat(locale, options).format(
		numberValue
	);

	// Remove trailing '.00' if present and removeTrailingZeros is true
	if (removeTrailingZeros && formattedNumber.endsWith(".00")) {
		return formattedNumber.slice(0, -3);
	}

	return formattedNumber;
}
