/**
 *   Wechaty - https://github.com/chatie/wechaty
 *
 *   @copyright 2016-2018 Huan LI <zixia@zixia.net>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */
import {
  ContactPayload,

  FileBox,

  FriendshipPayload,

  ImageType,

  MessagePayload,

  Puppet,
  PuppetOptions,

  RoomInvitationPayload,
  RoomMemberPayload,
  RoomPayload,

  UrlLinkPayload,
  MiniProgramPayload,

  log,
  PayloadType,
  throwUnsupportedError,
}                           from 'wechaty-puppet'

import {
  SidecarBody,
  attach,
  detach,
}                   from 'frida-sidecar'

import {
  VERSION,
}                                   from './config'
import {
  buildSidecarProxy,
  NO_SUCH_SIDECAR_METHOD,
}                           from './sidecar-proxy'

export type PuppetSidecarOptions = PuppetOptions & {
  sidecar: SidecarBody,
}

class PuppetSidecar extends Puppet {

  static override readonly VERSION = VERSION

  private sidecar : SidecarBody
  private proxy   : ReturnType<typeof buildSidecarProxy>

  constructor (
    public override options: PuppetSidecarOptions,
  ) {
    super(options)
    log.verbose('PuppetSidecar', 'constructor(%s)', options.sidecar.targetProcess || '')

    this.sidecar = options.sidecar
    this.proxy   = buildSidecarProxy(options.sidecar)
  }

  override async start (): Promise<void> {
    log.verbose('PuppetSidecar', 'start()')

    if (this.state.on()) {
      log.warn('PuppetSidecar', 'start() is called on a ON puppet. await ready(on) and return.')
      await this.state.ready('on')
      return
    }

    this.state.on('pending')

    try {
      await attach(this.sidecar)
      this.state.on(true)
    } catch (e) {
      this.emit('error', e)
      this.state.off(true)
    }
  }

  override async stop (): Promise<void> {
    log.verbose('PuppetSidecar', 'stop()')

    if (this.state.off()) {
      log.warn('PuppetSidecar', 'stop() is called on a OFF puppet. await ready(off) and return.')
      await this.state.ready('off')
      return
    }

    this.state.off('pending')

    if (this.logonoff()) {
      try {
        await this.logout()
      } catch (e) {
        this.emit('error', e)
      }
    }

    try {
      await detach(this.sidecar)
    } catch (e) {
      this.emit('error', e)
    }

    this.state.off(true)
  }

  override ding (data?: string): void {
    log.silly('PuppetSidecar', 'ding(%s)', data || '')

    const proxy = this.proxy['ding']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
  }

  /**
   *
   * ContactSelf
   *
   *
   */
  override async contactSelfQRCode (): Promise<string> {
    log.verbose('PuppetSidecar', 'contactSelfQRCode()')

    const proxy = await this.proxy['contactSelfQRCode']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async contactSelfName (name: string): Promise<void> {
    log.verbose('PuppetSidecar', 'contactSelfName(%s)', name)

    const proxy = await this.proxy['contactSelfName']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async contactSelfSignature (signature: string): Promise<void> {
    log.verbose('PuppetSidecar', 'contactSelfSignature(%s)', signature)

    const proxy = await this.proxy['contactSelfSignature']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  /**
   *
   * Contact
   *
   */
  override contactAlias (contactId: string)                      : Promise<string>
  override contactAlias (contactId: string, alias: string | null): Promise<void>

  override async contactAlias (contactId: string, alias?: string | null): Promise<void | string> {
    log.verbose('PuppetSidecar', 'contactAlias(%s, %s)', contactId, alias)

    const proxy = await this.proxy['contactAlias']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async contactPhone (contactId: string): Promise<string[]>
  override async contactPhone (contactId: string, phoneList: string[]): Promise<void>

  override async contactPhone (contactId: string, phoneList?: string[]): Promise<string[] | void> {
    log.verbose('PuppetSidecar', 'contactPhone(%s, %s)', contactId, phoneList)

    const proxy = await this.proxy['contactPhone']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async contactCorporationRemark (contactId: string, corporationRemark: string) {
    log.verbose('PuppetSidecar', 'contactCorporationRemark(%s, %s)', contactId, corporationRemark)

    const proxy = await this.proxy['contactCorporationRemark']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  // fasdffasfadfdas////////////////////

  override async contactDescription (contactId: string, description: string) {
    log.verbose('PuppetSidecar', 'contactDescription(%s, %s)', contactId, description)

    const proxy = await this.proxy['contactDescription']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async contactList (): Promise<string[]> {
    log.verbose('PuppetSidecar', 'contactList()')

    const proxy = await this.proxy['contactList']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async contactAvatar (contactId: string)                : Promise<FileBox>
  override async contactAvatar (contactId: string, file: FileBox) : Promise<void>

  override async contactAvatar (contactId: string, file?: FileBox): Promise<void | FileBox> {
    log.verbose('PuppetSidecar', 'contactAvatar(%s, %s)', contactId, file?.name || '')

    const proxy = await this.proxy['contactAvatar']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async contactRawPayloadParser (payload: ContactPayload) { return payload }
  override async contactRawPayload (id: string): Promise<ContactPayload> {
    log.verbose('PuppetSidecar', 'contactRawPayload(%s)', id)

    const proxy = await this.proxy['contactRawPayload']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  /**
   *
   * Conversation
   *
   */
  override async conversationReadMark (conversationId: string, hasRead?: boolean) : Promise<void> {
    log.verbose('PuppetService', 'conversationRead(%s, %s)', conversationId, hasRead)

    const proxy = await this.proxy['conversationReadMark']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  /**
   *
   * Message
   *
   */
  override async messageContact (
    messageId: string,
  ): Promise<string> {
    log.verbose('PuppetSidecar', 'messageContact(%s)', messageId)

    const proxy = await this.proxy['messageContact']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async messageImage (
    messageId: string,
    imageType: ImageType,
  ) : Promise<FileBox> {
    log.verbose('PuppetSidecar', 'messageImage(%s, %s[%s])',
      messageId,
      imageType,
      ImageType[imageType],
    )

    const proxy = await this.proxy['messageImage']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async messageRecall (
    messageId: string,
  ): Promise<boolean> {
    log.verbose('PuppetSidecar', 'messageRecall(%s)', messageId)

    const proxy = await this.proxy['messageRecall']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async messageFile (id: string): Promise<FileBox> {
    log.verbose('PuppetSidecar', 'messageFile(%s)', id)

    const proxy = await this.proxy['messageFile']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async messageUrl (messageId: string)  : Promise<UrlLinkPayload> {
    log.verbose('PuppetSidecar', 'messageUrl(%s)', messageId)

    const proxy = await this.proxy['messageUrl']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async messageMiniProgram (messageId: string): Promise<MiniProgramPayload> {
    log.verbose('PuppetSidecar', 'messageMiniProgram(%s)', messageId)

    const proxy = await this.proxy['messageMiniProgram']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async messageRawPayloadParser (payload: MessagePayload) { return payload }
  override async messageRawPayload (id: string): Promise<MessagePayload> {
    log.verbose('PuppetSidecar', 'messageRawPayload(%s)', id)

    const proxy = await this.proxy['messageRawPayload']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async messageSendText (
    conversationId: string,
    text     : string,
  ): Promise<void> {
    log.verbose('PuppetSidecar', 'messageSendText(%s, %s)', conversationId, text)

    const proxy = await this.proxy['messageSendText']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async messageSendFile (
    conversationId: string,
    file     : FileBox,
  ): Promise<void> {
    log.verbose('PuppetSidecar', 'messageSendFile(%s, %s)', conversationId, file.name)

    const proxy = await this.proxy['messageSendFile']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async messageSendContact (
    conversationId: string,
    contactId : string,
  ): Promise<void> {
    log.verbose('PuppetSidecar', 'messageSendContact(%s, %s)', conversationId, contactId)

    const proxy = await this.proxy['messageSendContact']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async messageSendUrl (
    conversationId: string,
    urlLinkPayload: UrlLinkPayload,
  ) : Promise<void> {
    log.verbose('PuppetSidecar', 'messageSendUrl(%s, %s)', conversationId, JSON.stringify(urlLinkPayload))

    const proxy = await this.proxy['messageSendUrl']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async messageSendMiniProgram (
    conversationId: string,
    miniProgramPayload: MiniProgramPayload,
  ): Promise<void> {
    log.verbose('PuppetSidecar', 'messageSendMiniProgram(%s, %s)', conversationId, JSON.stringify(miniProgramPayload))

    const proxy = await this.proxy['messageSendMiniProgram']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async messageForward (
    conversationId: string,
    messageId : string,
  ): Promise<void> {
    log.verbose('PuppetSidecar', 'messageForward(%s, %s)',
      conversationId,
      messageId,
    )

    const proxy = await this.proxy['messageForward']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  /**
   *
   * Room
   *
   */
  override async roomRawPayloadParser (payload: RoomPayload) { return payload }
  override async roomRawPayload (id: string): Promise<RoomPayload> {
    log.verbose('PuppetSidecar', 'roomRawPayload(%s)', id)

    const proxy = await this.proxy['roomRawPayload']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async roomList (): Promise<string[]> {
    log.verbose('PuppetSidecar', 'roomList()')

    const proxy = await this.proxy['roomList']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async roomDel (
    roomId    : string,
    contactId : string,
  ): Promise<void> {
    log.verbose('PuppetSidecar', 'roomDel(%s, %s)', roomId, contactId)

    const proxy = await this.proxy['roomDel']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async roomAvatar (roomId: string): Promise<FileBox> {
    log.verbose('PuppetSidecar', 'roomAvatar(%s)', roomId)

    const proxy = await this.proxy['roomAvatar']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async roomAdd (
    roomId    : string,
    contactId : string,
  ): Promise<void> {
    log.verbose('PuppetSidecar', 'roomAdd(%s, %s)', roomId, contactId)

    const proxy = await this.proxy['roomAdd']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async roomTopic (roomId: string)                : Promise<string>
  override async roomTopic (roomId: string, topic: string) : Promise<void>

  override async roomTopic (
    roomId: string,
    topic?: string,
  ): Promise<void | string> {
    log.verbose('PuppetSidecar', 'roomTopic(%s, %s)', roomId, topic)

    const proxy = await this.proxy['roomTopic']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)

    if (topic) {
      await this.dirtyPayload(PayloadType.Room, roomId)
    }

    return ret
  }

  override async roomCreate (
    contactIdList : string[],
    topic         : string,
  ): Promise<string> {
    log.verbose('PuppetSidecar', 'roomCreate(%s, %s)', contactIdList, topic)

    const proxy = await this.proxy['roomCreate']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async roomQuit (roomId: string): Promise<void> {
    log.verbose('PuppetSidecar', 'roomQuit(%s)', roomId)

    const proxy = await this.proxy['roomQuit']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async roomQRCode (roomId: string): Promise<string> {
    log.verbose('PuppetSidecar', 'roomQRCode(%s)', roomId)

    const proxy = await this.proxy['roomQRCode']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async roomMemberList (roomId: string) : Promise<string[]> {
    log.verbose('PuppetSidecar', 'roomMemberList(%s)', roomId)

    const proxy = await this.proxy['roomMemberList']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async roomMemberRawPayload (roomId: string, contactId: string): Promise<RoomMemberPayload>  {
    log.verbose('PuppetSidecar', 'roomMemberRawPayload(%s, %s)', roomId, contactId)

    const proxy = await this.proxy['roomMemberRawPayload']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async roomMemberRawPayloadParser (rawPayload: RoomMemberPayload): Promise<RoomMemberPayload>  {
    log.verbose('PuppetSidecar', 'roomMemberRawPayloadParser(%s)', rawPayload)

    return rawPayload
  }

  override async roomAnnounce (roomId: string)                : Promise<string>
  override async roomAnnounce (roomId: string, text: string)  : Promise<void>

  override async roomAnnounce (roomId: string, text?: string) : Promise<void | string> {
    log.verbose('PuppetSidecar', 'roomAnnounce(%s, %s)', roomId, text)

    const proxy = await this.proxy['roomAnnounce']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  /**
   *
   * Room Invitation
   *
   */
  override async roomInvitationAccept (roomInvitationId: string): Promise<void> {
    log.verbose('PuppetSidecar', 'roomInvitationAccept(%s)', roomInvitationId)

    const proxy = await this.proxy['roomInvitationAccept']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async roomInvitationRawPayload (roomInvitationId: string): Promise<any> {
    log.verbose('PuppetSidecar', 'roomInvitationRawPayload(%s)', roomInvitationId)

    const proxy = await this.proxy['roomInvitationRawPayload']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async roomInvitationRawPayloadParser (rawPayload: any): Promise<RoomInvitationPayload> {
    log.verbose('PuppetSidecar', 'roomInvitationRawPayloadParser(%s)', JSON.stringify(rawPayload))

    const proxy = await this.proxy['roomInvitationRawPayloadParser']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  /**
   *
   * Friendship
   *
   */
  override async friendshipRawPayload (id: string): Promise<any> {
    log.verbose('PuppetSidecar', 'friendshipRawPayload(%s)', id)

    const proxy = await this.proxy['friendshipRawPayload']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async friendshipRawPayloadParser (rawPayload: any): Promise<FriendshipPayload> {
    // TODO
    return rawPayload
  }

  override async friendshipSearchPhone (
    phone: string,
  ): Promise<null | string> {
    log.verbose('PuppetSidecar', 'friendshipSearchPhone(%s)', phone)

    const proxy = await this.proxy['friendshipSearchPhone']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async friendshipSearchWeixin (
    weixin: string,
  ): Promise<null | string> {
    log.verbose('PuppetSidecar', 'friendshipSearchWeixin(%s)', weixin)

    const proxy = await this.proxy['friendshipSearchWeixin']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async friendshipAdd (
    contactId : string,
    hello     : string,
  ): Promise<void> {
    log.verbose('PuppetSidecar', 'friendshipAdd(%s, %s)', contactId, hello)

    const proxy = await this.proxy['friendshipAdd']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  override async friendshipAccept (
    friendshipId : string,
  ): Promise<void> {
    log.verbose('PuppetSidecar', 'friendshipAccept(%s)', friendshipId)

    const proxy = await this.proxy['friendshipAccept']
    if (!proxy || proxy === NO_SUCH_SIDECAR_METHOD) {
      throwUnsupportedError()
    }
    const ret = await proxy(...arguments)
    return ret
  }

  /**
   *
   * Tag
   *
   */
  override async tagContactAdd (
    tagId: string,
    contactId: string,
  ): Promise<void> {
    log.verbose('PuppetSidecar', 'tagContactAdd(%s)', tagId, contactId)
  }

  override async tagContactRemove (
    tagId: string,
    contactId: string,
  ): Promise<void> {
    log.verbose('PuppetSidecar', 'tagContactRemove(%s)', tagId, contactId)
  }

  override async tagContactDelete (
    tagId: string,
  ): Promise<void> {
    log.verbose('PuppetSidecar', 'tagContactDelete(%s)', tagId)
  }

  override async tagContactList (
    contactId?: string,
  ): Promise<string[]> {
    log.verbose('PuppetSidecar', 'tagContactList(%s)', contactId)
    return []
  }

}

export { PuppetSidecar }
export default PuppetSidecar
