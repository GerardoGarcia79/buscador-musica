# Music Finder

Here are the steps to get started with this project

## Getting started

To get started with Music Finder, follow these steps:

1. Clone this repository to your local machine.
2. Run `npm install` to install the required dependencies.
3. Get a Last.fm API key at https://www.last.fm/api. You'll have to create an account first.
4. Add the API key to **src/services/api-client.ts**
5. Get the Project URL and an Project API Keys - anon public at https://supabase.com/. You'll have to create an account and a project first. Then go to project settings - Configuration - API.
6. Create a .env file and add the URL and the key as follows:

- VITE_SUPABASE_URL="your-project-url"
- VITE_SUPABASE_ANON_KEY="your-anon-key"

7. Run `npm run dev` to start the web server.

## Demo

You can see a live demo of the project at: https://music-search-flame.vercel.app

Happy coding!
