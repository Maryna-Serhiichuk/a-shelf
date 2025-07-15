const fs = require('fs');
const path = require('path');
const ConsoleReader = require('./ConsoleReader');

const template = path.resolve(__dirname, '../templates/global-interface.d.ts')
const dest = path.resolve(__dirname, '../source');

class Source extends ConsoleReader {
    #create(name) {
        const templateContent = fs.readFileSync(template, 'utf8');

        const destPath = path.join(dest, name+'.d.ts')
        fs.writeFileSync(destPath, templateContent, 'utf8')
    }

    async createSource() {
        console.log('➡️ Creting start')

        const name = await this.ask('Name of file:')

        this.#create(name)

        console.log('✅ Created')
    }
}

module.exports = Source;