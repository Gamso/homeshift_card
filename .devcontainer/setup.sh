#!/bin/bash

echo "Setting up Home Assistant development environment..."
echo ""

# Create config directories if they don't exist
mkdir -p /config/www/homershift_card
mkdir -p /config/.storage
mkdir -p /config/custom_components

# Copy configuration.yaml from repo if not exists or is older
if [ ! -f /config/configuration.yaml ] || [ /workspaces/homershift_card/.devcontainer/config/configuration.yaml -nt /config/configuration.yaml ]; then
    echo "📝 Copying configuration.yaml from repository..."
    cp /workspaces/homershift_card/.devcontainer/config/configuration.yaml /config/configuration.yaml
    echo "   ✅ Configuration file updated!"
fi

# Copy scheduler storage file
if [ -f /workspaces/homershift_card/.devcontainer/scheduler.storage ]; then
    echo "📋 Copying scheduler storage file..."
    mkdir -p /config/.storage
    cp /workspaces/homershift_card/.devcontainer/scheduler.storage /config/.storage/scheduler.storage
    echo "   ✅ scheduler.storage file copied!"
fi

# Install scheduler component
echo "📦 Installing scheduler component..."
if [ ! -d /config/custom_components/scheduler ]; then
    cd /tmp
    rm -rf scheduler-component-* scheduler.zip
    wget -q -O scheduler.zip https://github.com/nielsfaber/scheduler-component/archive/refs/heads/master.zip
    unzip -o -q scheduler.zip
    cp -r scheduler-component-*/custom_components/scheduler /config/custom_components/
    rm -rf scheduler-component-* scheduler.zip
    echo "   ✅ Scheduler component installed!"
else
    echo "   ℹ️  Scheduler component already installed"
fi

# Check if the dist folder has the card file
if [ -f /workspaces/homershift_card/dist/homershift-card.js ]; then
    echo "✅ Card file found in dist/ - copying to Home Assistant..."
    cp /workspaces/homershift_card/dist/homershift-card.js /config/www/homershift_card/
    echo "   Card copied successfully!"
    
    # Pre-configure the Lovelace resource
    echo "✅ Pre-configuring Lovelace resources..."
    cat > /config/.storage/lovelace_resources << 'EOF'
{
  "version": 1,
  "minor_version": 1,
  "key": "lovelace_resources",
  "data": {
    "items": [
      {
        "id": "homershift_card",
        "url": "/local/homershift_card/homershift-card.js",
        "type": "module"
      },
      {
        "id": "scheduler_card",
        "url": "/local/scheduler-card/scheduler-card.js",
        "type": "module"
      }
    ]
  }
}
EOF
    echo "   Lovelace resources pre-configured!"
else
    echo "⚠️  WARNING: Card file not found in dist/ folder"
    echo ""
    echo "   You need to build the card first!"
    echo "   On your HOST machine (Windows), run:"
    echo "   1. Open a terminal in the project folder"
    echo "   2. npm install"
    echo "   3. npm run build"
    echo ""
    echo "   The dist/ folder will be automatically mounted in Home Assistant."
fi

echo ""
echo "📦 Installing scheduler-component..."
SCHEDULER_COMPONENT_VERSION="v3.3.8"
SCHEDULER_COMPONENT_URL="https://github.com/nielsfaber/scheduler-component/releases/download/${SCHEDULER_COMPONENT_VERSION}/scheduler.zip"

if [ ! -d /config/custom_components/scheduler ]; then
    # Install wget and unzip if not available
    if ! command -v wget &> /dev/null || ! command -v unzip &> /dev/null; then
        echo "   Installing wget and unzip..."
        apk add --no-cache wget unzip > /dev/null 2>&1
    fi
    
    echo "   Downloading scheduler-component ${SCHEDULER_COMPONENT_VERSION}..."
    if wget -q ${SCHEDULER_COMPONENT_URL} -O /tmp/scheduler.zip; then
        echo "   Extracting scheduler component..."
        unzip -q /tmp/scheduler.zip -d /config/custom_components/
        rm /tmp/scheduler.zip
        
        # Verify installation
        if [ -f /config/custom_components/scheduler/manifest.json ]; then
            echo "   ✅ Scheduler component installed successfully!"
            echo "   📁 Location: /config/custom_components/scheduler/"
        else
            echo "   ⚠️  Warning: scheduler component extracted but manifest.json not found"
            echo "   Checking what was extracted..."
            ls -la /config/custom_components/ || true
        fi
    else
        echo "   ⚠️  Failed to download scheduler component"
    fi
else
    echo "   ✅ Scheduler component already installed"
    echo "   📁 Location: /config/custom_components/scheduler/"
    # Verify it's properly installed
    if [ -f /config/custom_components/scheduler/manifest.json ]; then
        echo "   ✓ manifest.json found"
    else
        echo "   ⚠️  Warning: manifest.json not found in scheduler directory"
    fi
fi

echo ""
echo "📦 Installing scheduler-card..."
SCHEDULER_CARD_VERSION="v4.0.11"
SCHEDULER_CARD_URL="https://github.com/nielsfaber/scheduler-card/releases/download/${SCHEDULER_CARD_VERSION}/scheduler-card.js"

# Create scheduler-card directory
mkdir -p /config/www/scheduler-card

if [ ! -f /config/www/scheduler-card/scheduler-card.js ]; then
    # Install wget if not available
    if ! command -v wget &> /dev/null; then
        echo "   Installing wget..."
        apk add --no-cache wget > /dev/null 2>&1
    fi
    
    echo "   Downloading scheduler-card ${SCHEDULER_CARD_VERSION}..."
    if wget -q ${SCHEDULER_CARD_URL} -O /config/www/scheduler-card/scheduler-card.js; then
        echo "   ✅ Scheduler card installed!"
    else
        echo "   ⚠️  Failed to download scheduler card"
    fi
else
    echo "   ✅ Scheduler card already installed"
fi

echo ""
echo "🚀 Starting Home Assistant in the background..."

# Start Home Assistant in the background
nohup python3 -m homeassistant --config /config > /config/home-assistant.log 2>&1 &

HASS_PID=$!
echo "   Home Assistant starting with PID: $HASS_PID"
echo ""
echo "✅ Setup complete!"
echo ""
echo "⏳ IMPORTANT: Home Assistant is starting up..."
echo "   This takes 1-2 minutes on first launch."
echo "   Please wait before accessing: http://localhost:8123"
echo ""
echo "💡 How to check if Home Assistant is ready:"
echo "   - Watch this terminal for Home Assistant logs"
echo "   - Look for: 'Home Assistant initialized in XXs'"
echo "   - Or check: http://localhost:8123 (refresh after 1-2 minutes)"
echo "   - Monitor logs: tail -f /config/home-assistant.log"
echo ""
echo "🔧 If http://localhost:8123 doesn't work after 5 minutes:"
echo "   1. Check process: ps aux | grep homeassistant"
echo "   2. Check logs: tail -f /config/home-assistant.log"
echo "   3. Verify port forwarding in VS Code (PORTS tab)"
echo ""
echo "📦 Card Resource Configuration:"
echo "   The card resource will be automatically registered in .storage/lovelace_resources"
echo ""
echo "📋 To view the card:"
echo "   1. Wait for Home Assistant to fully start (1-2 minutes)"
echo "   2. Open http://localhost:8123"
echo "   3. Complete onboarding (create account: admin / admin)"
echo "   4. Enable Advanced Mode: Profile (bottom left) → Enable Advanced Mode"
echo "   5. Go to: Overview dashboard"
echo "   6. The card is pre-configured in the dashboard!"
echo ""
echo "📅 Scheduler Integration:"
echo "   IMPORTANT: The Scheduler integration must be added after Home Assistant starts:"
echo "   1. Wait for Home Assistant to fully start and complete onboarding"
echo "   2. Go to: Settings → Devices & Services → Add Integration"
echo "   3. Search for 'Scheduler' and click to add it"
echo "   4. Once added, the scheduler-card in the 'Scheduler' tab will work"
echo "   "
echo "   If 'Scheduler' doesn't appear in integrations list:"
echo "   - Make sure Home Assistant has fully started (check logs)"
echo "   - Try refreshing the browser (Ctrl+F5)"
echo "   - Clear browser cache and reload"
echo "   - Restart Home Assistant: Settings → System → Restart"
echo ""
echo "   Alternative: Manually add via UI:"
echo "   - Click the 3 dots (top right) → Edit Dashboard → Add Card"
echo "   - Scroll down and select 'Custom: Xiaomi Smart Pet Fountain Card'"
echo "   - Choose entity: select.xiaomi_iv02_b820_mode"
echo ""

# Give a moment for Home Assistant to start writing logs
sleep 3

# Show the last few lines of the log to confirm it's starting
if [ -f /config/home-assistant.log ]; then
    echo "📋 Home Assistant startup logs (last 20 lines):"
    echo "=============================================="
    tail -n 20 /config/home-assistant.log
fi
