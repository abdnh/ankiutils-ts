<script lang="ts">
	import { tick } from 'svelte';
	import { type SelectOption } from './types.ts';
	interface Props {
		options: SelectOption[];
		selectedOptions: string[];
		multiple?: boolean;
		isOpen?: boolean;
		highlightedIndex?: number,
		onSelected?: (value: string[]) => void;
		onOpenDropdown?: () => void;
		onCloseDropdown?: () => void;
	}

	let {
		options,
		selectedOptions = $bindable<string[]>([]),
		multiple = false,
		isOpen = $bindable(false),
		highlightedIndex,
		onSelected,
		onOpenDropdown,
		onCloseDropdown
	}: Props = $props();

	let optionElements: (HTMLButtonElement | HTMLInputElement)[] = $state([]);

	export async function openDropdown() {
		isOpen = true;
		optionElements = [];
		onOpenDropdown?.();
	}

	export function closeDropdown() {
		isOpen = false;
		optionElements = [];
		onCloseDropdown?.();
	}

	export function selectOption(option: SelectOption) {
		if (multiple) {
			if (selectedOptions.includes(option.value)) {
				selectedOptions = selectedOptions.filter((o) => o !== option.value);
			} else {
				selectedOptions.push(option.value);
			}
		} else {
			selectedOptions = [option.value];
			closeDropdown();
		}
		tick().then(() => onSelected?.(selectedOptions));
	}
</script>

<ul
	class="menu dropdown-content flex-nowrap w-full overflow-auto bg-base-100 rounded-box z-1 p-2 shadow-sm gap-1"
>
	{#if options.length === 0}
		<div class="text-gray-400">No options found</div>
	{:else}
		{#each options as option, index (option.value)}
			{@const checked = selectedOptions.includes(option.value)}
			{@const highlighted = !checked && highlightedIndex === index}
			<li>
				{#if multiple}
					<input
						bind:this={optionElements[index]}
						type="checkbox"
						class="btn w-full"
						class:btn-primary={checked}
						class:btn-outline={highlighted}
						{checked}
						aria-label={option.label}
						onclick={() => selectOption(option)}
					/>
				{:else}
					<button
						bind:this={optionElements[index]}
						type="button"
						class="btn w-full"
						class:btn-primary={checked}
						class:btn-outline={highlighted}
						onclick={() => selectOption(option)}
					>
						{option.label}
					</button>
				{/if}
			</li>
		{/each}
	{/if}
</ul>
