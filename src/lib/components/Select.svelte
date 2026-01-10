<script lang="ts">
	import BaseSelect from './BaseSelect.svelte';
	import { type SelectOption } from './types.ts';
	interface Props {
		id?: string;
		options: SelectOption[];
		value?: string;
		placeholder?: string;
		searchPlaceholder?: string;
		disabled?: boolean;
		clearable?: boolean;
		onSelected?: (value: string) => void;
	}

	let {
		id,
		options,
		value = $bindable(''),
		placeholder,
		searchPlaceholder,
		disabled = false,
		clearable = false,
		onSelected = () => {}
	}: Props = $props();

	let selectedOptions = $state<string[]>([value]);

	$effect(() => {
		value = selectedOptions[0] || '';
	});
</script>

<BaseSelect
	{id}
	{options}
	bind:selectedOptions
	{placeholder}
	{searchPlaceholder}
	{disabled}
	{clearable}
	multiple={false}
	onSelected={(options) => onSelected(options[0])}
/>
