<script lang="ts">
	import { Icon, type IconNode } from 'lucide-svelte';

	const iconNode: IconNode = [
		['path', { d: 'M12 22L7 3' }],
		['path', { d: 'M11 3L15.4737 20' }],
		[
			'path',
			{
				d: 'M3 3L7.51493 21.0597C7.78283 22.1313 8.8687 22.7828 9.94028 22.5149L14.8698 21.2825C15.5683 21.1079 16.1191 20.5713 16.3118 19.8775L21 3'
			}
		]
	];
</script>

<!-- <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 22L7 3" stroke="black" stroke-width="2" stroke-linecap="round"/>
<path d="M11 3L15.4737 20" stroke="black" stroke-width="2" stroke-linecap="round"/>
<path d="M3 3L7.51493 21.0597C7.78283 22.1313 8.8687 22.7828 9.94028 22.5149L14.8698 21.2825C15.5683 21.1079 16.1191 20.5713 16.3118 19.8775L21 3" stroke="black" stroke-width="2" stroke-linecap="round"/>
</svg> -->

<!-- <svg
	width="24"
	height="24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	stroke="currentColor"
	viewBox="0 0 24 24"
	stroke-width="2"
	stroke-linecap="round"
	><path
		d="M12 22 7 3M11 3l4.474 17M3 3l4.515 18.06a2 2 0 0 0 2.425 1.455l4.93-1.233a2 2 0 0 0 1.442-1.404L21 3"
	/></svg
> -->

<Icon name="voltaire" {iconNode} {...$$props}>
	<slot />
</Icon>
