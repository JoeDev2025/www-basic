export const replaceVariables = <
	T extends Record<string, string | number | Record<string, string | number>[]>
>(
	template: string,
	variables: T
): string => {
	let result = template;

	// Handle listing variables (arrays)
	Object.entries(variables).forEach(([key, value]) => {
		if (Array.isArray(value)) {
			// This is a listing variable
			const regex = new RegExp(`{{#${key}}}([\\s\\S]*?){{/${key}}}`, "g");

			result = result.replace(regex, (match, innerContent) => {
				if (value.length === 0) {
					return `{{#${key}}}${innerContent}{{/${key}}}`; // Keep the placeholder if empty
				}

				return value
					.map((item) => {
						let filledContent = innerContent;
						Object.entries(item).forEach(([subKey, subValue]) => {
							filledContent = filledContent.replace(
								new RegExp(`{{${subKey}}}`, "g"),
								subValue !== undefined && subValue !== null
									? String(subValue)
									: `{{${subKey}}}`
							);
						});
						return filledContent;
					})
					.join("");
			});
		} else {
			// Handle normal (non-listing) variables
			result = result.replace(
				new RegExp(`{{${key}}}`, "g"),
				value !== undefined && value !== null ? String(value) : `{{${key}}}`
			);
		}
	});

	return result;
};
