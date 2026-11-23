# My Interactive Sessions

## Overview

All of your active OnDemand sessions will be shown. 


![My Interactive Sessions page listing active session cards, with a sidebar of interactive apps on the left](../assets/ondemand/interactive/interactive-sessions-1.png){ width=100% height=100%}


![A running interactive session card showing its host, time remaining, session ID and a blue connect button](../assets/ondemand/interactive/interactive-sessions-2.png){ width=100% height=100%}

## Canceling and Deleting Interactive Jobs

![Interactive session card with the Cancel button highlighted](../assets/ondemand/interactive/interactive-sessions-3.png){ width=80% height=80%}

![Cancelled session card with options to delete the card or resubmit the job](../assets/ondemand/interactive/interactive-sessions-4.png){ width=80% height=80%}

**Cancel** — Terminates the running Slurm job. The job card remains visible so you can **resubmit** the job with the same parameters or **modify** them before launching again.

**Delete** — Removes the job card from the dashboard.

If not deleted manually, completed job cards are automatically removed after 6 days.

!!! Warning

    Please don't forget to cancel all of your running sessions after use. Otherwise, they will keep consuming SU unless low priority is used.
