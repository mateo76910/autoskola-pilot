"use server";

import { Resend } from "resend";

export type RegistrationState = {
  ok: boolean;
  message: string;
  errors?: Partial<
    Record<"name" | "email" | "phone" | "location" | "category" | "date", string>
  >;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+0-9\s\-()]{6,}$/;

const LOCATION_EMAILS: Record<string, { to: string; label: string }> = {
  "Kolodvorska 83, Osijek": {
    to: "as.pilot2018@gmail.com",
    label: "Autoškola Pilot – Kolodvorska 83, Osijek",
  },
  "Drinska 93, Osijek": {
    to: "aspilot.osijek@gmail.com",
    label: "Autoškola Pilot 2 – Drinska 93 (Bosutsko–Sjenjak), Osijek",
  },
};

const FROM_ADDRESS =
  process.env.RESEND_FROM_EMAIL ?? "Pilot Autoškola <upis@autoskola-pilot.hr>";

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDateHr(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("hr-HR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function buildHtml(input: {
  name: string;
  email: string;
  phone: string;
  location: string;
  category: string;
  date: string;
  message: string;
}) {
  const rows: [string, string][] = [
    ["Ime i prezime", input.name],
    ["E-mail", input.email],
    ["Telefon", input.phone],
    ["Lokacija", input.location],
    ["Kategorija", input.category],
    ["Željeni datum", formatDateHr(input.date)],
  ];

  const tableRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;color:#424752;font-size:13px;border-bottom:1px solid #e1e3e4;">${escapeHtml(
          k
        )}</td><td style="padding:8px 12px;font-weight:600;color:#191c1d;font-size:14px;border-bottom:1px solid #e1e3e4;">${escapeHtml(
          v
        )}</td></tr>`
    )
    .join("");

  const messageBlock = input.message
    ? `<div style="margin-top:24px"><div style="font-size:13px;color:#424752;text-transform:uppercase;letter-spacing:0.05em;font-weight:700;margin-bottom:8px">Napomena</div><div style="padding:12px 16px;background:#f3f4f5;border-radius:8px;color:#191c1d;white-space:pre-wrap;font-size:14px;line-height:1.5">${escapeHtml(
        input.message
      )}</div></div>`
    : "";

  return `<!DOCTYPE html>
<html lang="hr">
<body style="margin:0;padding:24px;background:#f8f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#191c1d">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e1e3e4">
    <div style="background:linear-gradient(135deg,#003f87,#0056b3);padding:20px 24px;color:#ffffff">
      <div style="font-size:12px;text-transform:uppercase;letter-spacing:0.08em;opacity:0.8">Nova prijava</div>
      <div style="font-size:20px;font-weight:800;margin-top:4px">${escapeHtml(
        input.name
      )}</div>
    </div>
    <div style="padding:20px 24px">
      <table style="width:100%;border-collapse:collapse">${tableRows}</table>
      ${messageBlock}
    </div>
    <div style="padding:12px 24px;background:#f3f4f5;font-size:12px;color:#424752">
      Poslano putem web obrasca — <a href="mailto:${escapeHtml(
        input.email
      )}" style="color:#003f87;text-decoration:none">odgovori izravno kandidatu</a>
    </div>
  </div>
</body>
</html>`;
}

function buildText(input: {
  name: string;
  email: string;
  phone: string;
  location: string;
  category: string;
  date: string;
  message: string;
}) {
  return [
    "Nova prijava — Pilot Autoškola",
    "",
    `Ime i prezime: ${input.name}`,
    `E-mail:        ${input.email}`,
    `Telefon:       ${input.phone}`,
    `Lokacija:      ${input.location}`,
    `Kategorija:    ${input.category}`,
    `Željeni datum: ${formatDateHr(input.date)}`,
    input.message ? `\nNapomena:\n${input.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function registerCandidate(
  _prev: RegistrationState,
  formData: FormData
): Promise<RegistrationState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: RegistrationState["errors"] = {};
  if (name.length < 2) errors.name = "Unesite ime i prezime.";
  if (!EMAIL_RE.test(email)) errors.email = "Unesite ispravnu e-mail adresu.";
  if (!PHONE_RE.test(phone)) errors.phone = "Unesite ispravan broj telefona.";
  if (!location || !(location in LOCATION_EMAILS))
    errors.location = "Odaberite lokaciju autoškole.";
  if (!category) errors.category = "Odaberite kategoriju.";
  if (!date) errors.date = "Odaberite željeni datum.";

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      message: "Molimo ispravite greške u obrascu.",
      errors,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[upis] RESEND_API_KEY nije postavljen.");
    return {
      ok: false,
      message:
        "Trenutno ne možemo zaprimiti prijavu. Molimo pokušajte ponovno kasnije ili nas nazovite.",
    };
  }

  const { to, label } = LOCATION_EMAILS[location];
  const payload = { name, email, phone, location, category, date, message };

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to,
      replyTo: email,
      subject: `Nova prijava: ${name} — ${category} (${label})`,
      html: buildHtml(payload),
      text: buildText(payload),
    });

    if (error) {
      console.error("[upis] Resend error:", error);
      return {
        ok: false,
        message:
          "Slanje prijave nije uspjelo. Molimo pokušajte ponovno ili nas nazovite.",
      };
    }
  } catch (err) {
    console.error("[upis] Resend exception:", err);
    return {
      ok: false,
      message:
        "Slanje prijave nije uspjelo. Molimo pokušajte ponovno ili nas nazovite.",
    };
  }

  return {
    ok: true,
    message:
      "Hvala na prijavi! Kontaktirat ćemo Vas u najkraćem mogućem roku kako bismo dogovorili termin.",
  };
}
