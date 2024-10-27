<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import Voltaire from '$lib/logos/voltaire-logo.svelte';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { LogOut } from 'lucide-svelte';
	import { getUserAvatar } from '$lib/utils';
	import { UserCog, Cog, Users, BellRing } from 'lucide-svelte';
	import { type User } from 'lucia';

	$: user = $page.data.user as User;
	$: session = $page.data.session;

	let logoutForm: HTMLFormElement;

	const siteLinks = [
		{ name: 'Dashboard', path: '/dashboard', authOnly: true },
		{ name: 'Explore', path: '/explore', authOnly: true },
		{ name: 'My Clubs', path: '/clubs', authOnly: true }
	];
</script>

<nav
	class="sticky top-0 z-50 hidden justify-around px-12 backdrop-blur supports-[backdrop-filter]:bg-border/60 md:flex md:items-center md:border-b md:border-muted md:px-32 md:py-4 lg:px-64"
>
	<div class="flex items-center gap-6">
		<div class="flex items-center gap-2">
			<Button variant="ghost" href="/" class="text-primary">
				<Voltaire class="-mr-1 h-8 w-8" stroke="currentColor" />
				<span class="text-3xl font-bold leading-3 tracking-tight">oltaire</span>
			</Button>
		</div>
	</div>
	<div class="flex flex-row gap-3">
		{#each siteLinks as link}
			{#if link.authOnly && session && user}
				<div class="flex items-center text-sm">
					<a
						href={link.path}
						class={cn('text-muted-foreground', buttonVariants({ variant: 'ghost' }))}>{link.name}</a
					>
				</div>
			{/if}
		{/each}
	</div>
	<div class="flex flex-row gap-3">
		<ThemeSwitcher />
		{#if user && session}
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<div
						class="rounded-md border border-muted bg-background p-2 text-muted-foreground transition-transform hover:scale-110"
					>
						<svelte:component this={getUserAvatar(user)} class="h-6 w-6" strokeWidth="1.5" />
					</div>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Label class="w-40 truncate font-bold text-primary"
							>{user.username}</DropdownMenu.Label
						>
						<DropdownMenu.Separator />

						<DropdownMenu.Item class="text-muted-foreground" href="/settings/profile"
							><UserCog class="mr-2 h-4 w-4" />Profile</DropdownMenu.Item
						>
						<DropdownMenu.Item class="text-muted-foreground" href="/settings/account"
							><Cog class="mr-2 h-4 w-4" />Account</DropdownMenu.Item
						>
						<DropdownMenu.Item class="text-muted-foreground" href="/clubs"
							><Users class="mr-2 h-4 w-4" />My Clubs</DropdownMenu.Item
						>
						<DropdownMenu.Item class="text-muted-foreground" href="/notifications"
							><BellRing class="mr-2 h-4 w-4" />Notifications</DropdownMenu.Item
						>
					</DropdownMenu.Group>
					<DropdownMenu.Group>
						<DropdownMenu.Separator />
						<form
							action="/auth?/logout"
							method="post"
							id="logout"
							bind:this={logoutForm}
							use:enhance
						>
							<DropdownMenu.Item
								on:click={() => logoutForm.requestSubmit()}
								class="text-destructive"
							>
								<LogOut class="mr-2 h-4 w-4" />
								<span>Logout</span>
							</DropdownMenu.Item>
						</form>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		{:else}
			<Button variant="outline" class="border border-muted text-primary" href="/auth/signup"
				>Sign Up</Button
			>
			<Button variant="default" href="/auth/login">Login</Button>
		{/if}
	</div>
</nav>
