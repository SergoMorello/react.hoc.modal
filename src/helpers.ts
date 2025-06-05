import globalStyles from "./style.module.scss";

export const Style = (styleOrArray: string | string[], styles?: typeof globalStyles,  prefix = '_modal-'): string => {
	styles = styles ?? globalStyles;
	if (Array.isArray(styleOrArray)) {
		return styleOrArray.map(() => Style(styleOrArray, prefix)).join(' ');
	}else{
		return styles[styleOrArray] + ' ' + prefix + styleOrArray;
	}
};