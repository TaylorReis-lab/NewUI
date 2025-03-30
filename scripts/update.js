const UPDATE_URL = "https://raw.githubusercontent.com/TaylorReis-lab/NewUI/main/version.json";
const DOWNLOAD_URL = "https://github.com/TaylorReis-lab/NewUI/releases/latest/download/NewUI.zip";
const INSTALL_PATH = "C:/Program Files (x86)/Steam/steamui/skins/NewUI";

// Obtém a versão instalada do tema
function getCurrentVersion() {
    return localStorage.getItem("themeVersion") || "1.0";
}

// Verifica se há uma nova versão disponível
async function checkForUpdate() {
    try {
        const response = await fetch(UPDATE_URL);
        const data = await response.json();
        const latestVersion = data.version;
        const currentVersion = getCurrentVersion();

        if (latestVersion !== currentVersion) {
            showSteamPopup(latestVersion);
        }
    } catch (error) {
        console.error("Erro ao verificar atualização:", error);
    }
}

// Exibe o popup no estilo Steam para atualização
function showSteamPopup(latestVersion) {
    const popup = document.createElement("div");
    popup.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            font-family: Arial, sans-serif;
            color: white;
            z-index: 9999;
        ">
            <h2>🎨 Nova versão do tema disponível!</h2>
            <p>Versão ${latestVersion} já está disponível.</p>
            <button id="updateTheme" style="
                background: #1b2838;
                color: white;
                border: none;
                padding: 10px;
                cursor: pointer;
                margin-top: 10px;
            ">Atualizar Agora</button>
        </div>
    `;

    document.body.appendChild(popup);
    document.getElementById("updateTheme").addEventListener("click", () => {
        popup.remove();
        updateTheme(latestVersion);
    });
}

// Baixa e substitui os arquivos do tema
async function updateTheme(latestVersion) {
    try {
        console.log("Baixando nova versão do tema...");

        // Criar um link para baixar o ZIP automaticamente
        const link = document.createElement("a");
        link.href = DOWNLOAD_URL;
        link.download = "NewUI.zip";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Salva a nova versão no localStorage
        localStorage.setItem("themeVersion", latestVersion);
        console.log("Tema atualizado para versão:", latestVersion);

        restartSteam();
    } catch (error) {
        console.error("Erro ao atualizar tema:", error);
    }
}

// Reinicia o Steam automaticamente
function restartSteam() {
    console.log("Reiniciando Steam...");
    setTimeout(() => {
        console.log("Steam reiniciado!");
        location.reload();  // Simula reinício
    }, 3000);
}

// Executa a verificação ao iniciar
checkForUpdate();