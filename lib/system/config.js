const { Function: Func, NeoxrApi } = new(require('@neoxr/wb'))
global.Api = new NeoxrApi(process.env.API_ENDPOINT, process.env.API_KEY)
global.header = `© 𝘾𝙍𝙊𝙒𝙉 𝙈𝘿 v${require('package.json').version} (Beta)`
global.footer = `𝚌𝚎 𝚋𝚘𝚝 𝚊 𝚎𝚝𝚎 𝚌𝚛𝚎𝚎𝚛 𝚙𝚊𝚛 𝚕𝚎 𝚕'𝚎𝚚𝚞𝚒𝚙𝚎 𝚛𝚊𝚕𝚣𝚊𝚍𝚊 ッ`
global.status = Object.freeze({
   invalid: Func.Styles('URL invalide'),
   wrong: Func.Styles('Mauvais format.'),
   fail: Func.Styles('Impossible dobtenir les métadonnées'),
   error: Func.Styles('Erreur est survenue'),
   errorF: Func.Styles('Désolé, cette fonctionnalité est en erreur.'),
   premium: Func.Styles('Cette fonctionnalité est réservée aux utilisateurs premium.'),
   auth: Func.Styles("Vous n'etes pas autorisé à utiliser cette fonctionnalité, demandez d'abord au propriétaire."),
   owner: Func.Styles('Cette commande uniquement pour le propriétaire.'),
   group: Func.Styles("Cette commande ne fonctionnera qu'en groupe."),
   botAdmin: Func.Styles('Cette commande fonctionnera lorsque je deviendrai administrateur.'),
   admin: Func.Styles("cette commande uniquement pour l'administrateur du groupe."),
   private: Func.Styles('Utilisez cette commande dans le chat privé.'),
   gameSystem: Func.Styles('Les fonctionnalités du jeu ont été désactivées.'),
   gameInGroup: Func.Styles("Les fonctionnalités du jeu n'ont pas été activées pour ce groupe."),
   gameLevel: Func.Styles('Vous ne pouvez pas jouer au jeu car votre niveau a atteint la limite maximale.')
})
