---
title: Virtual Box
---

Tutorial -> https://www.makeuseof.com/tag/macos-windows-10-virtual-machine/


[Oracle VM Virtual Box Download](https://www.makeuseof.com/tag/macos-windows-10-virtual-machine/
)
- Download "Windows hosts"
- Extension -> "All Supported Platforms "

[macOS Big Sur 11.0.1 Download](https://www.mediafire.com/file/dbfod9u5q9ii9nd/macOS_Big_Sur_11.0.1_%252820B29%2529.iso/file) -> 16GB


```command


cd "C:\Program Files\Oracle\VirtualBox\"

VBoxManage.exe modifyvm "macOS Big Sur" --cpuidset 00000001 000106e5 00100800 0098e3fd bfebfbff

VBoxManage setextradata "macOS Big Sur" "VBoxInternal/Devices/efi/0/Config/DmiSystemProduct" "iMac19,1"

VBoxManage setextradata "macOS Big Sur" "VBoxInternal/Devices/efi/0/Config/DmiSystemVersion" "1.0"

VBoxManage setextradata "macOS Big Sur" "VBoxInternal/Devices/efi/0/Config/DmiBoardProduct" "Mac-AA95B1DDAB278B95"

VBoxManage setextradata "macOS Big Sur" "VBoxInternal/Devices/smc/0/Config/DeviceKey" "ourhardworkbythesewordsguardedpleasedontsteal(c)AppleComputerInc"

VBoxManage setextradata "macOS Big Sur" "VBoxInternal/Devices/smc/0/Config/GetKeyFromRealSMC" 1
```


# Trouble shoot

## FIXED: Random Seed Error (LOG:EXITBS:START) | Change Processor Type for VirtualBox
https://www.youtube.com/watch?v=r2mboo9Xsvw
```command
cd C:\Program Files\Oracle\VirtualBox
VBoxManage modifyvm "macOS Big Sur" --cpu-profile "Intel Core i7-6700K"
```

## slow mouse

**Enable 3D graphics acceleration to the VM**. Right click the VM, Settings -> Display -> check the Enable 3D Acceleration tick box. Update: I switched to [VMWare Player] because it's much faster (even with a single core I didn't notice any lag).


# VMWare Player
VMware Player is a free desktop application that **lets you run a virtual machine on a Windows or Linux PC**.


# Local Server for Web Dev
Setting -> Network -> switch to 'Bridged Network'