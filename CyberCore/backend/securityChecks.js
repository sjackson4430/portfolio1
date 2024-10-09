const runSecurityChecks = () => {
    return [
        { name: 'Firewall Status', pass: Math.random() > 0.3 },
        { name: 'Intrusion Detection', pass: Math.random() > 0.3 },
        { name: 'Data Encryption', pass: Math.random() > 0.3 },
        { name: 'Access Control', pass: Math.random() > 0.3 },
        { name: 'Vulnerability Scan', pass: Math.random() > 0.3 },
    ];
};

module.exports = { runSecurityChecks };