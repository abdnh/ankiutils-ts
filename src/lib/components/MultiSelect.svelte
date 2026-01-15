<script lang="ts">
	import BaseSelect from './BaseSelect.svelte';
	import { type SelectOption } from './types.ts';

	interface Props {
		id?: string;
		className?: string,
		options: SelectOption[];
		selectedOptions: string[];
		placeholder?: string;
		searchPlaceholder?: string;
		disabled?: boolean;
		clearable?: boolean;
		onSelected?: (options: string[]) => void;
	}

	let {
		id,
		className,
		options,
		selectedOptions = $bindable<string[]>([]),
		placeholder,
		searchPlaceholder,
		disabled = false,
		clearable = true,
		onSelected = () => {}
	}: Props = $props();
</script>

<BaseSelect
	{id}
	{className}
	{options}
	bind:selectedOptions
	{placeholder}
	{searchPlaceholder}
	{disabled}
	{clearable}
	multiple={true}
	{onSelected}
/>
