<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import type { PageData } from './$types';
	import UsernameForm from '$lib/forms/username/form.svelte';
	import AvatarForm from '$lib/forms/avatar/form.svelte';

	export let data: PageData;
</script>

<div class="flex-1 lg:max-w-2xl">
	<div class="space-y-6">
		<h3 class="text-lg font-medium">Profile</h3>
		<p class="text-sm text-muted-foreground">This is how you will appear to others on the site.</p>
		<Separator />
		<UsernameForm data={data.usernameForm} user={data.user} />
		<AvatarForm data={data.avatarForm} user={data.user} />
	</div>
</div>
