import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const xslUrl = 'https://raw.githubusercontent.com/genmon/aboutfeeds/blob/main/tools/pretty-feed-v3.xsl';

const targetPath = path.resolve(__dirname, '../public/rss/styles.xsl');
const targetDir = path.dirname(targetPath);

async function downloadFile() {
  console.log(`Attempting to download XSL stylesheet from ${xslUrl}...`);
  try {
    if (!fs.existsSync(targetDir)) {
      console.log(`Creating target directory: ${targetDir}`);
      fs.mkdirSync(targetDir, { recursive: true });
    } else {
      console.log(`Target directory already exists: ${targetDir}`);
    }

    const response = await fetch(xslUrl);

    if (!response.ok) {
      console.error(`Error fetching file: ${response.status} ${response.statusText}`);
      process.exit(1);
    }

    const content = await response.text();

    console.log(`Writing downloaded content to ${targetPath}...`);
    fs.writeFileSync(targetPath, content);
    console.log('Successfully downloaded and saved the XSL stylesheet.');
  } catch (error) {
    console.error('An error occurred during the download process:', error);
    process.exit(1);
  }
}

downloadFile();
