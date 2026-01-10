import type { SelectOption } from './types.ts';

export function filterSelectOptions(search: string, options: SelectOption[]): SelectOption[] {
	return search
		? options.filter(
				(opt) =>
					opt.value.toLowerCase().includes(search.toLowerCase()) ||
					opt.label.toLowerCase().includes(search.toLowerCase())
			)
		: options;
}
