import { SidecarBody } from 'frida-sidecar'

const NO_SUCH_SIDECAR_METHOD = Symbol('notExist')

type SidecarProxyMethod = (
  ...args: any[]
) => Promise<any>

function buildSidecarProxy (
  sidecar: SidecarBody,
) {
  const handler = {
    get: function (obj: any, prop: string) {
      return prop in obj
        ? obj[prop].bind(obj)
        : NO_SUCH_SIDECAR_METHOD
    },
  }

  const proxy = new Proxy(sidecar, handler)

  return proxy as {
    [method: string]: typeof NO_SUCH_SIDECAR_METHOD | SidecarProxyMethod
  }
}

export {
  buildSidecarProxy,
  NO_SUCH_SIDECAR_METHOD,
}
