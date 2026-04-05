/**
 * Interface describing all locale strings used by components.
 * Implement this interface and pass it to `mu-locale-provider` to localise the library.
 */
export interface MuLocale {
  /** Strings used by `mu-chip`. */
  chip: {
    /**
     * Returns the aria-label for the delete button.
     * @param label - The chip label.
     */
    deleteLabel: (label: string) => string;
  };
  /** Strings used by `mu-badge`. */
  badge: {
    /**
     * Returns the accessible text for badge content when no explicit label is provided.
     * @param content - The badge content value.
     */
    defaultLabel: (content: string | number) => string;
  };
  /** Strings used by `mu-dialog`. */
  dialog: {
    /** Aria-label for the dialog close button. */
    closeLabel: string;
  };
  /** Strings used by `mu-snackbar`. */
  snackbar: {
    /** Aria-label for the snackbar dismiss button. */
    closeLabel: string;
  };
}

/**
 * Default English locale strings.
 * Used as the fallback when no `mu-locale-provider` is present in the tree.
 */
export const defaultLocale: MuLocale = {
  chip: {
    deleteLabel: (label: string): string => `Delete ${label}`,
  },
  badge: {
    defaultLabel: (content: string | number): string => `Badge content: ${content || 'new'}`,
  },
  dialog: {
    closeLabel: 'Close',
  },
  snackbar: {
    closeLabel: 'Dismiss',
  },
};
