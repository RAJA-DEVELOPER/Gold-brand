import os
import re

dir_path = r'c:\Users\russe\Desktop\jewelry website'

desktop_pattern = re.compile(r'\s*<a href="contact\.html"\s+class="btn btn-outline nav-cta"[^>]*>\s*Book\s*Appointment\s*</a>', re.DOTALL | re.IGNORECASE)
mobile_pattern = re.compile(r'\s*<a href="contact\.html">\s*Book\s*Appointment\s*</a>', re.DOTALL | re.IGNORECASE)

count = 0
for filename in os.listdir(dir_path):
    if filename.endswith('.html'):
        filepath = os.path.join(dir_path, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = desktop_pattern.sub('', content)
        new_content = mobile_pattern.sub('', new_content)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            count += 1
            print(f'Modified {filename}')

print(f'Total files modified: {count}')
