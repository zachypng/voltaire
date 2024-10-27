<script lang="ts">
	import {
		Html,
		Head,
		Preview,
		Heading,
		Link,
		Text,
		Button,
		Section,
		Container
	} from 'svelte-email';

	export let preview: string;
	export let resetURL: string;
	export let user: string;

	const fontFamily =
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';

	const styles = {
		heading: {
			fontFamily,
			fontSize: '32px',
			lineHeight: '1.3',
			fontWeight: '700',
			color: '#484848'
		},
		headingFooter: {
			fontFamily,
			fontSize: '32px',
			lineHeight: '1.3',
			fontWeight: '700',
			color: '#fff',
			textAlign: 'center' as const,
			margin: 'auto 0 auto 0'
		},
		paragraph: {
			fontFamily,
			fontSize: '18px',
			lineHeight: '1.4',
			color: '#484848'
		},
		paragraphExtraPadding: {
			fontFamily,
			fontSize: '18px',
			lineHeight: '1.4',
			color: '#484848',
			padding: '18px 0 0 0'
		},
		button: {
			fontFamily,
			backgroundColor: '#3a5a40',
			borderRadius: '6px',
			color: '#fff',
			fontSize: '18px',
			textDecoration: 'none',
			textAlign: 'center' as const,
			display: 'block',
			width: '100%',
			padding: '12px 0 12px 0',
			margin: 'auto 0 auto 0'
		},
		main: {
			backgroundColor: '#dad7cd',
			padding: '36px 18px 36px 18px'
		},
		footer: {
			backgroundColor: '#3a5a40',
			padding: '0 18px 0 18px',
			margin: 'auto',
			color: '#fff'
		},
		padding: {
			padding: '36px 18px 36px 18px'
		}
	};
</script>

<Html>
	<Head />
	<Preview {preview}></Preview>
	<Section style={styles.main}>
		<Container style={styles.padding}>
			<Heading style={styles.heading}>Password Reset</Heading>
			<Text style={styles.paragraph}>Hey there, {user}</Text>
			<Text style={styles.paragraph}>Click the button below to reset your password.</Text>
			<Button style={styles.button} href={resetURL}>Reset Password</Button>
			<Text style={styles.paragraphExtraPadding}
				>If you did not request a password reset, please ignore this email.</Text
			>
		</Container>
	</Section>
	<Section style={styles.footer}>
		<Container style={styles.padding}>
			<Heading style={styles.headingFooter}
				><Link href="https://voltaire.club" style={styles.headingFooter}>Voltaire</Link></Heading
			>
		</Container>
	</Section>
</Html>
