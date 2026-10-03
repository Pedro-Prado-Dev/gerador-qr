const form = document.querySelector("#form");
const linkInput = document.querySelector("#link");
const sizeInput = document.querySelector("#size");
const sizeValue = document.querySelector("#size-value");
const canvas = document.querySelector("#qr");
const placeholder = document.querySelector("#placeholder");
const encoded = document.querySelector("#encoded");
const message = document.querySelector("#message");
const downloadButton = document.querySelector("#download");

let currentValue = "";

function selectedColor() {
  return form.querySelector('input[name="color"]:checked').value;
}

function normalizeLink(raw) {
  const text = raw.trim();
  if (!text) return "";
  if (/^[a-z][a-z0-9+.-]*:/i.test(text)) return text;
  if (/^[\w.-]+\.[a-z]{2,}([/?#].*)?$/i.test(text)) return `https://${text}`;
  return text;
}

function showEmpty() {
  currentValue = "";
  canvas.hidden = true;
  placeholder.hidden = false;
  encoded.hidden = true;
  encoded.textContent = "";
  downloadButton.disabled = true;
}

async function renderQr() {
  const value = normalizeLink(linkInput.value);
  sizeValue.textContent = sizeInput.value;

  if (!value) {
    message.textContent = "";
    showEmpty();
    return;
  }

  if (!window.QRCode) {
    message.textContent = "Não foi possível carregar o gerador. Confira a internet e atualize a página.";
    showEmpty();
    return;
  }

  try {
    await QRCode.toCanvas(canvas, value, {
      width: Number(sizeInput.value),
      margin: 2,
      errorCorrectionLevel: "M",
      color: {
        dark: selectedColor(),
        light: "#ffffff",
      },
    });
    currentValue = value;
    canvas.hidden = false;
    placeholder.hidden = true;
    encoded.hidden = false;
    encoded.textContent = value;
    downloadButton.disabled = false;
    message.textContent = value === linkInput.value.trim() ? "" : "Adicionei https:// no começo do link.";
  } catch (error) {
    showEmpty();
    message.textContent = "Esse texto não deu para virar QR. Tente um link mais curto.";
  }
}

function downloadQr() {
  if (!currentValue || canvas.hidden) return;
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "qr-code.png";
  link.click();
}

linkInput.addEventListener("input", renderQr);
sizeInput.addEventListener("input", renderQr);
form.addEventListener("change", renderQr);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  downloadQr();
});
downloadButton.addEventListener("click", downloadQr);
sizeValue.textContent = sizeInput.value;
