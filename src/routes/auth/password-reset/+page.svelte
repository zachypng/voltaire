<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import type { PageData } from './$types';
	import PasswordResetForm from '$lib/forms/passwordReset/requestForm.svelte';

	export let data: PageData;
</script>

<div class="flex w-full">
	<Card.Root class="mx-auto my-12 w-full max-w-xl border-muted">
		<Card.Header class="space-y-1">
			<Card.Title class="text-2xl text-primary">Password Reset</Card.Title>
			<Card.Description
				>Please enter the email address associate with your Voltaire account.</Card.Description
			>
		</Card.Header>
		<Card.Content class="grid gap-4">
			<Separator />
			<PasswordResetForm data={data.passwordResetForm} />
		</Card.Content>
		<Card.Footer class="relative flex justify-center text-xs">
			<span class="text-center text-primary"
				>Changed your mind?<br />
				<a href="/auth/login" class="text-tertiary text-center underline underline-offset-4"
					>Login</a
				></span
			>
		</Card.Footer>
	</Card.Root>
</div>
