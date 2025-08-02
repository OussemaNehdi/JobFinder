import SavedClient from "./saved-client";

export default function SavedPage() {
  // The middleware handles auth, so we can remove server-side session checks
  // This prevents double redirects and session sync issues
  return <SavedClient />;
}
