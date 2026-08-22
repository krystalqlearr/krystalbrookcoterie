/** @type {import('next').NextConfig} */
const nextConfig = {
  // Two `next dev` instances (this worktree's own kbc-dev on 3000, plus
  // kbc-dev-claude on 3100 — see .claude/launch.json) run against the same
  // checkout at once. Sharing one .next/ causes EBUSY file-lock errors on
  // Windows when both write to it concurrently, so 3100 gets its own dist dir.
  distDir: process.env.PORT === "3100" ? ".next-claude" : ".next",
};

export default nextConfig;
