# Dashboard

Once you log in, the Dashboard gives you a live overview of the cluster and your
account. It is organized into panels, with a menu bar across the top for Apps,
Files, Jobs, Clusters, Interactive Apps, Tools, and My Interactive Sessions.

![Open OnDemand dashboard showing the top menu bar and panels for Announcements, Recent Jobs, System Status, Allocations and Storage](<../assets/ondemand/dashboard/overview OOD.png>){ width=100% height=100%}

## Announcements
It displays current HPC announcements (maintenance windows, outages, policy changes).

![Announcements panel on the dashboard, showing a "No Current Announcements" message with a note to check back later for updates and previous announcements below it](<../assets/ondemand/dashboard/dashboard-announcements-box.png>){ width=100% height=100%}

## Recent Jobs
Your jobs that you have most recently submitted are visible here, so you can jump straight to their
status.

![Recent Jobs panel on the dashboard, showing a "No Recent Jobs" message until jobs are submitted](<../assets/ondemand/dashboard/dashboard-recent-jobs-box.png>){ width=100% height=100%}

## System Status
A real-time snapshot of Wulver by partition. For each partition (general, gpu,
gpu (MIGs), bigmem, debug, debug_gpu, course, course_gpu) you can see cores/GPUs/MIGs
in use vs. available, percent utilization, nodes in use, and an Up/Down health badge.
The top of the panel also shows total **Jobs Running** and **Jobs Queued**. Use this
to gauge cluster load before submitting.

![System Status panel listing each Wulver partition with an Up/Down badge, cores, GPUs or MIGs in use, and a utilization bar, with total jobs running and queued at the top](<../assets/ondemand/dashboard/dashboard-system-status-box.png>){ width=100% height=100%}

## Allocations
Shows the Service Unit (SU) allocation for each account you belong to: SUs used vs.
your total quota, the percent consumed, and how many SUs you have used.

![Allocations panel showing an account's SUs used against its total quota, the SUs remaining, and the SUs used by the logged-in user](<../assets/ondemand/dashboard/dashboard-allocations-box.png>){ width=100% height=100%}

## Storage
Shows your storage usage and quota for each filesystem. Each row has a **Browse** button that opens that location in the file manager, and
notes how much of the space *you* are using versus the account total.

![Storage panel showing usage and quota bars for the home, project and scratch directories, each with a Browse button](<../assets/ondemand/dashboard/dashboard-storage-box.png>){ width=100% height=100%}


## Quick Access to Features
We also provide a quick access to our most used features on the dashboard.

![Dashboard section with Recently Used Apps tiles, such as Jupyter, VS Code and RStudio, below the System Status panel](../assets/ondemand/dashboard/dashboard-most-used-features-1.png){ width=90% height=90%}

![Pinned Apps section on the dashboard with Tools tiles for Joblist, checkload, homespace, ps and qoslist](../assets/ondemand/dashboard/dashboard-most-used-features-2.png){ width=90% height=90%}
