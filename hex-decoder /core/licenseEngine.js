


const SECRET = "INTERNAL_SECRET_KEY";

async function sha256(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function validateLicense(code) {
  const [id, expire, check] = code.split("-");
  if (!id || !expire || !check) return false;

  const today = new Date().toISOString().slice(0,10).replace(/-/g,"");
  if (expire < today) return false;

  const expect = (await sha256(id + expire + SECRET)).substring(0,4).toUpperCase();
  if (expect !== check) return false;

  localStorage.setItem("session", JSON.stringify({
    role: id.startsWith("INT") ? "internal" : "customer",
    expire: Date.now() + 24*60*60*1000
  }));
  return true;
}

export function getSession() {
  const s = JSON.parse(localStorage.getItem("session"));
  if (!s || Date.now() > s.expire) return null;
  return s;
}

export function logout() {
  localStorage.removeItem("session");
}


