# PuppetSidecar [![NPM](https://github.com/wechaty/wechaty-puppet-sidecar/workflows/NPM/badge.svg)](https://github.com/wechaty/wechaty-puppet-sidecar/actions?query=workflow%3ANPM)

[![NPM Version](https://badge.fury.io/js/wechaty-puppet-sidecar.svg)](https://badge.fury.io/js/wechaty-puppet-sidecar)
[![npm (tag)](https://img.shields.io/npm/v/wechaty-puppet-sidecar/next.svg)](https://www.npmjs.com/package/wechaty-puppet-sidecar?activeTab=versions)
[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-brightgreen.svg)](https://github.com/wechaty/wechaty)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg)](https://www.typescriptlang.org/)

![Sidecar Wechaty Puppet](docs/images/puppet-sidecar.webp)

> Image source: [1920s Raleigh Box Sidecar Outfit](https://oldbike.wordpress.com/1920s-raleigh-box-sidecar-outfit/) & [ShellterProject](https://www.shellterproject.com/)

Universal Puppet powered by Sidecar, which can help Wechaty connect to any applications.

## Usage

Talk is cheap, show me the code.

### Puppet Sidecar

```ts
import { Wechaty }   from 'wechaty'
import { PuppetSidecar } from 'wechaty-puppet-sidecar'
import { 
  Sidecar,
  SidecarBody,
  Call,
  Ret,
  RetType
  ParamType,
  Hook,
}               from 'frida-sidecar'

@Sidecar('WeChat.exe')
class WeChatSidecar extends SidecarBody {

  @Call(0x1234)
  @RetType('pointer', 'Utf8String')
  messageSendText (
    @ParamType('pointer', 'Utf8String') id: string,
    @ParamType('pointer', 'Utf8String') text: string,
  ) { return Ret(id, text) }

  @Hook(0x5678)
  messageLoop (
    @ParamType('pointer', 'Buffer') protoBuf: Buffer,
  ) { return Ret(protoBuf) }

}

const sidecar = new WeChatSidecar()
const puppet  = new PuppetSidecar({ sidecar })
const wechaty = new Wechaty({ puppet })

wechaty.start()
```

## History

### master

### v0.0.1 (Jun 4, 2021)

Initial version.

## Author

[Huan LI](http://linkedin.com/in/zixia) [Microsoft Regional Director](https://rd.microsoft.com/en-us/huan-li) \<zixia@zixia.net\>

<a href="https://stackexchange.com/users/265499">
  <img src="https://stackexchange.com/users/flair/265499.png" width="208" height="58" alt="profile for zixia on Stack Exchange, a network of free, community-driven Q&amp;A sites" title="profile for zixia on Stack Exchange, a network of free, community-driven Q&amp;A sites">
</a>

## Copyright & License

* Code & Docs © 2021 Huan LI \<zixia@zixia.net\>
* Code released under the Apache-2.0 License
* Docs released under Creative Commons
