let balance = 1000;
let currentMode = "default";

const symbols = [
    "🍒",
    "🍋",
    "🍊",
    "⭐",
    "💎",
    "7️⃣"
];

const balanceElement = document.getElementById("balance");
const playButton = document.getElementById("playBtn");
const resultElement = document.getElementById("result");

const reels = [
    document.getElementById("reel1"),
    document.getElementById("reel2"),
    document.getElementById("reel3")
];

const defaultButton = document.getElementById("defaultBtn");
const demoButton = document.getElementById("demoBtn");
const modeInfo = document.getElementById("modeInfo");

function updateBalance() {
    balanceElement.textContent = balance.toLocaleString("id-ID");
}

function randomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function setMode(mode) {
    currentMode = mode;

    defaultButton.classList.remove("active");
    demoButton.classList.remove("active");

    if (mode === "default") {
        defaultButton.classList.add("active");

        modeInfo.textContent =
            "Mode Default aktif. Permainan menggunakan koin virtual.";
    } else {
        demoButton.classList.add("active");

        modeInfo.textContent =
            "Mode Demo aktif. Permainan tidak mengurangi saldo.";
    }
}

defaultButton.addEventListener("click", () => {
    setMode("default");
});

demoButton.addEventListener("click", () => {
    setMode("demo");
});

playButton.addEventListener("click", () => {

    const cost = 10;

    if (currentMode === "default" && balance < cost) {
        resultElement.textContent =
            "Koin virtual tidak cukup. Tambahkan koin terlebih dahulu.";
        return;
    }

    if (currentMode === "default") {
        balance -= cost;
        updateBalance();
    }

    playButton.disabled = true;
    resultElement.textContent = "Memutar...";

    reels.forEach(reel => {
        reel.classList.add("spin");
    });

    setTimeout(() => {

        const result = [
            randomSymbol(),
            randomSymbol(),
            randomSymbol()
        ];

        reels.forEach((reel, index) => {
            reel.classList.remove("spin");
            reel.textContent = result[index];
        });

        calculateResult(result);

        playButton.disabled = false;

    }, 1200);
});

function calculateResult(result) {

    const [a, b, c] = result;

    if (a === b && b === c) {

        const reward = 100;

        if (currentMode === "default") {
            balance += reward;
            updateBalance();

            resultElement.textContent =
                `🎉 Tiga simbol sama! +${reward} koin virtual.`;
        } else {
            resultElement.textContent =
                "🎉 Tiga simbol sama! Mode Demo.";
        }

    } else if (a === b || b === c || a === c) {

        const reward = 20;

        if (currentMode === "default") {
            balance += reward;
            updateBalance();

            resultElement.textContent =
                `✨ Dua simbol sama! +${reward} koin virtual.`;
        } else {
            resultElement.textContent =
                "✨ Dua simbol sama! Mode Demo.";
        }

    } else {

        resultElement.textContent =
            "Belum berhasil. Coba lagi!";
    }
}

document.querySelectorAll("[data-amount]").forEach(button => {

    button.addEventListener("click", () => {

        const amount = Number(button.dataset.amount);

        balance += amount;

        updateBalance();

        resultElement.textContent =
            `🪙 +${amount.toLocaleString("id-ID")} koin virtual ditambahkan.`;
    });

});

updateBalance();
setMode("default");
