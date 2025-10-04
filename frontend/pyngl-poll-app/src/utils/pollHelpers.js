// --- Utility Function to Add Calculated and Dynamic Data ---
export const enhancePollDataDynamic = (poll) => {
  if (!poll) return null;

  const now = new Date();
  const expiresAt = new Date(poll.expiresAt);
  const diffMs = expiresAt - now;

  let daysLeft = "Expired";
  let msLeft = 0;

  if (diffMs > 0) {
    msLeft = diffMs;
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      daysLeft = `${days} day${days > 1 ? "s" : ""} left`;
    } else if (hours > 0) {
      daysLeft = `${hours}h ${minutes}m left`;
    } else {
      daysLeft = `${minutes}m left`;
    }
  }

  return {
    ...poll,
    daysLeft,  // readable format
    msLeft,    // numeric for live countdowns
    status: diffMs > 0 ? "Active" : "Expired", // ✅ consistent
  };
};
