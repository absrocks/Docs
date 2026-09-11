---
title: NJIT HPC Documentation
hide:
  - footer
  - toc
---

# Welcome to HPC Documentation

## :material-rocket-launch: New to HPC?
Follow these steps to get up and running on HPC.

<div class="grid cards" markdown>

-   :material-account-plus:{ .lg .middle } __Get an Account__

    ---

    Access to NJIT HPC computing resources requires PI aprroval. Please contact at [hpc@njit.edu](mailto:hpc@njit.edu). 

    [:octicons-arrow-right-24: Wulver account](faq/faq/#login-issues-access)

-   :material-connection:{ .lg .middle } __Connect to a Wulver Cluster__

    ---

    Learn how to log in via SSH, set up your environment, and access the cluster for the first time.

    [:octicons-arrow-right-24: Connection guide](clusters/cluster_access/#access-to-clusters)

-   :material-folder-upload:{ .lg .middle } __Transfer Your Data__

    ---

    Move files to and from the cluster using SCP, RSYNC.

    [:octicons-arrow-right-24: Data transfer](clusters/cluster_access/#transfer-the-data-from-the-local-machine-to-clusters-or-vice-versa)

-   :material-play-circle:{ .lg .middle } __Submit Your First Job__

    ---

    Write a Slurm batch script, submit it to the scheduler, and monitor your job's progress.

    [:octicons-arrow-right-24: Job submission guide](faq/faq/#jobs-and-scheduling)

-   :material-package-variant:{ .lg .middle } __Install Software__

    ---

    Find pre-installed modules via the LMOD system or request software from the HPC help desk.

    [:octicons-arrow-right-24: Software installation guide](faq/faq/#software-and-hardware-specifications)

-   :material-monitor-dashboard:{ .lg .middle } __Open OnDemand__

    ---

    Need to learn more about web based portal Open OnDemand?

    [:octicons-arrow-right-24: Open OnDemand](OnDemand/)

</div>



## HPC latest News!
---
<div class="grid cards" markdown>

-   :material-folder-wrench:{ .lg .middle } __Wulver Scheduled Maintenance__

    ---         
    Wulver will be out of service for maintenance once a month for updates, repairs, and upgrades.  The schedule is 9 a.m. to 9 p.m. the second Tuesday of every month.  During the maintenance period, the logins will be disabled and the jobs that do not end before the maintenance window begins will be held until the maintenance is complete and the cluster is returned to production. 
     <br>For example, if you submit a job the day before maintenance, your job will enter a pending state (you will see job status `PD` when using `squeue -u $LOGNAME`). You can either adjust the walltime or wait until maintenance ends. For full details, see the [Maintenance Policy](Policies/maintenance.md).

-   :fontawesome-solid-door-open:{ .lg .middle } __Open Office Hours__
     
    ---       
    Our weekly drop-in office hours are back this fall. Stop by with questions about getting an account, submitting jobs, installing software, or debugging a workflow on Wulver, no appointment needed. If you cannot make it to campus, you can join the same session over Zoom.

     - :material-calendar-clock: **When:** Every Monday 12pm - 2pm and Wednesday 2pm - 4 pm
     - :material-map-marker: **Where:** GITC 5302M
     - :material-video: **Join virtually:** [Zoom link](https://njit-edu.zoom.us/j/91850887854?pwd=DvdF0pUw3mNJEoogb1OnYm6Eg2Aiju.1)
</div>

## HPC Highlights!
---
<div class="grid cards" markdown>

:octicons-law-24: __Policies__
<br>See our updated [Policies](Policies/index.md) for cluster resource allocation and investment. 
{ .card }

:material-bullhorn: __Cluster Updates__
<br>To see the latest updates on NJIT cluster, please visit [Cluster Maintenance Updates and News](news/index.md).
{ .card }

:material-calendar: __HPC Events__
<br>Check the upcoming events hosted by HPC team and register from [HPC Events](HPC_Events_and_Workshops/index.md).
{ .card }

:fontawesome-solid-chalkboard-user: __HPC Trainings and Webinars__
<br>Make sure to stay up-to-date with the latest webinar sessions on HPC by visiting the [HPC Training](HPC_Events_and_Workshops/Workshop_and_Training_Videos/index.md).
{ .card }

:material-frequently-asked-questions: __FAQs__
<br>For any queries regarding the usage of our cluster, please visit the [FAQs](faq.md) which are organized by topic.
{ .card }

:material-email: __Contact Us__
<br>To create a ticket or request for software installation, visit [Contact Us](contact.md).
{ .card }

</div>