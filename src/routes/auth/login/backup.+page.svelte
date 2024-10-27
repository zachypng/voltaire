<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import Discord from '$lib/logos/Discord.svelte';
	import GitHub from '$lib/logos/GitHub.svelte';
	import Google from '$lib/logos/Google.svelte';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';

	export let form;
	$: if (form?.error) {
		toast.error(form.error, {
			duration: 10000
		});
	}
	$: login = '';
</script>

<div class="flex w-full">
	<Card.Root class="mx-auto my-12 w-full max-w-xl border-muted">
		<Card.Header class="space-y-1">
			<Card.Title class="text-2xl text-primary">Login</Card.Title>
			<Card.Description>Select the provider you used to create your account</Card.Description>
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
					<Label for="email">Email or username</Label>
					<Input id="email" type="text" name="email" bind:value={login} />
					<Input id="username" type="hidden" name="username" bind:value={login} />
				</div>
				<div class="grid gap-2">
					<Label for="password">Password</Label>
					<Input id="password" type="password" name="password" />
				</div>
				<div class="grid gap-2">
					<Button class="w-full " type="submit">Login</Button>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="relative flex justify-center text-xs">
			<span class="text-center text-primary"
				>Don't have an account?<br />
				<a href="/auth/signup" class="text-tertiary text-center underline underline-offset-4"
					>Sign Up</a
				></span
			>
		</Card.Footer>
	</Card.Root>
</div>
