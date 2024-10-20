<script lang="ts">
	import Voltaire from '$lib/logos/voltaire-logo.svelte';
	import { BackgroundBeams } from '$lib/components/ui/BackgroundBeams';
	import Typewriter from 'svelte-typewriter';

	const quote =
		'Let us read, and let us dance; these two amusements will never do any harm to the world.';
	const quotes = [
		'Let us read, and let us dance; these two amusements will never do any harm to the world.',
		'Life is a shipwreck, but we must not forget to sing in the lifeboats.',
		'The more I read, the more I acquire, the more certain I am that I know nothing.',
		'The secret of being a bore is to tell everything.',
		"I don't know where I am going, but I am on my way.",
		'Judge a man by his questions rather than by his answers.',
		'Dare to think for yourself.'
	];
</script>

<div class="relative overflow-hidden py-24">
	<!-- Gradient -->
	<!-- <div class="absolute -top-96 start-1/2 flex -translate-x-1/2 transform bg-fixed">
		<div
			class="to background h[44rem] w-[25rem] -translate-x-[10rem] rotate-[-60deg] transform bg-gradient-to-r from-background/50 blur-3xl"
		/>
		<div
			class="h-[50rem] w-[90rem] origin-top-left -translate-x-[15rem] -rotate-12 rounded-full bg-gradient-to-tl from-primary-foreground via-primary-foreground to-background blur-3xl"
		/>
	</div> -->
	<BackgroundBeams />

	<!-- Content -->
	<div class="relative z-10">
		<div class="container py-10 lg:py-16">
			<div class="mx-auto max-w-2xl text-center">
				<div class="mt-5 max-w-2xl">
					<div class="inline-flex items-center justify-center text-7xl text-primary lg:text-9xl">
						<Voltaire class="-mr-1 h-16 w-16 lg:h-32 lg:w-32" stroke="currentColor" />
						<span class="font-bold leading-3 tracking-tight">oltaire</span>
					</div>
					<h1
						class="sr-only scroll-m-20 text-7xl font-extrabold tracking-tight text-muted-foreground lg:text-9xl"
					>
						Voltaire
					</h1>
					<!-- <p class="text-xl text-muted-foreground">Virtual book clubs, made simple.</p> -->
				</div>
				<div class="mt-5 min-h-24 max-w-3xl">
					<!-- <p class="text-lg text-accent">
						“Let us read, and let us dance; these two amusements will never do any harm to the
						world.”
					</p> -->
					<Typewriter mode="loop" delay={200} wordInterval={4000} unwriteInterval={15}>
						{#each quotes as quote}
							<p class="text-lg text-muted-foreground dark:text-accent">{quote}</p>
						{/each}
					</Typewriter>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	div {
		--cursor-color: currentColor;
	}
</style>
