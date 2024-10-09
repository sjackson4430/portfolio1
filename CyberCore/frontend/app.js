document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            document.getElementById('login').style.display = 'none';
            document.getElementById('secureZone').style.display = 'block';
        } else {
            alert('Access Denied: Invalid credentials');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('runChecks').addEventListener('click', async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const response = await fetch('/api/security-checks', {
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (response.ok) {
            const checks = await response.json();
            displaySecurityChecks(checks);
        } else {
            alert('Unable to run security checks');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

function displaySecurityChecks(checks) {
    const container = document.getElementById('securityChecks');
    container.innerHTML = '';
    checks.forEach(check => {
        const div = document.createElement('div');
        div.className = `check-item ${check.pass ? 'pass' : 'fail'}`;
        div.textContent = `${check.name}: ${check.pass ? 'SECURE' : 'VULNERABLE'}`;
        container.appendChild(div);
    });
}