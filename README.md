# ⏱ Blip Desk Scheduler

## 🔌Instalation
Today, the installation it's made manually on the [portal.blip](https://portal.blip.ai), following the steps below:
1. Select the bot in your panel.
2. Go to bot settings.
3. In basic settings session, go to "Click here to access the advanced settings" and next, click in "confirm".
4. Find (or create in case he not exist) the item whose the name of the key is "Plugin" and insert in value, the attribute **"blip-desk-scheduler"** following the example below:
```
{
    "blip-desk-scheduler": {
        "name": "Blip Desk Scheduler",
        "url": "{{url}}"
    }
}
```
the value of **{{url}}** should be replaced by the one links below:\
tests environment: https://alphacanis.space:3200 \
homologation environment: https://blip-desk-scheduler.hmg-cs.blip.ai \
production environment: https://blip-desk-scheduler.cs.blip.ai \
5. So you can save the modifications, and now your bot has the Blip Desk Scheduler plugin.

## 💻Usage
To use the plugin, you need to click in more options (three points icon) in the top menu and select Blip Desk Scheduler, so you will go to the scheduler panel, 
to configure the times work and days off in your attendiment. In the end, click in **"Save"**. 

When you click in "save", the plugin will generate in the bot resources a "workTime" variable that you can use to handle the o atendimento work time. 

### workTime variable:
```
{
    "weekdays": [
        {
            "day": "day name",
            "workTimes": [
                {
                    "start": "hh:mm",
                    "end": "hh:mm"
                },
                ...
            ]
        },
        ...
    ],
    "noWorkDays": [
        "dd-MM",
        ...
    ],
    "schedulerMessage": "scheduler message"
}
```
**TIPS:** You can use the "schedulerMessage" variable to get a message to show in a block.

## 🤖Bot Exemple
We have a exemple bot that you can use with base project. he already has the scripts to handle with workTime variable to management of attending work times.

To use him, you just need import [this file](https://github.com/dylanoli/blip-desk-scheduler/blob/develop/public/blipdeskscheduler.json) in your flow.
