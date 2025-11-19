# Reddit Posts for DevToolbox Promotion

## Post 1: r/node (Technical Audience)

**Subreddit:** r/node  
**Best time to post:** Tuesday or Wednesday, 9-11am EST

### Title
```
Built an open-source CLI toolkit where commands actually talk to each other
```

### Content
```markdown
I built DevToolbox - a local dev toolkit with 11 CLI tools that actually work together.

**What's included:**
- `init` - Auto-setup projects (detects type, generates .gitignore, frees ports)
- `doctor` - Environment check + blocked port detection
- `ports` - List all active ports
- `kill-port` - Kill processes on any port
- `jwt` - Decode JWT tokens (100% offline)
- `gitignore` - Generate .gitignore from templates
- `online` - Check connectivity
- `ip` - Show local/public IPs
- `hash` - Generate hashes
- `encode/decode` - Base64 encoding

**The twist:** They share context and integrate.

Instead of isolated commands, they learn from your usage and suggest next steps:

```bash
$ devtoolbox doctor
✗ Port 3000 in use (node)
→ Run 'devtoolbox kill-port 3000' to fix

$ devtoolbox kill-port 3000
✓ Killed node on port 3000
Tip: Port 3000 is frequently blocked
  → Run 'devtoolbox ports' to see all active ports
```

**How it works:** Shared context file (~/.devtoolbox/context.json) that all commands read/write.

**It's open source (MIT)** - contributions welcome! Looking for feedback on the cohesion approach and ideas for more integrations.

GitHub: https://github.com/codavidgarcia/devkit ⭐
npm: `npm i -g @codavidgarcia/devtoolbox`

Built this because I was frustrated with context switching. If you find it useful, a star would help others discover it!
```

---

## Post 2: r/javascript (Casual Audience)

**Subreddit:** r/javascript  
**Best time to post:** After r/node post gets traction

### Title
```
Made an open-source dev toolkit where the commands actually help each other out
```

### Content
```markdown
I built DevToolbox - 11 CLI tools for local development that actually help each other out.

**What you get:**
- Auto project setup (detects Node/Python/etc, generates .gitignore, frees ports)
- Environment health checks
- Port management (list, kill)
- JWT decoder (offline)
- Network diagnostics
- Hash generator
- Base64 encode/decode
- .gitignore generator

**The cool part:** They share context and suggest what to do next.

When `doctor` finds a blocked port → tells you the exact command to fix it
When you kill a port repeatedly → notices and gives you tips
When you run `init` → auto-detects everything and sets up your project

Example:
```bash
devtoolbox init
# Detects Node.js project
# Generates .gitignore
# Checks environment
# Frees blocked ports
# All in one command
```

It's like having a coworker who remembers what you were doing.

**It's fully open source (MIT license)** - I'd love contributions, especially:
- More command integrations
- New project type detections
- Better suggestions

**Install:** `npm i -g @codavidgarcia/devtoolbox`
**Repo:** https://github.com/codavidgarcia/devkit

If this resonates with you, a GitHub star would mean a lot - helps others find it! Also open to any feedback or feature ideas 🙏
```

---

## Post 3: r/programming (Professional Audience)

**Subreddit:** r/programming  
**Best time to post:** After getting some GitHub stars from other posts

### Title
```
Cohesive CLI design: Making developer tools that integrate instead of isolate [Open Source]
```

### Content
```markdown
Most CLI toolkits are just collections of independent commands. I experimented with a different approach: commands that share context and integrate.

**The problem:** Context switching between tools is expensive. You run `lsof` to find a port, copy the PID, run `kill`, forget which ports you use frequently, repeat tomorrow.

**The experiment:** What if commands remembered and suggested next steps?

**Implementation:**
- Shared context file (~/.devtoolbox/context.json)
- Commands read/write usage patterns
- Cross-command suggestions based on state

**Example flow:**
```bash
$ devtoolbox doctor
✗ Port 3000 in use (node, PID 1234)
→ Suggestion: devtoolbox kill-port 3000

$ devtoolbox kill-port 3000
✓ Killed process
→ Tip: Port 3000 frequently blocked (3rd time)
```

**Technical details:**
- Node.js CLI using Commander
- Context system tracks: frequent ports, command history, project type
- 11 integrated commands for local development
- ~12kB package size
- MIT licensed

**Open for contributions:**
I'm particularly interested in:
- More cross-command integrations
- Better heuristics for suggestions
- Additional project type detections

**Repo:** https://github.com/codavidgarcia/devkit

Curious if this approach resonates with others. Stars appreciated if you find the concept interesting - helps with visibility!
```

---

## Posting Strategy

### Before Posting
1. ✅ Add GitHub topics: `cli`, `developer-tools`, `nodejs`, `local-development`, `productivity`
2. ✅ Update repo description: "Local development toolkit - CLI tools that talk to each other"
3. ✅ Create GitHub release v2.1.0
4. ✅ Verify README looks good on GitHub

### Order of Posts
1. **Start with r/node** (most receptive audience)
2. **Wait 24-48 hours**, monitor engagement
3. **If positive response:** Post to r/javascript
4. **If getting stars:** Post to r/programming
5. **After 50+ stars:** Consider Show HN

### Engagement Tips
- Respond to ALL comments within first 2 hours
- Be humble, not defensive
- Thank people for feedback
- Answer technical questions thoroughly
- Don't argue with critics

### What NOT to Do
- ❌ Don't spam multiple subreddits at once
- ❌ Don't ask for stars directly in comments
- ❌ Don't delete and repost if it doesn't go well
- ❌ Don't argue about "reinventing the wheel"
- ❌ Don't post on weekends (less traffic)

### Success Metrics
- **Good:** 50+ upvotes, 10+ comments, 5+ stars
- **Great:** 200+ upvotes, 30+ comments, 20+ stars
- **Viral:** 500+ upvotes, 50+ comments, 50+ stars

---

## Alternative: Show HN Post

**Use this AFTER getting some GitHub stars (20+)**

### Title
```
Show HN: DevToolbox – CLI tools that share context and suggest next steps
```

### Content
```
I built a local development toolkit where commands integrate instead of staying isolated.

The key idea: commands share a context file and learn from your usage patterns.

Example: when `doctor` detects a blocked port, it suggests the exact `kill-port` command to fix it. When you kill the same port repeatedly, it notices and gives you tips.

It's open source (MIT): https://github.com/codavidgarcia/devkit
Install: npm i -g @codavidgarcia/devtoolbox

Looking for feedback on the cohesion approach - is this useful or over-engineered?
```

**HN Tips:**
- Keep it SHORT (HN hates long posts)
- Focus on the interesting technical approach
- Be ready for harsh criticism
- Respond thoughtfully to all feedback
