<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import type { PageData } from './$types';
	import LoginForm from '$lib/forms/login/form.svelte';

	export let data: PageData;
</script>

<div class="flex w-full">
	<Card.Root class="mx-auto my-12 w-full max-w-xl border-muted">
		<Card.Header class="space-y-1">
			<Card.Title class="text-2xl text-primary">Login</Card.Title>
			<Card.Description>Enter your account information below to login to Voltaire</Card.Description>
		</Card.Header>
		<Card.Content class="grid gap-4">
			<Separator />
			<LoginForm data={data.loginForm} />
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
