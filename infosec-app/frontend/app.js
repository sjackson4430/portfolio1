cat << EOF > infosec-app/frontend/app.js
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // In a real app, you'd make an API call to your backend here
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            showSecureContent();
        } else {
            alert('Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

async function showSecureContent() {
    const token = localStorage.getItem('token');
    if (!token) {
        return;
    }

    try {
        const response = await fetch('/api/secure', {
            headers: {
                'Authorization': \`Bearer \${token}\`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('secureContent').style.display = 'block';
            document.getElementById('secureMessage').textContent = data.message;
            document.getElementById('login').style.display = 'none';
        } else {
            localStorage.removeItem('token');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Check for existing token on page load
showSecureContent();
EOF