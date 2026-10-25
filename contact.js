const corto = (valor, max) => String(valor || '').trim().slice(0, max);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }

  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) return res.status(500).json({ ok: false, error: 'Falta DISCORD_WEBHOOK_URL' });

  const b = req.body || {};
  if (b.web) return res.status(200).json({ ok: true });

  const nombre = corto(b.nombre, 100);
  const email = corto(b.email, 150);
  const telefono = corto(b.telefono, 30) || 'No indicó';
  const motivo = corto(b.motivo, 60);
  const mensaje = corto(b.mensaje, 1800);

  if (!nombre || !email.includes('@') || !motivo || mensaje.length < 10) {
    return res.status(400).json({ ok: false, error: 'Datos incompletos' });
  }

  try {
    const r = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'CuddleMe Web',
        allowed_mentions: { parse: [] },
        embeds: [{
          title: 'Nuevo mensaje de contacto',
          color: 0xF7A8B8,
          description: mensaje,
          fields: [
            { name: 'Nombre', value: nombre, inline: true },
            { name: 'Correo', value: email, inline: true },
            { name: 'Teléfono', value: telefono, inline: true },
            { name: 'Motivo', value: motivo }
          ],
          timestamp: new Date().toISOString()
        }]
      })
    });
    if (!r.ok) throw new Error('Discord ' + r.status);
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(502).json({ ok: false });
  }
}