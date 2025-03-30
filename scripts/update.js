const UPDATE_URL = "https://raw.githubusercontent.com/TaylorReis-lab/NewUI/main/version.json";
// Função para buscar a versão instalada
function getCurrentVersion() {
    return localStorage.getItem("themeVersion") || "1.0";  // Pega a versão salva ou assume "1.0"
}

// Função para buscar a versão mais recente
async function checkForUpdate() {
    try {
        const response = await fetch(UPDATE_URL);
        const data = await response.json();
        const latestVersion = data.version;
        const currentVersion = getCurrentVersion();

        if (latestVersion !== currentVersion) {
            showUpdatePopup(latestVersion);  // Mostra popup de atualização
        }
    } catch (error) {
        console.error("Erro ao verificar atualização:", error);
    }
}

// Função que mostra o botão de atualização
function showUpdatePopup(latestVersion) {
    const userChoice = confirm(`Nova versão disponível (${latestVersion})! Atualizar agora?`);
    
    if (userChoice) {
        localStorage.setItem("themeVersion", latestVersion);  // Salva a nova versão
        restartSteam();  // Reinicia o Steam para aplicar a atualização
    }
}

// Simula o reinício do Steam Millennium
function restartSteam() {
    console.log("Reiniciando Steam com a nova versão...");
    // Aqui pode ter um comando real para reiniciar o Steam
}

// Executa a verificação ao iniciar o tema
checkForUpdate();