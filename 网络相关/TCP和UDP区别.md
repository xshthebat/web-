# TCP和UDP区别

## TCP与UDP基本区别

TCP协议和UDP协议特性区别总结：

​     1. TCP协议在传送数据段的时候要给段标号；UDP协议不

​     2. TCP协议可靠；UDP协议不可靠

​     3. TCP协议是面向连接；UDP协议采用无连接

​     4. TCP协议负载较高，采用虚电路；UDP采用无连接

​     5. TCP协议的发送方要确认接收方是否收到数据段（3次握手协议）

​     6. TCP协议采用窗口技术和流控制


TCP和UDP区别

|            | TCP            | UDP        |
| ---------- | -------------- | ---------- |
| 是否连接   | 面向连接       | 面向非连接 |
| 传输可靠性 | 可靠的         | 不可靠的   |
| 应用场合   | 传输大量的数据 | 少量数据   |
| 速度       | 慢             | 快         |

OSI 和 TCP/IP 模型在传输层定义两种传输协议：TCP（或传输控制协议）和 UDP（或用户数据报协议）。

UDP 
​    UDP 与 TCP 的主要区别在于 UDP 不一定提供可靠的数据传输。事实上，该协议不能保证数据准确无误地到达目的地。UDP 在许多方面非常有效。当某个程序的目标是尽快地传输尽可能多的信息时（其中任意给定数据的重要性相对较低），可使用 UDP。ICQ 短消息使用 UDP 协议发送消息。 
​    许多程序将使用单独的TCP连接和单独的UDP连接。重要的状态信息随可靠的TCP连接发送，而主数据流通过UDP发送。

TCP
​    TCP的目的是提供可靠的数据传输，并在相互进行通信的设备或服务之间保持一个虚拟连接。TCP在数据包接收无序、丢失或在交付期间被破坏时，负责数据恢复。它通过为其发送的每个数据包提供一个序号来完成此恢复。记住，较低的网络层会将每个数据包视为一个独立的单元，因此，数据包可以沿完全不同的路径发送，即使它们都是同一消息的组成部分。这种路由与网络层处理分段和重新组装数据包的方式非常相似，只是级别更高而已。
​    为确保正确地接收数据，TCP要求在目标计算机成功收到数据时发回一个确认（即 ACK）。如果在某个时限内未收到相应的 ACK，将重新传送数据包。如果网络拥塞，这种重新传送将导致发送的数据包重复。但是，接收计算机可使用数据包的序号来确定它是否为重复数据包，并在必要时丢弃它。

TCP与UDP的选择

​    如果比较UDP包和TCP包的结构，很明显UDP包不具备TCP包复杂的可靠性与控制机制。与TCP协议相同，UDP的源端口数和目的端口数也都支持一台主机上的多个应用。一个16位的UDP包包含了一个字节长的头部和数据的长度，校验码域使其可以进行整体校验。（许多应用只支持UDP，如：多媒体数据流，不产生任何额外的数据，即使知道有破坏的包也不进行重发。） 
​    很明显，当数据传输的性能必须让位于数据传输的完整性、可控制性和可靠性时，TCP协议是当然的选择。当强调传输性能而不是传输的完整性时，如：音频和多媒体应用，UDP是最好的选择。在数据传输时间很短，以至于此前的连接过程成为整个流量主体的情况下，UDP也是一个好的选择，如：DNS交换。把SNMP建立在UDP上的部分原因是设计者认为当发生网络阻塞时，UDP较低的开销使其有更好的机会去传送管理数据。TCP丰富的功能有时会导致不可预料的性能低下，但是我们相信在不远的将来，TCP可靠的点对点连接将会用于绝大多数的网络应用。

TCP支持的应用协议主要 有：Telnet、FTP、SMTP等；UDP支持的应用层协议主要有：**NFS（网络文件系统）**、SNMP（简单网络管理协议）、**DNS（主域名称系 统）**、TFTP（通用文件传输协议）等.

TCP/IP协议与低层的数据链路层和物理层无关，这也是TCP/IP的重要特点



**TCP:** 

TCP编程的服务器端一般步骤是： 

　　1、创建一个socket，用函数socket()； 
　　2、设置socket属性，用函数setsockopt(); * 可选 
　　3、绑定IP地址、端口等信息到socket上，用函数bind(); 
　　4、开启监听，用函数listen()； 
　　5、接收客户端上来的连接，用函数accept()； 
　　6、收发数据，用函数send()和recv()，或者read()和write(); 
　　7、关闭网络连接； 
　　8、关闭监听；

TCP编程的客户端一般步骤是： 

　　1、创建一个socket，用函数socket()； 
　　2、设置socket属性，用函数setsockopt();* 可选 
　　3、绑定IP地址、端口等信息到socket上，用函数bind();* 可选 
　　4、设置要连接的对方的IP地址和端口等属性； 
　　5、连接服务器，用函数connect()； 
　　6、收发数据，用函数send()和recv()，或者read()和write(); 

**UDP**：

UDP编程的服务器端一般步骤是： 
　　1、创建一个socket，用函数socket()； 
　　2、设置socket属性，用函数setsockopt();* 可选 
　　3、绑定IP地址、端口等信息到socket上，用函数bind(); 
　　4、循环接收数据，用函数recvfrom();　

　　5、关闭网络连接；

DP编程的客户端一般步骤是： 
　　1、创建一个socket，用函数socket()； 
　　2、设置socket属性，用函数setsockopt();* 可选 
　　3、绑定IP地址、端口等信息到socket上，用函数bind();* 可选 
　　4、设置对方的IP地址和端口等属性; 
　　5、发送数据，用函数sendto(); 

　　6、关闭网络连接；





## TCP与UDP区别总结

1、TCP面向连接（如打电话要先拨号建立连接）;UDP是无连接的，即发送数据之前不需要建立连接
2、TCP提供可靠的服务。也就是说，通过TCP连接传送的数据，无差错，不丢失，不重复，且按序到达;UDP尽最大努力交付，即不保   证可靠交付
3、TCP面向字节流，实际上是TCP把数据看成一连串无结构的字节流;UDP是面向报文的
  UDP没有拥塞控制，因此网络出现拥塞不会使源主机的发送速率降低（对实时应用很有用，如IP电话，实时视频会议等）
4、每一条TCP连接只能是点到点的;UDP支持一对一，一对多，多对一和多对多的交互通信
5、TCP首部开销20字节;UDP的首部开销小，只有8个字节

6、TCP的逻辑通信信道是全双工的可靠信道，UDP则是不可靠信道
7　TCP协议保证数据按序发送，按序到达，提供超时重传来保证可靠性，但是UDP不保证按序到达，甚至不保证到达，只是努力交付，即便是按序发送的序列，也不保证按序送到

