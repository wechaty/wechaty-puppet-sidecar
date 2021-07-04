#!/usr/bin/env ts-node

import test  from 'blue-tape'

import { PuppetSidecar } from './puppet-sidecar'

import {
  Sidecar,
  SidecarBody,
}                   from 'frida-sidecar'

@Sidecar('/bin/ls')
class TestSidecar extends SidecarBody {}

class PuppetSidecarTest extends PuppetSidecar {
}

test('PuppetSidecar perfect restart testing', async (t) => {
  const sidecar = new TestSidecar()
  const puppet = new PuppetSidecarTest({ sidecar })

  try {

    for (let i = 0; i < 3; i++) {
      await puppet.start()
      t.true(puppet.state.on(), 'should be turned on after start()')

      await puppet.stop()
      t.true(puppet.state.off(), 'should be turned off after stop()')

      t.pass('start/stop-ed at #' + i)
    }

    t.pass('PuppetSidecar() perfect restart pass.')
  } catch (e) {
    t.fail(e)
  }
})
