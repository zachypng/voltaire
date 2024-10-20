<script lang="ts">
	import { MonitorCog, Moon, Sun } from 'lucide-svelte';
	import { setMode, userPrefersMode } from 'mode-watcher';

	function handle_theme_change(event: Event) {
		const theme = (event.target as HTMLInputElement).value as 'system' | 'light' | 'dark';
		setMode(theme);
	}
</script>

<div class="inline-flex items-center justify-center">
	<fieldset class="flex h-8 w-fit items-center rounded border border-muted">
		<legend class="sr-only">Select a display theme:</legend>
		<!-- TODO: If/when you do upgrade to Svelte 5, this entire span can abstracted into a `snippet`. No boilerplate. -->
		<span class="relative">
			<input
				id="theme-switch-system"
				type="radio"
				value="system"
				bind:group={$userPrefersMode}
				on:change={handle_theme_change}
				class="peer absolute size-full appearance-none rounded-full outline-none"
			/>
			<label
				aria-label="system theme"
				for="theme-switch-system"
				title="system theme"
				class="relative flex size-8 cursor-pointer items-center justify-center rounded bg-transparent text-primary hover:text-accent peer-checked:border peer-checked:border-muted peer-checked:bg-primary/80 peer-checked:text-primary-foreground"
			>
				<MonitorCog aria-hidden="true" class="h-4 w-4" />
			</label>
		</span>
		<span class="relative">
			<input
				id="theme-switch-light"
				type="radio"
				value="light"
				bind:group={$userPrefersMode}
				on:change={handle_theme_change}
				class="peer absolute size-full appearance-none rounded-full outline-none"
			/>
			<label
				aria-label="light theme"
				for="theme-switch-light"
				title="light theme"
				class="relative flex size-8 cursor-pointer items-center justify-center rounded bg-transparent text-primary hover:text-accent peer-checked:border peer-checked:border-muted peer-checked:bg-primary/80 peer-checked:text-primary-foreground"
			>
				<Sun aria-hidden="true" class="h-4 w-4" />
			</label>
		</span>
		<span class="relative">
			<input
				id="theme-switch-dark"
				type="radio"
				value="dark"
				bind:group={$userPrefersMode}
				on:change={handle_theme_change}
				class="peer absolute size-full appearance-none rounded-full outline-none"
			/>
			<label
				aria-label="dark theme"
				for="theme-switch-dark"
				title="dark theme"
				class="relative flex size-8 cursor-pointer items-center justify-center rounded bg-transparent text-primary hover:text-accent peer-checked:border peer-checked:border-muted peer-checked:bg-primary/80 peer-checked:text-primary-foreground"
			>
				<Moon aria-hidden="true" class="h-4 w-4" />
			</label>
		</span>
	</fieldset>
</div>
