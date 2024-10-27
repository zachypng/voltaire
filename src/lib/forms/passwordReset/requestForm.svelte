<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { passwordResetSchema, type FormSchema } from './requestSchema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Loader2, Eye, EyeOff, KeyRound } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(passwordResetSchema),
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

<form action="?/requestReset" method="POST" use:enhance>
	<div class="flex flex-col gap-2 space-y-2">
		<Form.Field {form} name="email">
			<Form.Control let:attrs>
				<Form.Label>Email</Form.Label>
				<div class="relative w-full">
					<Input {...attrs} bind:value={$formData.email} />
				</div>
			</Form.Control>
			<Form.FieldErrors />
			<Form.Button type="submit" class="w-full"
				>{#if $submitting}<Loader2 class="mr-2 h-4 w-4 animate-spin" />{:else}<KeyRound
						class="mr-2 h-4 w-4"
					/>{/if}Request Password Reset</Form.Button
			>
		</Form.Field>
	</div>
</form>
