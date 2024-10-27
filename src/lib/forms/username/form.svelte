<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { usernameSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { type User } from 'lucia';
	import { Loader2, User as UserIcon } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	export let data: SuperValidated<Infer<FormSchema>>;
	export let user: User;

	const form = superForm(data, {
		validators: zodClient(usernameSchema),
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

	const { form: formData, enhance, submitting } = form;
</script>

<form action="?/updateUsername" method="POST" use:enhance>
	<div class="flex flex-col gap-2 space-y-2">
		<Form.Field {form} name="username">
			<Form.Control let:attrs>
				<Form.Label>Username</Form.Label>
				<Input
					{...attrs}
					bind:value={$formData.username}
					placeholder={user.username}
					class="w-full max-w-sm placeholder:text-muted-foreground/80"
				/>
			</Form.Control>
			<Form.FieldErrors />
			<Form.Button type="submit" class="w-44"
				>{#if $submitting}<Loader2 class="mr-2 h-4 w-4 animate-spin" />{:else}<UserIcon
						class="mr-2 h-4 w-4"
					/>{/if}Update Username</Form.Button
			>
		</Form.Field>
	</div>
</form>
