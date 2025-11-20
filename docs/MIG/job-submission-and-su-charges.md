# MIG Job Submission and SU Charges

When submitting jobs on Wulver's MIG-enabled A100 GPUs, you must explicitly request the desired MIG profile using the `--gres` directive in your SLURM script.

| GPU MIG |          Slurm Directive           | 
|---------|:----------------------------------:|
| 10G MIG |      `--gres=gpu:a100_10g:1 `      |
| 20G MIG |      `--gres=gpu:a100_20g:1 `      |
| 40G MIG |      `--gres=gpu:a100_40g:1 `      |


!!! note
    If you want to see a job script example of requesting a full GPU, please refer to the sample [GPU job scripts](../Running_jobs/batch-jobs.md/#example-of-batch-job-slurm-script-gpu-nodes).

## Running Jobs with MIG

=== "Sample SLURM Script for a MIG Job"

    ```shell
    #!/bin/bash -l
    #SBATCH --job-name=gpu_job
    #SBATCH --output=%x.%j.out
    #SBATCH --error=%x.%j.err
    #SBATCH --partition=gpu
    #SBATCH --qos=standard
    #SBATCH --account=$PI_ucid         # Replace with PI's UCID
    #SBATCH --nodes=1
    #SBATCH --ntasks-per-node=8
    #SBATCH --gres=gpu:a100_10g:1      # Change to 20g or 40g as needed
    #SBATCH --time=59:00
    #SBATCH --mem-per-cpu=4000M
    
    srun ./myexe <input/output options>
    ```

=== "Interactive session with MIG"

    ```shell
    $srun --partition=gpu \
    --account=$PI_ucid \
    --qos=standard \
    --gres=gpu:a100_10g:1 \
    --time=00:59:00 \
    --pty bash
    ```

!!!warning
    You cannot run your job using multiple MIG instances. For example, `--gres=gpu:a100_10g:2` will allocate two instances of the 10G MIG, but it will either raise an error or some jobs may assume it as a single MIG, even if multiple instances are requested.

## Understanding SU Charges

Wulver uses a Service Unit (SU) model to track computing usage. Your job's SU cost is based on:

- CPU usage
- Memory request
- GPU memory allocation (via MIG)

Each component contributes to the SU calculation. The SU cost is charged per hour using the formula:

```
SU = MAX(#CPUs, Memory (in GB) / 4) + 16 × (GPU memory requested / 80GB)
```

!!! info
    GPU memory requested is based on the MIG profile, not your actual memory usage during the job.


| SLURM Directive            |    SU     |      Explaination |
|---------------------|:---------:|:---------:|
| 4 CPUs + 10MIG     |  MAX(4, 4*4G/4G) + 16 * (10G/80G) = 6  |     Since no memory requireemnt is specified, SU is charged based on the same number of CPUs and 10G of GPU memory      |
| 4 CPUs + 20MIG      |  MAX(4, 4*4G/4G) + 16 * (20G/80G) = 8 |    SU is charged based on the same number of CPUs and 20G of GPU memory         |
| 4 CPUs + 40MIG     |  MAX(4, 4*4G/4G) + 16 * (40G/80G) = 12 |   SU is charged based on the same number of CPUs and 40G of GPU memory          |
| 4 CPUs + Full GPU      |  MAX(4, 4*4G/4G) + 16 * (80G/80G) = 20 |  SU is charged based on the same number of CPUs and 80G of GPU (A full GPU) memory            |
| 4 CPUs + `--mem=64G` + Full GPU      |  MAX(4, 64G/4G) + 16 * (80G/80G) = 32 |  The MAX function the evaluates the maximum of 4 SUs (from CPUs), and 64G/4G= 16 SUs (from memory). In addition, 16 SUs are charged from 80G of GPU (A full GPU) memory, bringing the total SU charge to 32 SUs  |
| 4 CPUs + `--mem-per-cpu=8G` + Full GPU      |  MAX(4, 4*8G/4G) + 16 * (80G/80G) = 24 |  The MAX function the evaluates the maximum of 4 SUs (from CPUs), and 4*8G/4G= 8 SUs (from memory). In addition, 16 SUs are charged from 80G of GPU (A full GPU) memory, bringing the total SU charge to 24 SUs  |


## Tips for Efficient Job Submission ***(Think Fit, Not Power)***

- Choose the profile that fits your workload, not the biggest one available. You’ll save SUs, get scheduled faster, and help the cluster stay responsive for everyone.
- Avoid requesting a full GPU unless your job cannot run on a MIG.
- Combine small jobs using job arrays or batching when possible.
- Need help estimating SUs? Try submitting test jobs with `--time=10:00` and reviewing the actual SU usage via the job summary.
- By default, each CPU is allocated `4 GB` of memory. If your job requires more, you can request additional memory using `--mem`. Please ensure you request only as much as your job needs, as over-allocating memory will increase your SU usage. Refer to the formula above for details.
- MIG is designed to make high-performance GPUs accessible and efficient — take advantage of it wisely.
