import {
	type DependencyList,
	type EffectCallback,
	useLayoutEffect as useReactLayoutEffect
} from "react";
import globalStyles from "./style.module.scss";

export const Style = (
  styleOrArray: string | string[], 
  styles: typeof globalStyles = globalStyles, 
  prefix = '_modal-'
): string => {
  if (Array.isArray(styleOrArray)) {
    // Передаем текущий элемент (s), а не весь массив
    return styleOrArray.map((s) => Style(s, styles, prefix)).join(' ');
  }
  
  // Добавляем проверку на существование стиля в объекте
  const mainStyle = styles[styleOrArray] || '';
  return `${mainStyle} ${prefix}${styleOrArray}`.trim();
};

export const useLayoutEffect = (effect: EffectCallback, deps?: DependencyList) => {
	return typeof window === 'undefined' ? undefined : useReactLayoutEffect(effect, deps);
};