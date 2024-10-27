<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { buttonVariants } from '$lib/components/ui/button';
	import { deleteAccountSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Loader2, Trash2 } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(deleteAccountSchema),
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

	const { form: formData, enhance, submitting } = form;

	$: open = false;
</script>

<Dialog.Root bind:open>
	<div class="flex flex-col gap-2 space-y-2">
		<p class="text-sm text-muted-foreground">This will permanently delete your account.</p>
		<Dialog.Trigger class={buttonVariants({ variant: 'destructive' }) + ' w-44'}
			><Trash2 class="mr-2 h-4 w-4" />Delete Account</Dialog.Trigger
		>
	</div>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Are you absolutely sure?</Dialog.Title>
			<Dialog.Description>
				This action cannot be undone. This will permanently delete your account and remove your data
				from our servers.
			</Dialog.Description>
		</Dialog.Header>
		<p class="text-sm text-muted-foreground">
			Enter <span class="rounded border border-muted bg-muted/60 p-1 text-destructive"
				>delete-me</span
			> to confirm account deletion.
		</p>
		<form action="?/deleteAccount" method="POST" id="delete-account" use:enhance>
			<Form.Field {form} name="confirm">
				<Form.Control let:attrs>
					<Input
						{...attrs}
						bind:value={$formData.confirm}
						type="text"
						class="w-full placeholder:text-muted-foreground/80"
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Dialog.Footer class="mt-4 flex">
				<Form.Button
					variant="outline"
					class="basis-1/3"
					type="button"
					on:click={() => (open = false)}>Cancel</Form.Button
				>
				<Form.Button variant="destructive" class="basis-2/3" type="submit" form="delete-account"
					>{#if $submitting}<Loader2 class="mr-2 h-4 w-4 animate-spin" />{/if}Delete</Form.Button
				>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
