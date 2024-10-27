<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { emailSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { type User } from 'lucia';
	import { Loader2, Eye, EyeOff, Mail } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	export let data: SuperValidated<Infer<FormSchema>>;
	export let user: User;

	const form = superForm(data, {
		validators: zodClient(emailSchema),
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

	$: blur = true;
</script>

<form action="?/updateEmail" method="POST" use:enhance>
	<div class="flex flex-col gap-2 space-y-2">
		<Form.Field {form} name="email">
			<Form.Control let:attrs>
				<Form.Label>Email</Form.Label>
				<div class="relative w-full max-w-sm">
					<Input
						{...attrs}
						bind:value={$formData.email}
						placeholder={user.email}
						class="placeholder:text-muted-foreground/80 {blur ? 'placeholder:blur-sm' : ''}"
					/>
					<Form.Button
						variant="outline"
						size="icon"
						class="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-muted-foreground"
						type="button"
						on:click={() => (blur = !blur)}
						>{#if blur}<Eye class="h-4 w-4" />{:else}<EyeOff class="h-4 w-4" />{/if}</Form.Button
					>
				</div>
			</Form.Control>

			<Form.FieldErrors />
			<Form.Button type="submit" class="w-44"
				>{#if $submitting}<Loader2 class="mr-2 h-4 w-4 animate-spin" />{:else}<Mail
						class="mr-2 h-4 w-4"
					/>{/if}Update Email</Form.Button
			>
		</Form.Field>
	</div>
</form>
