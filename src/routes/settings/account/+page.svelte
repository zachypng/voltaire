<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import type { PageData } from './$types';
	import EmailForm from '$lib/forms/email/form.svelte';
	import PasswordForm from '$lib/forms/password/form.svelte';
	import DeleteAccount from '$lib/forms/deleteAccount/form.svelte';

	export let data: PageData;
</script>

<div class="flex-1 lg:max-w-2xl">
	<div class="space-y-6">
		<h3 class="text-lg font-medium">Account</h3>
		<p class="text-sm text-muted-foreground">
			This is your personal account info used to sign in and manage your account.
		</p>
		<Separator />
		<EmailForm data={data.emailForm} user={data.user} />
		<Separator />
		<h3 class="text-lg font-medium">Change Password</h3>
		<PasswordForm data={data.passwordForm} />
		<Separator />
		<h3 class="text-lg font-medium">Delete Account</h3>
		<DeleteAccount data={data.deleteAccountForm} />
	</div>
</div>
