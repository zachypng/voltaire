<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { avatarSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Loader2, Image } from 'lucide-svelte';
	import type { User } from 'lucia';
	import { avatars } from '$lib/utils';
	import { toast } from 'svelte-sonner';

	export let data: SuperValidated<Infer<FormSchema>>;
	export let user: User;

	const form = superForm(data, {
		validators: zodClient(avatarSchema),
		resetForm: false,
		onUpdated({ form }) {
			if (form.message) {
				if (form.message.type === 'success') {
					toast.success(form.message.text);
				} else {
					toast.error(form.message.text);
				}
			}
		}
	});

	const { form: formData, enhance, delayed } = form;

	$formData.avatar = user.avatar as typeof $formData.avatar;

	$: selectedAvatar = $formData.avatar;
</script>

<form method="POST" action="?/updateAvatar" use:enhance>
	<div class="flex flex-col gap-2 space-y-2">
		<Form.Field {form} name="avatar">
			<Form.Control let:attrs>
				<Form.Label>Avatar</Form.Label>
				<Input {...attrs} bind:value={selectedAvatar} type="hidden" />
				<div class="flex columns-4 flex-wrap gap-2">
					{#each avatars as avatar}
						<div class="flex-1 basis-1/4">
							<Button
								class="w-full text-muted-foreground transition-all hover:scale-110 hover:bg-primary dark:hover:bg-accent {selectedAvatar ===
								avatar.name
									? 'bg-primary text-primary-foreground ring-2 ring-muted dark:bg-accent'
									: ''}"
								variant="outline"
								size="icon"
								on:click={() => ($formData.avatar = avatar.name)}
							>
								<svelte:component this={avatar.icon} class="h-8 w-8" strokeWidth="1.5" />
							</Button>
						</div>
					{/each}
				</div>
			</Form.Control>

			<Form.FieldErrors />
		</Form.Field>
		<Form.Button type="submit" class="w-44"
			>{#if $delayed}<Loader2 class="mr-2 h-4 w-4 animate-spin" />{:else}<Image
					class="mr-2 h-4 w-4"
				/>{/if}Update Avatar</Form.Button
		>
	</div>
</form>
