"use server";

export type RegistrationState = {
  ok: boolean;
  message: string;
  errors?: Partial<Record<"name" | "email" | "phone" | "category" | "date", string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+0-9\s\-()]{6,}$/;

export async function registerCandidate(
  _prev: RegistrationState,
  formData: FormData
): Promise<RegistrationState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: RegistrationState["errors"] = {};
  if (name.length < 2) errors.name = "Unesite ime i prezime.";
  if (!EMAIL_RE.test(email)) errors.email = "Unesite ispravnu e-mail adresu.";
  if (!PHONE_RE.test(phone)) errors.phone = "Unesite ispravan broj telefona.";
  if (!category) errors.category = "Odaberite kategoriju.";
  if (!date) errors.date = "Odaberite željeni datum.";

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      message: "Molimo ispravite greške u obrascu.",
      errors,
    };
  }

  // In production, send to email/CRM. We log for now.
  console.info("[upis] Nova prijava:", {
    name,
    email,
    phone,
    category,
    date,
    message,
  });

  return {
    ok: true,
    message:
      "Hvala na prijavi! Kontaktirat ćemo Vas u najkraćem mogućem roku kako bismo dogovorili termin.",
  };
}
