---
title: How to export chats from ChatGPT
publishDate: '2023-02-15 21:43:12'
description: Solving for what is probably the biggest feature limitation of the app today, with a simple tool you can install in a less than a minute.
draft: false
---

As of February 2023, the ChatGPT interface is **extremely** basic.

If you’ve used any modern messaging tool in the past few years, you’ve most likely noticed that ChatGPT is bare-bones in comparison.

I don’t blame OpenAI for that. After all, they only launched a few months ago. Much of their engineering resource has undoubtedly gone into making sure this thing can scale to hundreds of millions of active users, and onto the fine-tuning of the model itself.

The single biggest (and most basic, IMHO) feature that is missing is chat exports.

If you’re anything like me, you like to neatly label and organize your chats based on the outcome you are trying to achieve. Once you’ve achieved that outcome, you’d like to remove that chat to free up the limited real estate that ChatGPT offers in the sidebar.

The only way to achieve this today, however, is by deleting the chat.

That’s a no-go for me!

I’d like to be able to store that chat somewhere, so I can reference it in future.

Well, thanks to this handy script with Tampermonkey, now I can:

![ChatGPT Exporter Screenshot](/img/export-chats-from-chatgpt.png 'image_tooltip')

## Enter Tampermonkey

[Tampermonkey](https://www.tampermonkey.net/) is a popular browser extension that allows you to customize the way web pages are displayed or interacted with.

It allows you to install and run scripts that can modify the behaviour and appearance of websites, adding new features, fixing bugs, or changing how the web app or site functions.

It has support for Google Chrome, Mozilla Firefox, Microsoft Edge, and a bunch of others, so unless you’re one of those people who use an extremely niche browser, you should be able to get this to work.

While people do develop browser extensions **just** for a particular site or app (e.g. [Toolkit for YNAB](https://www.toolkitforynab.com/), or [AIRPRM](https://www.aiprm.com/) for ChatGPT itself) sometimes the use case just doesn’t justify the time and resource investment. Especially when a (relatively) straightforward script will do.

That’s where Tapermonkey shines: there are massive libraries of scripts for pretty much any website you can think of. [Userscript Zone](https://www.userscript.zone/?utm_source=tm.net&utm_medium=scripts), [GreasyFork](https://greasyfork.org/) and [OpenUserJS](https://openuserjs.org/) being the most popular.

## ChatGPT Exporter

Onto the topic at hand.

[ChatGPT Exporter](https://github.com/pionxzh/chatgpt-exporter) is the script you’re looking for. Kudos to [pionxzh](https://github.com/pionxzh) for putting this together seemingly days after ChatGPT was released to the public.

The installation isn’t seamless, unfortunately, as the Tampermonkey UI could use a little 2023 love, but it is luckily very straightforward:

1. Install Tampermonkey on your browser ([Chrome](https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo), [Edge](https://microsoftedge.microsoft.com/addons/detail/iikmkjmpaadaobahmlepeloendndfphd), [Safari](https://apps.apple.com/us/app/tampermonkey/id1482490089), [Opera](https://addons.opera.com/en/extensions/details/tampermonkey-beta/) & [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/))
2. Navigate to the [ChatGPT Exporter page on GreasyFork](https://greasyfork.org/en/scripts/456055-chatgpt-exporter)
3. Hit the Install button, and **wait for 10–15 seconds** (important)
4. To confirm it’s been installed correctly, click on Tampermonkey and navigate to the Dashboard: you should see it installed and enabled.

Step 3 tripped me up initially, as when I clicked the Install button, nothing happened. I assumed it didn’t work and ended up manually copying and pasting the code into Tampermonkey.

You should now be able to export your chats as a screenshot, text, markdown, or HTML. My personal preference is Markdown, as it’s the easiest to work with and can easily be converted into other formats.

OpenAI will probably get to adding native exporting functionality soon, as well as some other basic features that are missing, but in the meantime this is a fantastic workaround.
