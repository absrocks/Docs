# Tools

## Overview

The passenger apps (Tools) on OnDemand are some of the easiest and user-friendly ways to monitor key stats related to your account and Wulver in general.

![Tools menu open in the top navigation bar, listing Joblist, checkload, homespace, ps and qoslist](../assets/ondemand/tools/tools-dropdown-new.png){ width=100% height=100%}


=== "Joblist"

    This is a simple tool to monitor your past jobs as well as the service units you have consumed in a given time period. To use this tool:

    - Click on the Joblist option in the tools drop down menu.

    - Enter the start date and end date between which you want to monitor your past jobs

    ![Joblist form with start time and end time date fields and a Submit button](../assets/ondemand/tools/joblist-date-input.png){ width=100% height=100%}

    - You will be presented with a table of your jobs with a few job details atop which you find information like service units consumed, your specified date range and the qos.

    ![Joblist results showing a summary of service units used above a table of jobs in the chosen date range](../assets/ondemand/tools/joblist-output.png){ width=100% height=100%}

=== "Checkload"

    This is a tool which can be used to monitor the CPU load, state, and other parameters on compute nodes across the entire wulver cluster. This tool is not specific to your account.

    - It can be used to check for idle nodes.
    - It can also be used to cross check your requested configuration.
    - It can also be crudely used to check the load on the cluster

    ![Checkload table listing each compute node with its partition, state, CPUs, memory, CPU load and time limit](../assets/ondemand/tools/checkload-output.png){ width=100% height=100%}


=== "Homespace"

    This is one of the most useful tool to monitor your `/home` partition in detail. This gives you a list of subdirectories and their respective sizes (in MB). You should monitor your `/home` directory size at least twice a month depending on your usage to be sure you are below the upper limit of 50GB. Ideally you should clean your `/home` directory if it reaches 40GB or above. If your `/home` exceeds this limit it severely impacts some operations like creating new conda envs, installing new packages, etc.

    Also an easy way to keep your `/home` below this limit is to move your conda environment and package default directory to your `/project` directory, the details for this can be found [here](../Software/python/conda.md#export-conda-environment)

    !!! Note

        Since it calculates the storage used by each subdirectory and file in your `/home` directory, it may take some time to load the results.

     ![Homespace output listing the subdirectories in the home directory with their sizes in MB](../assets/ondemand/tools/homespace-ouput.png){ width=100% height=100%}

=== "PS"

    This is also a very important tool to monitor processes running on your login node usage. 
    
    ![PS output listing the processes currently running under your account on the login node](../assets/ondemand/tools/ps-output.png){ width=100% height=100%}


    !!! Warning
        It is strictly advised to not run any resource consuming process on the login node, instead use compute node. The login node is shared between all the wulver users. Using login node for any such process like creating conda env, installing conda packages, running your jobs/programs is strictly not advised. Repeatedly using the login node for such processes will result in strict action. If you find there is high activity by any process on your login node and you are unsure of the cause please email to [hpc@njit.edu](mailto:hpc@njit.edu) with the screenshot of the output of the PS tool.


=== "Qoslist"

    QOS is an important flag for any type of job submission. You can check all the available QOS for each of your accounts using this tool. Click [here](../Software/slurm/index.md#partition-use-partition) for details about QOS.

    ![Qoslist output showing the QOS options available for each of your Slurm accounts](../assets/ondemand/tools/qoslist-output.png){ width=100% height=100%}
