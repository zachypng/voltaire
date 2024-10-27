<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import SignupForm from '$lib/forms/signup/form.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex w-full">
	<Card.Root class="mx-auto my-12 w-full max-w-xl border-muted">
		<Card.Header class="space-y-1">
			<Card.Title class="text-2xl text-primary">Create an account</Card.Title>
			<Card.Description>Enter your information below to create your account</Card.Description>
		</Card.Header>
		<Card.Content class="grid gap-4">
			<!-- <div class="grid grid-cols-3 gap-6">
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
			</div> -->
			<Separator />
			<SignupForm data={data.signupForm} />
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
