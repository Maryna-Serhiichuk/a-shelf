const fs = require('fs');
const path = require('path');

const sourceDir = path.resolve(__dirname, '../source');
const backDestDir = path.resolve(__dirname, '../../backend/types');
const frontDestDir = path.resolve(__dirname, '../../frontend/src/types');

class Models {
    #copy(src, dest) {
        const fileNames = fs.readdirSync(src);

        for(const fileName of fileNames) {
            const filePath = path.join(src, fileName)
            const content = fs.readFileSync(filePath, 'utf8');
            const destPath = path.join(dest, fileName)
            fs.writeFileSync(destPath, content, 'utf8')
        }
    }

    processFiles() {
        console.log('➡️ Process start')
        this.#copy(sourceDir, backDestDir)
        this.#copy(sourceDir, frontDestDir)
        console.log('✅ Process end')
    }
}

module.exports = Models;