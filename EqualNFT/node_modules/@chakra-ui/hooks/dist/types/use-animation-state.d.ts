export interface UseAnimationStateProps {
    isOpen: boolean;
    ref: React.RefObject<HTMLElement>;
}
export declare function useAnimationState(props: UseAnimationStateProps): {
    present: boolean;
    onComplete(): void;
};
