# Conda Environments
Since Python supports a wide range of additional libraries in machine learning or data science research, it is not always possible to install every package on HPC. Also, users sometimes need to use a specific version of Python or its libraries to conduct their research. Therefore, in that case, users can build their own Python version along with a specific library. One of the ways to accomplish this is to use Conda.

## What is Conda
Conda as a package manager helps you find and install packages. If you need a package that requires a different version of Python, you do not need to switch to a different environment manager, because conda is also an environment manager. 

## Availability

=== "Wulver"

    ```python exec="on"
    import pandas as pd
    
    df = pd.read_csv('docs/assets/tables/module_wulver_rhel9.csv')
    # Header values to be added
    soft = df.query('Software == "Anaconda3" | Software == "Miniconda3" | Software == "Miniforge3" ')
    print(soft.to_markdown(index=False))
    ```

## Conda User Commands 

| Task                                      |                        Command                         | 
|-------------------------------------------|:------------------------------------------------------:|
| Activate environment:                     |          `conda activate [environment_name]`           |
| Deactivate environment:                   |         `conda deactivate [environment_name]`          |
| Show the list of environments:            |                    `conda env list`                    |
| Delete environment:                       |     `conda remove --name [environment_name] --all`     |
| Export environment:                       |      `conda env export > [environment_name].yml`       |
| Import environment from YAML:             |      `conda env create -f [environment_name].yml`      |
| Import environment to different location: | `conda env create -f [environment_name].yml -p [PATH]` | 


## Create and Activate a Conda Virtual Environment

!!! tip
    The login node has limited memory and processing resources, which can slow down conda environment creation and package installation. It is recommended to start an [interactive session](../../Running_jobs/interactive-jobs.md/) on a compute node before creating or modifying your conda environment.

Load the Miniforge3 Module

```
module load Miniforge3
```

### Create Environment with `conda`
To create an environment use the `conda create` command. Once the environment is created, you need to use `conda activate` to activate the environment.
To create an environment with a specific python version, use `conda create --name ENV python=3.9` where `ENV` is the name of the environment. You can choose any environment name of your choice.

!!! info

    You don't need to specify the Python version when creating a Conda environment. If you don't specify it, Conda will use the latest available version by default. In that case, simply use `conda create --name ENV`.


### Activate and Deactivate Conda Environment
Once you create an environment, you need to activate the environment to install python packages
Use `conda activate ENV` to activate the Conda environment (`ENV` is the name of the environment). Following the activation of the conda environment, the name of the environment appears at the left of the hostname in the terminal. 

```bash
[ls565@n0058 ~]$ module load Miniforge3
[ls565@n0058 ~]$ conda create --name ENV python=3.9
[ls565@n0058 ~]$ conda activate ENV
(ENV) [ls565@n0058 ~]$
```

Once you finish the installation of Python packages, deactivate the conda environment using `conda deactivate ENV`. 

!!! warning

    Please note that you may need to create multiple Conda environments, as some packages may not work in a single environment. For example, if you want to install PyTorch and TensorFlow, it's advisable to create separate environments as sometimes both packages in a single environment can cause errors. To create another environment make sure to deactivate the previous environment by using the `conda deactivate` command. 

## Install Python Packages Via Conda
Once Conda environment is activated, you can install packages via `conda install package_name` command. For example, if you want to install `matplotlib`, you need to use

```bash
(ENV) [ls565@n0058 ~]$ conda install -c conda-forge matplotlib
```
where `conda-forge` is the name of the conda channel. 

!!! warning

    Make sure to activate the conda environment prior to installing Python packages. 

### Conda Channel
Conda Channel refers to a repository or collection of software packages that are available for installation using Conda. Conda Channels are used to organize and distribute packages, and they play a crucial role in the Conda ecosystem. Channels can be specified using the `--channel` or `-c` option with the conda install command i.e. 
`conda install -c channel_name package_name`. 

!!! tip

    Since memory and CPU usage are limited, it's better to start an [interactive session with the compute node](interactive-jobs.md) whenever you are installing Python packages via Conda.

In the above example, the command `conda install -c conda-forge matplotlib` will install `matplotlib` from `conda-forge` channel which is a community-maintained collection of Conda packages where a wide range of packages contributed by the community are available. 
Users can prioritize channels by listing them in a specific order, so that Conda searches channels in the order they are listed, installing the first version of a package that it finds. To list the channels, create a file `.condarc` in the `$HOME` directory and add the following

```conda
auto_activate_base: false
channels:
  - conda-forge
```
The advantage of using `.condarc` is that you don't have to mention the channel name every time you install a package. However, please note that you still need to use the channel name if you want to install Python packages that require a specific channel other than the `conda-forge` channel.

## Examples of Conda Environemnt 
Here, we provide some examples of how to use `conda` to install applications. 

!!! note
    For the following examples please make sure to start an [interactive session](../../Running_jobs/interactive-jobs.md/#the-interactive-command-gpu-nodes) on GPU node.

### Install TensorFlow with GPU 
- The following example will create a new conda environment and install TensorFlow in the environment.
```bash
[ls565@n0058 ~]$ module load Miniforge3
[ls565@n0058 ~]$ conda create --name tf 
```

- Activate the new 'tf' environment
```bash
[ls565@n0058 ~]$ conda activate tf
(tf) [ls565@n0058 ~]$
```

- Install tensorflow-gpu
```bash
(tf) [ls565@n0058 ~]$ conda install -c conda-forge tensorflow-gpu
```

- Check if TensorFlow can be loaded
```
(tf) [ls565@n0058 ~]$ python -c "import tensorflow as tf; print( tf.__version__)"
```

- Check if TensorFlow is compiled with GPU
```
(tf) [ls565@n0058 ~]$ python -c "import tensorflow as tf; print(tf.test.is_built_with_gpu_support())"
```

You can also verify using this simple TensorFlow test program to make sure the virtual env can access a GPU. 
??? Example "tf.gpu.test.py"

    ```python
    import tensorflow as tf
    
    if tf.test.gpu_device_name():
    
        print('Default GPU Device: {}'.format(tf.test.gpu_device_name()))
    
    else:
    
       print("Please install GPU version of TF")
    ```

??? Example "Slurm script to submit the job"

    === "Wulver"
    
        ```slurm
        #!/bin/bash -l
        #SBATCH --output=%x.%j.out # %x.%j expands to slurm JobName.JobID
        #SBATCH --error=%x.%j.err # prints the error message
        #SBATCH --partition=gpu
        #SBATCH --nodes=1
        #SBATCH --ntasks-per-node=1
        #SBATCH --gres=gpu:1
        #SBATCH --mem-per-cpu=4000M # Maximum allowable mempry per CPU 4G
        #SBATCH --qos=standard
        #SBATCH --account=PI_ucid # Replace PI_ucid which the NJIT UCID of PI
        #SBATCH --time=71:59:59  # D-HH:MM:SS
        
        # Purge any module loaded by default
        module purge > /dev/null 2>&1
        module load wulver # Load slurm, easybuild
        module load Miniforge3
        conda activate tf
        srun python tf.gpu.test.py
        ```

Next, deactivate the environment using `conda deactivate tf` command.

### Install PyTorch with GPU
* To install PyTorch with GPU, load the `Miniforge3` module as described above and then use the following

```
conda create --name torch-cuda
conda activate torch-cuda
conda install -c "nvidia/label/cuda-12.2.0" cuda-toolkit
conda install -c pytorch -c nvidia pytorch torchvision torchaudio pytorch-cuda -y
```

!!! info
    
    In the example above, we mentioned the channel name as we intend to install PyTorch and PyTorch-CUDA from a specific channel. For the default channel please see [Channels](conda.md#conda-channel).

* Check the Torch version
```
python -c "import torch; print( torch.__version__)"
```
* Check the CUDA version
```
python -c "import torch; print(torch. version .cuda)"
```
* Check whether Torch is compiled with CUDA
```
python -c "import torch; print(torch.cuda. is_available())"
```

!!! warning
    
    While checking the CUDA version or PyTorch compilation using the commands mentioned above, make sure to start an [interactive session on a GPU node](interactive-jobs.md); otherwise, the command will not recognize CUDA or the GPU.

* A simple PyTorch test program is given below to check whether PyTorch has been installed properly. Program is called

??? program "torch_tensor.py"

    ```python
    # -*- coding: utf-8 -*-
    
    import torch
    import math
    
    
    dtype = torch.float
    #device = torch.device("cpu")   # Uncomment this to run on CPU
    device = torch.device("cuda:0") # Uncomment this to run on GPU
    
    # Create random input and output data
    x = torch.linspace(-math.pi, math.pi, 2000, device=device, dtype=dtype)
    y = torch.sin(x)
    
    # Randomly initialize weights
    a = torch.randn((), device=device, dtype=dtype)
    b = torch.randn((), device=device, dtype=dtype)
    c = torch.randn((), device=device, dtype=dtype)
    d = torch.randn((), device=device, dtype=dtype)
    
    learning_rate = 1e-6
    for t in range(2000):
        # Forward pass: compute predicted y
        y_pred = a + b * x + c * x ** 2 + d * x ** 3
    
        # Compute and print loss
        loss = (y_pred - y).pow(2).sum().item()
        if t % 100 == 99:
            print(t, loss)
    
        # Backprop to compute gradients of a, b, c, d with respect to loss
        grad_y_pred = 2.0 * (y_pred - y)
        grad_a = grad_y_pred.sum()
        grad_b = (grad_y_pred * x).sum()
        grad_c = (grad_y_pred * x ** 2).sum()
        grad_d = (grad_y_pred * x ** 3).sum()
    
        # Update weights using gradient descent
        a -= learning_rate * grad_a
        b -= learning_rate * grad_b
        c -= learning_rate * grad_c
        d -= learning_rate * grad_d
    
    
    print(f'Result: y = {a.item()} + {b.item()} x + {c.item()} x^2 + {d.item()} x^3')
    ```

User can use the following job script to run the script.

??? Example "torch-cuda.submit.sh"

    === "Wulver"
    
        ```slurm
        #!/bin/bash -l
        #SBATCH --job-name=torch_test
        #SBATCH --output=%x.%j.out # %x.%j expands to JobName.JobID
        #SBATCH --error=%x.%j.err # prints the error message
        #SBATCH --partition=gpu
        #SBATCH --nodes=1
        #SBATCH --ntasks-per-node=1
        #SBATCH --gres=gpu:1
        #SBATCH --mem-per-cpu=4000M # Maximum allowable mempry per CPU 4G
        #SBATCH --qos=standard
        #SBATCH --account=PI_ucid # Replace PI_ucid which the NJIT UCID of PI
        #SBATCH --time=71:59:59  # D-HH:MM:SS
        
        # Purge any module loaded by default
        module purge > /dev/null 2>&1
        module load wulver # Load slurm, easybuild
        module load Miniforge3
        conda activate torch-cuda
        srun python touch_tensor.py
        ```

!!! warning

    When working with Python, it is generally advised to avoid mixing package management tools such as pip and conda within the same environment. Pip and Conda manage dependencies differently, and their conflict can lead to compatibility issues and unexpected behavior. Mixing the two can result in an environment where packages installed with one tool may not interact seamlessly with those installed using the other. 

## Mamba: The Conda Alternative
Mamba is a fast, robust, and cross-platform package manager and particularly useful for building complicated environments, where `conda` is unable to 'solve' the required set of packages within a reasonable amount of time.
Users can install packages with `mamba` in the same way as with `conda`.
```bash
module load Miniforge3

# create new environment
conda create --name env_name python numpy pandas 
# install a new package into an existing environment
conda activate env_name
mamba install scipy
```
### Example of Installing PyTorch via mamba

```bash
module load Miniforge3
conda create --name torch-cuda
conda activate torch-cuda
mamba install pytorch torchvision torchaudio pytorch-cuda=12.1 -c pytorch -c nvidia
```

This will install pytorch in the `torch-cuda` environment.

## Export and Import Conda Environment
Exporting and importing Conda environments allows users to capture and reproduce the exact set of dependencies for a project. With Conda, a popular package and environment management system, users can export an environment, including all installed packages, into a YAML file. This file can then be shared or version-controlled. Importing the environment from the YAML file on another system ensures consistent dependencies, making it easier to recreate the development or execution environment. 

!!! tips

    When installing Python packages via Conda, ensure that you perform the installation on the compute node rather than the login node. The CPU and memory resources on login nodes are limited, and installing Python packages on the login node can be time-consuming. To avoid this, initiate an [tnteractive session with compute node](interactive-jobs.md).

### Export Conda Environment 
To export a conda environment to a new directory or a different machine, you need to activate the environment first that you intend to export. Please see [Conda environment](#activate-and-deactivate-conda-environment) on how to activate the environment. Once your environment is activated, you can export it to a YAML file:
```console
conda env export > my_environment.yml
```
The YAML should look like this

```yaml
name: my_env
channels:
- defaults
dependencies:
- _libgcc_mutex=0.1=main
- _openmp_mutex=5.1=1_gnu
- blas=1.0=mkl

<ouput snipped>

#the last line is the path of the env
prefix: /home/a/abc3/.conda/envs/my_env.
```
Next, edit the `my_environment.yml` file to make sure it has the correct environment name and other settings. The last line of the file specifies the path of the environment.

Once the YAML file is ready, you can transfer the `my_environment.yml` file to the new machine or directory where you want to replicate the environment. See [cluster file transfer](cluster_access.md#transfer-the-data-from-the-local-machine-to-clusters-or-vice-versa) for details on transferring the files to clusters.

### Set Different Location for Conda Environment and Package
Since Conda, by default, downloads packages and creates environments in the `$HOME` directory, users might encounter disk quota errors if multiple environments are created. In such cases, please follow the above [steps](#export-conda-environment) to move the existing environments from `$HOME` to `/project`. For future environment and package downloads, create a `.condarc` file in the `$HOME` directory and add the following:
```
auto_activate_base: false
envs_dirs:
  - /path/to/custom/conda/envs/directory
pkgs_dirs:
  - /path/to/custom/conda/pkgs
```

Replace `/path/to/custom/conda/envs/directory` with the path you want to use. 

### Import Environment on New Machine
On the new machine, first load Anaconda and initialize conda as before. Then, create the
environment from the YAML file:

```bash
conda env create -f my_environment.yml
Collecting package metadata (repodata.json): done
Solving environment: done

<ouput snipped>

Downloading and Extracting Packages
Preparing transaction: done
Verifying transaction: done
Executing transaction: done
#
# To activate this environment, use
#
# $ conda activate my_env
#
# To deactivate an active environment, use
#
# $ conda deactivate
```
After running this command, Conda will set up the environment as it was on the original machine, including downloading and installing packages. To activate the New Environment use `conda activate my_env` where `my_env` is the environment name.
You can check your current environments using `conda env list`.

### Importing to a Different Location
If you want to import the conda environment to a different location, use the `--prefix` or `-p` option
```console
conda env create -f my_environment.yml -p /project/hpcadmins/abc3/conda_env/my_env
```
This will create the environment in the specified directory instead of the default conda environment directory. Please note that in that case, you need to provide the full path of the environment to activate it.

```bash
conda activate /project/hpcadmins/abc3/conda_env/my_env
(/project/hpcadmins/abc3/conda_env/my_env) abc3@login01:~$ conda env list
# conda environments:
#
base /apps/easybuild/software/Miniforge3/2023.09-0
* /project/hpcadmins/abc3/conda_env/my_env
```
By following these steps, you can successfully export a conda environment from one machine and import it to another, ensuring a consistent working environment across different machines or directories.

!!! warning
    
    It is advisable to use the `/project` directory to store the Conda environment rather than using the `$HOME` directory. On Wulver, the storage space on `$HOME` is limited (50G) and cannot be increased. See [Wulver Filesystems](get_started_on_Wulver.md#wulver-filesystems) for details. 

