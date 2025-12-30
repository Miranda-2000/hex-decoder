


import { getSession, logout } from "../core/licenseEngine.js";
import { decode } from "../core/decodeEngine.js";

const session = getSession();
if (session) {
  document.getElementById("login").style.display = "none";
  document.getElementById("main").style.display = "block";
  init();
}

async function init() {
  const modelSel = document.getElementById("model");
  modelSel.innerHTML = `
    <option value="inverter_A.json">INV-A</option>
    <option value="inverter_B.json">INV-B</option>
  `;

  document.getElementById("decodeBtn").onclick = async () => {
    try {
      const table = await loadTable(modelSel.value);
      const hex = document.getElementById("hexInput").value;
      const r = decode(hex, table);
      document.getElementById("result").innerText = `馬力：${r.hp}`;
    } catch (e) {
      alert("解碼失敗");
    }
  };

  document.getElementById("logoutBtn").onclick = () => {
    logout();
    location.reload();
  };
}

async function loadTable(file) {
  const res = await fetch(`./data/${file}`);
  return await res.json();
}


