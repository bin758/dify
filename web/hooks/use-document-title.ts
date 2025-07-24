'use client'
import { useGlobalPublicStore } from '@/context/global-public-context'
import { useFavicon, useTitle } from 'ahooks'

export default function useDocumentTitle(title: string) {
  const isPending = useGlobalPublicStore(s => s.isGlobalPending)
  const systemFeatures = useGlobalPublicStore(s => s.systemFeatures)
  const prefix = title ? `${title}` : ''
  let titleStr = ''
  let favicon = ''
  if (isPending === false) {
    if (systemFeatures.branding.enabled) {
      titleStr = `${prefix}`
      if (systemFeatures.branding.application_title)
        titleStr = `${prefix} - ${systemFeatures.branding.application_title}`

      favicon = systemFeatures.branding.favicon
    }
    else {
      titleStr = `${prefix}`
      favicon = '/favicon.ico'
    }
  }
  useTitle(titleStr)
  useFavicon(favicon)
}
