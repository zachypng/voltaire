import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import type { User } from 'lucia';
import type { ComponentType } from 'svelte';
import type { Icon } from 'lucide-svelte';

import {
	Bird,
	Cat,
	Dog,
	Fish,
	Origami,
	Rabbit,
	Rat,
	Snail,
	Squirrel,
	Turtle,
	User as UserIcon,
	Worm
} from 'lucide-svelte';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export type Avatar = {
	name:
		| 'bird'
		| 'cat'
		| 'dog'
		| 'fish'
		| 'origami'
		| 'rabbit'
		| 'rat'
		| 'snail'
		| 'squirrel'
		| 'turtle'
		| 'user'
		| 'worm';
	icon: ComponentType<Icon>;
};

export const avatars: Avatar[] = [
	{
		name: 'bird',
		icon: Bird
	},
	{
		name: 'cat',
		icon: Cat
	},
	{
		name: 'dog',
		icon: Dog
	},
	{
		name: 'fish',
		icon: Fish
	},
	{
		name: 'origami',
		icon: Origami
	},
	{
		name: 'rabbit',
		icon: Rabbit
	},
	{
		name: 'rat',
		icon: Rat
	},
	{
		name: 'snail',
		icon: Snail
	},
	{
		name: 'squirrel',
		icon: Squirrel
	},
	{
		name: 'turtle',
		icon: Turtle
	},
	{
		name: 'user',
		icon: UserIcon
	},
	{
		name: 'worm',
		icon: Worm
	}
];

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

export function getUserAvatar(user: User) {
	const avatar = avatars.find((avatar) => avatar.name === user.avatar);
	if (!avatar) {
		return UserIcon;
	}
	return avatar.icon;
}
