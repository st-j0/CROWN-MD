if (process.argv.includes('--server')) require('./server')
require('dotenv').config(), require('rootpath')()
const { spawn: spawn } = require('child_process'), { Function: Func } = new(require('@neoxr/wb')), path = require('path'), colors = require('@colors/colors/safe'), CFonts = require('cfonts'), chalk = require('chalk')
const fs = require('fs')

// Handle unhandled rejections
const unhandledRejections = new Map()
process.on('unhandledRejection', (reason, promise) => {
   unhandledRejections.set(promise, reason)
   console.log('Unhandled Rejection at:', promise, 'reason:', reason)
})
process.on('rejectionHandled', (promise) => {
   unhandledRejections.delete(promise)
})
process.on('Something went wrong', function(err) {
   console.log('Caught exception: ', err)
})

// Function to read and update config.json
function updateConfig() {
   const conf = JSON.parse(fs.readFileSync('./config.json'))
   conf.pairing.number = process.env.BOT_NUMBER
   fs.writeFileSync('./config.json', JSON.stringify(conf, null, 2))  // Stringify with indentation for readability
}

// Function to start the process
function start() {
	let args = [path.join(__dirname, 'client.js'), ...process.argv.slice(2)]
	let p = spawn(process.argv[0], args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] })
	.on('message', data => {
		if (data == 'reset') {
			console.log('Restarting...')
			p.kill()
			delete p
		}
	})
	.on('exit', code => {
		console.error('Exited with code:', code)
		start()
	})
}

// Display welcome messages
CFonts.say('SUKUNA BOT', {
   font: 'tiny',
   align: 'center',
   colors: ['system']
}), CFonts.say('Github : https://github.com/andymrlit', {
   colors: ['system'],
   font: 'console',
   align: 'center'
})

// Function to check for updates
async function checkUpdate() {
	try {
		const vcode = require('./version.json').semantic.version
		const json = await Func.fetchJson('https://neoxr.my.id/check-update/version?type=beta')
		if (json.status && json.data.version != vcode) return ({
			update: true,
			...json.data
		})
		return ({
			update: false
		})
	} catch (e) {
		console.log(e)
		return ({
			update: false
		})
	}
}

// Update config and then check for updates or start the bot
updateConfig()
checkUpdate().then(json => {
	if (json.update) {
		const vcode = require('./version.json').semantic.version
		let i = chalk.black(chalk.bgGreen(` Update available ${vcode} ~> ${json.version} `))
		i += `\n\n${json.commit}\n\n`
		i += chalk.green(json.url)
		console.log(i)
	} else {
		start()
	}
})
