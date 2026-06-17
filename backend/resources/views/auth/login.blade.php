<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Login — {{ config('app.name', 'Laravel') }}</title>
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
        <style>
            *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
            body {
                font-family: 'Instrument Sans', ui-sans-serif, system-ui, sans-serif;
                background-color: #FDFDFC;
                color: #1b1b18;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                padding: 1.5rem;
            }
            @media (prefers-color-scheme: dark) {
                body { background-color: #0a0a0a; color: #EDEDEC; }
                .card { background-color: #161615; box-shadow: inset 0 0 0 1px #fffaed2d; }
                input { background-color: #1b1b18; border-color: #3E3E3A; color: #EDEDEC; }
                input:focus { border-color: #62605b; }
                label { color: #A1A09A; }
                .hint { color: #A1A09A; }
            }
            .card {
                width: 100%;
                max-width: 400px;
                background: #fff;
                border-radius: 0.5rem;
                box-shadow: inset 0 0 0 1px rgba(26,26,0,0.16);
                padding: 2rem;
            }
            h1 { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.25rem; }
            .hint { font-size: 0.875rem; color: #706f6c; margin-bottom: 1.5rem; }
            .field { display: flex; flex-direction: column; gap: 0.375rem; margin-bottom: 1rem; }
            label { font-size: 0.875rem; font-weight: 500; }
            input {
                width: 100%;
                padding: 0.5rem 0.75rem;
                border: 1px solid #e3e3e0;
                border-radius: 0.375rem;
                font-size: 0.875rem;
                outline: none;
                transition: border-color 0.15s;
            }
            input:focus { border-color: #1915014a; }
            .btn {
                display: inline-block;
                width: 100%;
                padding: 0.5rem 1.25rem;
                background-color: #1b1b18;
                color: #fff;
                border: 1px solid #1b1b18;
                border-radius: 0.375rem;
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                text-align: center;
                margin-top: 0.5rem;
                transition: background-color 0.15s;
            }
            .btn:hover { background-color: #000; border-color: #000; }
            @media (prefers-color-scheme: dark) {
                .btn { background-color: #EDEDEC; border-color: #EDEDEC; color: #1C1C1A; }
                .btn:hover { background-color: #fff; border-color: #fff; }
            }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>Sign in</h1>
            <p class="hint">Use the API to authenticate and obtain a Bearer token.</p>

            <div class="field">
                <label for="email">Email address</label>
                <input type="email" id="email" name="email" placeholder="you@example.com" autocomplete="email">
            </div>

            <div class="field">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="••••••••" autocomplete="current-password">
            </div>

            <p class="hint" style="margin-bottom: 1rem; font-size: 0.8125rem;">
                Authentication is handled via the <code>/api/v1/auth/login</code> endpoint.
                Submit your credentials there to receive a Bearer token for API access.
            </p>

            <button type="button" class="btn" onclick="handleLogin()">Sign in</button>
        </div>

        <script>
            async function handleLogin() {
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                if (!email || !password) {
                    alert('Please enter your email and password.');
                    return;
                }

                try {
                    const response = await fetch('/api/v1/auth/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                        body: JSON.stringify({ email, password }),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        alert('Login successful. Token: ' + data.data.token);
                    } else {
                        alert(data.message || 'Login failed. Please check your credentials.');
                    }
                } catch (err) {
                    alert('An error occurred. Please try again.');
                }
            }
        </script>
    </body>
</html>
