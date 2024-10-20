<script>
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import '../app.css';
	import Navbar from '$lib/components/Navbar2.svelte';
</script>

<ModeWatcher defaultMode="system" />
<Toaster
	toastOptions={{
		classes: {
			error: 'text-base bg-destructive border-destructive text-destructive-foreground'
		}
	}}
/>

<div class="relative flex min-h-dvh flex-col bg-background">
	<Navbar />
	<div class="flex-1">
		<slot></slot>
	</div>
</div>
