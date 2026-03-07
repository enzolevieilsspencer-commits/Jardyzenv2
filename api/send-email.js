import { Resend } from 'resend'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const EMAIL_PAYSAGISTE = process.env.EMAIL_PAYSAGISTE
const EMAIL_EXPEDITEUR = process.env.EMAIL_EXPEDITEUR
// Reply-To for client-facing email: when client replies to the confirmation, it goes to the landscaper
const EMAIL_REPLY_TO = process.env.EMAIL_REPLY_TO || process.env.EMAIL_PAYSAGISTE

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://jardyzen.fr',
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

  // Logo embarqué en base64 pour affichage garanti dans les clients mail (Gmail, Outlook, etc.)
  const LOGO_BASE64 = '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'
  const logoImg = `data:image/png;base64,${LOGO_BASE64}`

  const htmlNotification = `
    <!DOCTYPE html>
    <html lang="fr">
    <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
    <body style="font-family: 'DM Sans', Arial, sans-serif; background: #F5F0E8; margin: 0; padding: 24px;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,.10);">
        <div style="background: linear-gradient(135deg, #2D4A2D 0%, #3D6B3D 100%); padding: 24px 40px 32px; text-align: center;">
          <img src="${logoImg}" alt="Jardyzen" width="48" height="48" style="display: block; margin: 0 auto 16px;" />
          <h1 style="color: white; font-family: Georgia, serif; margin: 0; font-size: 24px;">Nouvelle demande de devis</h1>
          <p style="color: rgba(255,255,255,.75); margin: 8px 0 0; font-size: 14px;">Formulaire de contact</p>
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
        <div style="background: linear-gradient(135deg, #2D4A2D 0%, #3D6B3D 100%); padding: 32px 40px; text-align: center;">
          <img src="${logoImg}" alt="Jardyzen" width="56" height="56" style="display: block; margin: 0 auto 20px;" />
          <h1 style="color: white; font-family: Georgia, serif; margin: 0; font-size: 26px;">Votre demande a bien été reçue !</h1>
        </div>
        <div style="padding: 40px;">
          <p style="color: #1A1A1A; font-size: 16px; line-height: 1.7; margin-bottom: 16px;">
            Bonjour <strong>${nom.trim()}</strong>,
          </p>
          <p style="color: #1A1A1A; font-size: 16px; line-height: 1.7; margin-bottom: 16px;">
            Merci pour votre intérêt ! Votre demande concernant <strong>${type_projet.trim()}</strong> a bien été transmise à Jardyzen.
          </p>
          <p style="color: #1A1A1A; font-size: 16px; line-height: 1.7; margin-bottom: 32px;">
            Vous serez recontacté dans les <strong>48 heures</strong> pour planifier une visite gratuite et sans engagement sur votre propriété.
          </p>
          <div style="padding: 24px; background: #F5F0E8; border-radius: 12px; margin-bottom: 32px;">
            <h3 style="color: #2D4A2D; font-family: Georgia, serif; margin: 0 0 16px; font-size: 18px;">Coordonnées Jardyzen</h3>
            <p style="margin: 4px 0; color: #6B6B6B; font-size: 14px;">📞 <a href="tel:+33685753060" style="color: #2D4A2D;">06 85 75 30 60</a></p>
            <p style="margin: 4px 0; color: #6B6B6B; font-size: 14px;">✉️ <a href="mailto:${EMAIL_REPLY_TO}" style="color: #2D4A2D;">${EMAIL_REPLY_TO}</a></p>
            <p style="margin: 4px 0; color: #6B6B6B; font-size: 14px;">📍 Paradou, France</p>
          </div>
          <p style="color: #6B6B6B; font-size: 13px; line-height: 1.6;">
            Vous n'avez pas effectué cette demande ? Ignorez simplement cet email.
          </p>
        </div>
        <div style="background: #1A1F1A; padding: 20px 40px; text-align: center;">
          <p style="color: rgba(255,255,255,.5); font-size: 12px; margin: 0;">
            © ${new Date().getFullYear()} Jardyzen — Paradou, France
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
        replyTo: EMAIL_REPLY_TO,
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
