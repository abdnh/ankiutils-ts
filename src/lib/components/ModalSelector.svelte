<script lang="ts">
	export interface Option {
		value: string;
		label: string;
	}

	interface Props {
		selectedOption: string;
		options: Option[];
		placeholder?: string;
		onSelected?: () => void;
	}

	let {
		selectedOption = $bindable(),
		onSelected,
		options,
		placeholder = 'Search...'
	}: Props = $props();
	let search = $state('');
	let filteredOptions = $derived.by(() =>
		search
			? options.filter(
					(opt) =>
						opt.value.toLowerCase().includes(search.toLowerCase()) ||
						opt.label.toLowerCase().includes(search.toLowerCase())
				)
			: options
	);
	let selectedIndex = $derived.by(() => {
		for (let i = 0; i < filteredOptions.length; i++) {
			if (isOptionSelected(filteredOptions[i])) return i;
		}
		return -1;
	});

	let inputElement: HTMLInputElement;
	let modalElement: HTMLDialogElement;
	let optionElements: HTMLButtonElement[] = $state([]);

	function isOptionSelected(option: Option) {
		return option.value.toLowerCase() === selectedOption.toLowerCase();
	}

	function selectOption(language: Option) {
		selectedOption = language.value;
		modalElement.close();
		onSelected?.();
	}

	export function show() {
		modalElement.showModal();
		inputElement.focus();
		if (selectedIndex >= 0) {
			optionElements[selectedIndex].scrollIntoView({
				block: 'center'
			});
		}
	}
</script>

<dialog class="modal" aria-hidden="true" bind:this={modalElement}>
	<div class="modal-box max-w-5xl pt-1">
		<input
			bind:this={inputElement}
			class="search-input input w-full sticky mb-2 top-0"
			type="text"
			bind:value={search}
			{placeholder}
		/>
		<div class="grid grid-cols-[repeat(auto-fill,minmax(25ch,1fr))] gap-2">
			{#each filteredOptions as option, i (option.value)}
				<button
					bind:this={optionElements[i]}
					class="btn"
					class:btn-primary={isOptionSelected(option)}
					onclick={() => selectOption(option)}
				>
					{option.label}
				</button>
			{/each}
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

<style lang="scss">
	.search-input {
		&:focus,
		&:focus-within {
			outline: none;
		}
	}
</style>
