---
hide:
  - toc
---

# Archived HPC Workshops

## 2026 

=== "Spring"

    ```python exec="on"
    import re
    import pandas as pd

    df = pd.read_csv('docs/assets/tables/trainings/2026_spring.csv', keep_default_na=False)

    def fix_cell(s):
        if not isinstance(s, str):
            return s
        s = re.sub(r'(\()([^)]*?)index\.md', r'\1\2', s)
        s = re.sub(r'(\b6_[\w\-.]+)\.md\b', r'\1', s)
        s = s.replace('(//', '(/')

        return s

    df = df.map(fix_cell)
    print(df.to_markdown(index=False))
    ```

## 2025


=== "Fall"

    ```python exec="on"
    import re
    import pandas as pd
    
    df = pd.read_csv('docs/assets/tables/trainings/2025_fall.csv', keep_default_na=False)
    
    def fix_cell(s):
        if not isinstance(s, str):
            return s
        s = re.sub(r'(\()([^)]*?)index\.md', r'\1\2', s)
        s = re.sub(r'(\b6_[\w\-.]+)\.md\b', r'\1', s)
        s = s.replace('(//', '(/')
    
        return s
    
    df = df.map(fix_cell)
    print(df.to_markdown(index=False))
    ```

=== "Summer"

    ```python exec="on"
    import re
    import pandas as pd
    
    df = pd.read_csv('docs/assets/tables/trainings/2025_summer.csv', keep_default_na=False)
    
    def fix_cell(s):
        if not isinstance(s, str):
            return s
        s = re.sub(r'(\()([^)]*?)index\.md', r'\1\2', s)
        s = re.sub(r'(\b6_[\w\-.]+)\.md\b', r'\1', s)
        s = s.replace('(//', '(/')
    
        return s
    
    df = df.map(fix_cell)
    print(df.to_markdown(index=False))
    ```
=== "Spring"

    ```python exec="on"
    import re
    import pandas as pd
    
    df = pd.read_csv('docs/assets/tables/trainings/2025_spring.csv', keep_default_na=False)
    
    def fix_cell(s):
        if not isinstance(s, str):
            return s
        s = re.sub(r'(\()([^)]*?)index\.md', r'\1\2', s)
        s = re.sub(r'(\b6_[\w\-.]+)\.md\b', r'\1', s)
        s = s.replace('(//', '(/')
    
        return s
    
    df = df.map(fix_cell)
    print(df.to_markdown(index=False))
    ```
