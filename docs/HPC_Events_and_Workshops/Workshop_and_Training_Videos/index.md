---
title: HPC Education and Training
---

# HPC Education and Training

NJIT HPC provides practical training in high performance computing for students and researchers at various levels of expertise. HPC training for research professionals aims to enhance their capabilities in utilizing high-performance computing, data-intensive computing, and data analytics within their respective research fields. 

## 2026 Fall

<div class="grid cards" markdown>

-   ### [Introduction to Wulver: Job Efficiency and Resource Utilization](../index.md)

    ---

    This webinar is the third session of the Fall 2026 series and covers advanced SLURM features for running jobs efficiently on the Wulver HPC cluster. Participants will learn how to automate many similar jobs, chain multi-step workflows, and keep long-running jobs going past the 72-hour walltime limit, along with common mistakes that slow jobs down and how to fix them.
    
    **Key Highlights:**

    * Interactive jobs with `salloc` and `srun`, and when to use `--exclusive`
    * Job dependencies for building automated pipelines
    * Job arrays: syntax, array variables, mapping task IDs to inputs, and throttling
    * Checkpointing, DMTCP, and chaining jobs to run beyond 72 hours
    * Switch-aware placement for multi-node MPI jobs
    * Common problems: serial code with multiple tasks and oversubscribed nodes

    <iframe src="https://njit.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=9ca98944-694b-4731-91e7-b4ea0152d242&autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=true&interactivity=all" height="405" width="720" style="border: 1px solid #464646; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="Introduction to Wulver: Job Efficiency and Resource Utilization" aria-description="Introduction to Wulver: Job Efficiency and Resource Utilization"></iframe>

    [<span class="octicon--arrow-right-24"></span> Download Slides](../../assets/slides/Advanced_SLURM_Fall_2026.pdf)

</div>

<div class="grid cards" markdown>

-   ### [Introduction to Wulver: Job Submission and Resource Requests](../index.md)

    ---

    This webinar is the second session of the Fall 2026 series and provides an overview of job submission and resource requests. Participants will learn how to effectively submit and manage jobs on the Wulver HPC cluster, as well as request and utilize compute resources. 
    
    **Key Highlights:**

    * Wulver hardware recap, what SLURM does, and login vs. compute nodes
    * Partitions, QoS priority levels, job limits, GPUs and MIG slices
    * How Service Units are charged per partition and checking your group's balance
    * Batch scripts, interactive sessions, monitoring tools, and common mistakes

    <iframe src="https://njit.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=f554aaad-f945-4f33-8f1b-b4dc0155dcc8&autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=true&interactivity=all" height="405" width="720" style="border: 1px solid #464646; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="Introduction to Wulver: Job Submission and Resource Requests" aria-description="Introduction to Wulver: Job Submission and Resource Requests"></iframe>

    [<span class="octicon--arrow-right-24"></span> Download Slides](../../assets/slides/Intro_to_Wulver_II_10_07_2026.pdf)

</div>

<div class="grid cards" markdown>

-   ### [Introduction to Wulver: Getting Started with HPC](../index.md)

    ---

    This webinar is the first session of the Fall 2026 series and provides an introductory overview of accessing and using the Wulver HPC cluster, including HPC terminology, account setup, storage allocations, and the partitions and node types available. Participants will learn how to connect through SSH and Open OnDemand, transfer files, find and load software modules, and follow resource usage policies, with ACCESS and NAIRR covered as options for additional computing hours.
    
    **Key Highlights:**

    * HPC concepts, account setup, and storage (home, project, scratch)
    * Node types and partitions — general purpose, GPU, large memory
    * Access via SSH and Open OnDemand; file transfer with rsync
    * Software modules, usage policies, maintenance, ACCESS and NAIRR


    <iframe src="https://njit.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=9c4f0837-04bb-4d1a-871a-b4ce01556a4c&autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=true&interactivity=all" height="405" width="720" style="border: 1px solid #464646; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="Introduction to Wulver: Getting Started with HPC" aria-description="Introduction to Wulver: Getting Started with HPC"></iframe>

    [<span class="octicon--arrow-right-24"></span> Download Slides](../../assets/slides/Intro_to_Wulver_I_09_23_2026.pdf)

</div>