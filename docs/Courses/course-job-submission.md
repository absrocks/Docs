# Submitting Course Jobs

Submit scripts on Wulver must include specification of partition, account, qos, and time limit. Also the first line in the batch file must be `#!/bin/bash -l`. 

Below is the minimal example for a 10-minute test job:

```bash
#!/bin/bash -l
#SBATCH --partition=course
#SBATCH --account=2025-fall-ds-492-kjc59-ls565
#SBATCH --qos=course
#SBATCH --time=00:10:00
```

### Sample Job scripts

Make sure to replace `--account` with your assigned course account.

#### CPU Job Example

```bash
#!/bin/bash
#SBATCH --job-name=mpi_test_job
#SBATCH --output=%x.%j.out
#SBATCH --error=%x.%j.err
#SBATCH --partition=course
#SBATCH --account=2025-fall-ds-492-kjc59-ls565
#SBATCH --qos=course
#SBATCH --time=00:10:00
#SBATCH --ntasks=64

# Run application commands
srun /apps/testjobs/bin/mpihello
```

- Runs an MPI job named mpi_test_job.
- Uses 64 processes across available nodes.
- Wall time: 10 minutes.

#### GPU Job Example

```bash
#!/bin/bash
#SBATCH --job-name=test_gpu_job
#SBATCH --output=%x.%j.out
#SBATCH --error=%x.%j.err
#SBATCH --partition=course_gpu
#SBATCH --account=2025-fall-ds-492-kjc59-ls565
#SBATCH --qos=course
#SBATCH --time=00:20:00
#SBATCH --ntasks=2
#SBATCH --gres=gpu:a100_10g:1

# Load application environment
module load CUDA

# Run application commands
nvidia-smi
```

- Runs a GPU job named test_gpu_job.
- Allocates 2 CPUs and single A100 10G MIG GPU.
- Wall time: 20 minutes.

### Limitation of GPU Jobs

- You cannot request multiple MIG instances in one job. <br>
For example: `--gres=gpu:a100_10g:2` <br>
This will either cause an error or misinterpretation as a single GPU.

- Each job should request one GPU per job. <br>
For multiple tasks, use job arrays instead of multiple MIGs.


### Interactive jobs

You can also start an interactive session instead of a batch job.

```bash
interactive -a ACCOUNT -q QOS -p PARTITION -j JOB_TYPE
```

Parameters:

- `-a ACCOUNT`  → Your assigned course account
- `-q course`   → QoS for course jobs
- `-p course`   → Partition (use course or course_gpu)
- `-j JOB_TYPE` → Type of job (e.g., cpu or gpu)

Example

```bash
interactive -a 2025-fall-ds-492-kjc59-ls565 -q course -p course
```

This command launches a temporary compute session for hands-on work or testing.


!!! info "Learn More About Job Submission"
    For more detailed examples and advanced options, visit the [**Running Jobs** page](../Running_jobs/index.md).
