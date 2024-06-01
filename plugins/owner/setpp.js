exports.run = {
   usage: ['changepp'],
   use: 'photo de réponse',
   category: 'propriétaire',
   async: async (m, {
      client,
      Func,
      Scraper
   }) => {
      try {
     	let q = m.quoted ? m.quoted : m
         let mime = ((m.quoted ? m.quoted : m.msg).mimetype || '')
         if (/image\/(jpe?g|png)/.test(mime)) {
            client.sendReact(m.chat, '🕒', m.key)
            const buffer = await q.download()
            await client.updateProfilePicture(client.user.id, buffer)
            await Func.delay(3000).then(() => client.reply(m.chat, Func.texted('bold', `🚩 La photo de profil a été modifiée avec succès.`), m))
         } else return client.reply(m.chat, Func.texted('bold', `🚩 Répondez à la photo qui sera transformée en photo de profil du bot.`), m)
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   owner: true,
   cache: true,
   location: __filename
}
