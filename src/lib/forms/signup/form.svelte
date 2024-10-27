<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { signupSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Loader2, Eye, EyeOff } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { avatars } from '$lib/utils';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(signupSchema),
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

	$: hide = true;
	$: selectedAvatar = $formData.avatar;
</script>

<form action="?/signup" method="POST" use:enhance>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input
				{...attrs}
				bind:value={$formData.email}
				placeholder={'email@example.com'}
				class="w-full  placeholder:text-muted-foreground/80"
			/>
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="username">
		<Form.Control let:attrs>
			<Form.Label>Username</Form.Label>
			<Input
				{...attrs}
				bind:value={$formData.username}
				class="w-full  placeholder:text-muted-foreground/80"
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
					class="placeholder:text-muted-foreground/80"
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
	<Form.Field {form} name="confirm">
		<Form.Control let:attrs>
			<Form.Label>Confirm Password</Form.Label>
			<div class="relative w-full">
				<Input
					{...attrs}
					bind:value={$formData.confirm}
					class="placeholder:text-muted-foreground/80"
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
	<Form.Field {form} name="avatar">
		<Form.Control let:attrs>
			<Form.Label>Avatar</Form.Label>
			<Input {...attrs} bind:value={selectedAvatar} type="hidden" />
			<div class="flex w-full columns-4 flex-wrap gap-2">
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
	<Form.Button type="submit" class="mt-4 w-full"
		>{#if $submitting}<Loader2 class="mr-2 h-4 w-4 animate-spin" />{/if}Sign Up</Form.Button
	>
</form>
