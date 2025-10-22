# Starting the App on a Custom Port

## Method 1: Using .env File (Recommended)

I've created a `.env` file with:
```
PORT=3001
BROWSER=none
```

This will:
- Start the app on port **3001** instead of 3000
- Prevent automatic browser opening

## Method 2: Command Line (Windows)

### PowerShell:
```powershell
$env:PORT=3001; npm start
```

### CMD:
```cmd
set PORT=3001 && npm start
```

## Method 3: package.json Script

Add to `scripts` in package.json:
```json
"start:3001": "PORT=3001 react-scripts start",
"start:3002": "PORT=3002 react-scripts start",
"start:8080": "PORT=8080 react-scripts start"
```

Then run:
```bash
npm run start:3001
```

## Current Setup

The `.env` file is configured for port **3001**.

Once `npm install` completes, run:
```bash
npm start
```

The app will be available at:
```
http://localhost:3001
```

## Available Ports

You can use any available port:
- 3001 (currently configured)
- 3002
- 8080
- 8000
- 5000
- etc.

## Troubleshooting

### Port Already in Use?
If you get "port already in use" error:

1. **Find process using the port:**
```powershell
netstat -ano | findstr :3001
```

2. **Kill the process:**
```powershell
taskkill /PID <process_id> /F
```

3. **Or choose a different port** by editing `.env`:
```
PORT=3002
```

---

**Currently installing dependencies...**
Once complete, the app will start on port 3001! 🚀
