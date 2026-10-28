"""Convert captured legacy pages (capture/pages/*.html) into verbatim markdown. Read-only helper."""
import re, sys, glob, os
from bs4 import BeautifulSoup, Comment, NavigableString

SRC = os.path.join(os.path.dirname(__file__), '..', 'capture', 'pages')

def inline(el):
    out = ''
    for c in el.children:
        if isinstance(c, Comment): continue
        if isinstance(c, NavigableString): out += re.sub(r'\s+', ' ', str(c)); continue
        n = c.name
        if n == 'br': out += '\n'
        elif n == 'img': out += f" ![{c.get('alt','')}]({c.get('src','')}) "
        elif n == 'a':
            t = inline(c).strip()
            out += f"[{t}]({c.get('href','')})" if t or c.get('href') else ''
        elif n in ('b','strong'): t = inline(c).strip(); out += f"**{t}**" if t else ''
        elif n in ('i','em'): t = inline(c).strip(); out += f"*{t}*" if t else ''
        elif n in ('script','style'): pass
        else: out += inline(c)
    return out

def block(el, depth=0):
    lines = []
    for c in el.children:
        if isinstance(c, Comment): continue
        if isinstance(c, NavigableString):
            t = re.sub(r'\s+', ' ', str(c)).strip()
            if t: lines.append(t)
            continue
        n = c.name
        if n in ('script','style','noscript'): continue
        if n in ('h1','h2','h3','h4','h5','h6'):
            lines.append('\n' + '#'*int(n[1]) + ' ' + inline(c).strip() + '\n')
        elif n == 'p':
            t = inline(c).strip()
            if t: lines.append(t + '\n')
        elif n in ('ul','ol'):
            for i, li in enumerate(c.find_all('li', recursive=False), 1):
                t = inline(li).strip()
                lines.append(('- ' if n == 'ul' else f'{i}. ') + t)
            lines.append('')
        elif n == 'table':
            for tr in c.find_all('tr'):
                lines.append('| ' + ' | '.join(inline(td).strip() for td in tr.find_all(['td','th'])) + ' |')
            lines.append('')
        elif n == 'iframe':
            lines.append(f"[iframe: {c.get('title','')}]({c.get('src','')})\n")
        elif n == 'img':
            lines.append(f"![{c.get('alt','')}]({c.get('src','')})\n")
        elif n in ('input','button','select','textarea','form') and n != 'form':
            lines.append(f"[{n} name={c.get('name','')} type={c.get('type','')} placeholder={c.get('placeholder','')} value={c.get('value','')}]")
        else:
            cls = ' '.join(c.get('class', []) or []); idv = c.get('id', '')
            sub = block(c, depth+1)
            if sub: lines.append(sub)
    return '\n'.join(lines)

def main():
    for f in sorted(glob.glob(os.path.join(SRC, '*.html'))):
        s = BeautifulSoup(open(f, encoding='utf-8', errors='replace'), 'lxml')
        title = s.title.get_text(' ', strip=True) if s.title else ''
        md = s.find('meta', attrs={'name': 'description'})
        body = s.body
        for t in body.select('.navbar'): t.decompose()
        name = os.path.basename(f)[:-5]
        print(f"\n\n<!-- ======== PAGE: {name} ======== -->")
        print(f"## PAGE: `{name}`\n\n- **Title:** {re.sub(chr(32)+'+', ' ', title)}\n- **Meta description:** {md.get('content','') if md else ''}\n")
        txt = block(body)
        txt = re.sub(r'\n{3,}', '\n\n', txt)
        print(txt)

main()
