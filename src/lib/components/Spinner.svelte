<script lang="ts">
	interface Props {
		label?: string;
	}

	let { label = 'Loading...' }: Props = $props();
</script>

<div class="spinner-container">
	<span class="loading loading-spinner w-20"></span>
	<div>{label}</div>
</div>

<style lang="scss">
	.spinner-container {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}
</style>
