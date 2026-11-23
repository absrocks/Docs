# RStudio

<iframe src="https://njit.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=895c85f8-7eed-49f4-9e0b-b3140122c680&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&captions=true&interactivity=all" height="405" width="720" style="border: 1px solid #464646;" allowfullscreen allow="autoplay" aria-label="Panopto Embedded Video Player" aria-description="OOD_RStudio_Lateset" ></iframe>

## Launching RStudio

* Navigate to the Interactive Apps section.
* Select `RStudio` from the list of available applications.

## Loading the R Environment

* Please select your desired R version from the drop down. 
* To use a different version or environment, please select "custom" and enter the necessary commands:
For example, to use a Conda environment, enter:
`module load Anaconda3/2023.09-0; source conda.sh; conda activate my_conda_r_env`


![RStudio launch form with the R version dropdown](../../assets/ondemand/rstudio/Rstudio1.png){ width=50% height=50%}

## Configuring Resources

* Specify your Slurm account/partition/qos.
* Set the maximum wall time requested.
* Choose the number of cores you need.
* If required, specify the number of GPUs.

## Launching the Session

![RStudio launch form with resource fields and the Launch button](../../assets/ondemand/rstudio/Rstudio2.png){ width=40% height=20%}

Once clicking **Launch**, the request will be queued, and when resources have been allocated, you will be presented with the option to connect to the session by clicking on the blue Connect to R Studio Server button.
![RStudio session card showing the request waiting in the queue](../../assets/ondemand/rstudio/Rstudio3.png){ width=50% height=50%}

![RStudio session card with the blue Connect to RStudio Server button](../../assets/ondemand/rstudio/Rstudio4.png){ width=50% height=50%}

![RStudio interface open in the browser with the console, editor and file panes](../../assets/ondemand/rstudio/Rstudio5.png){ width=50% height=50%}

Once connected, the familiar R Studio interface is presented, and you will be able to use the allocated resources, and access your research data located on Wulver.
Installing packages
It's likely your scripts will require additional R libraries; these can be installed using the `install.packages()` command in the console window of R Studio. 

## Exiting the session
If a session exceeds the requested running time, it will be killed. You may receive a message "The previous R session was abnormally terminated...". Click OK to acknowledge the message and continue. To avoid this message, it's good practice to exit the session cleanly when you have finished.
To cleanly exit R Studio, click `File -> Quit Session...` and then release resources back to the cluster queues by clicking the red Delete button for the relevant session on the My Interactive Sessions page.





