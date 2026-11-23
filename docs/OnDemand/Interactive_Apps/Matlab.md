# MATLAB

## Overview

We have two ways to connect Matlab: 

* Matlab VNC
* Matlab Server
<!-- * Jupyter Matlab Proxy -->

![Interactive Apps menu with the MATLAB and MATLAB Server options](../../assets/ondemand/matlab/matlab-dropdown.png){ width=40% height=40%}


## Guide

=== "Matlab VNC"

    ## Launching MATLAB

    * Navigate to the Interactive Apps section.
    * Select `MATLAB` from the list of available applications.

    ## Loading the Matlab Version 

    * Select the dropdown option in `MATLAB Version`. The current versions installed on Wulver are `2023a` and `2024a`

    ![MATLAB launch form with the MATLAB Version dropdown open](../../assets/ondemand/matlab/matlab-vnc-1.png){ width=60% height=60%}


    ## Configuring Resources

    * Specify your Slurm account/partition/qos.
    * Set the maximum wall time requested.
    * Choose the number of cores you need.
    * If required, specify the number of GPUs.

    ![MATLAB launch form fields for Slurm account, partition and QOS](../../assets/ondemand/matlab/matlab-vnc-2.png){ width=60% height=60%}

    ![MATLAB launch form fields for wall time and number of cores](../../assets/ondemand/matlab/matlab-vnc-3.png){ width=60% height=60%}

    ![MATLAB launch form fields for GPUs and the Launch button](../../assets/ondemand/matlab/matlab-vnc-4.png){ width=60% height=60%}

    ## Launching the Session

    * Select the `Launch` option after finalizing the resources. Once clicking **Launch**, the request will be queued, and when resources have been allocated, you will be presented with the option to connect to the session by clicking on the blue `Launch MATLAB` option.

    ![MATLAB session card showing the request waiting in the queue](../../assets/ondemand/matlab/matlab-vnc-5.png){ width=60% height=60%}

    ![MATLAB session card with the blue Launch MATLAB button](../../assets/ondemand/matlab/matlab-vnc-6.png){ width=60% height=60%}


    * You might see `Unable to contact settings server` message. It does not mean the Matlab session is terminated. You need to wait a few minutes to see the Matlab popup window.


    ![Browser window showing the Unable to contact settings server message](../../assets/ondemand/matlab/matlab-vnc-7.png){ width=60%            height=60%}

    ![MATLAB window starting up inside the browser](../../assets/ondemand/matlab/matlab-vnc-8.png){ width=60% height=60%}

    ![MATLAB desktop open and ready to use in the browser](../../assets/ondemand/matlab/matlab-vnc-9.png){ width=60% height=60%}

=== "Matlab Server"

    * Select Matlab Server from the interactive apps dropdown menu. 
    
    * Fill in your configurations based on your job requirements

      ![MATLAB Server launch form with fields for account, partition, wall time and cores](../../assets/ondemand/matlab/matlab-server-1.png)
      { width=60% height=60%}
      
    * Wait for the job to start and then click on **Connect to Matlab**

    ![MATLAB Server session card with the Connect to Matlab button](../../assets/ondemand/matlab/matlab-server-2.png){ width=60% height=60%}

    * Select existing License

    ![MATLAB sign-in window with the existing license option selected](../../assets/ondemand/matlab/matlab-license-1.png){ width=40%             height=40%}


    * Click **Start Matlab** 

    ![MATLAB license window with the Start MATLAB button](../../assets/ondemand/matlab/matlab-license-2.png){ width=40% height=40%}

    * Wait for couple minutes

    ![MATLAB loading screen while the session starts](../../assets/ondemand/matlab/matlab-license-3.png){ width=40% height=40%}

    * Start working!!

    ![MATLAB desktop open in the browser, ready to use](../../assets/ondemand/matlab/matlab-start-working.png){ width=60% height=60%}

<!-- === "Jupyter Matlab Proxy"

    <iframe src="https://njit.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=3e226845-4a26-4be3-803f-b314014f71ce&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&captions=true&interactivity=all" height="405" width="720" style="border: 1px solid #464646;" allowfullscreen allow="autoplay" aria-label="Panopto Embedded Video Player" aria-description="OOD_RStudio_Lateset" ></iframe>


    * Select **Jupyter-matlab-proxy** from the dropdown menu.
    
    * Choose matlab-proxy as conda env

    ![conda-env-matlab-proxy.png](../../assets/ondemand/matlab/jupyter-matlab-proxy-1.png){ width=60% height=60%}

    * Fill the rest of the form based on your desired configurations and click Launch. Wait for couple of seconds (same way as other matlab servers)

    * Once the Jupyter opens, click on Open Matlab

    ![conda-env-matlab-proxy.png](../../assets/ondemand/matlab/jupyter-matlab-proxy-2.png){ width=60% height=60%}

    * Select existing License

    ![matlab-license-1.png](../../assets/ondemand/matlab/matlab-license-1.png){ width=40% height=40%}

    * Click start Matlab

    ![matlab-license-2.png](../../assets/ondemand/matlab/matlab-license-2.png){ width=40% height=40%}

    * Wait for couple minutes

    ![matlab-license-3.png](../../assets/ondemand/matlab/matlab-license-3.png){ width=40% height=40%}

    * Start working!!

    ![matlab-start-working.png](../../assets/ondemand/matlab/matlab-start-working.png){ width=60% height=60%}
 -->


