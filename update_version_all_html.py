import re
import sys
from pathlib import Path
from shutil import copyfile

# Configurações
ROOT = Path('.')  # raiz do repo
IMAGE_EXTS = ('.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico')
TARGET_FILES = ('style.css', 'script.js')  # adicione mais se necessário
MAKE_BACKUP = True  # cria cópia .bak antes de escrever
DRY_RUN = False     # True: não escreve, só mostra

def bump_attr_version(content: str, filename_regex: str, attr: str) -> str:
    pattern = rf'({attr}=["\'](?:[^"\']*{filename_regex}))(?:\?v=(\d+))?(["\'])'
    def repl(m):
        base = m.group(1)
        version = m.group(2)
        quote = m.group(3)
        new_v = (int(version) + 1) if version else 1
        return f'{base}?v={new_v}{quote}'
    return re.sub(pattern, repl, content)

def bump_all_in_html(html_text: str) -> str:
    updated = html_text
    for attr in ('href', 'src'):
        for target in TARGET_FILES:
            filename_regex = re.escape(target)
            updated = bump_attr_version(updated, filename_regex, attr)
    for ext in IMAGE_EXTS:
        ext_regex = re.escape(ext)
        for attr in ('src', 'href'):
            updated = bump_attr_version(updated, ext_regex, attr)
    return updated

def process_html_file(path: Path) -> bool:
    original = path.read_text(encoding='utf-8', errors='ignore')
    updated = bump_all_in_html(original)
    if updated != original:
        if DRY_RUN:
            print(f'🔎 DRY-RUN: mudanças detectadas em {path}')
            return True
        if MAKE_BACKUP:
            backup_path = path.with_suffix(path.suffix + '.bak')
            copyfile(path, backup_path)
            print(f'📦 Backup criado: {backup_path}')
        path.write_text(updated, encoding='utf-8')
        print(f'✅ Atualizado: {path}')
        return True
    else:
        print(f'ℹ️ Sem mudanças: {path}')
        return False

def main():
    html_files = list(ROOT.rglob('*.html'))
    if not html_files:
        print('⚠️ Nenhum arquivo .html encontrado.')
        sys.exit(0)
    print(f'📁 Encontrados {len(html_files)} arquivos HTML.')
    changed = 0
    for f in html_files:
        if process_html_file(f):
            changed += 1
    print(f"\n📊 Resumo: {changed} arquivo(s) com mudanças, {len(html_files) - changed} sem mudanças.")
    if DRY_RUN:
        print('💡 DRY-RUN ativo: nada foi gravado. Defina DRY_RUN=False para aplicar as mudanças.')

if __name__ == '__main__':
    main()
