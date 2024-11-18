// Middleware to validate bounty data
export const validateBountyData = (req, res, next) => {
  const { title, oneLiner, description, githubRepo, githubIssue, difficulty, rewardAmount, paymentToken, isLive } = req.body;

  // Basic validation
  if (!title || !oneLiner || !description || !githubRepo || !githubIssue || !difficulty || !rewardAmount || !paymentToken) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Additional validation logic can be added here

  // If validation passes, proceed to the next middleware or route handler
  next();
};
