Create a modern landing page for UNRLSD music platform at homepage of this next.js project

Brand: Exclusive beat discovery platform for professional music industry
Colors: Dark theme, professional
Sections:
1. Hero: "Where Elite Producers Meet Top Artists" with CTA buttons (Login, Sign Up)
2. Features: Three cards highlighting:
   - Verified Professionals Only
   - Structured Beat Locking Workflow
   - UNRLSD as Trusted Music Publisher
3. How It Works: Simple 3-step flow (Browse → Lock → Stems)
4. Footer: Simple links

Use shadcn/ui components (Button, Card) and Tailwind CSS.
Make it look professional, not startup-y. Think Bloomberg Terminal meets music industry.

--

Create a login page at app/login/page.tsx using better-auth client.

Install: npm install better-auth/client

Features:
- Email + password form
- "Sign in" button
- Link to signup page
- Use shadcn/ui Form, Input, Button, Card components
- Call better-auth signIn.email function
- Redirect to /dashboard on success
- Show error message on failure

Make it look clean and professional.

--

Create a signup page at app/signup/page.tsx using better-auth client.

Features:
- Email, password, name fields
- "Create account" button
- Link to login page
- Use shadcn/ui components
- Call better-auth signUp.email function
- Redirect to /onboarding on success
- Password validation (min 8 chars)

Professional styling, match login page.

--

Create a protected dashboard at app/dashboard/page.tsx.

Features:
- Check if user is authenticated (better-auth useSession)
- If not logged in, redirect to /login
- If logged in, show:
  - Welcome message with user name
  - "You're logged in!" message
  - Logout button
  - Placeholder text: "Profile onboarding coming next"

Use shadcn/ui Card and Button components.
