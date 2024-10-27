<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { passwordSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	import { Loader2, Eye, EyeOff, KeyRound } from 'lucide-svelte';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(passwordSchema),
		resetForm: true,
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

	$: hideCurrent = true;
	$: hideNew = true;
</script>

<form action="?/updatePassword" method="POST" use:enhance>
	<div class="flex flex-col gap-2 space-y-2">
		<Form.Field {form} name="currentPassword">
			<Form.Control let:attrs>
				<Form.Label>Current Password</Form.Label>
				<div class="relative w-full max-w-sm">
					<Input
						{...attrs}
						bind:value={$formData.currentPassword}
						placeholder="Current Password"
						class="placeholder:text-muted-foreground/80"
						type={hideCurrent ? 'password' : 'text'}
					/>
					<Form.Button
						variant="outline"
						size="icon"
						class="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-muted-foreground"
						type="button"
						on:click={() => (hideCurrent = !hideCurrent)}
						>{#if hideCurrent}<Eye class="h-4 w-4" />{:else}<EyeOff
								class="h-4 w-4"
							/>{/if}</Form.Button
					>
				</div>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="newPassword">
			<Form.Control let:attrs>
				<Form.Label>New Password</Form.Label>
				<div class="relative w-full max-w-sm">
					<Input
						{...attrs}
						bind:value={$formData.newPassword}
						placeholder="New Password"
						class="placeholder:text-muted-foreground/80"
						type={hideNew ? 'password' : 'text'}
					/>
					<Form.Button
						variant="outline"
						size="icon"
						class="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-muted-foreground"
						type="button"
						on:click={() => (hideNew = !hideNew)}
						>{#if hideNew}<Eye class="h-4 w-4" />{:else}<EyeOff class="h-4 w-4" />{/if}</Form.Button
					>
				</div>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Button type="submit" class="w-44"
			>{#if $submitting}<Loader2 class="mr-2 h-4 w-4 animate-spin" />{:else}<KeyRound
					class="mr-2 h-4 w-4"
				/>{/if}Update Password</Form.Button
		>
	</div>
</form>
