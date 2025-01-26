# Tracker 2 (A simple tracker, for A Link to the Past Randomizer, mostly)

## Description 

This project is for an auto-tracker that uses QUSB2SNES to track the progress on games of A Link to the Past randomizer that I run on a real SNES using an FX Pak Pro. For now this is very much a work in progress, but I have some lofty ambitions  for what I would like this repository to become.

## Ambitions

I want to create an auto-tracker that has the following characteristics

### Web-based

There is no reason in 2025 why we should have to install or download a Windows executable for an auto-tracker. A web-based democratizes access to the tracker for users of a plethora of different OSes on a variety of different computer architectures. If somebody wants to install the tool as a program on their computer, a wrapper can be done to facilitate this (e.g. Electron), although I don't think this is a requirement.

I am able to do that with ALTTPR because of the fine folks who developped USB2SNES/QUSB2SNES and SNI. This might not be possible on other platforms as of right now unfortunately, but I think those middleware are the proper way to go. Install the middleware on the computer that is connected to the target hardware (i.e. game console) and the tracker should communicate with the middleware with websocket, http or any other web-supported technologies.

I think the very minimum should be to tackle Firefox and Chromium browsers. Despite its smaller market share I think Firefox should be the gold standard because Google have poor anti-compettition practices (a lot of sites break in subtle ways on other browsers because they do non-standard things that work only in Chrome) and because of their privacy standards (i.e. data collection in Chrome and Edge). However, even if I wish I could, we can't snob Chromium browsers due to their popularity.

### Open-Source

The randomizer community embodies the spirit of open-source, so there is no reason that a tracker shouldn't be. We shouldn't be hiding the source code for tools that are used with these randomizers, rather we should encourage sharing of contributions to those tools. This is way I made this repo GPL-3.0 right out of the gate, even if there isn't much useful here as of yet.

This tool should be free, both free as in software and free as in beer. 

### Generic and Extensible

Most randomizers share a common structure between logic, checks and inventory and there should be a platform that provides those basic features. We should then build from this platform using plugins to allow tracking for the desired game. Somebody shouldn't have to download different trackers for alttp, Super Metroid and Ocarina of Time. They should have the same application and switch between games at will.

Also, this way, we can reuse the parts that are common to all the games and not have a different implementation for each game. ALttP and SM both run on the SNES, so they should be able to use the same USB2SNES or SNI connector. Most trackers have some sort of map and inventory views, so an those views should be a base component of the tracker framework and we can just swap the actual maps or the actual inventory items using a plugin.

There are probably limitations to this model that I'll run into and are going to be hard to tackle, that's why this section is called Ambitions and not Features or Goals.

Rulesets and parameters should also be considered in all of this. A lot of trackers don't consider the parameters or the rulesets used in running a seed, and so can give confusing or incorrect information based on what it expects logic to be. This will probably make plugins a lot more complex to develop but I think it's important to keep in that in mind to help struggling players.

### Auto-tracking (or not)

Auto-tracking is a really useful tool to make randomizers more accessible, even if it can be seen as a crutch by some of the more experienced members of a community. I want this to be an auto-tracker first, but I agree that it should also be usable by people without it (not everybody has the means to spend on a FX Pak Pro).

Auto-tracking also depenkds on the availability of middleware to allow the browser to read the state of a game, and as discussed in the web-based section I don't think this is readily available for all hardware or emulators at the moment. I hope that the existence of a gold-standard web-based tracker can influence the development of the required middleware.

## Frequently Asked Questions (Or rather, question I expect to get asked frequently)

### Where is tracker1? tracker2 is a stupid name, change it.

Song 2 is a song by English rock band Blur from their eponymous fifth studio album. The song was intended to be a joke but became their most popular single. Compared to the demo, the released version of the song contains a lot of distortion and amateurish guitar songs, that were done in an attempt to sabotage it.

This is a bit what I intended with this title. This project is still really amateurish and contains possibly the worst HTML/JS/CSS code you have read. When this gains traction (or rather, if it ever does) then we'll find a name that better suits the software. Or, like the Blur song, we might never change the placeholder name and stick with it forever.

### You should use React / Angular / VueJS. You should use {library name} on npm. You should use that CSS framework

When I start a project, I like to keep as simple as possible, which means plain-old vanilla Javascript (with whatever Web API is available in Firefox), and simple HTML and CSS. I might sometime get some helper CSS classes or copy functions from StackOverflow or a small library, but nothing more. It should be as lean and as simple as possible, with no build steps unless absolutely necessary.

When this project scales up a bit then maybe some JS framework or some larger CSS libararies might come into play. But not for now at least.