import https from 'https';
import fs from 'fs';
import path from 'path';

const downloads = [
  { name: 'pan5.mp3', url: 'https://www.mogher.com/sound/syllabes/pua~5.mp3', altUrl: 'https://www.mogher.com/sound/syllabes/phueng5.mp3' },
  { name: 'hu5.mp3', url: 'https://www.mogher.com/sound/syllabes/hu5.mp3' },
  { name: 'cong1.mp3', url: 'https://www.mogher.com/sound/syllabes/tshong1.mp3' },
  { name: 'soi2.mp3', url: 'https://www.mogher.com/sound/syllabes/soi2.mp3' },
  { name: 'hiang1.mp3', url: 'https://www.mogher.com/sound/syllabes/hiang1.mp3' },
  { name: 'pang1.mp3', url: 'https://www.mogher.com/sound/syllabes/phang1.mp3' },
  { name: 'zuah8.mp3', url: 'https://www.mogher.com/sound/syllabes/juah8.mp3' },
  { name: 'kheh4.mp3', url: 'https://www.mogher.com/sound/syllabes/kheh4.mp3' },
  { name: 'tsha5.mp3', url: 'https://www.mogher.com/sound/syllabes/tsha5.mp3' },
  { name: 'ue1.mp3', url: 'https://www.mogher.com/sound/syllabes/ue1.mp3' },
  { name: 'iu5.mp3', url: 'https://www.mogher.com/sound/syllabes/iu5.mp3' },
  { name: 'iam5.mp3', url: 'https://www.mogher.com/sound/syllabes/iem5.mp3' },
  { name: 'cang2.mp3', url: 'https://www.mogher.com/sound/syllabes/tshang2.mp3' },
  { name: 'ze2.mp3', url: 'https://www.mogher.com/sound/syllabes/tsur2.mp3' },
  { name: 'thng1.mp3', url: 'https://www.mogher.com/sound/syllabes/thurng1.mp3' },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(fs.statSync(dest).size));
      });
    }).on('error', reject);
  });
}

async function main() {
  const targetDir = path.resolve('public/audio');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  for (const item of downloads) {
    const dest = path.join(targetDir, item.name);
    try {
      const size = await downloadFile(item.url, dest);
      console.log(`[OK] ${item.name} downloaded (${size} bytes) from ${item.url}`);
    } catch (err) {
      console.warn(`[FAIL] ${item.name} from ${item.url}: ${err.message}`);
      if (item.altUrl) {
        try {
          const altSize = await downloadFile(item.altUrl, dest);
          console.log(`[OK-ALT] ${item.name} downloaded (${altSize} bytes) from ${item.altUrl}`);
        } catch (altErr) {
          console.error(`[FAIL-ALT] ${item.name}: ${altErr.message}`);
        }
      }
    }
  }
}

main();
