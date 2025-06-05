import { useCallback } from "react";
import { Style } from "./helpers";
import globalStyles from "./style.module.scss";

export const useStyle = (styles?: typeof globalStyles, prefix = '_modal-') => {
	return useCallback((style: string) => Style(style, styles, prefix), [styles, prefix]);
};