function generateBarcodes() {
  document.getElementById("eanOutput").innerHTML = ""; // Limpa os resultados anteriores
  for (var i = 0; i < 3; i++) {
    var ean = generateRandomEAN();
    var eanDiv = document.createElement("div");
    eanDiv.className = "eanResult";
    eanDiv.innerHTML =
      "<p>" +
      ean +
      '</p><button class="copyButton" onclick="copyToClipboard(this)">Copiar</button>';
    document.getElementById("eanOutput").appendChild(eanDiv);
    JsBarcode(eanDiv.firstChild, ean, {
      format: "EAN13",
      displayValue: true,
    });
  }
}

function generateRandomEAN() {
  var ean = "";
  for (var i = 0; i < 12; i++) {
    ean += Math.floor(Math.random() * 10);
  }
  var checksum = calculateChecksum(ean);
  return ean + checksum;
}

function calculateChecksum(ean) {
  var sum = 0;
  for (var i = ean.length - 1; i >= 0; i--) {
    var digit = +ean[i];
    sum += i % 2 === 0 ? digit : digit * 3;
  }
  var checksum = 10 - (sum % 10);
  return checksum === 10 ? 0 : checksum;
}

function copyToClipboard(button) {
  var text = button.previousSibling.textContent.trim();
  navigator.clipboard.writeText(text).then(
    function () {
      alert("Código copiado para a área de transferência: " + text);
    },
    function (err) {
      console.error("Falha ao copiar: ", err);
    }
  );
}
