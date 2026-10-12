import {readFile,copyFile,appendFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
const require=createRequire(new URL('../../site-patient/package.json',import.meta.url));
const sharp=require('sharp');
const assets=JSON.parse(await readFile('assets/journey-images.json','utf8'));
for(const {name,path} of assets){await copyFile(path,`assets/source/${name}.png`);for(const width of [800,1536])await sharp(path).resize({width,withoutEnlargement:true}).webp({quality:83}).toFile(`dist/assets/${name}-${width}.webp`);console.log('Prepared '+name)}
for(const name of ['smile-before','smile-final'])await copyFile(`../site-patient/public/assets/${name}.webp`,`dist/assets/${name}.webp`);
await appendFile('assets/PROMPTS.md','\n\n## Complete journey — built-in Imagegen\n'+assets.map(a=>'\n### '+a.name+'\n'+a.prompt+'\n\nSaved: `assets/source/'+a.name+'.png`\n').join(''));
