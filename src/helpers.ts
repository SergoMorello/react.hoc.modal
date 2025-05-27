import styles from "../assets/css/style.module.css";

export const Style = (styleOrArray: string | string[], prefix = '_modal-'): string => {
	if (Array.isArray(styleOrArray)) {
		return styleOrArray.map(() => Style(styleOrArray, prefix)).join(' ');
	}else{
		return styles[styleOrArray] + ' ' + prefix + styleOrArray;
	}
};