/// <reference types="react" />
import { TProvider, TContainerContext, TStaticControl } from "./types";
declare const staticAction: import("react").RefObject<TStaticControl>;
declare const ProviderContext: import("react").Context<TContainerContext>;
declare const Provider: ({ children, SPA }: TProvider) => JSX.Element;
export { Provider, ProviderContext, staticAction };
