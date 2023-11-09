# Python
[Python](https://www.python.org/) is a high-level, general-purpose programming language. Python supports multiple programming paradigms, including structured, object-oriented and functional programming. It is used in wide range of applications such as machine learning, molecular dynamics, scientific computing, automation, image processing, etc.

## Availability

=== "Wulver"

    ```python exec="on"
    import pandas as pd
    
    df = pd.read_csv('docs/assets/tables/module_wulver.csv')
    soft = df.query('Software == "Python"')
    soft = soft[~soft.apply(lambda row: row.astype(str).str.contains('bare').any(), axis=1)]
    print(soft.to_markdown(index=False))
    ```

=== "Lochness"

    ```python exec="on"
    import pandas as pd
    
    df = pd.read_csv('docs/assets/tables/module_lochness.csv')
    soft = df.query('Software == "Python"')
    soft = soft[~soft.apply(lambda row: row.astype(str).str.contains('bare').any(), axis=1)]
    print(soft.to_markdown(index=False))
    ```

## Python libraries
Apart from Python’s standard library, Python offers a wide range of additional libraries which need to loaded as modules before user can use these. here, we list these additional libraries. Please contact use to file a ticket with [Service Now](mailto:hpc@njit.edu) in case you do not find the libraries you want to use.

| Libraries  | Version | Python Version | Module load command                   |
|------------|---------|----------------|---------------------------------------|
| NumPy      | 1.21.3  | 3.9.6          | `module load foss/2021b SciPy-bundle` |
| Matplotlib | 3.4.3   | 3.9.6          | `module load foss/2021b matplotlib`   |
| SciPy      | 2021.10 | 3.9.6          | `module load foss/2021b SciPy-bundle` |

For using multiple libraries, you simply need to add the library name in `module load` command. For example, to load NumPy, Matplotlib and SciPy together you need to use the following command. 

```
module load foss/2021b SciPy-bundle matplotlib
```
