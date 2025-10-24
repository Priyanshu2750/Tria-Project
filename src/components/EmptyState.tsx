interface EmptyStateProps {
  searchQuery: string;
}

const EmptyState = ({ searchQuery }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
        <svg
          className="w-8 h-8 text-muted-foreground"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold mb-2">No contacts found</h3>
      {searchQuery ? (
        <p className="text-sm text-muted-foreground">
          No contacts match "{searchQuery}". Try searching with a different term.
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          Get started by adding your first contact.
        </p>
      )}
    </div>
  );
};

export default EmptyState;