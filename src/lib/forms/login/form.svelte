<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { loginSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Loader2, EyeOff, Eye } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(loginSchema),
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

	$: hide = true;
</script>

<form action="?/login" method="POST" use:enhance>
	<div class="flex flex-col gap-2 space-y-2">
		<Form.Field {form} name="username">
			<Form.Control let:attrs>
				<Form.Label>Email or username</Form.Label>
				<Input
					{...attrs}
					bind:value={$formData.username}
					on:change={() => ($formData.email = $formData.username)}
					class="w-full placeholder:text-muted-foreground/80"
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="password">
			<Form.Control let:attrs>
				<Form.Label>Password</Form.Label>
				<div class="relative w-full">
					<Input
						{...attrs}
						bind:value={$formData.password}
						class="placeholder:text-muted-foreground/80 {hide
							? 'text-lg font-bold tracking-wider'
							: ''}"
						type={hide ? 'password' : 'text'}
					/>
					<Form.Button
						variant="outline"
						size="icon"
						class="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-muted-foreground"
						type="button"
						on:click={() => (hide = !hide)}
						>{#if hide}<Eye class="h-4 w-4" />{:else}<EyeOff class="h-4 w-4" />{/if}</Form.Button
					>
				</div>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="email">
			<Form.Control let:attrs>
				<Input
					{...attrs}
					bind:value={$formData.email}
					class="w-full placeholder:text-muted-foreground/80"
					type="hidden"
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Button type="submit"
			>{#if $submitting}<Loader2 class="mr-2 h-4 w-4 animate-spin" />{/if}Login</Form.Button
		>
	</div>
</form>
