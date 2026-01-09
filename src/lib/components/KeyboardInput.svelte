<script lang="ts">
	interface Props {
		keys: string[];
	}

	let { keys = $bindable([]) }: Props = $props();
	let keysDisplay = $derived.by(() => {
		let components = [];
		for (let key of keys) {
			if (key === ' ') {
				key = 'space';
			}
			components.push(key[0].toUpperCase() + key.slice(1));
		}
		return components.join(',');
	});

	function onKeydown(event: Event) {
		keys = [...keys, (event as KeyboardEvent).key];
		event.preventDefault();
	}

	function clearKeys() {
		keys = [];
	}
</script>

<div class="join">
	<input
		class="join-item input"
		type="text"
		value={keysDisplay}
		onkeydown={onKeydown}
		placeholder="Press shortcut"
	/>
	<button class="join-item btn btn-primary btn-soft" aria-label="Clear" onclick={clearKeys}>
		<i class="bi bi-x"></i>
	</button>
</div>

<style lang="scss">
	input {
		&:focus,
		&:focus-within {
			outline: none;
		}
	}
</style>
