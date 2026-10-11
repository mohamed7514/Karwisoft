import {copyFile,mkdir,writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
const require=createRequire(new URL('../../site-patient/package.json',import.meta.url));
const sharp=require('sharp');
const generated='C:/Users/MSI/.codex/generated_images/01a11e90-dfa6-7850-b049-f25ae208c2e9/';
const assets=[['patient','exec-f986e41f-e0b7-497b-882e-7f3234e9fb4c.png'],['clinic','exec-1c0fb2d6-1445-482e-bf55-aa602a403b10.png'],['consultation','exec-c9588b65-af49-477a-b14c-cec0acaa6e64.png'],['search','exec-916e7dd1-7669-48ce-ab02-3b012c473e40.png']];
await mkdir('assets/source',{recursive:true});await mkdir('dist/assets',{recursive:true});await mkdir('dist/vendor',{recursive:true});
for(const [name,file] of assets){await copyFile(generated+file,`assets/source/${name}.png`);for(const width of [800,1536]){await sharp(generated+file).resize({width,withoutEnlargement:true}).webp({quality:83}).toFile(`dist/assets/${name}-${width}.webp`)}console.log('Prepared '+name)}
for(const file of ['gsap.min.js','ScrollTrigger.min.js'])await copyFile('../site-patient/node_modules/gsap/dist/'+file,'dist/vendor/'+file);
await writeFile('dist/vendor/NOTICE.txt','GSAP and ScrollTrigger, version 3.15.0. Copyright notices and licensing URL are retained in the original vendor files. See https://gsap.com/standard-license/.\n');
console.log('Images optimized and GSAP copied locally.');
