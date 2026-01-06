<script lang="ts">
    import { pageTheme } from "../theme.svelte";

    interface Props {
        label?: string;
        size?: number;
        center?: boolean;
    }

    let { label = "Loading...", size = 80, center = true }: Props =
        $props();
</script>

<!-- spinner taken from https://loading.io/css/; CC0 -->
<div
    class="progress-container"
    class:centered={center}
    style="--size: {size}px"
>
    <div class="spinner" class:nightMode={pageTheme.isDark}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div class="progress-label">{label}</div>
</div>

<style lang="scss">
    .progress-container.centered {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .spinner {
        display: block;
        position: relative;
        width: var(--size);
        height: var(--size);
        margin: 0 auto;

        div {
            display: block;
            position: absolute;
            width: calc(var(--size) - 16px);
            height: calc(var(--size) - 16px);
            margin: 8px;
            border: calc(var(--size) / 10) solid #000;
            border-radius: 50%;
            animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: #000 transparent transparent transparent;
        }
        &.nightMode div {
            border-top-color: #fff;
        }
        div:nth-child(1) {
            animation-delay: -0.45s;
        }
        div:nth-child(2) {
            animation-delay: -0.3s;
        }
        div:nth-child(3) {
            animation-delay: -0.15s;
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    .progress-label {
        text-align: center;
    }
</style>
