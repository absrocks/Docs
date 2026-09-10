---
title: HPC Events and Workshops
hide:
  - toc
---

# HPC Events

## 2026 Fall
Please check our workshop schedule for this Fall season. Expand each section to view more details about the event. For webinars, the links will be sent to your email once you register. The links to slides and recordings will be updated after each webinar. <!-- For the HPC User Meeting, users are encouraged to register using the form provided in the registration link; however, registration is not mandatory. If you forget or miss registering, you are still welcome to stop by the location listed in the schedule below. -->

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
!!! info "Archived Workshops"

    Click here to review our [past workshops](archived/index.md)!


