#!/usr/bin/env ts-node

import {
  PuppetSidecar,
  VERSION,
}                 from 'wechaty-puppet-sidecar'

import {
  Sidecar,
  SidecarBody,
}                 from 'frida-sidecar'

@Sidecar('test')
class DummySidecar extends SidecarBody {}

async function main () {
  if (VERSION === '0.0.0') {
    throw new Error('version should not be 0.0.0 when prepare for publishing')
  }

  const sidecar = new DummySidecar()
  const puppet = new PuppetSidecar({ sidecar })
  console.info(`Puppet v${puppet.version()} smoke testing passed.`)
  return 0
}

main()
  .then(process.exit)
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
