<script lang="ts">
	import { mode } from 'mode-watcher';
	import LogoLight from '$lib/logos/voltaire_light.svelte';
	import LogoDark from '$lib/logos/voltaire_dark.svelte';
	import { page } from '$app/stores';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Resizable from '$lib/components/ui/resizable';
	import { House } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { Icon } from 'lucide-svelte';
	import Voltaire from '$lib/logos/voltaire-logo.svelte';

	$: activePath = $page.url.pathname;
	export let isCollapsed: boolean = false;

	function onLayoutChange(sizes: number[]) {
		document.cookie = `PaneForge:layout=${JSON.stringify(sizes)}`;
	}

	function onCollapse() {
		isCollapsed = true;
		document.cookie = `PaneForge:collapsed=${true}`;
	}

	function onExpand() {
		isCollapsed = false;
		document.cookie = `PaneForge:collapsed=${false}`;
	}
</script>

<!-- <aside class="left-0 z-10 w-14 border-r bg-border/40">
	<nav class="items-center gap-4 px-2 sm:py-5">
		<a href="/" class="group flex h-9 w-9 items-center justify-center rounded md:h-16 md:w-16">
			{#if $mode === 'light'}
				<LogoDark class="h-24 w-24 transition-all group-hover:scale-110" />
			{:else}
				<LogoLight class="h-16 w-16 transition-all group-hover:scale-110" />
			{/if}
			<span class="sr-only">Voltaire</span>
		</a>
		<Tooltip.Root>
			<Tooltip.Trigger>
				<a
					href="/"
					class="flex h-9 w-9 items-center justify-center rounded {activePath === '/'
						? 'bg-background text-accent'
						: 'hover:bg-primary/10'} transition-colors hover:text-foreground md:h-8 md:w-8"
				>
					<House class="h-5 w-5" />
					<span class="sr-only">Home</span>
				</a>
			</Tooltip.Trigger>
			<Tooltip.Content side="right">
				<p>Home</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</nav>
</aside> -->

<div class="hidden md:block">
	<Resizable.PaneGroup
		direction="horizontal"
		class="h-full max-h-[800px] items-stretch"
		{onLayoutChange}
	>
		<Resizable.Pane
			defaultSize={265}
			collapsedSize={4}
			collapsible
			minSize={15}
			maxSize={15}
			{onCollapse}
			{onExpand}
		>
			<div class={cn('flex h-[52px] align-middle ', isCollapsed ? 'h-[52px]' : '')}>
				{#if $mode === 'light'}
					<Button variant="outline" class="group flex items-center gap-2">
						<LogoDark class="h-24 w-24 transition-all group-hover:scale-110" />
						<h1 class="align-middle text-3xl font-bold {isCollapsed ? 'hidden' : ''}">Voltaire</h1>
					</Button>
				{:else}
					<div
						class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"
					>
						<Button variant="ghost" class="group flex w-full items-center gap-2">
							<Voltaire class="mr-2 h-8 w-8 transition-all group-hover:scale-110" />
							{#if !isCollapsed}
								<h1 class="align-middle text-3xl font-bold {isCollapsed ? 'hidden' : ''}">
									Voltaire
								</h1>
							{/if}
						</Button>
					</div>
				{/if}
			</div>
		</Resizable.Pane>
		<Resizable.Handle />
		<Resizable.Pane>Two</Resizable.Pane>
	</Resizable.PaneGroup>
</div>

<div data-collapsed={isCollapsed} class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
	<nav
		class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"
	>
		<!-- {#each routes as route} -->
		{#if isCollapsed}
			<Tooltip.Root openDelay={0}>
				<Tooltip.Trigger asChild let:builder>
					<Button
						href="#"
						builders={[builder]}
						variant="default"
						size="icon"
						class={cn(
							'size-9',
							'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
						)}
					>
						<!-- <svelte:component this={route.icon} class="size-4" aria-hidden="true" /> -->
						<House class="size-4" aria-hidden="true" />
						<span class="sr-only">Home</span>
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content side="right" class="flex items-center gap-4">
					Home
					<!-- {#if route.label}
						<span class="ml-auto text-muted-foreground">
							{route.label}
						</span>
					{/if} -->
				</Tooltip.Content>
			</Tooltip.Root>
		{:else}
			<Button
				href="#"
				variant="default"
				size="sm"
				class={cn(
					'justify-start',
					'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white'
				)}
			>
				<!-- <svelte:component this={route.icon} class="mr-2 size-4" aria-hidden="true" /> -->
				<House class="mr-2 size-4" aria-hidden="true" />
				Home
				<!-- {#if route.label}
					<span
						class={cn('ml-auto', {
							'text-background dark:text-white': route.variant === 'default'
						})}
					>
						{route.label}
					</span>
				{/if} -->
			</Button>
		{/if}
		<!-- {/each} -->
	</nav>
</div>
