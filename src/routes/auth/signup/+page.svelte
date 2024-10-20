<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import Discord from '$lib/logos/Discord.svelte';
	import GitHub from '$lib/logos/GitHub.svelte';
	import Google from '$lib/logos/Google.svelte';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import {
		Bird,
		Cat,
		Dog,
		Fish,
		Origami,
		Rabbit,
		Rat,
		Snail,
		Squirrel,
		Turtle,
		User,
		Worm
	} from 'lucide-svelte';
	import type { ComponentType } from 'svelte';
	import type { Icon } from 'lucide-svelte';

	type Avatar = {
		name: string;
		icon: ComponentType<Icon>;
	};

	const avatars: Avatar[] = [
		{
			name: 'bird',
			icon: Bird
		},
		{
			name: 'cat',
			icon: Cat
		},
		{
			name: 'dog',
			icon: Dog
		},
		{
			name: 'fish',
			icon: Fish
		},
		{
			name: 'origami',
			icon: Origami
		},
		{
			name: 'rabbit',
			icon: Rabbit
		},
		{
			name: 'rat',
			icon: Rat
		},
		{
			name: 'snail',
			icon: Snail
		},
		{
			name: 'squirrel',
			icon: Squirrel
		},
		{
			name: 'turtle',
			icon: Turtle
		},
		{
			name: 'user',
			icon: User
		},
		{
			name: 'worm',
			icon: Worm
		}
	];

	export let form;
	$: if (form?.error) {
		toast.error(form.error, {
			duration: 10000
		});
	}
	$: selectedAvatar = 'user';
</script>

<div class="flex w-full">
	<Card.Root class="mx-auto my-12 w-full max-w-xl border-muted">
		<Card.Header class="space-y-1">
			<Card.Title class="text-2xl text-primary">Create an account</Card.Title>
			<Card.Description>Enter your email below to create your account</Card.Description>
		</Card.Header>
		<Card.Content class="grid gap-4">
			<div class="grid grid-cols-3 gap-6">
				<Button variant="outline" disabled>
					<Discord class="mr-2 h-4 w-4" stroke="none" />
					Discord
				</Button>
				<Button variant="outline" disabled>
					<GitHub class="mr-2 h-4 w-4" stroke="none" />
					GitHub
				</Button>
				<Button variant="outline" disabled>
					<Google class="mr-2 h-4 w-4" stroke="none" />
					Google
				</Button>
			</div>
			<div class="relative">
				<div class="absolute inset-0 flex items-center">
					<span class="w-full border-t border-muted" />
				</div>
				<div class="relative flex justify-center text-xs uppercase">
					<span class="bg-card px-2 text-muted-foreground"> Or continue with </span>
				</div>
			</div>
			<form method="post" use:enhance class="grid gap-4">
				<div class="grid gap-2">
					<Label for="email" class="text-primary"
						>Email <span class="text-destructive">*</span></Label
					>
					<Input
						id="email"
						type="email"
						name="email"
						placeholder="m@example.com"
						class="placeholder:text-muted-foreground/80"
					/>
				</div>
				<div class="grid gap-2">
					<Label for="password" class="text-primary"
						>Password <span class="text-destructive">*</span></Label
					>
					<Input id="password" type="password" name="password" />
				</div>
				<div class="grid gap-2">
					<Label for="username" class="text-primary"
						>Username <span class="text-destructive">*</span></Label
					>
					<Input id="username" type="text" name="username" />
				</div>
				<div class="grid gap-2">
					<Label for="avatar" class="text-primary">Avatar</Label>
					<Input id="avatar" type="hidden" name="avatar" bind:value={selectedAvatar} />
					<div class="flex columns-4 flex-wrap gap-2">
						{#each avatars as avatar}
							<div class="flex-1 basis-1/4">
								<Button
									class="w-full text-muted-foreground transition-transform hover:scale-110 {selectedAvatar ===
									avatar.name
										? 'bg-accent text-primary-foreground ring-2 ring-accent'
										: ''}"
									variant="outline"
									size="icon"
									on:click={() => (selectedAvatar = avatar.name)}
								>
									<svelte:component this={avatar.icon} class="h-8 w-8" strokeWidth="1.5" />
								</Button>
							</div>
						{/each}
					</div>
				</div>
				<div class="mt-8 grid gap-2">
					<Button class="w-full " type="submit">Create account</Button>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="relative flex justify-center text-xs">
			<span class="text-center text-primary"
				>Already have an account?<br />
				<a href="/login" class="text-tertiary text-center underline underline-offset-4">Login</a
				></span
			>
		</Card.Footer>
	</Card.Root>
</div>
