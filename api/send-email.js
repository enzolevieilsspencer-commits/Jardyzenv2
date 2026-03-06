import { Resend } from 'resend'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const EMAIL_PAYSAGISTE = process.env.EMAIL_PAYSAGISTE
const EMAIL_EXPEDITEUR = process.env.EMAIL_EXPEDITEUR

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://jardy-paysagiste.fr',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}

export default async function handler(req, res) {
  Object.entries(CORS_HEADERS).forEach(([key, value]) => res.setHeader(key, value))

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  let body
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  } catch {
    return res.status(400).json({ error: 'Corps de requête invalide.' })
  }

  const { nom, email, telephone, type_projet, message } = body

  // Validation serveur
  if (!nom || typeof nom !== 'string' || nom.trim().length < 2) {
    return res.status(400).json({ error: 'Champ "nom" invalide.' })
  }
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Champ "email" invalide.' })
  }
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return res.status(400).json({ error: 'Champ "message" invalide.' })
  }
  if (!type_projet || typeof type_projet !== 'string') {
    return res.status(400).json({ error: 'Champ "type_projet" invalide.' })
  }

  const resend = new Resend(RESEND_API_KEY)

  const htmlNotification = `
    <!DOCTYPE html>
    <html lang="fr">
    <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
    <body style="font-family: 'DM Sans', Arial, sans-serif; background: #F5F0E8; margin: 0; padding: 24px;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,.10);">
        <div style="background: linear-gradient(135deg, #2D4A2D 0%, #3D6B3D 100%); padding: 32px 40px;">
          <h1 style="color: white; font-family: Georgia, serif; margin: 0; font-size: 24px;">Nouvelle demande de devis</h1>
          <p style="color: rgba(255,255,255,.75); margin: 8px 0 0; font-size: 14px;">Jardyzen — Formulaire de contact</p>
        </div>
        <div style="padding: 40px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDE7D8; font-weight: 600; color: #2D4A2D; width: 160px; font-size: 14px;">Nom</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDE7D8; color: #1A1A1A;">${nom.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDE7D8; font-weight: 600; color: #2D4A2D; font-size: 14px;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDE7D8;"><a href="mailto:${email}" style="color: #2D4A2D;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDE7D8; font-weight: 600; color: #2D4A2D; font-size: 14px;">Téléphone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDE7D8; color: #1A1A1A;">${telephone ? telephone.trim() : 'Non renseigné'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDE7D8; font-weight: 600; color: #2D4A2D; font-size: 14px;">Type de projet</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #EDE7D8; color: #1A1A1A;">${type_projet.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px 12px 0; font-weight: 600; color: #2D4A2D; font-size: 14px; vertical-align: top; padding-top: 16px;">Message</td>
              <td style="padding: 16px 0; color: #1A1A1A; line-height: 1.6;">${message.trim().replace(/\n/g, '<br />')}</td>
            </tr>
          </table>
          <div style="margin-top: 32px; padding: 16px 20px; background: #F5F0E8; border-radius: 8px; font-size: 13px; color: #6B6B6B;">
            Demande reçue le ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}.
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  const htmlConfirmation = `
    <!DOCTYPE html>
    <html lang="fr">
    <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
    <body style="font-family: 'DM Sans', Arial, sans-serif; background: #F5F0E8; margin: 0; padding: 24px;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,.10);">
        <div style="background: linear-gradient(135deg, #2D4A2D 0%, #3D6B3D 100%); padding: 40px; text-align: center;">
          <div style="font-size: 48px; margin-bottom: 16px;">🌿</div>
          <h1 style="color: white; font-family: Georgia, serif; margin: 0; font-size: 26px;">Votre demande a bien été reçue !</h1>
        </div>
        <div style="padding: 40px;">
          <p style="color: #1A1A1A; font-size: 16px; line-height: 1.7; margin-bottom: 16px;">
            Bonjour <strong>${nom.trim()}</strong>,
          </p>
          <p style="color: #1A1A1A; font-size: 16px; line-height: 1.7; margin-bottom: 16px;">
            Merci pour votre intérêt ! Nous avons bien reçu votre demande concernant : <strong>${type_projet.trim()}</strong>.
          </p>
          <p style="color: #1A1A1A; font-size: 16px; line-height: 1.7; margin-bottom: 32px;">
            Jardyzen vous contactera dans les <strong>48 heures</strong> pour planifier une visite gratuite et sans engagement sur votre propriété.
          </p>
          <div style="padding: 24px; background: #F5F0E8; border-radius: 12px; margin-bottom: 32px;">
            <h3 style="color: #2D4A2D; font-family: Georgia, serif; margin: 0 0 16px; font-size: 18px;">Nos coordonnées</h3>
            <p style="margin: 4px 0; color: #6B6B6B; font-size: 14px;">📞 <a href="tel:+33490000000" style="color: #2D4A2D;">04 90 00 00 00</a></p>
            <p style="margin: 4px 0; color: #6B6B6B; font-size: 14px;">📍 12 Chemin des Oliviers, 13210 Saint-Rémy-de-Provence</p>
            <p style="margin: 4px 0; color: #6B6B6B; font-size: 14px;">🕐 Lun–Ven 8h–18h · Sam 9h–12h</p>
          </div>
          <p style="color: #6B6B6B; font-size: 13px; line-height: 1.6;">
            Vous n'avez pas effectué cette demande ? Ignorez simplement cet email.
          </p>
        </div>
        <div style="background: #1A1F1A; padding: 20px 40px; text-align: center;">
          <p style="color: rgba(255,255,255,.5); font-size: 12px; margin: 0;">
            © ${new Date().getFullYear()} Jardyzen — 12 Chemin des Oliviers, 13210 Saint-Rémy-de-Provence
          </p>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    await Promise.all([
      resend.emails.send({
        from: `Jardyzen <${EMAIL_EXPEDITEUR}>`,
        to: EMAIL_PAYSAGISTE,
        replyTo: email,
        subject: `Nouvelle demande de devis — ${nom.trim()} (${type_projet.trim()})`,
        html: htmlNotification
      }),
      resend.emails.send({
        from: `Jardyzen <${EMAIL_EXPEDITEUR}>`,
        to: email,
        subject: 'Votre demande a bien été reçue ✅ — Jardyzen',
        html: htmlConfirmation
      })
    ])

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('[send-email] Erreur Resend:', err)
    return res.status(500).json({ success: false, error: 'Erreur lors de l\'envoi de l\'email.' })
  }
}
