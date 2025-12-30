


import { validateLicense } from "../core/licenseEngine.js";

document.getElementById("loginBtn").onclick = async () => {
  const code = document.getElementById("licenseInput").value.trim();
  const ok = await validateLicense(code);
  if (!ok) return alert("授權失敗");
  location.reload();
};


