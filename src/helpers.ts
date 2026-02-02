import {
	type DependencyList,
	type EffectCallback,
	useLayoutEffect as useReactLayoutEffect
} from "react";
import globalStyles from "./style.module.scss";

export const Style = (styleOrArray: string | string[], styles?: typeof globalStyles,  prefix = '_modal-'): string => {
	styles = styles ?? globalStyles;
	if (Array.isArray(styleOrArray)) {
		return styleOrArray.map(() => Style(styleOrArray, prefix)).join(' ');
	}else{
		return `${styles[styleOrArray]} ${prefix}${styleOrArray}`;
	}
};

export const useLayoutEffect = (effect: EffectCallback, deps?: DependencyList) => {
	return typeof window === 'undefined' ? undefined : useReactLayoutEffect(effect, deps);
};