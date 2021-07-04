#!/usr/bin/env ts-node

import {
  SidecarBody,
}                     from 'frida-sidecar'
import { test }  from 'tstest'

import { Wechaty } from 'wechaty'

import {
  PuppetSidecar,
}                         from '../src/mod'

class DummySidecar extends SidecarBody {

}

async function * wechatyFixture () {
  const sidecar = new DummySidecar()
  const puppet  = new PuppetSidecar({ sidecar })
  const wechaty = new Wechaty({ puppet })

  try {
    await wechaty.start()

    yield {
      sidecar,
      wechaty,
    }

  } finally {
    await wechaty.stop()
  }
}
void wechatyFixture

test('integration testing', async t => {
  const sidecar = new DummySidecar()
  const puppet  = new PuppetSidecar({ sidecar })
  const wechaty = new Wechaty({ puppet })

  t.ok(wechaty, 'should instantiate wechaty with puppet mocker')
})
