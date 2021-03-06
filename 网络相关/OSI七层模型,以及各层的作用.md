# OSI七层模型,以及各层的作用(待扩充)

![](/home/xsh/桌面/0_1325744597WM32.gif)

在7层模型中，每一层都提供一个特殊的网络功能。从网络功能的角度观察：下面4层（物理层、数据链路层、网络层和传输层）主要提供数据传输和交换功能，即以节点到节点之间的通信为主；第4层作为上下两部分的桥梁，是整个网络体系结构中最关键的部分；而上3层（会话层、表示层和应用层）则以提供用户与应用程序之间的信息和数据处理功能为主。

物理层：底层数据传输，如网线；网卡标准。 

数据链路层：定义数据的基本格式，如何传输，如何标识；如网卡MAC地址。

网络层：定义IP编址，定义路由功能；如不同设备的数据转发。

传输层：端到端传输数据的基本功能；如 TCP、UDP。

会话层：控制应用程序之间会话能力；如不同软件数据分发给不同软件。

标识层：数据格式标识，基本压缩加密功能。

应用层：各种应用软件，包括 Web 应用

![](/home/xsh/桌面/4240319bba6c481cf49ea22f985b7e5b.png)



层模型介绍

- 物理层：
   物理层负责最后将信息编码成电流脉冲或其它信号用于网上传输；
   `eg：RJ45等将数据转化成0和1；` 
- 数据链路层:
   数据链路层通过物理网络链路􏰁供数据传输。不同的数据链路层定义了不同的网络和协 议特征,其中包括物理编址、网络拓扑结构、错误校验、数据帧序列以及流控;
   `可以简单的理解为：规定了0和1的分包形式，确定了网络数据包的形式；` 
- 网络层
   网络层负责在源和终点之间建立连接;
   `可以理解为，此处需要确定计算机的位置，怎么确定？IPv4，IPv6！` 
- 传输层
   传输层向高层􏰁提供可靠的端到端的网络数据流服务。
   `可以理解为：每一个应用程序都会在网卡注册一个端口号，该层就是端口与端口的通信！常用的（TCP／IP）协议；` 
- 会话层
   会话层建立、管理和终止表示层与实体之间的通信会话；
   `建立一个连接（自动的手机信息、自动的网络寻址）;` 
- 表示层:
   表示层􏰁供多种功能用于应用层数据编码和转化,以确保以一个系统应用层发送的信息 可以被另一个系统应用层识别;
   `可以理解为：解决不同系统之间的通信，eg：Linux下的QQ和Windows下的QQ可以通信；` 
- 应用层:
   OSI 的应用层协议包括文件的传输、访问及管理协议(FTAM) ,以及文件虚拟终端协议(VIP)和公用管理系统信息(CMIP)等;

- `规定数据的传输协议；`

### 四层模型

网络接口层
 网络接口层包括用于协作IP数据在已有网络介质上传输的协议。
 它定义像地址解析协议(Address Resolution Protocol,ARP)这样的协议,􏰁供 TCP/IP 协议的数据结构和实际物理硬件之间的接口。
 `可以理解为：确定了网络数据包的形式`。

网间层
 网间层对应于 OSI 七层参考模型的网络层，本层包含 IP 协议、RIP 协议(Routing Information Protocol,路由信息协议),负责数据的包装、寻址和路由。同时还包含网间控制报文协议(Internet Control Message Protocol,ICMP)用来􏰁供网络诊断信息；
 `可以理解为：该层时确定计算机的位置`。

传输层
 传输层对应于 OSI 七层参考模型的传输层,它􏰁供两种端到端的通信服务。其中 TCP 协议(Transmission Control Protocol)􏰁供可靠的数据流运输服务,UDP 协议(Use Datagram Protocol)􏰁供不可靠的用户数据报服务。
 `TCP:三次握手、四次挥手;UDP:只发不管别人收不收得到--任性哈`

应用层
 应用层对应于 OSI 七层参考模型的应用层和表达层；

```h
以下是TCP/IP分层模型
        ┌────------────┐┌─┬─┬─-┬─┬─-┬─┬─-┬─┬─-┬─┬─-┐
　　│　　　　　　　　││Ｄ│Ｆ│Ｗ│Ｆ│Ｈ│Ｇ│Ｔ│Ｉ│Ｓ│Ｕ│　│
　　│　　　　　　　　││Ｎ│Ｉ│Ｈ│Ｔ│Ｔ│Ｏ│Ｅ│Ｒ│Ｍ│Ｓ│其│
　　│第四层，应用层　││Ｓ│Ｎ│Ｏ│Ｐ│Ｔ│Ｐ│Ｌ│Ｃ│Ｔ│Ｅ│　│
　　│　　　　　　　　││　│Ｇ│Ｉ│　│Ｐ│Ｈ│Ｎ│　│Ｐ│Ｎ│　│
　　│　　　　　　　　││　│Ｅ│Ｓ│　│　│Ｅ│Ｅ│　│　│Ｅ│它│
　　│　　　　　　　　││　│Ｒ│　│　│　│Ｒ│Ｔ│　│　│Ｔ│　│
　　└───────------─┘└─┴─┴─-┴─┴─-┴─┴─-┴─┴─-┴─┴-─┘
　　┌───────-----─┐┌─────────-------┬──--------─────────┐
　　│第三层，传输层　││　　　ＴＣＰ　　　│　　　　ＵＤＰ　　　　│
　　└───────-----─┘└────────-------─┴──────────--------─┘
　　┌───────-----─┐┌───----──┬───---─┬────────-------──┐
　　│　　　　　　　　││　　　　　│ＩＣＭＰ│　　　　　　　　　　│
　　│第二层，网间层　││　　　　　└──---──┘　　　　　　　　　　│
　　│　　　　　　　　││　　　　　　　ＩＰ　　　　　　　　　　　 │
　　└────────-----┘└────────────────────-------------─-┘
　　┌────────-----┐┌─────────-------┬──────--------─────┐
　　│第一层，网络接口││ＡＲＰ／ＲＡＲＰ　│　　　　其它　　　　　│
　　└────────------┘└─────────------┴─────--------──────┘
```



### TCP/IP 协议族常用协议

- 应用层：TFTP，HTTP，SNMP，FTP，SMTP，DNS，Telnet 等等
- 传输层：TCP，UDP
- 网络层：IP，ICMP，OSPF，EIGRP，IGMP
- 数据链路层：SLIP，CSLIP，PPP，MTU