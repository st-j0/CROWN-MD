exports.run = {
   usage: ['autodownload', 'debug', 'groupmode', 'multiprefix', 'noprefix', 'online', 'self'],
   use: 'activer / desactiver',
   category: 'propriétaire',
   async: async (m, {
      client,
      args,
      isPrefix,
      command,
      Func
   }) => {
      let system = global.db.setting
      let type = command.toLowerCase()
      if (!args || !args[0]) return client.reply(m.chat, `🚩 *Statut actuel* : [ ${system[type] ? 'ACTIVER' : 'DESACTIVER'} ] (Entrez *Activer* ou *Desactiver*)`, m)
      let option = args[0].toLowerCase()
      let optionList = ['activer', 'desactiver']
      if (!optionList.includes(option)) return client.reply(m.chat, `🚩 *Statut actuel* : [ ${system[type] ? 'ACTIVER' : 'DESACTIVER'} ] (Entrez *Activer* ou *Désactiver*)`, m)
      let status = option != 'activer' ? false : true
      if (system[type] == status) return client.reply(m.chat, Func.texted('bold', `🚩 ${Func.ucword(command)} a été ${option == 'activer' ? 'activated' : 'inactivated'} précédemment.`), m)
      system[type] = status
      client.reply(m.chat, Func.texted('bold', `🚩 ${Func.ucword(command)} a été ${option == 'activer' ? 'activated' : 'inactivated'} avec succès.`), m)
   },
   owner: true,
   cache: true,
   location: __filename
}