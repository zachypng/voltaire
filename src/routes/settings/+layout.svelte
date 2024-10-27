<script>
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/stores';
</script>

<div class="container mt-4 rounded-md">
	<div class="hidden space-y-6 p-10 pb-16 md:block">
		<div class="space-y-0.5">
			<h2 class="text-2xl font-bold tracking-tight">Settings</h2>
			<p class="text-muted-foreground">Manage your profile and account settings.</p>
		</div>
		<Separator />
		<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
			<aside class="-mx-4 lg:w-1/5">
				<nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
					<Button
						variant="ghost"
						href="/settings/profile"
						class="justify-start {$page.url.pathname === '/settings/profile' ? 'bg-muted' : ''}"
						>Profile</Button
					>
					<Button
						variant="ghost"
						href="/settings/account"
						class="justify-start {$page.url.pathname === '/settings/account' ? 'bg-muted' : ''}"
						>Account</Button
					>
					<Button variant="ghost" href="/notifications" class="justify-start">Notifications</Button>
				</nav>
			</aside>
			<slot />
		</div>
	</div>
</div>
