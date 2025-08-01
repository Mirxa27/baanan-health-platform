// Configure NextAuth client for deployment environment
const authConfig = {
  baseUrl: typeof window !== 'undefined' 
    ? window.location.origin 
    : process.env.NEXTAUTH_URL || 'https://28c2165d32924a4d8a1994857b7d22f9-4d76a73f8eb54783b9701cbd3.fly.dev',
  basePath: '/api/auth'
};

export default authConfig;
