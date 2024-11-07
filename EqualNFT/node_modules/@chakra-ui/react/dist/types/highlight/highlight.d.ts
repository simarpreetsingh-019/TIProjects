/// <reference types="react" />
import { SystemStyleObject } from "@chakra-ui/styled-system";
import { Chunk } from "./highlight-words";
export interface HighlightProps {
    query: string | string[];
    children: string | ((props: Chunk[]) => React.ReactNode);
    styles?: SystemStyleObject;
}
/**
 * `Highlight` allows you to highlight substrings of a text.
 *
 * @see Docs https://chakra-ui.com/docs/components/highlight
 */
export declare function Highlight(props: HighlightProps): JSX.Element;
