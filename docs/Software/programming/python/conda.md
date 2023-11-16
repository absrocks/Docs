Since Python supports a wide a range additional libraries in machine learning or datas science research, it is not always possible to install every package on HPC. Also, users sometimes need to use a specific version of Python or its libraries to conduct their research. Therefore, in that case users can build their own Python version along with specific library. One of the way to accomplish this is to use Conda.

# Conda
Conda as a package manager helps you find and install packages. If you need a package that requires a different version of Python, you do not need to switch to different environment manager, because conda is also an environment manager. 

## Availability
Conda can be accessed on cluster as `Anaconda3` or `Miniconda3` module.

=== "Wulver"

    ```python exec="on"
    import pandas as pd
    
    df = pd.read_csv('docs/assets/tables/module_wulver.csv')
    # Header values to be added
    soft = df.query('Software == "Anaconda3" | Software == "Miniconda3"')
    print(soft.to_markdown(index=False))
    ```

=== "Lochness"

    ```python exec="on"
    import pandas as pd
    
    df = pd.read_csv('docs/assets/tables/module_lochness.csv')
    # Header values to be added
    soft = df.query('Software == "Anaconda3" | Software == "Miniconda3"')
    print(soft.to_markdown(index=False))
    ```

Users can use conda after using any of the modules mentioned above

module a `Anaconda3` module. Users can use `Anaconda3` to create virtual python environments to manage python modules.

## Create and Activate a Conda Virtual Environment

Load the miniconda Module

```
module load Anaconda3
```

### Create Environment with `conda`
To create an environment use the `conda create` command. Once the environment is created you need to create a file on `$HOME` directory and add the following 
 
??? Example "conda3.sh"
    
    ```bash
    # >>> conda initialize >>>
    # !! Contents within this block are managed by 'conda init' !!
    __conda_setup="$('conda' 'shell.bash' 'hook' 2> /dev/null)"
    if [ $? -eq 0 ]; then
        eval "$__conda_setup"
    else
        if [ -f "$EBROOTANACONDA3/etc/profile.d/conda.sh" ]; then
            . "$EBROOTANACONDA3/etc/profile.d/conda.sh"
        else
            export PATH="$EBROOTANACONDA3/bin:$PATH"
        fi
    fi
    unset __conda_setup
    # <<< conda initialize <<<
    ```
Before activating the environment You need to use `source ~/conda3.sh` to activate the path.
To create an environment use `conda create --name ENV python=3.9` where `ENV` is the name of the environment. You can choose any environment name of your choice.

### Activate and Deactivate Conda Environment
Once you create an environment, you need to activate the environment to install python packages
Use `conda activate ENV` to activate Conda environment (`ENV` is the name of the environment). Following the activation of the conda environment, the name of the environment appears at the left of the hostname in the terminal. 

```bash
login1-41 ~ >: conda activate ENV
(ENV) login-41 ~ >:
```

Once you finish the installation of python packages, deactivate the conda environment using `conda deactivate ENV`. 

!!! warning

    Please note that you may need to create multiple Conda environments, as some packages may not work in a single environment. For example, if you want to install PyTorch and TensorFlow, it's advisibale to create seaprate environment as sometimes both packages in a single environment can cause error. To create another environment make sure to deactivate    previous environmrnt by using `conda deactivate` command. 

### Examples
Here, we provide instructions on how to use `conda` to install application 

#### Install TensorFlow with GPU 
The following example will create a new conda environment based on python 3.9 and install tensorflow in the environment.

```bash
login1-41 ~ >: module load Anaconda3
login1-41 ~ >: conda create --name tf python=3.9
Collecting package metadata (current_repodata.json): done
Solving environment: done

## Package Plan ##

  environment location: /home/g/guest24/.conda/envs/tf

  added / updated specs:
    - python=3.9


The following packages will be downloaded:

 <output snipped>

Proceed ([y]/n)?y

 <output snipped>
#
# To activate this environment, use
#
#     $ conda activate tf
#
# To deactivate an active environment, use
#
#     $ conda deactivate
```

and save this script`conda3.sh` in `$HOME` directory.

Activate the new 'tf' environment
```bash
login1-41 ~ >: source $HOME/conda3.sh
login1-41 ~ >: conda activate tf
(tf) login-41 ~ >:
```
Install tensorflow-gpu
```bash
(tf) node430-41 ~ >: conda install -c anaconda tensorflow-gpu
Collecting package metadata (current_repodata.json): done
Solving environment: done

## Package Plan ##

  environment location: /home/g/guest24/miniconda3/envs/tf

  added / updated specs:
    - tensorflow-gpu

<output snipped>

The following packages will be SUPERSEDED by a higher-priority channel:

  ca-certificates                                 pkgs/main --> anaconda
  certifi                                         pkgs/main --> anaconda
  openssl                                         pkgs/main --> anaconda


Proceed ([y]/n)?y

<output snipped>

mkl_fft-1.1.0        | 143 KB    | ####################################################################################### | 100%
urllib3-1.25.9       | 98 KB     | ####################################################################################### | 100%
cudatoolkit-10.1.243 | 513.2 MB  | ####################################################################################### | 100%
protobuf-3.12.3      | 711 KB    | ####################################################################################### | 100%
blinker-1.4          | 21 KB     | ####################################################################################### | 100%
requests-2.24.0      | 54 KB     | ####################################################################################### | 100%
werkzeug-1.0.1       | 243 KB    | ####################################################################################### | 100%
Preparing transaction: done
Verifying transaction: done
Executing transaction: done
```
Check to see if tensorflow can be loaded
```
(tf) login1-41 ~ >: python
Python 3.9.13 (main, Oct 13 2022, 21:15:33)
[GCC 11.2.0] :: Anaconda, Inc. on linux
Type "help", "copyright", "credits" or "license" for more information.
>>>
```
Simple tensorflow test program to make sure the virtual env can access a gpu. Program is called 
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
        module load Anaconda3
        source $HOME/conda3.sh
        conda activate tf
        srun python tf.gpu.test.py
        ```
    
    === "Lochness"
    
        ```slurm
        #!/bin/bash -l
        #SBATCH --job-name=tf_test
        #SBATCH --output=%x.%j.out # %x.%j expands to JobName.JobID
        #SBATCH --nodes=1
        #SBATCH --tasks-per-node=1
        #SBATCH --partition=datasci
        #SBATCH --gres=gpu:1
        #SBATCH --mem=4G
        
        # Purge any module loaded by default
        module purge > /dev/null 2>&1
        module load Anaconda3
        source $HOME/conda3.sh
        conda activate tf
        srun python tf.gpu.test.py
        ```
Result:
```
Starting /home/g/guest24/.bash_profile ... standard AFS bash profile

Home directory : /home/g/guest24 is not in AFS -- skipping quota check

On host node430 :
         17:14:13 up 1 day,  1:17,  0 users,  load average: 0.01, 0.07, 0.06

      Your Kerberos ticket and AFS token status 
klist: No credentials cache found (filename: /tmp/krb5cc_22967_HvCVvuvMMX)
Kerberos :
AFS      :

Loading default modules ...
Create file : "/home/g/guest24/.modules" to customize.

No modules loaded
2020-07-29 17:14:19.047276: I tensorflow/core/platform/cpu_feature_guard.cc:143] Your CPU supports instructions that this TensorFlow binary was not compiled to use: SSE4.1 SSE4.2 AVX AVX2 FMA
2020-07-29 17:14:19.059941: I tensorflow/core/platform/profile_utils/cpu_utils.cc:102] CPU Frequency: 2200070000 Hz
2020-07-29 17:14:19.060093: I tensorflow/compiler/xla/service/service.cc:168] XLA service 0x55ea8ebfdb90 initialized for platform Host (this does not guarantee that XLA will be used). Devices:
2020-07-29 17:14:19.060136: I tensorflow/compiler/xla/service/service.cc:176]   StreamExecutor device (0): Host, Default Version
2020-07-29 17:14:19.061484: I tensorflow/stream_executor/platform/default/dso_loader.cc:44] Successfully opened dynamic library libcuda.so.1

<ouput snipped>

2020-07-29 17:14:19.817386: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1102] Device interconnect StreamExecutor with strength 1 edge matrix:
2020-07-29 17:14:19.817392: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1108]      0
2020-07-29 17:14:19.817397: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1121] 0:   N
2020-07-29 17:14:19.819082: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1247] Created TensorFlow device (/device:GPU:0 with 15064 MB memory) -> physical GPU (device: 0, name: Tesla P100-PCIE-16GB, pci bus id: 0000:02:00.0, compute capability: 6.0)
Default GPU Device: /device:GPU:0
```
Next, deactivate the environment using `conda deactivate tf` command.

#### Install PyTorch with GPU
To install PyTorch with GPU, load the `Anaconda3` module as described above and then use the following

```
conda create --name torch-cuda python=3.7
conda activate torch-cuda
conda install -c "nvidia/label/cuda-11.7.0" cuda-toolkit
conda install pytorch torchvision torchaudio pytorch-cuda=11.7 -c pytorch -c nvidia
```
A simple PyTorch test program is given below to check whether PyTorch has been installed properly. Program is called

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
        module load Anaconda3
        source $HOME/conda3.sh
        conda activate torch-cuda
        srun python touch_tensor.py
        ```
    
    === "Lochness"
    
        ```slurm
        #!/bin/bash -l
        #SBATCH --job-name=torch_test
        #SBATCH --output=%x.%j.out # %x.%j expands to JobName.JobID
        #SBATCH --nodes=1
        #SBATCH --tasks-per-node=1
        #SBATCH --partition=datasci
        #SBATCH --gres=gpu:1
        #SBATCH --mem=4G
        
        # Purge any module loaded by default
        module purge > /dev/null 2>&1
        module load Anaconda3
        source $HOME/conda3.sh
        conda activate torch-cuda
        srun python touch_tensor.py
        ```

### Mamba: The Conda Alternative
Mamba is a fast, robust, and cross-platform package manager and particularly useful for building complicated environments, where `conda` is unable to 'solve' the required set of packages within a reasonable amount of time.
User can install packages with `mamba` in the same way as with `conda`.
```bash
module load Mamba Anaconda3

# create new environment
mamba create --name env_name python numpy pandas 

# install new pacakge into existing environment
conda activate env_name
mamba install scipy
```