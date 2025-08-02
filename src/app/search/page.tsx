import SearchClient from "./search-client";

export default function SearchPage() {
  // The middleware handles auth, so we can remove server-side session checks
  // This prevents double redirects and session sync issues
  return <SearchClient />;
}
