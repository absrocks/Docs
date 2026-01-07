# Wulver Filesystems

The Wulver environment is quite a bit like Lochness, but there are some key differences, especially in filesystems and SLURM partitions and priorities.

 Wulver Filesystems are deployed with more attention to PI ownership / group efforts:

1. The `$HOME` directory is not intended for primary storage and has a 50GB quota. The main location for storing files is the group project directory which has 2TB of storage per PI group. To run the simulations, compilations, etc., users need to use a project directory which has 2TB of storage per PI group. Students can store their files under their corresponding PI’s UCID in the `/project` directory.  For example, if PI’s UCID is `doctorx`, then students need to use the `/project/doctorx/` directory. 
2. Users can also store temporary files under the `/scratch` directory, likewise under a PI-group directory. For example, PI’s UCID is `doctorx`, so students need to use the `/scratch/doctorx/` directory.  Please note that the files under `/scratch` will be periodically deleted. To store files for longer than computations, please use the `/project` directory.  Files under `/scratch` are not backed up. For best performance simulations should be performed in the `/scratch` directory. Once the simulation is complete, the results should be copied into the `$HOME` or `/project` directory.  Files are deleted from `/scratch` after they are 30 days old. Users will get notified prior deletion so that they can review the files and move them to `/project` if required.

```python exec="on"
import pandas as pd

df = pd.read_csv('docs/assets/tables/Wulver_filesystems.csv', keep_default_na=False, na_filter=False)
print(df.to_markdown(index=False))
```

