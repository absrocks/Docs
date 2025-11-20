## Overview 
Batch jobs are like pre-written instructions handed over to the cluster to be executed when resources become available.

Unlike your personal laptop where you run commands interactively, HPC jobs are queued and run asynchronously using a job script — a text file that tells Slurm:

- What resources do you need?
- What is your PI account?
- What programs or commands are needed to run job?
- How long your job may take?

### Example of batch job slurm script

=== "CPU Nodes"
    ??? example "Sample Job Script to use: submit.sh"

        === "Using 1 core"
            ```slurm
            #!/bin/bash -l
            #SBATCH --job-name=job_name
            #SBATCH --output=%x.%j.out # %x.%j expands to slurm JobName.JobID
            #SBATCH --error=%x.%j.err
            #SBATCH --partition=general
            #SBATCH --qos=standard
            #SBATCH --account=$PI_ucid # Replace $PI_ucid which the NJIT UCID of PI
            #SBATCH --nodes=1
            #SBATCH --ntasks=1
            #SBATCH --time=59:00  # D-HH:MM:SS
            #SBATCH --mem-per-cpu=4000M

            ./myexe <input/output options> # myexe is the executable in this example.
            ```
        
        === "Using multiple cores"
            ```slurm
            #!/bin/bash -l
            #SBATCH --job-name=job_name
            #SBATCH --output=%x.%j.out # %x.%j expands to slurm JobName.JobID
            #SBATCH --error=%x.%j.err
            #SBATCH --partition=general
            #SBATCH --qos=standard
            #SBATCH --account=$PI_ucid # Replace $PI_ucid which the NJIT UCID of PI
            #SBATCH --nodes=1
            #SBATCH --ntasks-per-node=8
            #SBATCH --time=59:00  # D-HH:MM:SS
            #SBATCH --mem-per-cpu=4000M

            srun ./myexe <input/output options> # myexe is the executable in this example.
            ```

        === "Using multiple threads"
            ```slurm
            #!/bin/bash -l
            #SBATCH --job-name=job_name
            #SBATCH --output=%x.%j.out # %x.%j expands to slurm JobName.JobID
            #SBATCH --error=%x.%j.err
            #SBATCH --partition=general
            #SBATCH --qos=standard
            #SBATCH --account=$PI_ucid # Replace $PI_ucid which the NJIT UCID of PI
            #SBATCH --nodes=1
            #SBATCH --ntasks-per-node=8
            #SBATCH --time=59:00  # D-HH:MM:SS
            #SBATCH --mem-per-cpu=4000M

            OMP_NUM_THREADS=$SLURM_NTASKS ./myexe <input/output options>
            ```
            Use this script, if your code relies on threads instead of cores. 

        === "Using multiple cores and threads"
            ```slurm
            #!/bin/bash -l
            #SBATCH --job-name=job_name
            #SBATCH --output=%x.%j.out # %x.%j expands to slurm JobName.JobID
            #SBATCH --error=%x.%j.err
            #SBATCH --partition=general
            #SBATCH --qos=standard
            #SBATCH --account=$PI_ucid # Replace $PI_ucid which the NJIT UCID of PI
            #SBATCH --nodes=1
            #SBATCH --ntasks=64
            #SBATCH --cpus-per-task=2
            #SBATCH --time=59:00  # D-HH:MM:SS
            #SBATCH --mem-per-cpu=4000M

            srun gmx_mpi mdrun ... -ntomp $SLURM_CPUS_PER_TASK ...
            ```
            This is the example script of [GROAMCS](gromacs.md) which uses both CPUs and threads.      
    !!! warning
        
        Do not request multiple cores unless your code is parallelized. Before using multiple cores, ensure that your code is capable of parallelizing tasks; otherwise, it will unnecessarily consume service units (SUs) and may negatively impact performance. Please review the code's documentation thoroughly and use a single core if it does not support parallel execution.  

    * Here, the job requests 1 node on the `general` partition with `qos=standard`. Please note that the memory relies on the number of cores you are requesting. 
    * As per the policy, users can request up to 4GB memory per core, therefore the flag  `--mem-per-cpu` is used for memory requirement. If you are using 1 core and need more memory, use `--mem` instead. 
    * In this above script `--time` indicates the wall time which is used to specify the maximum amount of time that a job is allowed to run. The maximum allowable wall time depends on SLURM QoS, which you can find in [QoS](node-memory-config.md)). 
    * To submit the job, use `sbatch submit.sh` where the `submit.sh` is the job script. Once the job has been submitted, the jobs will be in the queue, which will be executed based on priority-based scheduling. 
    * To check the status of the job use `squeue -u $LOGNAME` and you should see the following 
    ```bash
    JOBID PARTITION     NAME     USER  ST    TIME    NODES  NODELIST(REASON)
    635   general     job_nme   ucid   R   00:02:19    1      n0088
    ```
    Here, the `ST` stands for the status of the job. You may see the status of the job `ST` as `PD` which means the job is pending and has not been assigned yet. The status change depends upon the number of users using the partition and resources requested in the job. Once the job starts, you will see the output file with an extension of `.out`. If the job causes any errors, you can check the details of the error in the file with the `.err` extension.

=== "GPU Nodes"
    In case of submitting the jobs on GPU, you can use the following SLURM script 

    ??? example "Sample Job Script to use: gpu_submit.sh"
        
        === "Using 1 core, 1 GPU"
            ```slurm
            #!/bin/bash -l
            #SBATCH --job-name=gpu_job
            #SBATCH --output=%x.%j.out # %x.%j expands to slurm JobName.JobID
            #SBATCH --error=%x.%j.err
            #SBATCH --partition=gpu
            #SBATCH --qos=standard
            #SBATCH --account=$PI_ucid # Replace $PI_ucid which the NJIT UCID of PI
            #SBATCH --nodes=1
            #SBATCH --ntasks-per-node=1
            #SBATCH --gres=gpu:1
            #SBATCH --time=59:00  # D-HH:MM:SS
            #SBATCH --mem-per-cpu=4000M

            ./myexe <input/output options> # myexe is the executable in this example.
            ```

        === "Using multiple cores, 1 GPU"
            ```slurm
            #!/bin/bash -l
            #SBATCH --job-name=gpu_job
            #SBATCH --output=%x.%j.out # %x.%j expands to slurm JobName.JobID
            #SBATCH --error=%x.%j.err
            #SBATCH --partition=gpu
            #SBATCH --qos=standard
            #SBATCH --account=$PI_ucid # Replace $PI_ucid which the NJIT UCID of PI
            #SBATCH --nodes=1
            #SBATCH --ntasks-per-node=8
            #SBATCH --gres=gpu:1
            #SBATCH --time=59:00  # D-HH:MM:SS
            #SBATCH --mem-per-cpu=4000M

            srun ./myexe <input/output options> # myexe is the executable in this example.
            ```

        === "Using multiple cores, GPUs"
            ```slurm
            #!/bin/bash -l
            #SBATCH --job-name=gpu_job
            #SBATCH --output=%x.%j.out # %x.%j expands to slurm JobName.JobID
            #SBATCH --error=%x.%j.err
            #SBATCH --partition=gpu
            #SBATCH --qos=standard
            #SBATCH --account=$PI_ucid # Replace $PI_ucid which the NJIT UCID of PI
            #SBATCH --nodes=1
            #SBATCH --ntasks-per-node=8
            #SBATCH --gres=gpu:2
            #SBATCH --time=59:00  # D-HH:MM:SS
            #SBATCH --mem-per-cpu=4000M

            srun ./myexe <input/output options> # myexe is the executable in this example.
            ```
        
        === "Using MIGs"
            ```slurm
            #!/bin/bash -l
            #SBATCH --job-name=gpu_job
            #SBATCH --output=%x.%j.out # %x.%j expands to slurm JobName.JobID
            #SBATCH --error=%x.%j.err
            #SBATCH --partition=gpu
            #SBATCH --qos=standard
            #SBATCH --account=$PI_ucid # Replace $PI_ucid which the NJIT UCID of PI
            #SBATCH --nodes=1
            #SBATCH --ntasks-per-node=8
            #SBATCH --gres=gpu:a100_10g:1  # This uses 10G MIG, to use 20G or 40G MIG, modify 10g to 20g or 40g 
            #SBATCH --time=59:00  # D-HH:MM:SS
            #SBATCH --mem-per-cpu=4000M

            srun ./myexe <input/output options> # myexe is the executable in this example.
            ```

    !!! warning

        Do not use multiple GPUs unless you are certain that your job's performance will benefit from them. Most GPU jobs do not require multiple CPUs either. Please remember that unnecessarily requesting additional resources can negatively impact job performance and will also consume more service units (SUs).  

=== "Debug Node"
    The `debug` QoS in Slurm is intended for debugging and testing jobs. It usually provides a shorter queue wait time and quicker job turnaround. Jobs submitted with the `debug` QoS have access to a limited set of resources (Only 4 CPUS on Wulver), making it suitable for rapid testing and debugging of applications without tying up cluster resources for extended periods. 

    ??? example "Sample Job Script to use: debug_submit.sh"

        ```slurm
        #!/bin/bash -l
        #SBATCH --job-name=debug
        #SBATCH --output=%x.%j.out # %x.%j expands to slurm JobName.JobID
        #SBATCH --error=%x.%j.err
        #SBATCH --partition=debug
        #SBATCH --qos=debug
        #SBATCH --account=$PI_ucid # Replace $PI_ucid which the NJIT UCID of PI
        #SBATCH --nodes=1
        #SBATCH --ntasks-per-node=1
        #SBATCH --time=7:59:00  # D-HH:MM:SS, Maximum allowable Wall Time 8 hours
        #SBATCH --mem-per-cpu=4000M

        ./myexe <input/output options>
        ```
=== "Bigmem Node"
    The bigmem nodes provide 2 TB of RAM in total. By default, each CPU core is allocated 16 GB of memory, but you can request additional memory if your job requires it.

    ??? example "Sample Job Script to use: bigmem_submit.sh"

        ```slurm
        #!/bin/bash -l
        #SBATCH --job-name=bigmem_job
        #SBATCH --output=%x.%j.out # %x.%j expands to slurm JobName.JobID
        #SBATCH --error=%x.%j.err
        #SBATCH --partition=bigmem
        #SBATCH --qos=bigmem
        #SBATCH --account=$PI_ucid # Replace $PI_ucid which the NJIT UCID of PI
        #SBATCH --nodes=1
        #SBATCH --ntasks-per-node=1
        #SBATCH --time=59:00  # D-HH:MM:SS, Maximum allowable Wall Time 8 hours
        #SBATCH --mem-per-cpu=16000M

        ./myexe <input/output options>
        ```

To submit the jobs, `sbatch` command.