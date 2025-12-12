import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

export default function handler(req, res) {
    const mdPath = path.join(process.cwd(), 'public', 'md', 'airbag.md');
    const templatePath = path.join(process.cwd(), 'public', 'views', 'recitales_airbag.html');

    const md = fs.readFileSync(mdPath, 'utf-8');
    const template = fs.readFileSync(templatePath, 'utf-8');

    const title = (md.match(/^# (.+)/) || [])[1] || 'Recitales de Airbag';
    const content = marked.parse(md);
    const html = template.replace(/{{title}}/g, title).replace(/{{content}}/g, content);

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);

}
