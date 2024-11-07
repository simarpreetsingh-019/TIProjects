import { FocusableElement } from "@chakra-ui/utils";
import type { RefObject } from "react";
export interface UseFocusOnHideOptions {
    focusRef: RefObject<FocusableElement>;
    shouldFocus?: boolean;
    visible?: boolean;
}
/**
 * Popover hook to manage the focus when the popover closes or hides.
 *
 * We either want to return focus back to the popover trigger or
 * let focus proceed normally if user moved to another interactive
 * element in the viewport.
 */
export declare function useFocusOnHide(containerRef: RefObject<HTMLElement>, options: UseFocusOnHideOptions): void;
export interface UseFocusOnShowOptions {
    visible?: boolean;
    shouldFocus?: boolean;
    preventScroll?: boolean;
    focusRef?: React.RefObject<FocusableElement>;
}
export declare function useFocusOnShow<T extends HTMLElement>(target: React.RefObject<T> | T, options?: UseFocusOnShowOptions): void;
