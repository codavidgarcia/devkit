const fs = require('fs').promises;
const path = require('path');
const os = require('os');

const CONTEXT_DIR = path.join(os.homedir(), '.devtoolbox');
const CONTEXT_FILE = path.join(CONTEXT_DIR, 'context.json');

const DEFAULT_CONTEXT = {
    lastPortKilled: null,
    lastDoctorRun: null,
    commonPorts: [3000, 8080, 5432, 8000, 5000],
    recentJWTs: [],
    projectType: null,
    commandHistory: []
};

async function ensureContextDir() {
    try {
        await fs.mkdir(CONTEXT_DIR, { recursive: true });
    } catch (error) {
        // Directory might already exist
    }
}

async function getContext() {
    await ensureContextDir();

    try {
        const data = await fs.readFile(CONTEXT_FILE, 'utf-8');
        return { ...DEFAULT_CONTEXT, ...JSON.parse(data) };
    } catch (error) {
        // File doesn't exist yet, return default
        return { ...DEFAULT_CONTEXT };
    }
}

async function updateContext(updates) {
    await ensureContextDir();

    const current = await getContext();
    const updated = { ...current, ...updates };

    await fs.writeFile(CONTEXT_FILE, JSON.stringify(updated, null, 2), 'utf-8');
    return updated;
}

async function addToHistory(command) {
    const context = await getContext();
    const history = context.commandHistory || [];

    history.unshift({
        command,
        timestamp: new Date().toISOString()
    });

    // Keep only last 50 commands
    const trimmed = history.slice(0, 50);

    await updateContext({ commandHistory: trimmed });
}

async function trackPortKill(port) {
    const context = await getContext();
    const commonPorts = context.commonPorts || [];

    // Track if this port is killed frequently
    if (!commonPorts.includes(port)) {
        // Check if we've killed this port before in history
        const history = context.commandHistory || [];
        const portKills = history.filter(h =>
            h.command.includes('kill-port') && h.command.includes(port.toString())
        );

        if (portKills.length >= 2) {
            // Add to common ports if killed 3+ times
            commonPorts.push(port);
            await updateContext({ commonPorts, lastPortKilled: port });
            return true; // Indicate it's now common
        }
    }

    await updateContext({ lastPortKilled: port });
    return false;
}

async function saveJWT(token) {
    const context = await getContext();
    const recent = context.recentJWTs || [];

    // Add to beginning, keep only last 5
    recent.unshift({
        token: token.substring(0, 50) + '...', // Store truncated for privacy
        full: token,
        timestamp: new Date().toISOString()
    });

    await updateContext({ recentJWTs: recent.slice(0, 5) });
}

module.exports = {
    getContext,
    updateContext,
    addToHistory,
    trackPortKill,
    saveJWT
};
