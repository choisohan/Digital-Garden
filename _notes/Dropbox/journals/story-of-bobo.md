---
layout: journal
title: The Story of Bobo
description: 'Realtime Project playing with interactive baby orangutan Bobo'
tag: [journal]

---


# 1. How it all began​

<div class="column">
<div markdown= "1">
Back when I was working on the film the Planet of the Apes, my task was watching an infinite amount of ape face references and sculpting each facial expression. Whilst I loved all the different apes, my favourites were the baby orangutans. They have these big round eyes and a mouth and nose with lots of squash and stretch Whenever they change their expression their face deforms very dramatically, they look just like jello. I couldn't love them more. Even since I left NZ, this joy was in the back of my heart and waiting for a project idea to connect with.
![](https://cdn.mos.cms.futurecdn.net/orqXGa9fAUq8Zyjk6K8StP.jpg)
</div>


<div markdown= "1">
![The very first concept of Bobo project](assets/bobo/sketch.jpg)

Fast foward to an ordinary weekend in 2020, me and my fiancé Tom did a skype chat with his family living in the UK and his baby neice Ella as well. She was too young so couldn't talk on the screen but she seemed very interested to look at us and make some gestures and different facial expressions. Whenever we did something she reacted. When she was excited, we felt excited as well. I realized, communicating doesn't necessarily require advanced language, and the Bobo project idea came up to me.
</div>
</div>


# 2. Making Of Bobo​


{% include gallery.html search ="Hanging_A_004_low,WalkCycle_A_003_updateRig2,climbingUp_A_002_rigUpdate2_low" %}


Even after I made up my mind, It was not clear if this project would be successful. Would this be fun for people? Could I even make this? I had thousands of worries in my head. I had to start figuring it out. 
What I usually do is some sort of sprint through the project- I go through every step in the minimum time possible. The goal for this stage is not perfection but instead to learn which mistakes to avoid and find the loopholes I didn't consider. Ultimately this is to assess if this project is achievable. 
For example, here are a few modelling notes I collected during this time.

<div class = "column" >
<div markdown= "1">
- Even though the neck looks very short, the range of mobility is still quite big. Make sure the neck has enough edge loops and UVs.
- Orangutans lift their arms very frequently and it even looks like they feel more comfortable with that posture. The range of the shoulder is very important. Check out the shoulder joint's position.
- Hips should be very flexible to spread wide
- Feet should be available to make a fist

In order to make an orangutan, learning about them was crucial. I tried to collect as many references as possible such as books, articles, videos and images. However, it was hard. The number of resources for information about wild orangutans are few compared to chimpanzees.


</div>
<div>
<img src = "assets/bobo/0803.jpg">
</div>
</div>

---

### How different they are?
<div class="column">
<div markdown= "1">
At the beginning of the project I also didn't realize how different orangutans and chimpanzees are. 

First of all, Chimpanzees live in Africa, and Orangutans live in Asia. Chimps tend to live on the ground but are also good climbers, where Orangutans spend nearly all of their time in the trees. Also, whilst chimps live as a group, orangutans mostly stay alone.

Look at where the thumbs are. chimp- orangutan - siamang. Is this because they are good at climbing trees?

Orangutan's tree-dwelling lifestyle also gives another hint about them. They are very vulnerable on the ground. Looking at their feet standing on the ground makes me cry for tears because they look so uncomfortable. The toes are too long and their ankle is oriented strangely. This explains why all orangutans on the ground are rolling all the time. 
</div>

<div markdown= "1" style = "min-width:35%">
![Look at where the thumbs are. chimp- orangutan – siamang. Is this because they are good at climbing trees?](https://i.pinimg.com/originals/2e/b9/26/2eb92688a584b2d63f0167006676e316.jpg){: width="400"}
![To roll him perfectly, I added a cylinder guide.](assets/bobo/1002.jpg)
</div>


</div>



# 3. Studying Orangutans mind​

<div class="column">
<div markdown= "1">
My study about the orangutan had to go further than understanding their anatomy because ultimately I had to program bobo's AI. I had to understand how Bobo would think.

Like we know Jane Goodall discovered Chimpanzees are using tools, Orangutans also use tools. They use sticks to get honey, or they use leaves for umbrellas when it rains. Primatologist Frans De Waal mentioned this interesting case in their research.

Somehow I can hear how she thinks. "Yeah, I look prettier with this hat." Is that so different from me choosing my clothes?

Another case I found is interesting was [the spitting water test](https://www.newscientist.com/article/dn12182-spitting-orang-utans-solve-nutty-problem/). This test showed how orangutans reach an untouchable peanut by raising the water level to a container, even though they've never seen the same puzzle before. Each tester came up with their idea based on their experience and knowledge. Most testers completed this mission in 8 min. Honestly, I don't think I could do better than that.
</div>
<div markdown= "1">
![Suma, an orangutan at a German zoo, often embellished herself in front of a mirror, such as by putting a leaf of lettuce onto her head like a hat while staring at her reflection.  Drawing by Frans De waal](https://www.researchgate.net/publication/330943479/figure/fig4/AS:723844352458752@1549589350789/Mirror-guided-self-decoration-by-an-ape-Suma-an-orangutan-at-a-German-zoo-often.png)
</div>
</div>



The more I learn about an orangutan's mind, the more I think they are similar to us. They see, remember, think, learn.

I started programming bobo's brain but I still felt something odd about bobo's behaviour. It was because he looked too mature for his age..




<div class="column">

<div markdown= "1">
![](assets/bobo/Bobo-Motivation.png)
</div>

<div markdown= "1">
Because I don't have children and hadn't had any chance to observe a real baby, I had to rely for online reference for this as well. I watched this [baby time lapse video](https://www.youtube.com/watch?v=8vNxjwt2AqY)  and I realized what I was missing.

The most basic game character AI logic is this:

"Have a goal -> Do it"  

It seems way too simple, but think about yourself. Do you do something without any reason? Even to stand up from a chair you need a reason. Whether you want to check out the kitchen, go to the toilet or hang out with your friend at the cafe, we grown-ups want to be as lazy as possible. We don't want to waste our energy.  But babies are not like this. When they are active, they have to emit their energy no matter what because their goal is not doing something, their goal is doing anything. So their actions look unpredictable and illogical. They chase after this and that, get interested and lose interest constantly. They seem more like chaos full of adrenaline. (If I did the same, people would be seriously worried about me...)

Left is the diagram I drew. 
</div>
</div>





<div class="column" >
<div markdown= "1">
Ultimately a baby is a baby. A baby orangutan also wants to get hugged, get attention, to learn and play with others.
I can't believe some orangutan babies still get traded as exotic pets.
Some of them get sold to illegal animal fight games. This is not how we should treat babies. 
 
Even though some orphans luckily get rescued by organizations, they still have to learn how to survive in wild.
That lesson is not going to be same as their own kind could give.
</div>

<div markdown = "1">
![](assets/bobo/sketch3.jpg)
</div>
</div>

![Budi who’s the model of Bobo. He was very sick condition when he got rescued by the organization](https://www.internationalanimalrescue.org/sites/default/files/img-20141217-wa002.jpg){: width="350" }




# 4. Bobo's face​


{% include gallery.html search ="1022_2_Trim2,0911_shapeEditor"  %}

There are two systems I had to create just for bobo's face. One is the Blend shape manager in maya. This helps me build complex blendshape trees in the very intuitive UI. I want to share this online as open source when it's finished but I am not sure when that would be... (far to go...)

The second system is the face shape manager in [[Unity]]. Because an FBX export disconnects the maya rig, this system reconnects the rig automatically in [[Unity]]. It's written in C#.

- find all corrective shapes and connect with upper levels.

- connect jaw joint with jaw blend shapes, eye joints with eye blend shapes

On facial, it's still almost start point. 



# 5. How Does Bobo Interact?​
{% include gallery.html search="smilypongo_short_2"%}



One of the questions I frequently got asked was how I am achieving this interaction between Bobo and me. I am not using a fancy facial capture device or special camera. I am only using the built-in laptop webcam and openCV with dlib.

I am not an expert so I don't think I have a right to explain, but for anyone who's curious, Computer Vision is technology analyzing the picture and returning information. It can be used by traffic cameras to read a car number or by home security cameras to alarm a suspicious intruder. 

Using OpenCV opens the accessibility a lot. It's cheaper for me and at the same time, anybody can try at their home without any special devices.



{% include gallery.html search="1107,bobosMonitor"%}





---






# 6. Progress and things to do

- Improve  Bobo's overall look
- Find Bobo's audio(!!!)​
- improve motion and interation system​
- Improve environment​
- [a new feature] detect food​
- [a new feature] Can Bobobo hold a camera?​


---
<div class= "fillBox" markdown="1">
# Before you go...​
</div>

<div class= "column">
<div markdown="1" style= "min-width :300px">
{% include gallery.html search="bobo_mute"%}
</div>
<div markdown= "1">
This Project is still in progress therefore this post will keep being updated with more information and more demos. If you want to get noticed whenever I update this article, please sign up on mail subscription or follow me on social media.

Also I am funding all my projects by myself. Sometimes there was no progress for a while because of other tasks. If you can fund even a little bit so I can spend more time for this project, that would be so appreciated. You can use PayPal or [buy me a coffee](https://www.orangutans.ca/).

Another way to support my work is share this project with others. Or if you have any good ideas to contribute to this project , please contact me directly. Most specially I need young orangutan voice audio, if you have anybody who can help me, please let me know!

Lastly, don't forget to support endangered species. These are the good places dedicate to save orangutans!

- [redapes.org](https://redapes.org/)
- [orangutans.ca](https://www.orangutans.ca/)
</div>
</div>

---