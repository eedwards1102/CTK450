document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. CRITICAL ELEMENTS ---
    const launchBtn = document.getElementById('launch-btn');
    const exitBtn = document.getElementById('exit-btn');
    const standardView = document.getElementById('standard-view');
    const vrView = document.getElementById('vr-view');
    
    // If these basic building blocks are missing, stop immediately.
    if (!launchBtn || !exitBtn || !standardView || !vrView) {
        console.error("Critical elements missing. Check HTML IDs.");
        return;
    }

    // --- 2. ELEMENTS (OPTIONAL) ---
    const bootModal = document.getElementById('boot-modal');
    const liveRegion = document.getElementById('vr-live-region');
    const sceneDisplay = document.getElementById('scene-display');
    const notificationArea = document.getElementById('notification-area');
    const aiChatInterface = document.getElementById('ai-chat-interface');
    
    const btnAi = document.getElementById('btn-ai');
    const btnMessenger = document.getElementById('btn-messenger');
    const btnEnv = document.getElementById('btn-env');
    const btnSettings = document.getElementById('btn-settings');
    const btnAccept = document.getElementById('btn-accept');
    const btnAiCommand = document.getElementById('btn-ai-command');

    // --- 3. HELPER FUNCTIONS ---
    
    // Announce to Screen Reader (Safe Version)
    const announce = (text) => {
        if (!liveRegion) return;
        liveRegion.textContent = ""; // Clear first
        setTimeout(() => { liveRegion.textContent = text; }, 100);
    };

    // Reset the VR Experience State
    const resetExperience = () => {
        if (sceneDisplay) sceneDisplay.textContent = "System Ready. Awaiting Input.";
        if (notificationArea) notificationArea.classList.add('hidden');
        if (aiChatInterface) aiChatInterface.classList.add('hidden');
        if (bootModal) bootModal.classList.remove('hidden');
    };

    // --- 4. CORE NAVIGATION (Launch & Exit) ---
    // We define these FIRST so they always work.

    launchBtn.addEventListener('click', () => {
        standardView.classList.add('hidden');
        vrView.classList.remove('hidden');
        if (bootModal) bootModal.classList.remove('hidden');
        
        announce("System Initialized. Welcome to the Environment Reader Concept.");
        
        // Trap focus
        setTimeout(() => {
            if (bootModal) {
                const modalHeader = bootModal.querySelector('h2');
                if (modalHeader) modalHeader.focus();
            }
        }, 100);
    });

    exitBtn.addEventListener('click', () => {
        // 1. Hide VR
        vrView.classList.add('hidden');
        // 2. Show Standard
        standardView.classList.remove('hidden');
        // 3. Move Focus
        launchBtn.focus();
        // 4. Reset internals
        resetExperience();
    });

    // --- 5. INTERACTION LOGIC ---

    // Boot Modal Logic
    if (bootModal) {
        const closeBootModal = () => {
            bootModal.classList.add('hidden');
            if (btnAi) btnAi.focus();
        };

        bootModal.addEventListener('click', closeBootModal);
        bootModal.addEventListener('keydown', (e) => {
            if(e.key === 'Enter' || e.key === ' ') closeBootModal();
        });
    }

    // AI Orb Logic
    if (btnAi) {
        btnAi.addEventListener('click', () => {
            // Safe toggle of interfaces
            if (notificationArea) notificationArea.classList.add('hidden');
            if (aiChatInterface) {
                aiChatInterface.classList.remove('hidden');
                announce("AI Agent listening. Select a command.");
                // Try to focus the command button
                if (btnAiCommand) btnAiCommand.focus();
            } else {
                announce("AI Agent activated.");
            }
        });
    }

    // AI Command Button Logic
    if (btnAiCommand) {
        btnAiCommand.addEventListener('click', () => {
            if (aiChatInterface) aiChatInterface.classList.add('hidden');
            const text = 'Arriving at Town Square... The area is bustling with activity. A floating banner reads: "hello, 2026!" An LED ball stands suspended in the middle of the square. People celebrate as they watch the performer.';
            if (sceneDisplay) sceneDisplay.textContent = text;
            announce(text);
            if (btnAi) btnAi.focus();
        });
    }

    // Messenger Logic
    if (btnMessenger) {
        btnMessenger.addEventListener('click', () => {
            if (aiChatInterface) aiChatInterface.classList.add('hidden');
            if (notificationArea) {
                notificationArea.classList.remove('hidden');
                announce("Incoming Message from Mike: Join us at the campfire?");
                if (btnAccept) btnAccept.focus();
            }
        });
    }

    if (btnAccept) {
        btnAccept.addEventListener('click', () => {
            if (notificationArea) notificationArea.classList.add('hidden');
            const text = "Teleporting to Mike's campfire. The environment is quiet with a crackling fire. The fire glows against the night sky. The usual group is here, looks like you were late!";
            if (sceneDisplay) sceneDisplay.textContent = text;
            announce(text);
            if (btnMessenger) btnMessenger.focus();
        });
    }

    // Placeholder Animations
    const handlePlaceholder = (btn) => {
        btn.classList.add('bounce');
        announce("This is a sample button for show. A bounce animation has occurred on screen.");
        setTimeout(() => btn.classList.remove('bounce'), 600);
    };

    if (btnEnv) btnEnv.addEventListener('click', () => handlePlaceholder(btnEnv));
    if (btnSettings) btnSettings.addEventListener('click', () => handlePlaceholder(btnSettings));

});