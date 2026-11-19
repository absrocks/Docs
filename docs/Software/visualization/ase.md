---
title: ASE (Atomic Simulation Environment)
---
ASE (Atomic Simulation Environment) is an open-source Python library for performing atomic-scale simulations of materials. It provides a collection of tools and interfaces for setting up, running, and analyzing simulations of atoms, molecules, and solids using a variety of simulation packages.

ASE is designed to be flexible and modular, allowing users to easily switch between different simulation packages and methods without having to modify their code. It currently supports a number of popular simulation packages, including [Quantum ESPRESSO](../chemistry/qe.md), [LAMMPS](../Molecular_Dynamics/lammps.md), and [GROMACS](../Molecular_Dynamics/gromacs.md) etc.

ASE provides a wide range of functionality for working with atomic-scale simulations, including geometry optimization, molecular dynamics simulations, electronic structure calculations, and vibrational analysis. It also includes a number of built-in tools for analyzing simulation output, such as calculating radial distribution functions, computing surface area and volume, and visualizing simulation trajectories.

ASE is actively developed and maintained by a community of researchers and developers from around the world, and is available as a free download under an open-source license.

## Availability

=== "Wulver"

    ```python exec="on"
    import pandas as pd
    
    df = pd.read_csv('docs/assets/tables/module_wulver_rhel9.csv')
    soft = df.query('Software == "ASE"')
    print(soft.to_markdown(index=False))
    ```
    ```

## Related Applications

* 

## User Contributed Information

!!! info "Please help us improve this page"

    Users are invited to contribute helpful information and corrections through our [Github repository](https://github.com/arcs-njit-edu/Docs/issues).


