import DOMPurify from 'dompurify';

const escapeHtml = value =>
   String(value).replace(/[&<>"']/g, character => {
      const entities = {
         '&': '&amp;',
         '<': '&lt;',
         '>': '&gt;',
         '"': '&quot;',
         "'": '&#39;',
      };
      return entities[character];
   });

const renderInline = value => {
   const codeSpans = [];
   const links = [];
   let prepared = String(value)
      .replace(/`([^`\n]+)`/g, (_, code) => {
         const token = `MARKDOWNCODE${codeSpans.length}TOKEN`;
         codeSpans.push(`<code>${escapeHtml(code)}</code>`);
         return token;
      })
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+|\/[^\s)]*)\)/gi, (_, label, href) => {
         const token = `MARKDOWNLINK${links.length}TOKEN`;
         links.push(`<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`);
         return token;
      });

   let html = escapeHtml(prepared)
      .replace(/\*\*(.+?)\*\*|__(.+?)__/g, (_, a, b) => `<strong>${a || b}</strong>`)
      .replace(/~~(.+?)~~/g, '<del>$1</del>')
      .replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>')
      .replace(/(^|[^_])_([^_\n]+)_(?!_)/g, '$1<em>$2</em>');

   codeSpans.forEach((code, index) => {
      html = html.replace(`MARKDOWNCODE${index}TOKEN`, code);
   });
   links.forEach((link, index) => {
      html = html.replace(`MARKDOWNLINK${index}TOKEN`, link);
   });
   return html;
};

const isBlockStart = line =>
   /^\s*```/.test(line) ||
   /^\s{0,3}#{1,6}\s+/.test(line) ||
   /^\s*>/.test(line) ||
   /^\s*([-*_]\s*){3,}$/.test(line) ||
   /^\s*[-+*]\s+/.test(line) ||
   /^\s*\d+[.)]\s+/.test(line);

export const markdownToHtml = markdown => {
   const lines = String(markdown ?? '').replace(/\r\n?/g, '\n').split('\n');
   const blocks = [];

   for (let index = 0; index < lines.length;) {
      const line = lines[index];
      if (!line.trim()) {
         index += 1;
         continue;
      }

      if (/^\s*```/.test(line)) {
         const codeLines = [];
         index += 1;
         while (index < lines.length && !/^\s*```/.test(lines[index])) {
            codeLines.push(lines[index]);
            index += 1;
         }
         if (index < lines.length) index += 1;
         blocks.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
         continue;
      }

      const heading = line.match(/^\s{0,3}(#{1,6})\s+(.+?)\s*#*\s*$/);
      if (heading) {
         const level = heading[1].length;
         blocks.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
         index += 1;
         continue;
      }

      if (/^\s*([-*_]\s*){3,}$/.test(line)) {
         blocks.push('<hr>');
         index += 1;
         continue;
      }

      if (/^\s*>/.test(line)) {
         const quoteLines = [];
         while (index < lines.length && /^\s*>/.test(lines[index])) {
            quoteLines.push(lines[index].replace(/^\s*>\s?/, ''));
            index += 1;
         }
         blocks.push(`<blockquote><p>${quoteLines.map(renderInline).join('<br>')}</p></blockquote>`);
         continue;
      }

      const listMatch = line.match(/^\s*(?:([-+*])|(\d+)[.)])\s+/);
      if (listMatch) {
         const ordered = Boolean(listMatch[2]);
         const tag = ordered ? 'ol' : 'ul';
         const items = [];
         while (index < lines.length) {
            const item = lines[index].match(/^\s*(?:([-+*])|(\d+)[.)])\s+(.+)$/);
            if (!item || Boolean(item[2]) !== ordered) break;
            items.push(`<li>${renderInline(item[3])}</li>`);
            index += 1;
         }
         blocks.push(`<${tag}>${items.join('')}</${tag}>`);
         continue;
      }

      const paragraphLines = [line];
      index += 1;
      while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index])) {
         paragraphLines.push(lines[index]);
         index += 1;
      }
      blocks.push(`<p>${paragraphLines.map(renderInline).join('<br>')}</p>`);
   }

   return DOMPurify.sanitize(blocks.join(''), {
      ALLOWED_TAGS: [
         'a', 'blockquote', 'br', 'code', 'del', 'em', 'h1', 'h2', 'h3',
         'h4', 'h5', 'h6', 'hr', 'li', 'ol', 'p', 'pre', 'strong', 'ul',
      ],
      ALLOWED_ATTR: ['href'],
   });
};

export default markdownToHtml;
